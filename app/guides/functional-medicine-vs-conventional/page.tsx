import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Functional Medicine vs Conventional Medicine: Key Differences | FunctionalMDDirectory.com',
  description:
    'Functional medicine identifies root causes; conventional medicine manages symptoms. Both have value. Here is when each approach works best and how to use them together.',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is functional medicine better than conventional medicine?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Neither is universally better — they address different problems effectively. Conventional medicine excels at acute care: infections, trauma, surgical conditions, emergency intervention, and established chronic disease management like blood pressure or diabetes medication. Functional medicine excels at complex, chronic conditions where root causes are unclear, when conventional workups are normal but symptoms persist, and for optimizing health beyond simply managing disease. The best patients use both: conventional care for acute and emergent needs, functional medicine for chronic investigation and root-cause resolution.",
      },
    },
    {
      '@type': 'Question',
      name: 'What does "root cause medicine" actually mean?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Root cause medicine means investigating why a symptom exists rather than just treating the symptom. Example: a patient with fatigue in conventional medicine might have their TSH checked (normal) and be told their thyroid is fine. A functional medicine physician might investigate mitochondrial function, nutrient deficiencies (B12, iron, magnesium, D), sleep architecture, cortisol rhythm, gut absorption, and inflammatory markers — looking for the upstream driver of the fatigue. The goal is to identify what is wrong in the underlying physiology, not just whether a standard lab panel is in range.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does functional medicine use prescription medications?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Functional medicine practitioners who are licensed MDs, DOs, or NPs can and do prescribe medications when appropriate. Functional medicine is not anti-medication — it is more selective about when medications are the right tool. Medications to suppress symptoms while underlying causes remain unaddressed are questioned. Medications that correct an identified deficiency or provide necessary disease management are used appropriately.',
      },
    },
    {
      '@type': 'Question',
      name: 'What types of testing does functional medicine use that conventional medicine does not?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Functional medicine practitioners commonly order advanced testing that most conventional physicians do not routinely use: comprehensive thyroid panels (TSH + Free T3 + Free T4 + reverse T3 + antibodies vs. TSH only); comprehensive stool analysis (GI-MAP, Doctor Data) for gut microbiome and pathogen assessment; DUTCH test for comprehensive hormone metabolite analysis; organic acids testing for mitochondrial function and metabolic assessment; food sensitivity panels; heavy metal testing; and specialty nutrient panels (RBC magnesium, B-vitamin functional assays). These tests add cost and are rarely covered by insurance.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why do some doctors not like functional medicine?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Legitimate criticisms of some functional medicine practices: overreliance on expensive proprietary testing with limited clinical validation; supplement sales that create financial conflicts of interest; wellness claims that exceed the evidence base; and variation in practitioner quality (not all who call themselves functional medicine practitioners have equivalent training). These criticisms apply to some practitioners, not the field as a whole. The Institute for Functional Medicine (IFM) certification (IFMCP) sets a rigorous training standard. When evaluating a functional medicine practitioner, ask about their core medical training, their IFM certification status, and their approach to coordination with your conventional care team.',
      },
    },
  ],
}

export default function FunctionalMedicineVsConventionalPage() {
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
        <span className="text-slate-600">Functional vs Conventional Medicine</span>
      </nav>

      <h1 className="text-3xl font-bold text-slate-800 mb-4 leading-tight">
        Functional Medicine vs Conventional Medicine: Key Differences
      </h1>
      <p className="text-slate-500 text-lg mb-10 leading-relaxed">
        Functional medicine and conventional medicine are not opposites — they are tools for
        different problems. Here is what separates them, and how to know which approach you need.
      </p>

      <div className="space-y-10">
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">The core difference in approach</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-teal-700 text-white">
                  <th className="text-left px-4 py-3 font-semibold">Dimension</th>
                  <th className="text-left px-4 py-3 font-semibold">Conventional Medicine</th>
                  <th className="text-left px-4 py-3 font-semibold">Functional Medicine</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { dim: 'Primary question', conv: '"What disease do you have?"', func: '"Why do you have this symptom?"' },
                  { dim: 'Primary intervention', conv: 'Medication, procedure, or surgery', func: 'Lifestyle, nutrition, and targeted treatment of root causes' },
                  { dim: 'Testing approach', conv: 'Standard panels; checks for disease', func: 'Advanced testing; looks for dysfunction before disease' },
                  { dim: 'Appointment length', conv: '7–15 minutes', func: '60–90 minutes (initial)' },
                  { dim: 'Insurance coverage', conv: 'Typically covered', func: 'Visits sometimes; advanced testing usually not' },
                  { dim: 'Best for', conv: 'Acute conditions, emergencies, established chronic disease', func: 'Complex chronic conditions, unexplained symptoms, health optimization' },
                ].map((row, i) => (
                  <tr key={row.dim} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-4 py-3 font-medium text-slate-700">{row.dim}</td>
                    <td className="px-4 py-3 text-slate-600">{row.conv}</td>
                    <td className="px-4 py-3 text-slate-600">{row.func}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">When conventional medicine excels</h2>
          <ul className="space-y-2">
            {[
              'Acute infections requiring antibiotics or antivirals',
              'Trauma, surgical emergencies, cardiac events',
              'Cancer diagnosis, treatment, and monitoring',
              'Well-established chronic disease management (insulin-dependent diabetes, severe hypertension)',
              'Mental health crises requiring pharmacological stabilization',
              'Anything requiring imaging, hospitalization, or specialist procedural care',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-slate-600 text-sm">
                <span className="text-teal-600 mt-0.5 font-bold">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">When functional medicine fills the gap</h2>
          <ul className="space-y-2">
            {[
              'Your workups are "normal" but you feel chronically unwell',
              'Fatigue, brain fog, joint pain, or gut problems that haven't responded to standard treatment',
              'Autoimmune conditions where conventional care manages but does not investigate triggers',
              'Thyroid symptoms with a normal TSH (the only thyroid marker most physicians check)',
              'Hormonal imbalance that does not rise to the level of a diagnosable endocrine disorder',
              'You want to address health proactively and understand your unique biochemistry',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-slate-600 text-sm">
                <span className="text-teal-600 mt-0.5 font-bold">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
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
          <p className="text-teal-100 mb-6">Search by location and specialty to find a trained functional medicine physician or NP near you.</p>
          <Link href="/listings" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-teal-700 hover:bg-teal-50 transition-colors">
            Browse Practitioners →
          </Link>
        </div>

        <div className="pt-6 border-t border-slate-200">
          <h3 className="font-semibold text-slate-700 mb-3">Related Guides</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/guides/what-is-functional-medicine" className="text-sm text-teal-700 font-medium">What Is Functional Medicine? →</Link>
            <Link href="/guides/functional-medicine-cost" className="text-sm text-teal-700 font-medium">How Much Does Functional Medicine Cost? →</Link>
            <Link href="/guides/ifm-certified-doctor" className="text-sm text-teal-700 font-medium">What Is an IFM-Certified Doctor? →</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
