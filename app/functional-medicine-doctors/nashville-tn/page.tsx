import type { Metadata } from 'next'
import Link from 'next/link'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Functional Medicine Doctors in Nashville, TN | FunctionalMDDirectory.com',
  description:
    'Find top functional medicine doctors in Nashville, TN. Browse IFM-certified physicians and integrative specialists in Nashville, Brentwood, and Franklin — serving Middle Tennessee.',
}

export const revalidate = 86400

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does Vanderbilt University Medical Center offer functional or integrative medicine in Nashville?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Vanderbilt University Medical Center offers integrative medicine consultation through its Osher Center for Integrative Health at Vanderbilt. This program provides evidence-based integrative therapies alongside conventional care. For root-cause functional medicine with advanced lab testing and personalized protocols, many Nashville patients seek IFM-certified physicians in private or concierge practices in Nashville, Brentwood, or Franklin.",
      },
    },
    {
      '@type': 'Question',
      name: 'What conditions do functional medicine doctors in Nashville commonly treat?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Nashville functional medicine practitioners frequently treat chronic fatigue, Hashimoto's thyroiditis, gut disorders (IBS, SIBO, leaky gut), hormonal imbalances, autoimmune conditions, weight issues resistant to conventional treatment, and anxiety/depression with metabolic root causes. The city's growing wellness culture and entrepreneurial community also drive demand for executive health and longevity programs.",
      },
    },
    {
      '@type': 'Question',
      name: 'Are there functional medicine doctors in Brentwood and Franklin near Nashville?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The suburban communities south of Nashville — Brentwood, Franklin, Cool Springs, and Nolensville — have a growing cluster of independent functional and integrative medicine practices. Many serve families relocating to Middle Tennessee and professionals seeking concierge-style primary care with a root-cause approach.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does insurance cover functional medicine visits in Nashville?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Coverage depends on the practice model. Some Nashville functional medicine doctors are in-network with BlueCross BlueShield of Tennessee, Cigna, and Aetna for standard evaluation and management visits. Advanced testing — comprehensive metabolic panels, gut microbiome analysis, DUTCH hormone tests — is typically billed out of pocket. Many Nashville FM practices operate on a cash-pay or direct primary care (DPC) membership model to allow longer appointment times.",
      },
    },
  ],
}

export default async function NashvilleTNPage() {
  const listings = await getListingsByCity('TN', 'Nashville').catch(() => [])

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
        <span className="text-slate-600 font-medium">Nashville, TN</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Find a Functional Medicine Doctor in Nashville, TN
        </h1>
        <p className="text-slate-500 max-w-2xl leading-relaxed">
          Nashville is a national healthcare hub — home to HCA Healthcare headquarters and Vanderbilt University
          Medical Center — and its wellness culture has grown alongside its booming population. Independent
          functional medicine practices have multiplied across the city and its southern suburbs (Brentwood,
          Franklin), offering root-cause care for chronic conditions, hormonal health, and longevity.
        </p>
      </div>

      {/* Listing grid */}
      {listings.length === 0 ? (
        <div className="card p-12 text-center mb-10">
          <p className="text-slate-500 text-lg mb-2">
            No listings yet for Nashville, TN — but new practitioners are added weekly.
          </p>
          <p className="text-slate-400 text-sm">
            Are you a functional medicine practitioner in Nashville?{' '}
            <Link href="/submit" className="text-teal-600 hover:text-teal-800 font-medium">
              Add your free listing
            </Link>
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-slate-500 mb-6">
            {listings.length} practitioner{listings.length !== 1 ? 's' : ''} found in Nashville, TN
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
          Frequently Asked Questions About Functional Medicine in Nashville
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
            <Link href="/functional-medicine-doctors/denver-co" className="text-teal-700 hover:text-teal-900 text-sm font-medium">
              Functional Medicine Doctors in Denver, CO →
            </Link>
          </li>
          <li>
            <Link href="/guides/does-insurance-cover-functional-medicine" className="text-teal-700 hover:text-teal-900 text-sm font-medium">
              Does Insurance Cover Functional Medicine? →
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
        <h2 className="text-2xl font-bold mb-3">Not finding what you need in Nashville?</h2>
        <p className="text-teal-200 mb-6 text-sm leading-relaxed">
          Search our full directory by specialty, insurance, and telehealth availability — or
          submit your practice if you&apos;re a Nashville functional medicine practitioner.
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
