import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  let payload: Record<string, unknown>
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // Resend delivers email.received events via Svix envelope
  // { type: "email.received", data: { from, to, subject, text, html, headers } }
  const emailData =
    payload.type === 'email.received' && payload.data
      ? (payload.data as Record<string, unknown>)
      : payload

  const fromEmail = (emailData.from as string) ?? ''
  const fromName = (emailData.from_name as string) ?? ''
  const subject = (emailData.subject as string) ?? ''
  const bodyText = (emailData.text as string) ?? (emailData.body_text as string) ?? ''
  const bodyHtml = (emailData.html as string) ?? (emailData.body_html as string) ?? ''

  if (!fromEmail) {
    return NextResponse.json({ error: 'Missing from_email' }, { status: 400 })
  }

  const supabase = await createServiceClient()

  let listingId: string | null = null
  let listingSlug: string | null = null

  const { data: listing } = await supabase
    .from('fm_listings')
    .select('id, slug')
    .eq('email', fromEmail.toLowerCase())
    .single()

  if (listing) {
    listingId = listing.id
    listingSlug = listing.slug
  }

  await supabase.from('inbound_emails').insert({
    directory: 'functional-medicine',
    from_email: fromEmail,
    from_name: fromName,
    subject,
    body_text: bodyText,
    body_html: bodyHtml,
    listing_id: listingId,
    listing_slug: listingSlug,
    processed: false,
  })

  return NextResponse.json({ received: true })
}
