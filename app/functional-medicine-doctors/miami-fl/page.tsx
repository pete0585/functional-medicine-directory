import type { Metadata } from 'next'
import Link from 'next/link'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Functional Medicine Doctors in Miami, FL | FunctionalMDDirectory.com',
  description:
    'Find functional medicine doctors in Miami, FL. Browse IFM-certified physicians, integrative specialists, and root-cause medicine practitioners serving Miami, Boca Raton, Fort Lauderdale, and South Florida.',
}

export const revalidate = 86400

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do Miami functional medicine doctors accept insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Some Miami functional medicine MDs accept insurance for standard office visits. Advanced functional testing — DUTCH hormones, comprehensive gut panels, micronutrient analysis — is almost always out of pocket. Miami\'s premium wellness market includes many cash-pay concierge practices in Brickell, Coconut Grove, and Coral Gables. If cost is a concern, ask about payment plans or a more focused initial evaluation to prioritize which tests are most critical.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there naturopathic doctors in Miami?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Florida does not have a naturopathic licensure law. Licensed NDs cannot practice primary care in Florida. Miami\'s root-cause medicine market is served by IFM-certified MDs and DOs, some integrative nurse practitioners, and practitioners from adjacent disciplines (functional nutrition, integrative health coaching). If you specifically want an ND, telehealth access to out-of-state licensed NDs is an option.',
      },
    },
    {
      '@type': 'Question',
      name: 'What conditions do Miami functional medicine doctors commonly treat?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Common presentations in Miami functional medicine include: chronic fatigue, mold and mycotoxin illness (high humidity makes mold exposure common in South Florida), thyroid dysfunction, hormonal imbalances (perimenopause, testosterone), gut dysbiosis and IBS, autoimmune conditions, Lyme disease, weight management, and longevity optimization. Miami\'s international patient population also presents diverse dietary patterns and environmental exposures.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a difference between functional medicine and concierge medicine in Miami?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Concierge medicine in Miami typically means a direct-pay primary care relationship with enhanced access (same-day appointments, direct physician contact). Functional medicine adds a root-cause, systems-based diagnostic approach — comprehensive testing, longer appointments, and treatment targeting underlying imbalances rather than just symptom management. Some Miami practices combine both: concierge access plus functional methodology. These hybrid practices are common in high-income Miami neighborhoods.',
      },
    },
  ],
}

export default async function MiamiFl_FMPage() {
  const listings = await getListingsByCity('FL', 'Miami').catch(() => [])

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
        <Link href="/listings?state=FL" className="hover:text-teal-700">Florida</Link>
        <span>/</span>
        <span className="text-slate-600 font-medium">Miami, FL</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Find a Functional Medicine Doctor in Miami, FL
        </h1>
        <p className="text-slate-500 max-w-2xl leading-relaxed">
          Miami's functional medicine market is one of the fastest-growing in the Southeast. The city's international, high-income population, strong health culture, and year-round outdoor lifestyle have driven rapid expansion of integrative and root-cause medicine practices. Brickell, Coral Gables, and Aventura have notable concentrations of functional and longevity medicine practices. Florida does not license NDs, so Miami's market is primarily IFM-certified MDs, DOs, and integrative nurse practitioners.
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
          <p className="text-slate-500 mb-4">Browse all Florida functional medicine doctors.</p>
          <Link
            href="/listings?state=FL"
            className="inline-flex items-center gap-2 bg-teal-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-teal-700"
          >
            Search Florida Providers &#x2192;
          </Link>
        </div>
      )}

      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Functional Medicine in Miami: Common Questions
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
          <Link href="/listings?state=FL" className="text-sm text-teal-600 hover:opacity-80 font-medium">All Florida Providers &#x2192;</Link>
          <Link href="/guides/what-is-functional-medicine" className="text-sm text-teal-600 hover:opacity-80 font-medium">What Is Functional Medicine? &#x2192;</Link>
          <Link href="/guides/functional-medicine-first-appointment" className="text-sm text-teal-600 hover:opacity-80 font-medium">What to Expect at Your First Visit &#x2192;</Link>
          <Link href="/submit" className="text-sm text-teal-600 hover:opacity-80 font-medium">Add Your Practice &#x2192;</Link>
        </div>
      </div>
    </div>
  )
}
