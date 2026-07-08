import type { Metadata } from 'next'
import Link from 'next/link'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Functional Medicine Doctors in New York, NY | FunctionalMDDirectory.com',
  description:
    'Find functional medicine doctors in New York, NY. Browse IFM-certified physicians, licensed NDs, and integrative specialists in Manhattan, Brooklyn, and the greater NYC metro.',
}

export const revalidate = 86400

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do New York City functional medicine doctors accept insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Some do — particularly IFM-certified MDs at established practices. However, many top NYC functional medicine practitioners operate as cash-pay concierge practices, reflecting the city\'s premium wellness market. Advanced functional testing is almost never covered by insurance. New York licenses NDs, and some ND practices accept insurance for primary care-level services under New York\'s ND insurance mandate provisions.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between a functional medicine doctor and a naturopathic doctor in New York?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'New York licenses Naturopathic Doctors with limited prescribing authority — different from California\'s broad ND prescribing scope. NYC NDs can prescribe some medications but the scope is more restricted. Functional medicine MDs and DOs hold full prescribing authority. Both apply root-cause, systems-based methodology. Many NYC patients see both, using an ND for nutritional protocols and supplements and an MD for prescriptions and advanced diagnostics.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does functional medicine cost in New York?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NYC functional medicine costs reflect the city\'s premium market. Initial consultations run $500–$1,500 at top concierge practices; more accessible practitioners charge $300–$600. Advanced lab panels (comprehensive hormone, microbiome, heavy metals) add $500–$3,000+. Annual retainer models at high-end concierge practices can run $5,000–$25,000+. For patients on a budget, telehealth functional medicine providers can offer access to quality care at lower price points.',
      },
    },
    {
      '@type': 'Question',
      name: 'What conditions do NYC functional medicine doctors commonly treat?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'New York\'s functional medicine practitioners commonly see: burnout and chronic fatigue (driven by the city\'s high-stress professional culture), gut issues and IBS, thyroid disorders, hormonal imbalances, autoimmune conditions, insomnia, anxiety, ADHD, mold toxicity, Lyme disease (common in the Northeast), and longevity optimization. Many NYC practitioners also specialize in perimenopause and testosterone optimization for high-performing professionals.',
      },
    },
  ],
}

export default async function NewYorkNyFMPage() {
  const listings = await getListingsByCity('NY', 'New York').catch(() => [])

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
        <Link href="/listings?state=NY" className="hover:text-teal-700">New York</Link>
        <span>/</span>
        <span className="text-slate-600 font-medium">New York, NY</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Find a Functional Medicine Doctor in New York, NY
        </h1>
        <p className="text-slate-500 max-w-2xl leading-relaxed">
          New York City has one of the country's most sophisticated functional medicine markets. The city's wealth and health-consciousness support premium concierge functional medicine practices throughout Manhattan, alongside a growing Brooklyn and Queens integrative medicine community. New York licenses Naturopathic Doctors, expanding the range of practitioners available. Many NYC functional medicine doctors serve high-achieving professionals, executives, and creatives seeking optimization alongside diagnosis-specific care.
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
          <p className="text-slate-500 mb-4">Browse all New York functional medicine doctors.</p>
          <Link
            href="/listings?state=NY"
            className="inline-flex items-center gap-2 bg-teal-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-teal-700"
          >
            Search New York Providers &#x2192;
          </Link>
        </div>
      )}

      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Functional Medicine in New York: Common Questions
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
          <Link href="/listings?state=NY" className="text-sm text-teal-600 hover:opacity-80 font-medium">All New York Providers &#x2192;</Link>
          <Link href="/guides/what-is-functional-medicine" className="text-sm text-teal-600 hover:opacity-80 font-medium">What Is Functional Medicine? &#x2192;</Link>
          <Link href="/guides/functional-medicine-first-appointment" className="text-sm text-teal-600 hover:opacity-80 font-medium">What to Expect at Your First Visit &#x2192;</Link>
          <Link href="/submit" className="text-sm text-teal-600 hover:opacity-80 font-medium">Add Your Practice &#x2192;</Link>
        </div>
      </div>
    </div>
  )
}
