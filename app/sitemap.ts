import { MetadataRoute } from 'next'
import { createServiceClient } from '@/lib/supabase/server'
import { CATEGORIES } from '@/types'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://functionalmddirectory.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createServiceClient()

  const { data: listings } = await supabase
    .from('fm_listings')
    .select('slug, updated_at')
    .eq('is_active', true)
    .eq('is_approved', true)

  const listingUrls: MetadataRoute.Sitemap = (listings ?? []).map((l) => ({
    url: `${BASE_URL}/listings/${l.slug}`,
    lastModified: l.updated_at ? new Date(l.updated_at) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const categoryUrls: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${BASE_URL}/categories/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/listings`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/submit`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...categoryUrls,
    ...listingUrls,
  ]
}
