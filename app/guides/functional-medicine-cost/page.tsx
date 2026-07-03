import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How Much Does Functional Medicine Cost? | FunctionalMDDirectory.com',
  description:
    'Functional medicine typically costs $200–$500 for an initial consultation and $150–$350 for follow-ups, mostly out-of-pocket. Here is what to expect and how to make it more affordable.',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does a functional medicine appointment cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Initial functional medicine consultations typically cost $200–$500 for a 60–90 minute appointment. Follow-up visits run $150–$350 for 30–60 minutes. These are typically out-of-pocket costs at most functional medicine practices, which operate on a cash-pay or membership basis. Practices affiliated with academic medical centers or multi-specialty groups may accept insurance for the visit portion — advanced testing remains mostly out-of-pocket regardless.',
      },
    },
    {
      '@type': 'Question',
      name: 'What do functional medicine labs cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Functional medicine often uses advanced testing beyond standard panels, and most of this testing is not covered by insurance. Costs vary widely by test: comprehensive stool analysis (GI-MAP): $250–$450; DUTCH comprehensive hormone test: $375–$475; organic acids test: $250–$350; comprehensive thyroid panel (beyond TSH): $150–$250 if ordered through a specialty lab; micronutrient panel: $200–$350; heavy metals panel: $150–$300. A typical initial functional medicine workup with advanced testing can run $500–$1,500 beyond the visit cost.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does insurance cover functional medicine?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Most functional medicine practices are cash-pay. However, functional medicine physicians who are licensed MDs or DOs can sometimes bill insurance for the visit portion of their services — the office visit itself, not the advanced testing. Coverage depends on whether the physician has an insurance contract and whether services are coded as a standard E&M visit. Call the practice and your insurance before your first appointment. Many patients find that even when the visit is covered, advanced testing and supplements are not.",
      },
    },
    {
      '@type': 'Question',
      name: 'Are functional medicine supplements included in the cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "No — supplements recommended by functional medicine practitioners are a separate cost. Supplement plans can range from $50 to $300+ per month depending on what is prescribed. This is a legitimate criticism of some functional medicine practices: practitioners who sell supplements in-office have a financial conflict of interest. Ask upfront whether the practice sells supplements and what the expected monthly supplement cost would be. A good practitioner will tell you what supplements to buy and where to get them at the best price — not insist you buy their brand.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is functional medicine worth the cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "For patients with unexplained chronic symptoms, autoimmune conditions, complex hormonal issues, or persistent gut problems that have not responded to conventional care — many say yes. The calculus changes when you consider: years of unresolved symptoms, repeated conventional care visits that did not help, and the economic cost of feeling chronically unwell. For patients with straightforward health needs or conditions well-managed by conventional medicine, the additional cost may not add value.",
      },
    },
  ],
}

export default function FunctionalMedicineCostPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <nav className="mb-6 flex items-center gap-2 text-sm text-slate-400">
        <Link href="/" className="hover:text-teal-700">Home</Link>
        <span>/</span>
        <Link href="/listings" className="hover:text-teal-700">Find a Practitioner</Link>
        <span>/</span>
        <span className="text-slate-600">Functional Medicine Cost</span>
      </nav>
      <h1 className="text-3xl font-bold text-slate-800 mb-4 leading-tight">
        How Much Does Functional Medicine Cost?
      </h1>
      <p className="text-slate-500 text-lg mb-10 leading-relaxed">
        Functional medicine is mostly out-of-pocket. Initial consultations run $200–$500; advanced
        lab testing adds $500–$1,500 more. Here is what to expect and how to make it more affordable.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Cost breakdown</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-teal-700 text-white">
                  <th className="text-left px-4 py-3 font-semibold">Item</th>
                  <th className="text-left px-4 py-3 font-semibold">Typical Cost</th>
                  <th className="text-left px-4 py-3 font-semibold">Insurance Coverage</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { item: 'Initial consultation (60–90 min)', cost: '$200–$500', cov: 'Rarely' },
                  { item: 'Follow-up visit (30–60 min)', cost: '$150–$350', cov: 'Rarely' },
                  { item: 'Comprehensive stool analysis', cost: '$250–$450', cov: 'No' },
                  { item: 'DUTCH hormone test', cost: '$375–$475', cov: 'No' },
                  { item: 'Organic acids test', cost: '$250–$350', cov: 'No' },
                  { item: 'Advanced thyroid panel', cost: '$150–$250', cov: 'Sometimes (partial)' },
                  { item: 'Monthly supplements (typical)', cost: '$75–$300', cov: 'No' },
                  { item: 'Membership model (all-inclusive)', cost: '$150–$400/month', cov: 'No' },
                ].map((row, i) => (
                  <tr key={row.item} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-4 py-3 font-medium text-slate-700">{row.item}</td>
                    <td className="px-4 py-3 text-slate-600">{row.cost}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{row.cov}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">How to reduce functional medicine costs</h2>
          <div className="space-y-3">
            {[
              { tip: 'Use HSA/FSA funds', detail: 'Functional medicine visits with licensed physicians are HSA and FSA eligible as qualified medical expenses. Supplements recommended for specific medical conditions may also qualify. Using pre-tax dollars reduces your effective cost by 22–37%.' },
              { tip: 'Ask about membership models', detail: 'Many functional medicine practices offer monthly or annual memberships ($150–$400/month) that include visits, unlimited messaging, and a care coordinator. For patients who need frequent engagement, this is often more cost-effective than per-visit billing.' },
              { tip: 'Ask which tests are essential', detail: 'Not every functional medicine patient needs every advanced test. Ask which 1-2 tests are highest priority for your specific symptom picture and start there. A good practitioner will prioritize rather than ordering a $2,000 full panel on your first visit.' },
              { tip: 'Check for hybrid practices', detail: 'Some functional medicine physicians accept insurance for standard visits and order what they can through in-network labs — reserving specialty labs for situations where they are truly necessary. Ask about this option before assuming everything is cash-pay.' },
            ].map((item) => (
              <div key={item.tip} className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="font-semibold text-slate-700">{item.tip}</p>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Common Questions</h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((item) => (
              <div key={item.name} className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="font-semibold text-slate-800 mb-2">{item.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-teal-700 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Find a Functional Medicine Practitioner</h2>
          <p className="text-teal-100 mb-6">Search by location to find practitioners who fit your budget and health goals.</p>
          <Link href="/listings" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-teal-700 hover:bg-teal-50 transition-colors">
            Browse Practitioners Near Me →
          </Link>
        </div>

        <div className="pt-6 border-t border-slate-200">
          <h3 className="font-semibold text-slate-700 mb-3">Related Guides</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/guides/functional-medicine-vs-conventional" className="text-sm text-teal-700 font-medium">Functional vs Conventional Medicine →</Link>
            <Link href="/guides/does-insurance-cover-functional-medicine" className="text-sm text-teal-700 font-medium">Does Insurance Cover Functional Medicine? →</Link>
            <Link href="/guides/ifm-certified-doctor" className="text-sm text-teal-700 font-medium">What Is an IFM-Certified Doctor? →</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
