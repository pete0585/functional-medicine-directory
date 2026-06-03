import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCategory } from '@/lib/data'
import { CATEGORIES } from '@/types'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const cat = CATEGORIES.find((c) => c.slug === slug)
  if (!cat) return { title: 'Category Not Found' }

  return {
    title: `${cat.label} — Functional Medicine Directory`,
    description: `Find ${cat.label.toLowerCase()} near you. ${cat.description} Search by location and specialty on FunctionalMDDirectory.com.`,
    openGraph: {
      title: `${cat.label} | FunctionalMDDirectory.com`,
      description: cat.description,
    },
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const cat = CATEGORIES.find((c) => c.slug === slug)

  if (!cat) notFound()

  const listings = await getListingsByCategory(slug, 24).catch(() => [])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: cat.label,
    description: cat.description,
    numberOfItems: listings.length,
    itemListElement: listings.slice(0, 10).map((l, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: l.full_name,
      url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://functionalmddirectory.com'}/listings/${l.slug}`,
    })),
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="mb-6 flex items-center gap-2 text-sm text-slate-400">
        <a href="/" className="hover:text-teal-700">Home</a>
        <span>/</span>
        <a href="/listings" className="hover:text-teal-700">Directory</a>
        <span>/</span>
        <span className="text-slate-600 font-medium">{cat.label}</span>
      </nav>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">{cat.icon}</span>
          <h1 className="text-3xl font-bold text-slate-900">{cat.label}</h1>
        </div>
        <p className="text-slate-500 max-w-2xl">{cat.description}</p>
      </div>

      {listings.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-slate-400 text-lg">No practitioners listed yet in this category.</p>
          <p className="text-slate-400 text-sm mt-2">
            <Link href="/submit" className="text-teal-600 hover:text-teal-800">
              Are you a practitioner? Add your listing for free.
            </Link>
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-slate-500 mb-6">
            {listings.length} practitioner{listings.length !== 1 ? 's' : ''} found
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </>
      )}

      <div className="mt-10">
        <Link href="/listings" className="flex items-center gap-2 text-sm text-teal-700 hover:text-teal-900">
          <ArrowLeft className="h-4 w-4" />
          View all practitioners
        </Link>
      </div>

      <div className="mt-12 pt-8 border-t border-cream-300">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Browse Other Specialties</h2>
        <div className="flex flex-wrap gap-3">
          {CATEGORIES.filter((c) => c.slug !== slug).map((c) => (
            <Link
              key={c.slug}
              href={`/categories/${c.slug}`}
              className="badge-teal hover:bg-teal-200 transition-colors text-sm py-1.5 px-3"
            >
              {c.icon} {c.label.split('(')[0].trim()}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
