import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'What Is Functional Medicine? A Complete Guide | FunctionalMDDirectory.com',
  description:
    'Learn what functional medicine is, how it differs from conventional care, what conditions it treats, and what to expect at your first appointment. Find a practitioner near you.',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is functional medicine?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Functional medicine is a systems-based approach to healthcare that focuses on identifying and addressing the root causes of disease. Instead of treating isolated symptoms, functional medicine practitioners evaluate the complex interactions between genetics, environment, and lifestyle that influence long-term health.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is functional medicine evidence-based?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Functional medicine draws on peer-reviewed research in areas like genomics, microbiome science, nutritional biochemistry, and systems biology. The Institute for Functional Medicine (IFM) requires practitioners to complete rigorous training grounded in clinical evidence.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does insurance cover functional medicine?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Coverage varies widely. Some functional medicine doctors accept insurance for standard office visits, while advanced testing (gut microbiome panels, comprehensive hormone panels, etc.) is often out-of-pocket. Many practices offer membership or cash-pay models. Always call ahead to confirm coverage.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does a functional medicine appointment take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Initial consultations typically last 60 to 90 minutes — sometimes longer. This extended time allows the practitioner to review your full health history, lifestyle, diet, stress levels, and prior lab work. Follow-up visits are usually 30 to 45 minutes.',
      },
    },
    {
      '@type': 'Question',
      name: 'What training does a functional medicine doctor have?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most functional medicine practitioners are licensed physicians (MD or DO), nurse practitioners, naturopathic doctors, or other licensed clinicians who have completed additional training through organizations like the Institute for Functional Medicine (IFM), the American Academy of Anti-Aging Medicine (A4M), or similar credentialing bodies.',
      },
    },
  ],
}

export default function WhatIsFunctionalMedicinePage() {
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
        <span className="text-slate-600 font-medium">What Is Functional Medicine?</span>
      </nav>

      <article>
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900 leading-tight mb-4">
            What Is Functional Medicine? A Complete Guide
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            If you have spent years managing symptoms without getting real answers, functional
            medicine may be the approach you have been searching for. This guide explains exactly
            what functional medicine is, how it differs from conventional care, and what to expect
            when you make your first appointment.
          </p>
        </header>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Conventional Medicine vs. Functional Medicine
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Conventional medicine excels at acute care — infections, trauma, emergencies. But for
            chronic conditions like fatigue, autoimmune disease, hormonal imbalances, and digestive
            disorders, the standard model often falls short. Most primary care appointments last
            seven minutes. There is rarely time to investigate why a problem is happening — only
            enough to address what is happening right now.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            Functional medicine takes the opposite approach. Rather than matching symptoms to
            prescriptions, a functional medicine practitioner asks: <em>what is driving these
            symptoms in this particular patient?</em> The goal is to understand the underlying
            biological, environmental, and lifestyle factors that have disrupted the body{"'"}s
            normal function.
          </p>
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 mb-4">
            <p className="text-teal-800 font-medium text-sm mb-2">Key difference at a glance:</p>
            <ul className="text-teal-700 text-sm space-y-1">
              <li>
                <strong>Conventional:</strong> Diagnose disease → prescribe treatment → manage symptoms
              </li>
              <li>
                <strong>Functional:</strong> Identify root cause → address underlying dysfunction → restore health
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            What Conditions Does Functional Medicine Treat?
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Functional medicine is particularly effective for complex, chronic, and difficult-to-diagnose
            conditions. Common areas of focus include:
          </p>
          <ul className="list-none space-y-2 mb-4">
            {[
              'Thyroid disorders (hypothyroidism, Hashimoto\'s)',
              'Gut dysfunction (IBS, SIBO, leaky gut, dysbiosis)',
              'Hormonal imbalances (adrenal fatigue, estrogen dominance, low testosterone)',
              'Autoimmune conditions (lupus, rheumatoid arthritis, multiple sclerosis)',
              'Metabolic disorders (insulin resistance, prediabetes, obesity)',
              'Chronic fatigue and fibromyalgia',
              'Brain fog, anxiety, and mood disorders with physiological roots',
              'Food sensitivities and nutritional deficiencies',
            ].map((condition) => (
              <li key={condition} className="flex items-start gap-2 text-slate-600 text-sm">
                <span className="text-teal-600 mt-0.5">✓</span>
                {condition}
              </li>
            ))}
          </ul>
          <p className="text-slate-600 leading-relaxed">
            Functional medicine also works well alongside conventional treatment — many patients
            use it as a complement to their existing care, not a replacement.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            What to Expect at Your First Functional Medicine Appointment
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Your initial visit will be longer than any doctor{"'"}s appointment you have experienced —
            typically 60 to 90 minutes. Come prepared to discuss your complete health history,
            including childhood illnesses, medications, stress levels, sleep patterns, diet, and
            family history.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            Many practitioners use a detailed intake questionnaire before your first visit. During
            the appointment, your doctor will build a timeline of your health to identify when
            things began to shift. This is often called the functional medicine matrix — a framework
            for understanding how different body systems interact.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            Advanced lab testing is a cornerstone of functional medicine. Expect orders for
            comprehensive panels that may include:
          </p>
          <ul className="list-none space-y-2 mb-4">
            {[
              'Full thyroid panel (TSH, T3, T4, reverse T3, thyroid antibodies)',
              'Comprehensive metabolic panel with fasting insulin',
              'Hormone panel (cortisol, DHEA, estrogen, progesterone, testosterone)',
              'Gut microbiome testing (GI-MAP or similar)',
              'Nutrient levels (vitamin D, B12, magnesium, ferritin)',
              'Inflammatory markers (CRP, homocysteine)',
            ].map((test) => (
              <li key={test} className="flex items-start gap-2 text-slate-600 text-sm">
                <span className="text-teal-600 mt-0.5">→</span>
                {test}
              </li>
            ))}
          </ul>
          <p className="text-slate-600 leading-relaxed">
            Based on these findings, your practitioner will develop a personalized plan that may
            include dietary changes, targeted supplementation, lifestyle modifications, stress
            management techniques, and — where appropriate — conventional medications.
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
              <Link href="/guides/how-to-find-a-functional-medicine-doctor" className="text-teal-700 hover:text-teal-900 text-sm font-medium">
                How to Find a Functional Medicine Doctor Near You →
              </Link>
            </li>
            <li>
              <Link href="/guides/functional-medicine-vs-integrative-medicine" className="text-teal-700 hover:text-teal-900 text-sm font-medium">
                Functional Medicine vs. Integrative Medicine: What{"'"}s the Difference? →
              </Link>
            </li>
            <li>
              <Link href="/categories/functional-medicine-doctors" className="text-teal-700 hover:text-teal-900 text-sm font-medium">
                Browse All Functional Medicine Doctors (MD/DO) →
              </Link>
            </li>
          </ul>
        </section>

        {/* CTA */}
        <div className="rounded-xl bg-teal-900 text-white p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to find your functional medicine doctor?</h2>
          <p className="text-teal-200 mb-6 text-sm leading-relaxed max-w-lg mx-auto">
            Search our directory of IFM-certified physicians, integrative practitioners, and root
            cause specialists — filtered by location, specialty, and more.
          </p>
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Browse Functional Medicine Doctors Near You →
          </Link>
        </div>
      </article>
    </div>
  )
}
