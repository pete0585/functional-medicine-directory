import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getListingBySlug } from '@/lib/data'
import ListingDetail from '@/components/ListingDetail'
import { ViewTracker } from '@/components/ViewTracker'
import { PRACTITIONER_TYPES } from '@/types'
import { createServiceClient } from '@/lib/supabase/server'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const listing = await getListingBySlug(slug).catch(() => null)
  if (!listing) return { title: 'Practitioner Not Found' }

  const location = [listing.city, listing.state].filter(Boolean).join(', ')
  const type = PRACTITIONER_TYPES[listing.practitioner_type] ?? listing.practitioner_type

  return {
    title: `${listing.full_name} — Functional Medicine ${type} in ${location}`,
    description: listing.bio
      ? listing.bio.slice(0, 155)
      : `${listing.full_name} is a functional medicine practitioner in ${location}. ${listing.is_ifm_certified ? 'IFM Certified.' : ''} ${listing.telehealth_available ? 'Telehealth available.' : ''}`,
    openGraph: {
      title: `${listing.full_name} | FunctionalMDDirectory.com`,
      description: `Functional medicine ${type} in ${location}.`,
    },
  }
}

export default async function ListingPage({ params }: PageProps) {
  const { slug } = await params
  const listing = await getListingBySlug(slug).catch(() => null)

  if (!listing) notFound()

  const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
  const supabase = await createServiceClient()
  const { count: viewCount } = await supabase
    .from('listing_views')
    .select('*', { count: 'exact', head: true })
    .eq('directory_slug', 'functional-medicine')
    .eq('listing_id', String(listing.id))
    .gte('viewed_at', monthStart)
  const monthlyViews = viewCount ?? 0

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: listing.full_name,
    description: listing.bio ?? `Functional medicine practitioner in ${listing.city}, ${listing.state}`,
    telephone: listing.phone,
    url: listing.website,
    address: {
      '@type': 'PostalAddress',
      streetAddress: listing.address,
      addressLocality: listing.city,
      addressRegion: listing.state,
      postalCode: listing.zip,
      addressCountry: 'US',
    },
    medicalSpecialty: 'FunctionalMedicine',
    ...(listing.telehealth_available && {
      availableService: {
        '@type': 'MedicalProcedure',
        name: 'Telehealth Consultation',
      },
    }),
  }

  const location = [listing.city, listing.state].filter(Boolean).join(', ')

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ViewTracker listingId={String(listing.id)} directorySlug='functional-medicine' />

      <nav className="mb-6 flex items-center gap-2 text-sm text-slate-400">
        <a href="/" className="hover:text-teal-700 transition-colors">Home</a>
        <span>/</span>
        <a href="/listings" className="hover:text-teal-700 transition-colors">Directory</a>
        <span>/</span>
        {listing.state && (
          <>
            <a href={`/listings?state=${listing.state}`} className="hover:text-teal-700 transition-colors">{listing.state}</a>
            <span>/</span>
          </>
        )}
        <span className="text-slate-600 font-medium truncate">{listing.full_name}</span>
      </nav>

      <ListingDetail listing={listing} monthlyViews={monthlyViews} />

      <div className="mt-12 pt-8 border-t border-cream-300">
        <p className="text-xs text-slate-400 text-center">
          Listing data provided by the practitioner or sourced from public records.{' '}
          <a href={`/claim/${listing.id}`} className="text-teal-600 hover:text-teal-800">
            Is this your practice? Claim it.
          </a>
        </p>
      </div>
    </div>
  )
}
