import type { Metadata } from 'next'
import Link from 'next/link'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Functional Medicine Doctors in Seattle, WA | FunctionalMDDirectory.com',
  description:
    'Find top functional medicine doctors in Seattle, WA. Browse IFM-certified physicians, licensed naturopathic doctors (NDs), and integrative specialists serving King County and the greater Seattle metro.',
}

export const revalidate = 86400

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do Seattle functional medicine doctors accept insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Insurance acceptance varies by practice type. MDs and DOs practicing functional medicine may bill insurance for standard office visits, but advanced functional testing (comprehensive stool panels, DUTCH hormone tests, micronutrient panels) is usually out of pocket. Licensed Naturopathic Doctors (NDs) in Washington are covered by many state-regulated insurance plans for primary care services — check your plan for ND coverage before your first appointment.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between a functional medicine doctor and a naturopathic doctor in Seattle?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In Washington state, licensed Naturopathic Doctors (NDs) hold a 4-year naturopathic medicine degree (ND) and are licensed with broad prescribing authority including pharmaceutical medications. Many Seattle NDs practice root-cause, systems-based medicine that overlaps significantly with functional medicine. Functional medicine MDs/DOs apply IFM methodology on top of a conventional medical degree. Both approaches can be highly effective — look for the credential and the clinical philosophy rather than the title alone.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does UW Medicine have a functional or integrative medicine program in Seattle?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "UW Medicine offers integrative medicine consultation through its Osher Center for Integrative Health, affiliated with the University of Washington. While this is integrative medicine rather than strict functional medicine, it provides evidence-based complementary care alongside conventional treatment. For root-cause functional medicine with advanced testing, patients typically seek independent IFM-certified physicians or NDs in the King County area.",
      },
    },
    {
      '@type': 'Question',
      name: 'What conditions do functional medicine doctors in Seattle commonly treat?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Seattle's functional medicine practitioners commonly treat chronic fatigue, thyroid disorders (Hashimoto's thyroiditis is particularly prevalent in the Pacific Northwest), gut dysbiosis and IBS, autoimmune conditions, hormonal imbalances, mold/mycotoxin illness, and longevity optimization. The tech-heavy workforce drives demand for cognitive performance and proactive health monitoring.",
      },
    },
  ],
}

export default async function SeattleWAPage() {
  const listings = await getListingsByCity('WA', 'Seattle').catch(() => [])

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
        <span className="text-slate-600 font-medium">Seattle, WA</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Find a Functional Medicine Doctor in Seattle, WA
        </h1>
        <p className="text-slate-500 max-w-2xl leading-relaxed">
          Seattle has one of the strongest integrative and functional medicine ecosystems in the Pacific Northwest.
          Washington state licenses Naturopathic Doctors with broad prescribing authority, meaning many root-cause
          practitioners in King County are licensed NDs — alongside IFM-certified MDs and DOs. Whether you&apos;re
          managing chronic fatigue, thyroid issues, gut health, or pursuing longevity medicine, Seattle has deep
          specialist options.
        </p>
      </div>

      {/* Listing grid */}
      {listings.length === 0 ? (
        <div className="card p-12 text-center mb-10">
          <p className="text-slate-500 text-lg mb-2">
            No listings yet for Seattle, WA — but new practitioners are added weekly.
          </p>
          <p className="text-slate-400 text-sm">
            Are you a functional medicine practitioner in Seattle?{' '}
            <Link href="/submit" className="text-teal-600 hover:text-teal-800 font-medium">
              Add your free listing
            </Link>
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-slate-500 mb-6">
            {listings.length} practitioner{listings.length !== 1 ? 's' : ''} found in Seattle, WA
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
          Frequently Asked Questions About Functional Medicine in Seattle
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
            <Link href="/functional-medicine-doctors/portland-or" className="text-teal-700 hover:text-teal-900 text-sm font-medium">
              Functional Medicine Doctors in Portland, OR →
            </Link>
          </li>
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
            <Link href="/guides/does-insurance-cover-functional-medicine" className="text-teal-700 hover:text-teal-900 text-sm font-medium">
              Does Insurance Cover Functional Medicine? →
            </Link>
          </li>
        </ul>
      </section>

      {/* CTA */}
      <div className="rounded-xl bg-teal-900 text-white p-8 text-center max-w-3xl">
        <h2 className="text-2xl font-bold mb-3">Not finding what you need in Seattle?</h2>
        <p className="text-teal-200 mb-6 text-sm leading-relaxed">
          Search our full directory by specialty, insurance, and telehealth availability — or
          submit your practice if you&apos;re a Seattle functional medicine practitioner.
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
