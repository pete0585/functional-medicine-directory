import { MetadataRoute } from 'next'
import { getCityPageSlugs } from '@/lib/city-pages'
import { BASE, cityPageUrl } from '@/lib/site'
import { createServiceClient } from '@/lib/supabase/server'
import { CATEGORIES } from '@/types'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createServiceClient()

  const { data: listings } = await supabase
    .from('fm_listings')
    .select('slug, updated_at')
    .eq('is_active', true)
    .range(0, 9999)

  const listingUrls: MetadataRoute.Sitemap = (listings ?? []).map((l) => ({
    url: `${BASE}/listings/${l.slug}`,
    lastModified: l.updated_at ? new Date(l.updated_at) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const categoryUrls: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${BASE}/categories/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const cityUrls: MetadataRoute.Sitemap = getCityPageSlugs().map((slug) => ({
    url: cityPageUrl(slug),
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE}/listings`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE}/submit`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...categoryUrls,
    ...cityUrls,
    ...listingUrls,
  ]
}
