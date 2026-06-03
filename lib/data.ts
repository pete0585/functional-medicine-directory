import { createClient } from './supabase/server'
import type { Listing } from '@/types'

const TABLE = 'fm_listings'

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from(TABLE)
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()
  return data as Listing | null
}

export async function getListingById(id: string): Promise<Listing | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from(TABLE)
    .select('*')
    .eq('id', id)
    .single()
  return data as Listing | null
}

export async function getListings({
  state,
  city,
  category,
  practitionerType,
  telehealth,
  acceptingNew,
  ifmCertified,
  search,
  page = 1,
  pageSize = 24,
}: {
  state?: string
  city?: string
  category?: string
  practitionerType?: string
  telehealth?: boolean
  acceptingNew?: boolean
  ifmCertified?: boolean
  search?: string
  page?: number
  pageSize?: number
} = {}): Promise<{ listings: Listing[]; total: number }> {
  const supabase = await createClient()
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let query = supabase
    .from(TABLE)
    .select('*', { count: 'exact' })
    .eq('is_active', true)
    .eq('is_approved', true)
    .order('listing_tier_rank', { ascending: true })
    .order('full_name', { ascending: true })
    .range(from, to)

  if (state) query = query.ilike('state', state)
  if (city) query = query.ilike('city', city)
  if (practitionerType) query = query.eq('practitioner_type', practitionerType)
  if (telehealth === true) query = query.eq('telehealth_available', true)
  if (acceptingNew === true) query = query.eq('accepting_new_patients', true)
  if (ifmCertified === true) query = query.eq('is_ifm_certified', true)
  if (search) query = query.textSearch('search_vector', search, { type: 'websearch' })

  const { data, count } = await query
  return { listings: (data as Listing[]) ?? [], total: count ?? 0 }
}

export async function getFeaturedListings(limit = 6): Promise<Listing[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from(TABLE)
    .select('*')
    .eq('is_active', true)
    .eq('is_approved', true)
    .in('listing_tier', ['featured', 'verified'])
    .order('listing_tier_rank', { ascending: true })
    .limit(limit)
  return (data as Listing[]) ?? []
}

export async function getListingCount(): Promise<number> {
  const supabase = await createClient()
  const { count } = await supabase
    .from(TABLE)
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)
  return count ?? 0
}

export async function getListingsByCategory(
  category: string,
  limit = 24
): Promise<Listing[]> {
  const supabase = await createClient()

  const categoryMap: Record<string, { field: string; value: string | boolean }> = {
    'functional-medicine-doctors': { field: 'practitioner_type', value: 'md' },
    'nurse-practitioners': { field: 'practitioner_type', value: 'np' },
    'naturopathic-doctors': { field: 'practitioner_type', value: 'nd' },
    'hormone-optimization': { field: 'is_ifm_certified', value: true },
    'anti-aging-longevity': { field: 'is_ifm_certified', value: true },
  }

  let query = supabase
    .from(TABLE)
    .select('*')
    .eq('is_active', true)
    .eq('is_approved', true)
    .order('listing_tier_rank', { ascending: true })
    .limit(limit)

  const filter = categoryMap[category]
  if (filter) {
    query = query.eq(filter.field as string, filter.value as string)
  }

  const { data } = await query
  return (data as Listing[]) ?? []
}

export async function getRecentListings(limit = 6): Promise<Listing[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from(TABLE)
    .select('*')
    .eq('is_active', true)
    .eq('is_approved', true)
    .order('created_at', { ascending: false })
    .limit(limit)
  return (data as Listing[]) ?? []
}
