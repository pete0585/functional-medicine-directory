import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Does Insurance Cover Functional Medicine? What Patients Need to Know | FunctionalMDDirectory.com',
  description:
    'Does insurance cover functional medicine? Standard office visits may be covered if the doctor is in-network. Advanced testing (DUTCH, OAT, stool analysis) is usually out of pocket. Here\'s what to ask before your first appointment.',
}

export const revalidate = 86400

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Will my insurance cover a functional medicine doctor visit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It depends on whether the functional medicine doctor is in-network with your insurance plan. If they are an in-network MD or DO, your plan typically covers the evaluation and management (E&M) office visit at your standard specialist copay or coinsurance — just like any other physician visit. The functional medicine approach itself is not a billing code; insurance reimburses based on the visit type and the diagnoses documented.',
      },
    },
    {
      '@type': 'Question',
      name: 'What functional medicine tests are typically not covered by insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Advanced functional testing is almost always out of pocket. Common non-covered tests include: comprehensive stool analysis (GI-MAP, Genova GI Effects) at $350–$500; DUTCH complete hormone panel at $350–$500; organic acids test (OAT) at $350–$450; advanced lipid panels (NMR LipoProfile, Cleveland HeartLab) that exceed standard lipid panels; food sensitivity panels (IgG testing) at $200–$400; and micronutrient panels at $150–$350. Conventional labs ordered by a functional medicine doctor — CBC, CMP, thyroid panel, vitamin D, iron studies — are typically covered the same as any in-network lab order.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why do many functional medicine doctors not accept insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Insurance reimbursement rates for primary care visits are low — often $75–$150 per visit — which forces conventional practices to see 20–30 patients per day to remain financially viable. Functional medicine requires 60–90 minute initial visits and 30–45 minute follow-ups. This time investment is incompatible with insurance-panel economics. Many FM doctors opt out of insurance entirely and operate on a direct primary care (DPC) membership model ($100–$300/month) or charge cash-pay rates, which allows them to spend the time the model requires.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use an HSA or FSA to pay for functional medicine?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Health Savings Account (HSA) and Flexible Spending Account (FSA) funds can be used for qualified medical expenses with any licensed healthcare provider — including functional medicine MDs, DOs, and in most states licensed naturopathic doctors. Eligible expenses include office visit fees, copays, and laboratory tests ordered by a licensed provider. Supplements and lifestyle coaching are generally not HSA/FSA eligible unless prescribed for a specific diagnosis.',
      },
    },
  ],
}

