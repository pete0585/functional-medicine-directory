import type { Metadata } from 'next'
import Link from 'next/link'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Functional Medicine Doctors in Los Angeles, CA | FunctionalMDDirectory.com',
  description:
    'Find functional medicine doctors in Los Angeles, CA. Browse IFM-certified physicians, licensed naturopathic doctors, and integrative specialists serving LA, Santa Monica, Beverly Hills, and the greater Southern California metro.',
}

export const revalidate = 86400

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do LA functional medicine doctors accept insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Insurance acceptance varies widely. MDs and DOs may bill insurance for standard office visits, but advanced testing (DUTCH hormones, comprehensive stool analysis, micronutrient panels) is usually out of pocket. California-licensed NDs are covered by some plans for primary care services. Cash-pay concierge functional medicine is common in Beverly Hills, Boca Park, and other high-income LA neighborhoods.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a naturopathic doctor (ND) and how does it differ from a functional medicine MD in California?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'California licenses Naturopathic Doctors (NDs) with prescribing authority including pharmaceutical medications, hormones, and IV therapy. Many CA NDs practice root-cause medicine that functionally overlaps with IFM methodology. Functional medicine MDs/DOs add IFM training to their conventional medical degrees. Both approaches can be excellent — evaluate the individual clinician, their focus areas, and how they conduct testing and follow-up.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does a functional medicine evaluation look like in Los Angeles?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most LA functional medicine practitioners begin with an extended intake (60–90 minutes) focused on full health history, lifestyle, sleep, stress, gut health, hormones, and environmental exposures. This is followed by comprehensive lab work — often going beyond standard panels to include hormone metabolites, organic acids, food sensitivities, heavy metals, and microbiome analysis. Plans are individualized, combining targeted supplements, dietary protocols, and pharmaceutical interventions as needed.',
      },
    },
    {
      '@type': 'Question',
      name: 'What conditions do LA functional medicine doctors commonly treat?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Los Angeles functional medicine practitioners commonly address: chronic fatigue and burnout (very common in LA\'s entertainment and media industries), gut dysbiosis and IBS, hormonal imbalances (perimenopause, thyroid, testosterone), autoimmune conditions, mold/mycotoxin illness, anxiety and sleep disorders, weight management, and longevity optimization. The city\'s wellness culture also drives demand for preventive, performance-oriented care.',
      },
    },
  ],
}

export default async function LosAngelesCaFMPage() {
  const listings = await getListingsByCity('CA', 'Los Angeles').catch(() => [])

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
        <Link href="/listings?state=CA" className="hover:text-teal-700">CA</Link>
        <span>/</span>
        <span className="text-slate-600 font-medium">Los Angeles, CA</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Find a Functional Medicine Doctor in Los Angeles, CA
        </h1>
        <p className="text-slate-500 max-w-2xl leading-relaxed">
          Los Angeles has one of the largest functional and integrative medicine markets in the country. California licenses Naturopathic Doctors (NDs) with broad prescribing authority, meaning many LA root-cause practitioners are NDs — alongside IFM-certified MDs and DOs in both private concierge practices and wellness centers. The entertainment, fashion, and tech industries drive strong demand for longevity optimization and performance medicine.
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
          <p className="text-slate-500 mb-4">Browse all CA functional medicine doctors.</p>
          <Link
            href="/listings?state=CA"
            className="inline-flex items-center gap-2 bg-teal-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-teal-700"
          >
            Search CA Providers &#x2192;
          </Link>
        </div>
      )}

      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Functional Medicine in Los Angeles: Common Questions
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
          <Link href="/listings?state=CA" className="text-sm text-teal-600 hover:opacity-80 font-medium">All CA Providers &#x2192;</Link>
          <Link href="/guides/what-is-functional-medicine" className="text-sm text-teal-600 hover:opacity-80 font-medium">What Is Functional Medicine? &#x2192;</Link>
          <Link href="/guides/functional-medicine-first-appointment" className="text-sm text-teal-600 hover:opacity-80 font-medium">What to Expect at Your First Visit &#x2192;</Link>
          <Link href="/submit" className="text-sm text-teal-600 hover:opacity-80 font-medium">Add Your Practice &#x2192;</Link>
        </div>
      </div>
    </div>
  )
}
