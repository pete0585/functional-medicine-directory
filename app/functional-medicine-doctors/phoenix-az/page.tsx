import type { Metadata } from 'next'
import Link from 'next/link'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Functional Medicine Doctors in Phoenix, AZ | FunctionalMDDirectory.com',
  description:
    'Find functional medicine doctors in Phoenix, AZ. Browse IFM-certified physicians and integrative practitioners serving Phoenix, Scottsdale, Tempe, and the greater Valley of the Sun.',
}

export const revalidate = 86400

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do Arizona licensed NDs practice functional medicine in Phoenix?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Arizona licenses Naturopathic Doctors with one of the broadest scopes of practice in the country — NDs in Arizona can prescribe pharmaceutical medications, hormones, and perform minor procedures. Many Arizona NDs practice root-cause medicine that overlaps substantially with IFM methodology. Scottsdale has a particularly strong ND community alongside IFM-certified MDs. Look for board certification (DHANP) or IFM membership when evaluating any practitioner.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should I expect at a Phoenix functional medicine appointment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Initial appointments are 60–90 minutes, covering a detailed health history, lifestyle assessment, and discussion of symptoms and goals. Comprehensive lab work is typically ordered — going well beyond a standard panel to include hormone metabolites, micronutrients, gut markers, heavy metals, and inflammatory markers as relevant to your case. Follow-up appointments review results and build an individualized protocol combining dietary, supplement, and pharmaceutical interventions.',
      },
    },
    {
      '@type': 'Question',
      name: 'What conditions do Phoenix functional medicine doctors commonly treat?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Common presentations in Phoenix functional medicine include: thyroid dysfunction (Hashimoto\'s, hypothyroidism), hormonal imbalances (perimenopause, low testosterone), mold and mycotoxin illness (Phoenix has high rates of Valley Fever and mold exposure during monsoon season), chronic fatigue, gut disorders, autoimmune conditions, metabolic dysfunction, and longevity optimization. The high UV environment also makes vitamin D toxicity (from over-supplementation) an occasional counterintuitive presentation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Scottsdale a better option than Phoenix for functional medicine?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Scottsdale has a higher density of functional and longevity medicine practices than central Phoenix. The Scottsdale Quarter, Old Town Scottsdale, and the North Scottsdale corridor have numerous IFM practices, longevity clinics, and high-end integrative medicine centers. If you live in the East Valley or North Valley, Scottsdale may be more convenient. Central and West Phoenix have functional medicine options too — search this directory by zip code to find the closest qualified practitioners.',
      },
    },
  ],
}

export default async function PhoenixAzFMPage() {
  const listings = await getListingsByCity('AZ', 'Phoenix').catch(() => [])

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <nav className="mb-6 flex items-center gap-2 text-sm text-slate-400">
        <Link href="/" className="hover:text-teal-700">Home</Link>
        <span>/</span>
        <Link href="/listings" className="hover:text-teal-700">Functional Medicine Doctors</Link>
        <span>/</span>
        <Link href="/listings?state=AZ" className="hover:text-teal-700">Arizona</Link>
        <span>/</span>
        <span className="text-slate-600 font-medium">Phoenix, AZ</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Find a Functional Medicine Doctor in Phoenix, AZ
        </h1>
        <p className="text-slate-500 max-w-2xl leading-relaxed">
          Phoenix and Scottsdale have emerged as major centers for functional and longevity medicine in the Southwest. The Valley's retirement and snowbird community, combined with a growing permanent population of health-conscious professionals, has made it one of the most competitive integrative medicine markets in the country. Scottsdale in particular has a dense concentration of high-end functional medicine and longevity practices. Arizona licenses Naturopathic Doctors with broad prescribing authority, expanding the practitioner pool.
        </p>
      </div>

      {listings.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="bg-slate-50 rounded-2xl border border-slate-100 p-12 text-center mb-12">
          <p className="text-slate-500 mb-4">Browse all Arizona functional medicine doctors.</p>
          <Link
            href="/listings?state=AZ"
            className="inline-flex items-center gap-2 bg-teal-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-teal-700"
          >
            Search Arizona Providers &#x2192;
          </Link>
        </div>
      )}

      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Functional Medicine in Phoenix: Common Questions
        </h2>
        {faqSchema.mainEntity.map((faq) => (
          <div key={faq.name} className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm">
            <h3 className="font-semibold text-slate-800 mb-2">{faq.name}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{faq.acceptedAnswer.text}</p>
          </div>
        ))}
      </section>

      <div className="pt-6 border-t border-slate-100">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Related Resources</h3>
        <div className="flex flex-wrap gap-3">
          <Link href="/listings?state=AZ" className="text-sm text-teal-600 hover:opacity-80 font-medium">All Arizona Providers &#x2192;</Link>
          <Link href="/guides/what-is-functional-medicine" className="text-sm text-teal-600 hover:opacity-80 font-medium">What Is Functional Medicine? &#x2192;</Link>
          <Link href="/guides/functional-medicine-first-appointment" className="text-sm text-teal-600 hover:opacity-80 font-medium">What to Expect at Your First Visit &#x2192;</Link>
          <Link href="/submit" className="text-sm text-teal-600 hover:opacity-80 font-medium">Add Your Practice &#x2192;</Link>
        </div>
      </div>
    </div>
  )
}
