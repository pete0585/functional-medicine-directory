import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const listingId = (body.listing_id ?? body.listingId) as string | undefined
  const tier = body.tier as string | undefined

  if (!listingId || !tier) {
    return NextResponse.json({ error: 'Missing listing_id or tier' }, { status: 400 })
  }

  if (!['verified', 'featured'].includes(tier)) {
    return NextResponse.json({ error: 'Invalid tier. Must be verified or featured.' }, { status: 400 })
  }

  const supabase = await createServiceClient()
  const { data: listing, error } = await supabase
    .from('fm_listings')
    .select('id, full_name, city, state')
    .eq('id', listingId)
    .single()

  if (error || !listing) {
    return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
  }

  const priceId =
    tier === 'featured'
      ? process.env.STRIPE_FEATURED_PRICE_ID!
      : process.env.STRIPE_VERIFIED_PRICE_ID!

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://functionalmddirectory.com'

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/listings/${listingId}?verified=true`,
      cancel_url: `${siteUrl}/listings/${listingId}`,
      metadata: { listing_id: listingId, tier },
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe session creation error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
