import type { Metadata } from 'next'
import Link from 'next/link'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Functional Medicine Doctors in Portland, OR | FunctionalMDDirectory.com',
  description:
    'Find top functional medicine doctors in Portland, OR. Portland has one of the highest concentrations of NDs in the US — browse IFM-certified physicians, licensed naturopathic doctors, and OHSU-area integrative specialists.',
}

export const revalidate = 86400

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why does Portland have so many naturopathic doctors?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Portland is home to the National University of Natural Medicine (NUNM), the oldest accredited naturopathic medical school in North America. NUNM graduates hundreds of NDs who often establish practices in the Portland metro. Oregon licenses NDs with full prescriptive authority including pharmaceutical medications, making Portland NDs among the most clinically expansive root-cause practitioners in the country.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does OHSU have a functional or integrative medicine program?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oregon Health & Science University (OHSU) offers integrative medicine services through its academic medical center, with acupuncture, nutrition counseling, and mind-body medicine available alongside conventional care. For strict functional medicine with comprehensive lab panels and systems-based protocols, many Portland patients see IFM-certified MDs or licensed NDs in independent or group practices throughout the metro area.",
      },
    },
    {
      '@type': 'Question',
      name: 'Are licensed NDs covered by insurance in Oregon?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oregon requires many health insurance plans to cover naturopathic doctor visits at parity with other primary care physicians. Most major insurers — including Providence Health Plan, PacificSource, and OHP (Oregon Health Plan for Medicaid recipients) — include ND coverage. Check your specific plan, as self-insured ERISA employer plans are exempt from Oregon's ND coverage mandate.",
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between a Portland ND and a functional medicine MD?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "A Portland licensed Naturopathic Doctor (ND) holds a 4-year naturopathic medicine degree from an accredited program like NUNM and is licensed to prescribe medications, order labs, and provide primary care in Oregon. A functional medicine MD/DO has a conventional medical degree with additional IFM training. Both can practice root-cause medicine effectively — the ND path emphasizes botanical medicine, nutrition, and lifestyle alongside pharmaceutical tools; the FM MD path adds conventional diagnostic capabilities with a functional lens.",
      },
    },
  ],
}

export default async function PortlandORPage() {
  const listings = await getListingsByCity('OR', 'Portland').catch(() => [])

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
        <span className="text-slate-600 font-medium">Portland, OR</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Find a Functional Medicine Doctor in Portland, OR
        </h1>
        <p className="text-slate-500 max-w-2xl leading-relaxed">
          Portland has one of the highest concentrations of naturopathic doctors and root-cause practitioners
          anywhere in the US. The National University of Natural Medicine (NUNM) — the oldest accredited
          naturopathic school in North America — is based here, and Oregon licenses NDs with full prescriptive
          authority. Whether you prefer an IFM-certified MD or a licensed ND, Portland offers exceptional
          functional medicine coverage.
        </p>
      </div>

      {/* Listing grid */}
      {listings.length === 0 ? (
        <div className="card p-12 text-center mb-10">
          <p className="text-slate-500 text-lg mb-2">
            No listings yet for Portland, OR — but new practitioners are added weekly.
          </p>
          <p className="text-slate-400 text-sm">
            Are you a functional medicine practitioner in Portland?{' '}
            <Link href="/submit" className="text-teal-600 hover:text-teal-800 font-medium">
              Add your free listing
            </Link>
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-slate-500 mb-6">
            {listings.length} practitioner{listings.length !== 1 ? 's' : ''} found in Portland, OR
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
          Frequently Asked Questions About Functional Medicine in Portland
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
            <Link href="/functional-medicine-doctors/seattle-wa" className="text-teal-700 hover:text-teal-900 text-sm font-medium">
              Functional Medicine Doctors in Seattle, WA →
            </Link>
          </li>
          <li>
            <Link href="/functional-medicine-doctors/denver-co" className="text-teal-700 hover:text-teal-900 text-sm font-medium">
              Functional Medicine Doctors in Denver, CO →
            </Link>
          </li>
          <li>
            <Link href="/guides/what-is-functional-medicine" className="text-teal-700 hover:text-teal-900 text-sm font-medium">
              What Is Functional Medicine? →
            </Link>
          </li>
          <li>
            <Link href="/guides/functional-medicine-vs-integrative-medicine" className="text-teal-700 hover:text-teal-900 text-sm font-medium">
              Functional Medicine vs. Integrative Medicine →
            </Link>
          </li>
        </ul>
      </section>

      {/* CTA */}
      <div className="rounded-xl bg-teal-900 text-white p-8 text-center max-w-3xl">
        <h2 className="text-2xl font-bold mb-3">Not finding what you need in Portland?</h2>
        <p className="text-teal-200 mb-6 text-sm leading-relaxed">
          Search our full directory by specialty, insurance, and telehealth availability — or
          submit your practice if you&apos;re a Portland functional medicine practitioner.
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
