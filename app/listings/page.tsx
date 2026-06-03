import type { Metadata } from 'next'
import { Suspense } from 'react'
import ListingCard from '@/components/ListingCard'
import FilterSidebar from '@/components/FilterSidebar'
import { getListings } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Browse Functional Medicine Doctors',
  description:
    'Search and filter IFM-certified functional medicine doctors, integrative medicine specialists, and root cause practitioners near you.',
}

interface PageProps {
  searchParams: Promise<{
    q?: string
    state?: string
    city?: string
    type?: string
    category?: string
    telehealth?: string
    accepting?: string
    ifm?: string
    page?: string
  }>
}

export default async function ListingsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const page = parseInt(params.page ?? '1', 10)

  const { listings, total } = await getListings({
    state: params.state,
    city: params.city,
    practitionerType: params.type,
    category: params.category,
    telehealth: params.telehealth === 'true',
    acceptingNew: params.accepting === 'true',
    ifmCertified: params.ifm === 'true',
    search: params.q,
    page,
    pageSize: 24,
  }).catch(() => ({ listings: [], total: 0 }))

  const totalPages = Math.ceil(total / 24)
  const hasFilters = !!(params.q || params.state || params.city || params.type || params.category || params.telehealth || params.accepting || params.ifm)

  const buildPageUrl = (p: number) => {
    const sp = new URLSearchParams()
    if (params.q) sp.set('q', params.q)
    if (params.state) sp.set('state', params.state)
    if (params.city) sp.set('city', params.city)
    if (params.type) sp.set('type', params.type)
    if (params.category) sp.set('category', params.category)
    if (params.telehealth) sp.set('telehealth', params.telehealth)
    if (params.accepting) sp.set('accepting', params.accepting)
    if (params.ifm) sp.set('ifm', params.ifm)
    sp.set('page', String(p))
    return `/listings?${sp.toString()}`
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          {hasFilters ? 'Search Results' : 'All Functional Medicine Practitioners'}
        </h1>
        <p className="mt-1 text-slate-500 text-sm">
          {total > 0 ? (
            <>
              {total.toLocaleString()} practitioner{total !== 1 ? 's' : ''} found
              {params.state && ` in ${params.state}`}
              {params.city && ` — ${params.city}`}
            </>
          ) : (
            'No results found. Try adjusting your filters.'
          )}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-64 shrink-0">
          <Suspense fallback={<div className="card p-5 h-64 animate-pulse bg-cream-200" />}>
            <FilterSidebar />
          </Suspense>
        </div>

        <div className="flex-1 min-w-0">
          {listings.length === 0 ? (
            <div className="card p-12 text-center">
              <p className="text-slate-400 text-lg">No practitioners found.</p>
              <p className="text-slate-400 text-sm mt-2">Try removing some filters or searching a different location.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {listings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>

              {totalPages > 1 && (
                <nav className="mt-10 flex items-center justify-center gap-2">
                  {page > 1 && (
                    <a href={buildPageUrl(page - 1)} className="btn-secondary text-sm py-2 px-4">
                      ← Previous
                    </a>
                  )}
                  <span className="text-sm text-slate-500">
                    Page {page} of {totalPages}
                  </span>
                  {page < totalPages && (
                    <a href={buildPageUrl(page + 1)} className="btn-secondary text-sm py-2 px-4">
                      Next →
                    </a>
                  )}
                </nav>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
