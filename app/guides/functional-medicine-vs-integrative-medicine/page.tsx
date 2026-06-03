import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Functional Medicine vs. Integrative Medicine: What\'s the Difference? | FunctionalMDDirectory.com',
  description:
    'Understand the key differences between functional medicine and integrative medicine — what they share, where they diverge, and how to choose the right approach for your health goals.',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is functional medicine the same as integrative medicine?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, though there is significant overlap. Functional medicine is a specific methodology that uses systems biology and advanced testing to find root causes of disease. Integrative medicine is a broader philosophical approach that combines conventional medicine with complementary therapies. Many practitioners practice elements of both.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which is better: functional medicine or integrative medicine?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Neither is universally better — it depends on your health goals. If you want deep biochemical investigation with advanced lab work to uncover root causes, functional medicine is the stronger fit. If you want a blend of conventional care with acupuncture, mind-body medicine, or other complementary approaches, integrative medicine may serve you better.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do functional medicine and integrative medicine doctors take insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Both types of practices vary widely in their insurance acceptance. Standard office visits may be covered, but advanced functional testing, nutritional counseling, and many complementary therapies are often out-of-pocket. Always verify with the specific practice before booking.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a doctor practice both functional and integrative medicine?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, and many do. A physician might use functional medicine\'s root-cause framework and advanced testing while also incorporating integrative approaches like acupuncture referrals, mindfulness-based stress reduction, or herbal medicine. The two approaches are complementary rather than mutually exclusive.',
      },
    },
  ],
}

const comparisonRows = [
  {
    aspect: 'Core philosophy',
    functional: 'Root cause investigation using systems biology',
    integrative: 'Whole-person care combining conventional + complementary',
  },
  {
    aspect: 'Primary tool',
    functional: 'Advanced lab testing and biomarker analysis',
    integrative: 'Therapeutic relationship and multi-modality treatment',
  },
  {
    aspect: 'Training credential',
    functional: 'IFMCP (IFM), A4M/FAARM, board exams',
    integrative: 'ABIHM, Andrew Weil Integrative Medicine fellowship, others',
  },
  {
    aspect: 'Complementary therapies',
    functional: 'Less emphasis; focus on nutrition, supplements, lifestyle',
    integrative: 'Often includes acupuncture, massage, mind-body medicine',
  },
  {
    aspect: 'Best for',
    functional: 'Chronic, complex, or difficult-to-diagnose conditions',
    integrative: 'Whole-person wellness, cancer support, pain, stress',
  },
  {
    aspect: 'Cost model',
    functional: 'Often cash-pay or membership; extensive lab work',
    integrative: 'Mix of insurance and out-of-pocket; varies by modality',
  },
]

