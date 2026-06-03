import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { generateListingSlug } from '@/lib/utils'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    const {
      full_name,
      practice_name,
      practitioner_type,
      email,
      phone,
      website,
      address,
      city,
      state,
      zip,
      bio,
      accepting_new_patients,
      telehealth_available,
      is_ifm_certified,
    } = data

    if (!full_name || !email || !city || !state || !practitioner_type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = await createServiceClient()

    const slug = generateListingSlug(full_name, city, state)

    await supabase.from('fm_listings').insert({
      full_name,
      practice_name: practice_name || null,
      practitioner_type,
      email,
      phone: phone || null,
      website: website || null,
      address: address || null,
      city,
      state,
      zip: zip || null,
      bio: bio || null,
      accepting_new_patients: accepting_new_patients ?? true,
      telehealth_available: telehealth_available ?? false,
      is_ifm_certified: is_ifm_certified ?? false,
      slug,
      listing_tier: 'unclaimed',
      listing_tier_rank: 4,
      is_active: false,
      is_approved: false,
      source: 'self_submitted',
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Submit error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
