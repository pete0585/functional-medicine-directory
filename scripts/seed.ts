/**
 * Seed script for functional-medicine directory.
 *
 * Data sources:
 *   1. IFM Find a Practitioner: https://www.ifm.org/find-a-practitioner/ (public, filterable by state)
 *   2. DataForSEO Google Maps: "functional medicine doctor", "integrative medicine doctor", "root cause medicine"
 *   3. NPI Registry: taxonomy 207R00000X (Internal Medicine) filtered by functional medicine keywords
 *
 * Run: npm run seed
 *
 * Env required:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function generateSlug(name: string, city: string, state: string): string {
  const base = slugify(`${name} ${city} ${state}`)
  const rand = Math.random().toString(36).slice(2, 7)
  return `${base}-${rand}`
}

interface SeedListing {
  full_name: string
  practice_name?: string
  practitioner_type: string
  phone?: string
  website?: string
  address?: string
  city: string
  state: string
  zip?: string
  specialties?: string[]
  conditions_treated?: string[]
  accepting_new_patients?: boolean
  telehealth_available?: boolean
  is_ifm_certified?: boolean
  bio?: string
  source: string
}

// Sample seed data — replace with real scraper output
const SAMPLE_LISTINGS: SeedListing[] = [
  {
    full_name: 'Dr. Sarah Chen',
    practice_name: 'Integrative Health Austin',
    practitioner_type: 'md',
    phone: '(512) 555-0101',
    website: 'https://integrativehealthaustin.com',
    city: 'Austin',
    state: 'TX',
    zip: '78701',
    specialties: ['gut health', 'hormone optimization', 'autoimmune'],
    conditions_treated: ['IBS', 'Hashimoto\'s', 'Hormone imbalance', 'Fatigue'],
    accepting_new_patients: true,
    telehealth_available: true,
    is_ifm_certified: true,
    bio: 'Board-certified internal medicine physician with IFM certification specializing in root cause medicine.',
    source: 'seed',
  },
  {
    full_name: 'Dr. Marcus Williams',
    practice_name: 'Root Cause Medical Group',
    practitioner_type: 'do',
    phone: '(303) 555-0202',
    website: 'https://rootcausemedical.com',
    city: 'Denver',
    state: 'CO',
    zip: '80202',
    specialties: ['longevity', 'metabolic health', 'gut health'],
    conditions_treated: ['Diabetes', 'Metabolic syndrome', 'Cognitive decline'],
    accepting_new_patients: true,
    telehealth_available: true,
    is_ifm_certified: true,
    bio: 'Osteopathic physician specializing in metabolic health and longevity using functional medicine principles.',
    source: 'seed',
  },
  {
    full_name: 'Jennifer Rodriguez, NP',
    practice_name: 'Functional Wellness Center',
    practitioner_type: 'np',
    phone: '(310) 555-0303',
    website: 'https://functionalwellnesscenter.com',
    city: 'Los Angeles',
    state: 'CA',
    zip: '90001',
    specialties: ['hormone optimization', 'thyroid health', 'women\'s health'],
    conditions_treated: ['PCOS', 'Thyroid disorders', 'Adrenal fatigue', 'PMS'],
    accepting_new_patients: false,
    telehealth_available: true,
    is_ifm_certified: false,
    bio: 'Nurse practitioner with advanced training in functional and integrative medicine for women\'s health.',
    source: 'seed',
  },
]

async function seed() {
  console.log('🌱 Starting functional medicine directory seed...')

  let inserted = 0
  let skipped = 0

  for (const item of SAMPLE_LISTINGS) {
    const slug = generateSlug(item.full_name, item.city, item.state)

    const { error } = await supabase.from('fm_listings').insert({
      full_name: item.full_name,
      practice_name: item.practice_name ?? null,
      practitioner_type: item.practitioner_type,
      slug,
      phone: item.phone ?? null,
      website: item.website ?? null,
      address: item.address ?? null,
      city: item.city,
      state: item.state,
      zip: item.zip ?? null,
      specialties: item.specialties ?? [],
      conditions_treated: item.conditions_treated ?? [],
      accepting_new_patients: item.accepting_new_patients ?? true,
      telehealth_available: item.telehealth_available ?? false,
      is_ifm_certified: item.is_ifm_certified ?? false,
      bio: item.bio ?? null,
      listing_tier: 'unclaimed',
      listing_tier_rank: 4,
      is_active: true,
      is_approved: true,
      source: item.source,
    })

    if (error) {
      console.error(`  ✗ Failed: ${item.full_name} — ${error.message}`)
      skipped++
    } else {
      console.log(`  ✓ Inserted: ${item.full_name}, ${item.city} ${item.state}`)
      inserted++
    }
  }

  console.log(`\n✅ Seed complete: ${inserted} inserted, ${skipped} skipped`)
  console.log('\nNext steps:')
  console.log('  1. Run full DataForSEO seed via data-seeder agent')
  console.log('  2. Scrape IFM practitioner finder for certified providers')
}

seed().catch(console.error)
