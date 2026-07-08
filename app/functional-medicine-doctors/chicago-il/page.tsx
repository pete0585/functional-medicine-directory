import type { Metadata } from 'next'
import Link from 'next/link'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Functional Medicine Doctors in Chicago, IL | FunctionalMDDirectory.com',
  description:
    'Find functional medicine doctors in Chicago, IL. Browse IFM-certified physicians and integrative specialists serving Chicago and the greater Midwest metro.',
}

export const revalidate = 86400

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do Chicago functional medicine doctors accept insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Some do. Chicago has a mix of insurance-accepting functional medicine MDs (typically billing for standard office visits) and cash-pay concierge practices. Advanced testing like comprehensive stool analysis, DUTCH hormone panels, and micronutrient testing is almost always out of pocket regardless of practice type. Illinois does not license Naturopathic Doctors, so Chicago\'s functional medicine market is primarily IFM-certified MDs and DOs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there naturopathic doctors in Chicago?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Illinois does not have a naturopathic licensure law, meaning NDs cannot practice as licensed primary care providers in Chicago. The functional medicine market is served primarily by IFM-certified MDs, DOs, and some nurse practitioners practicing integrative medicine. If you are specifically seeking an ND, you may need to travel to Indiana, Minnesota, or another licensed state.',
      },
    },
    {
      '@type': 'Question',
      name: 'What conditions do Chicago functional medicine doctors commonly treat?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Chicago functional medicine practitioners commonly see patients with: chronic fatigue, gut disorders (IBS, SIBO, IBD), thyroid conditions (Hashimoto\'s is common), hormonal imbalances, autoimmune disease, ADHD, anxiety and depression, and metabolic dysfunction. The city\'s long winters and limited sunlight also make vitamin D deficiency and seasonal affective disorder common presentations.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should I expect at a Chicago functional medicine appointment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Expect an extended initial consultation — typically 60–90 minutes — covering full medical history, lifestyle, nutrition, sleep, stress, and environmental factors. Comprehensive lab work will likely be ordered, often beyond what your PCP runs. At follow-up, your practitioner will develop a personalized plan addressing root causes with targeted interventions. Most Chicago functional medicine practices offer a hybrid model with some in-person and some telehealth visits.',
      },
    },
  ],
}

export default async function ChicagoIlFMPage() {
  const listings = await getListingsByCity('IL', 'Chicago').catch(() => [])

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
        <Link href="/listings?state=IL" className="hover:text-teal-700">Illinois</Link>
        <span>/</span>
        <span className="text-slate-600 font-medium">Chicago, IL</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Find a Functional Medicine Doctor in Chicago, IL
        </h1>
        <p className="text-slate-500 max-w-2xl leading-relaxed">
          Chicago has a well-developed functional and integrative medicine community, anchored by its strong academic medical tradition (Northwestern, University of Chicago, Rush) and a growing private practice ecosystem. The city's large, health-conscious professional population supports a diverse range of functional medicine approaches, from IFM-certified MDs to concierge longevity practices in the River North and Lincoln Park neighborhoods.
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
          <p className="text-slate-500 mb-4">Browse all Illinois functional medicine doctors.</p>
          <Link
            href="/listings?state=IL"
            className="inline-flex items-center gap-2 bg-teal-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-teal-700"
          >
            Search Illinois Providers &#x2192;
          </Link>
        </div>
      )}

      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Functional Medicine in Chicago: Common Questions
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
          <Link href="/listings?state=IL" className="text-sm text-teal-600 hover:opacity-80 font-medium">All Illinois Providers &#x2192;</Link>
          <Link href="/guides/what-is-functional-medicine" className="text-sm text-teal-600 hover:opacity-80 font-medium">What Is Functional Medicine? &#x2192;</Link>
          <Link href="/guides/functional-medicine-first-appointment" className="text-sm text-teal-600 hover:opacity-80 font-medium">What to Expect at Your First Visit &#x2192;</Link>
          <Link href="/submit" className="text-sm text-teal-600 hover:opacity-80 font-medium">Add Your Practice &#x2192;</Link>
        </div>
      </div>
    </div>
  )
}