export default function FMvsIMPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-slate-400">
        <Link href="/" className="hover:text-teal-700">Home</Link>
        <span>/</span>
        <Link href="/guides" className="hover:text-teal-700">Guides</Link>
        <span>/</span>
        <span className="text-slate-600 font-medium">Functional Medicine vs. Integrative Medicine</span>
      </nav>

      <article>
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900 leading-tight mb-4">
            Functional Medicine vs. Integrative Medicine: What{"'"}s the Difference?
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            The terms "functional medicine" and "integrative medicine" are often used
            interchangeably — sometimes even by practitioners themselves. But they are distinct
            approaches with different emphases, tools, and training paths. Here is a clear
            breakdown of how they compare.
          </p>
        </header>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">What They Have in Common</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Both functional medicine and integrative medicine reject the narrow symptom-treatment
            model of conventional care. They share several core commitments:
          </p>
          <ul className="space-y-3 mb-4">
            {[
              'Treating the whole person — not just isolated symptoms or a single organ',
              'Addressing lifestyle factors: nutrition, sleep, stress, movement, and relationships',
              'A strong therapeutic relationship with extended appointment time',
              'Prevention and optimization, not just disease management',
              'Evidence-informed use of nutrition, supplementation, and mind-body practices',
            ].map((point) => (
              <li key={point} className="flex items-start gap-2 text-slate-600 text-sm">
                <span className="text-teal-600 mt-0.5">✓</span>
                {point}
              </li>
            ))}
          </ul>
          <p className="text-slate-600 leading-relaxed">
            Both approaches also require practitioners to think more deeply about each patient{"'"}s
            unique context rather than applying standardized protocols.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Where They Differ</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            The differences become clearer when you look at methodology, training, and the types
            of problems each approach is best suited for.
          </p>

          {/* Comparison table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200 mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-4 py-3 text-slate-500 font-medium w-1/4">Aspect</th>
                  <th className="text-left px-4 py-3 text-teal-700 font-semibold w-3/8">Functional Medicine</th>
                  <th className="text-left px-4 py-3 text-amber-700 font-semibold w-3/8">Integrative Medicine</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.aspect} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-4 py-3 text-slate-500 font-medium border-b border-slate-100">{row.aspect}</td>
                    <td className="px-4 py-3 text-slate-600 border-b border-slate-100">{row.functional}</td>
                    <td className="px-4 py-3 text-slate-600 border-b border-slate-100">{row.integrative}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-slate-600 leading-relaxed">
            Functional medicine{"'"}s defining feature is its emphasis on <em>why</em> — using
            advanced testing and systems biology to identify what has gone wrong at a biological
            level. Integrative medicine casts a wider net, incorporating therapies like
            acupuncture, massage, yoga, and herbal medicine alongside conventional treatment.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Which One Is Right for You?</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            The right choice depends on what you{"'"}re dealing with and what you{"'"}re looking for.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-teal-50 border border-teal-200 rounded-xl p-5">
              <h3 className="font-bold text-teal-800 mb-3">Choose Functional Medicine if:</h3>
              <ul className="space-y-2">
                {[
                  'You have a complex or hard-to-diagnose chronic condition',
                  'You want deep lab investigation and biomarker analysis',
                  'You\'ve been dismissed by conventional medicine',
                  'You suspect a hormonal, gut, or autoimmune root cause',
                ].map((pt) => (
                  <li key={pt} className="text-teal-700 text-sm flex items-start gap-1.5">
                    <span className="mt-0.5">→</span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <h3 className="font-bold text-amber-800 mb-3">Choose Integrative Medicine if:</h3>
              <ul className="space-y-2">
                {[
                  'You want conventional care plus complementary therapies',
                  'You\'re managing cancer, chronic pain, or stress',
                  'You value mind-body approaches like meditation or acupuncture',
                  'You want a holistic philosophy without the heavy lab focus',
                ].map((pt) => (
                  <li key={pt} className="text-amber-700 text-sm flex items-start gap-1.5">
                    <span className="mt-0.5">→</span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Many patients benefit from both. A functional medicine doctor might handle your root
            cause investigation and biochemical optimization while an integrative practitioner
            addresses pain management, stress reduction, or lifestyle support alongside your
            conventional care team.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqSchema.mainEntity.map((item) => (
              <div key={item.name} className="border-b border-cream-300 pb-6 last:border-0">
                <h3 className="font-semibold text-slate-800 mb-2">{item.name}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal links */}
        <section className="mb-10 bg-slate-50 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-3">Related Guides</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/guides/what-is-functional-medicine" className="text-teal-700 hover:text-teal-900 text-sm font-medium">
                What Is Functional Medicine? A Complete Guide →
              </Link>
            </li>
            <li>
              <Link href="/guides/how-to-find-a-functional-medicine-doctor" className="text-teal-700 hover:text-teal-900 text-sm font-medium">
                How to Find a Functional Medicine Doctor Near You →
              </Link>
            </li>
            <li>
              <Link href="/categories/integrative-medicine" className="text-teal-700 hover:text-teal-900 text-sm font-medium">
                Browse Integrative Medicine Practitioners →
              </Link>
            </li>
          </ul>
        </section>

        {/* CTA */}
        <div className="rounded-xl bg-teal-900 text-white p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Find the Right Practitioner for You</h2>
          <p className="text-teal-200 mb-6 text-sm leading-relaxed max-w-lg mx-auto">
            Browse our directory of functional and integrative medicine practitioners — filtered
            by specialty, location, telehealth availability, and IFM certification.
          </p>
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Browse the Directory →
          </Link>
        </div>
      </article>
    </div>
  )
}
