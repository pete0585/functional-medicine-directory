import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const { listing_id, email } = await req.json()

    if (!listing_id || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = await createServiceClient()

    const { data: listing } = await supabase
      .from('fm_listings')
      .select('id, full_name, city, state, slug')
      .eq('id', listing_id)
      .single()

    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
    }

    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString()

    await supabase.from('fm_claims').insert({
      listing_id,
      email,
      token,
      expires_at: expiresAt,
      verified: false,
    })

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://functionalmddirectory.com'
    const verifyUrl = `${siteUrl}/claim/${listing_id}?token=${token}`
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'hello@mail.functionalmddirectory.com'

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
        'User-Agent': 'curl/8.5.0',
      },
      body: JSON.stringify({
        from: `FunctionalMD Directory <${fromEmail}>`,
        to: [email],
        subject: `Claim your listing — ${listing.full_name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; background: #ffffff;">
            <div style="margin-bottom: 24px;">
              <span style="background: #0F766E; color: white; padding: 6px 14px; border-radius: 99px; font-size: 12px; font-weight: 600;">FunctionalMD Directory</span>
            </div>
            <h2 style="color: #134E4A; margin-bottom: 8px; font-size: 22px;">Verify your listing claim</h2>
            <p style="color: #475569; line-height: 1.6;">Hi,</p>
            <p style="color: #475569; line-height: 1.6;">
              You requested to claim <strong>${listing.full_name}</strong> in ${listing.city}, ${listing.state} on FunctionalMDDirectory.com.
            </p>
            <p style="color: #475569; line-height: 1.6;">Click the button below to verify your email and claim your listing:</p>
            <a href="${verifyUrl}" style="display: inline-block; background: #0F766E; color: white; text-decoration: none; padding: 14px 28px; border-radius: 999px; font-weight: 600; margin: 16px 0; font-size: 15px;">
              Claim My Listing
            </a>
            <p style="color: #94A3B8; font-size: 13px; margin-top: 16px;">This link expires in 72 hours. If you didn't request this, you can ignore this email.</p>
            <hr style="border: none; border-top: 1px solid #E2E8F0; margin: 24px 0;" />
            <p style="color: #94A3B8; font-size: 12px;">FunctionalMDDirectory.com — The directory built for functional medicine practitioners.</p>
          </div>
        `,
      }),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Claim error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
