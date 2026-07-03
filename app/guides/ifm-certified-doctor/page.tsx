import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'What Is an IFM-Certified Functional Medicine Doctor? | FunctionalMDDirectory.com',
  description:
    'The IFMCP is the gold-standard functional medicine credential from the Institute for Functional Medicine. Here is what it means, who can earn it, and why it matters when choosing a practitioner.',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does IFMCP stand for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "IFMCP stands for Institute for Functional Medicine Certified Practitioner. It is the certification awarded by the Institute for Functional Medicine (IFM) — the leading credentialing body for functional medicine training. Earning the IFMCP requires completing IFM's Advanced Practice training modules (typically 100+ hours), passing a comprehensive exam, and demonstrating clinical competency in applying functional medicine principles.",
      },
    },
    {
      '@type': 'Question',
      name: 'Who can become an IFMCP?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The IFMCP is open to licensed healthcare practitioners: MDs, DOs, NPs, PAs, DCs (chiropractors), naturopathic doctors, registered dietitians, and licensed acupuncturists. This breadth means that not every IFMCP is a physician — an IFMCP-certified dietitian and an IFMCP-certified MD have different scopes of practice. When choosing a functional medicine provider, check both the IFMCP credential and the underlying license for the level of care you need.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is the IFMCP credential required to practice functional medicine?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "No. Functional medicine is a medical philosophy, not a protected title. Any physician can call themselves a functional medicine practitioner without any formal training. The IFMCP is a voluntary credential that signals the practitioner has completed rigorous, standardized training through IFM. It is not the only marker of quality — some excellent functional medicine physicians trained through other programs (A4M, Institute for Integrative Nutrition, etc.) — but it is the most recognized standard in the field.",
      },
    },
    {
      '@type': 'Question',
      name: 'What does IFM training cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "IFM's training curriculum covers: the functional medicine matrix (a systems-biology framework for patient assessment); nutrigenomics and lifestyle medicine; GI dysfunction and the gut microbiome; hormonal and reproductive health; cardiometabolic conditions; energy, mitochondrial function, and detoxification; and immune/inflammatory conditions. Training includes cases studies, clinical mentorship, and a final examination. It is one of the most comprehensive continuing medical education programs in any medical specialty.",
      },
    },
    {
      '@type': 'Question',
      name: 'How do I find an IFMCP-certified practitioner near me?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "You can search IFM's own Find a Practitioner directory at ifm.me/find-a-practitioner, which filters specifically for IFMCP credential holders. Our directory includes functional medicine practitioners who have identified their IFM certification status. When scheduling, ask the office directly: 'Is your practitioner IFMCP certified?' and confirm the underlying license type (MD, DO, NP, PA) to understand the full scope of care available to you.",
      },
    },
  ],
}

export default function IfmCertifiedDoctorPage() {
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
        <span className="text-slate-600">What Is an IFMCP?</span>
      </nav>
      <h1 className="text-3xl font-bold text-slate-800 mb-4 leading-tight">
        What Is an IFM-Certified Functional Medicine Doctor?
      </h1>
      <p className="text-slate-500 text-lg mb-10 leading-relaxed">
        The IFMCP credential from the Institute for Functional Medicine is the most recognized
        standard in functional medicine training. Here is what it means, who can earn it, and
        why it matters when choosing your provider.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            The IFM certification requirements
          </h2>
          <div className="space-y-3">
            {[
              { step: 'Applying Functional Medicine in Clinical Practice (AFMCP)', detail: '5-day foundational course. Required prerequisite for all IFM certifications. Covers the functional medicine matrix, systems biology, and patient-centered care model.' },
              { step: 'Advanced Practice Modules (APMs)', detail: '5 specialty modules covering: GI, Cardiometabolic, Hormone, Immune/Inflammation, and Energy/Mitochondria. Each is a multi-day course with required pre-course study.' },
              { step: 'Certification examination', detail: 'Written exam covering all APM content areas. Must be passed to earn the IFMCP designation.' },
              { step: 'Recertification', detail: 'Ongoing CME requirements and periodic recertification to maintain the credential.' },
            ].map((item, i) => (
              <div key={item.step} className="rounded-xl border border-slate-200 bg-white p-5 flex gap-4">
                <span className="font-bold text-teal-700 text-lg shrink-0">{i + 1}</span>
                <div>
                  <p className="font-semibold text-slate-700">{item.step}</p>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">{item.detail}</p>
                </div>
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
          <h2 className="text-2xl font-bold text-white mb-3">Find an IFM-Certified Practitioner</h2>
          <p className="text-teal-100 mb-6">Search our directory for functional medicine practitioners with IFMCP credentials near you.</p>
          <Link href="/listings" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-teal-700 hover:bg-teal-50 transition-colors">
            Browse Practitioners Near Me →
          </Link>
        </div>

        <div className="pt-6 border-t border-slate-200">
          <h3 className="font-semibold text-slate-700 mb-3">Related Guides</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/guides/what-is-functional-medicine" className="text-sm text-teal-700 font-medium">What Is Functional Medicine? →</Link>
            <Link href="/guides/functional-medicine-vs-conventional" className="text-sm text-teal-700 font-medium">Functional vs Conventional Medicine →</Link>
            <Link href="/guides/functional-medicine-cost" className="text-sm text-teal-700 font-medium">How Much Does Functional Medicine Cost? →</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
