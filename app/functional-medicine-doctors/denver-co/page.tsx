import type { Metadata } from 'next'
import Link from 'next/link'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Functional Medicine Doctors in Denver, CO | FunctionalMDDirectory.com',
  description:
    'Find top functional medicine doctors in Denver, CO. Browse IFM-certified physicians, integrative specialists, and root cause practitioners accepting new patients in Denver.',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How many functional medicine doctors are in Denver?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Denver and the broader Front Range region have a large and established functional medicine community. The city is home to numerous IFM-certified physicians, naturopathic doctors, and integrative nurse practitioners, making it one of the top markets for root cause medicine in the Mountain West.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there any functional medicine doctors in Boulder near Denver?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Boulder, just 30 miles northwest of Denver, has a high concentration of naturopathic doctors and functional medicine practitioners relative to its size. Many Denver-area practitioners also serve the Boulder corridor, and telehealth options mean you can work with any Colorado-licensed practitioner regardless of which city they are based in.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Colorado Medicaid cover functional medicine?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Colorado Medicaid (Health First Colorado) generally covers standard primary care visits with a licensed physician, but advanced functional medicine testing, nutritional counseling, and many complementary therapies are typically not covered. Some licensed naturopathic doctors in Colorado may bill Medicaid for covered services. Contact the specific practice to confirm what they can bill.',
      },
    },
  ],
}

export default async function DenverCOPage() {
  const listings = await getListingsByCity('CO', 'Denver').catch(() => [])

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-slate-400">
        <Link href="/" className="hover:text-teal-700">Home</Link>
        <span>/</span>
        <Link href="/listings" className="hover:text-teal-700">Functional Medicine Doctors</Link>
        <span>/</span>
        <span className="text-slate-600 font-medium">Denver, CO</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Find a Functional Medicine Doctor in Denver, CO
        </h1>
        <p className="text-slate-500 max-w-2xl leading-relaxed">
          Denver{"'"}s outdoor lifestyle and health-forward culture make it one of the fastest-growing
          markets for functional and integrative medicine in the Mountain West. From hormone
          optimization and gut health to autoimmune conditions and longevity medicine, Denver{"'"}s
          functional medicine practitioners offer deep expertise across the spectrum of root cause care.
        </p>
      </div>

      {/* Listing grid */}
      {listings.length === 0 ? (
        <div className="card p-12 text-center mb-10">
          <p className="text-slate-500 text-lg mb-2">
            No listings yet for Denver, CO — but new practitioners are added weekly.
          </p>
          <p className="text-slate-400 text-sm">
            Are you a functional medicine practitioner in Denver?{' '}
            <Link href="/submit" className="text-teal-600 hover:text-teal-800 font-medium">
              Add your free listing
            </Link>
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-slate-500 mb-6">
            {listings.length} practitioner{listings.length !== 1 ? 's' : ''} found in Denver, CO
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </>
      )}

      {/* FAQ */}
      <section className="mb-10 border-t border-cream-300 pt-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Frequently Asked Questions About Functional Medicine in Denver
        </h2>
        <div className="space-y-6 max-w-3xl">
          {faqSchema.mainEntity.map((item) => (
            <div key={item.name} className="border-b border-cream-300 pb-6 last:border-0">
              <h3 className="font-semibold text-slate-800 mb-2">{item.name}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related links */}
      <section className="mb-10 bg-slate-50 rounded-xl p-6 max-w-3xl">
        <h2 className="text-lg font-semibold text-slate-800 mb-3">Explore More</h2>
        <ul className="space-y-2">
          <li>
            <Link href="/functional-medicine-doctors/austin-tx" className="text-teal-700 hover:text-teal-900 text-sm font-medium">
              Functional Medicine Doctors in Austin, TX →
            </Link>
          </li>
          <li>
            <Link href="/guides/what-is-functional-medicine" className="text-teal-700 hover:text-teal-900 text-sm font-medium">
              What Is Functional Medicine? A Complete Guide →
            </Link>
          </li>
          <li>
            <Link href="/guides/how-to-find-a-functional-medicine-doctor" className="text-teal-700 hover:text-teal-900 text-sm font-medium">
              How to Find a Functional Medicine Doctor →
            </Link>
          </li>
        </ul>
      </section>

      {/* CTA */}
      <div className="rounded-xl bg-teal-900 text-white p-8 text-center max-w-3xl">
        <h2 className="text-2xl font-bold mb-3">Not finding what you need in Denver?</h2>
        <p className="text-teal-200 mb-6 text-sm leading-relaxed">
          Search our full directory by specialty, insurance, and telehealth availability — or
          submit your practice if you{"'"}re a Denver functional medicine practitioner.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/listings"
            className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Browse All Listings
          </Link>
          <Link
            href="/submit"
            className="inline-flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Submit Your Practice — Free
          </Link>
        </div>
      </div>
    </div>
  )
}