export default function InsuranceCoversFMPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-slate-400">
          <Link href="/" className="hover:text-teal-700">Home</Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-teal-700">Guides</Link>
          <span>/</span>
          <span className="text-slate-600 font-medium">Does Insurance Cover Functional Medicine?</span>
        </nav>

        <article>
          <header className="mb-10">
            <h1 className="text-4xl font-bold text-slate-900 leading-tight mb-4">
              Does Insurance Cover Functional Medicine? What Patients Need to Know
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed">
              The short answer: sometimes — for the visit itself, if the doctor is in-network. Almost never for
              the advanced testing that makes functional medicine distinctive. Here&apos;s exactly what is and
              isn&apos;t covered, and how to maximize every dollar you spend.
            </p>
          </header>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">What Insurance Typically Covers</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              If a functional medicine doctor is in your insurance network, their office visits are billed like any
              other physician visit. Insurance pays based on the <strong>evaluation and management (E&M) codes</strong>{' '}
              the doctor submits — a new patient complex visit, a follow-up, a telehealth consult. The functional medicine
              philosophy is not a billing code; coverage is determined by the doctor&apos;s network status and the diagnoses
              they document.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Conventional laboratory tests ordered by a functional medicine doctor are also generally covered when ordered
              by an in-network provider with appropriate diagnosis codes. This includes:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-600 mb-4 ml-4 text-sm">
              <li>Complete blood count (CBC) and comprehensive metabolic panel (CMP)</li>
              <li>Standard thyroid panel (TSH, free T4) — note that free T3, reverse T3, and thyroid antibodies may not be covered</li>
              <li>Lipid panel, HbA1c, fasting insulin</li>
              <li>Vitamin D (25-OH), B12, iron studies, ferritin</li>
              <li>Sex hormones (testosterone, estradiol, FSH, LH) when clinically indicated</li>
              <li>Inflammation markers (CRP, homocysteine) — coverage varies by insurer</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">What&apos;s Typically NOT Covered</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              The tests that make functional medicine different from a conventional annual physical are almost
              always out of pocket. These specialty tests are not standard of care under conventional medicine
              guidelines, which is why most insurers won&apos;t reimburse them:
            </p>
            <div className="space-y-3">
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="font-semibold text-slate-800 text-sm mb-1">Comprehensive Stool Analysis (GI-MAP, Genova GI Effects)</p>
                <p className="text-slate-500 text-sm">Evaluates gut microbiome diversity, pathogens, parasites, inflammation markers, and digestive enzyme activity. Cost: $350–$500. Not covered.</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="font-semibold text-slate-800 text-sm mb-1">DUTCH Complete Hormone Panel</p>
                <p className="text-slate-500 text-sm">Dried urine test measuring sex hormones, adrenal hormones (cortisol pattern), and hormone metabolites — far more detailed than standard serum hormone testing. Cost: $350–$500. Not covered.</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="font-semibold text-slate-800 text-sm mb-1">Organic Acids Test (OAT)</p>
                <p className="text-slate-500 text-sm">Evaluates mitochondrial function, neurotransmitter metabolism, yeast/bacterial overgrowth markers, and nutrient cofactor status. Cost: $350–$450. Not covered.</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="font-semibold text-slate-800 text-sm mb-1">Advanced Lipid Panels (NMR, Cleveland HeartLab)</p>
                <p className="text-slate-500 text-sm">Measures LDL particle number and size, Lp(a), apoB, and oxidized LDL — beyond the standard 4-marker lipid panel. Partial coverage possible with strong clinical justification.</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="font-semibold text-slate-800 text-sm mb-1">Food Sensitivity Panels (IgG testing)</p>
                <p className="text-slate-500 text-sm">Tests immune reactivity to 90–200+ foods. Cost: $200–$400. Not covered — and clinically controversial; quality varies widely by lab.</p>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Many FM Doctors Opt Out of Insurance</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Insurance reimbursement for primary care visits is low — often $75–$150 per visit. To stay financially viable
              within insurance, a physician must see 20–30 patients per day. Functional medicine requires 60–90 minutes for
              an initial consultation and 30–45 minutes for follow-ups. These two realities are fundamentally incompatible.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              As a result, many functional medicine doctors operate outside of insurance entirely, using one of two models:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 mb-4 ml-4">
              <li><strong>Direct Primary Care (DPC):</strong> Monthly membership ($100–$300/month) covering unlimited visits, basic labs, and same-day access. No per-visit billing. Very popular in functional medicine.</li>
              <li><strong>Cash-pay specialist:</strong> Flat-fee initial consultation ($250–$500) and follow-ups ($150–$300). No membership required. Patients can still submit receipts to insurance as out-of-network claims.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">How to Maximize Your Coverage</h2>
            <ul className="list-disc list-inside space-y-3 text-slate-600 ml-4">
              <li><strong>Use your HSA or FSA:</strong> All visits with licensed providers and all lab tests are HSA/FSA eligible. Contribute the maximum to your HSA before the year starts if you plan to pursue functional medicine.</li>
              <li><strong>Get lab requisitions from your in-network PCP:</strong> Some functional medicine doctors will coordinate with your primary care doctor to order the same labs through your in-network lab benefit — saving you $200–$500 on conventional testing.</li>
              <li><strong>Submit out-of-network claims:</strong> If you have a PPO plan with out-of-network benefits, you can often submit a superbill from an out-of-network FM doctor and get 30–60% reimbursed after your out-of-network deductible.</li>
              <li><strong>Search the IFM practitioner finder for in-network MDs:</strong> The Institute for Functional Medicine maintains a practitioner directory — filter for MDs/DOs and then verify insurance participation directly with their office.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Questions to Ask Before Your First FM Appointment</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4 text-sm">
              <li>Are you in-network with [my insurance plan]?</li>
              <li>How do you bill insurance — as a primary care visit, specialist, or not at all?</li>
              <li>What does the initial consultation include and what does it cost?</li>
              <li>Which labs do you order routinely, and which are extra? What are the out-of-pocket costs for specialty testing?</li>
              <li>Do you provide a superbill I can submit to my insurance as an out-of-network claim?</li>
              <li>Do you accept HSA/FSA payment?</li>
            </ul>
          </section>

          {/* FAQ */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqSchema.mainEntity.map((item) => (
                <div key={item.name} className="border-b border-slate-200 pb-6 last:border-0">
                  <h3 className="font-semibold text-slate-800 mb-2">{item.name}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </section>
        </article>

        {/* CTA */}
        <div className="rounded-xl bg-teal-900 text-white p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Find an In-Network Functional Medicine Doctor</h2>
          <p className="text-teal-200 mb-6 text-sm leading-relaxed">
            Use our directory to filter by location and insurance. Contact each practice directly to verify current network status.
          </p>
          <Link
            href="/listings"
            className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Search the Directory →
          </Link>
        </div>

        {/* Related guides */}
        <div className="mt-8 space-y-2 text-sm">
          <Link href="/guides/how-to-find-a-functional-medicine-doctor" className="block text-teal-600 hover:text-teal-800 font-medium">How to Find a Functional Medicine Doctor →</Link>
          <Link href="/guides/what-is-functional-medicine" className="block text-teal-600 hover:text-teal-800 font-medium">What Is Functional Medicine? →</Link>
          <Link href="/categories/gut-health-functional-medicine" className="block text-teal-600 hover:text-teal-800 font-medium">Functional Medicine for Gut Health →</Link>
        </div>
      </div>
    </>
  )
}
