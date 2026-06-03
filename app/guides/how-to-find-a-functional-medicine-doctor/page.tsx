import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to Find a Functional Medicine Doctor Near You | FunctionalMDDirectory.com',
  description:
    'Step-by-step guide to finding a qualified functional medicine doctor: credentials to look for, questions to ask, red flags to avoid, and telehealth options.',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does functional medicine cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Initial consultations typically range from $200 to $500 out-of-pocket, depending on the practitioner and location. Advanced lab testing can add $300 to $1,500 or more. Some practices offer membership models starting around $100 to $300 per month that bundle visits and basic labs.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is an IFM certified physician?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IFM stands for Institute for Functional Medicine. An IFM Certified Practitioner (IFMCP) has completed the IFM\'s Applied Functional Medicine in Clinical Practice (AFMCP) training plus additional certification requirements including case reviews and an exam. It is the most recognized credential in the field.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need a referral to see a functional medicine doctor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In most cases, no. The majority of functional medicine practitioners accept self-referrals. If you plan to use insurance, check with your insurer first — some plans require a referral for specialist visits. Cash-pay and membership practices never require referrals.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is functional medicine different from integrative medicine?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Functional medicine is a specific methodology focused on root-cause investigation using systems biology. Integrative medicine is a broader philosophy that combines conventional medicine with evidence-based complementary approaches. There is significant overlap, but functional medicine places more emphasis on advanced testing and biochemical individuality.',
      },
    },
  ],
}

export default function HowToFindFMDoctorPage() {
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
        <span className="text-slate-600 font-medium">How to Find a Functional Medicine Doctor</span>
      </nav>

      <article>
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900 leading-tight mb-4">
            How to Find a Functional Medicine Doctor Near You
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            Not all practitioners who call themselves "functional medicine doctors" have the same
            training or approach. This guide walks you through exactly what to look for, what
            questions to ask, and how to avoid wasting time and money on the wrong fit.
          </p>
        </header>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Credentials to Look For (IFM, A4M, and More)
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            The term "functional medicine" is not regulated, which means anyone can use it. That
            makes credentials especially important. Here are the most respected certifications:
          </p>
          <div className="space-y-4 mb-4">
            {[
              {
                title: 'IFMCP — Institute for Functional Medicine Certified Practitioner',
                desc: 'The gold standard. Requires completion of the AFMCP course, case documentation, and a written exam. Look for this credential first.',
              },
              {
                title: 'A4M / FAARM — American Academy of Anti-Aging Medicine',
                desc: 'Focuses on hormone optimization, longevity, and metabolic medicine. Strong credential for anti-aging and hormone-focused care.',
              },
              {
                title: 'ABIHM — American Board of Integrative Holistic Medicine',
                desc: 'Board certification for MDs and DOs practicing integrative medicine with a holistic framework.',
              },
              {
                title: 'ND — Naturopathic Doctor (licensed in 25+ states)',
                desc: 'Licensed NDs complete a four-year post-graduate medical program with a strong functional medicine curriculum.',
              },
            ].map((cred) => (
              <div key={cred.title} className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                <h3 className="font-semibold text-teal-800 text-sm mb-1">{cred.title}</h3>
                <p className="text-slate-600 text-sm">{cred.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-slate-600 leading-relaxed">
            You can browse{' '}
            <Link href="/categories/functional-medicine-doctors" className="text-teal-700 hover:text-teal-900 font-medium">
              IFM-certified functional medicine doctors
            </Link>{' '}
            in our directory, filtered by location and specialty.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Questions to Ask Before Your First Appointment
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            A brief phone consultation (many practices offer free 15-minute discovery calls) can
            save you hundreds of dollars and weeks of frustration. Ask:
          </p>
          <ul className="space-y-3 mb-4">
            {[
              'What is your specific training in functional medicine? Do you hold an IFMCP or similar certification?',
              'Do you accept insurance, or is this a cash-pay / membership practice?',
              'What does the initial visit cover, and how long does it last?',
              'What types of advanced testing do you commonly order?',
              'Do you work with patients with [your specific condition]?',
              'What is your approach to conventional medications — do you work alongside them or try to replace them?',
              'Do you offer telehealth appointments?',
            ].map((q) => (
              <li key={q} className="flex items-start gap-2 text-slate-600 text-sm">
                <span className="text-teal-600 font-bold mt-0.5">?</span>
                {q}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Red Flags to Avoid</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            The functional medicine space, like any health niche, has practitioners who overpromise
            and underdeliver. Watch for these warning signs:
          </p>
          <ul className="space-y-3 mb-4">
            {[
              'Guaranteed cures for serious or complex diseases',
              'No verifiable credentials or training from recognized institutions',
              'Resistance to working with your existing conventional care team',
              'Pressure to purchase proprietary supplement packages upfront',
              'No interest in lab testing — heavy reliance on intuition alone',
              'Dismissal of all conventional medicine without clinical justification',
            ].map((flag) => (
              <li key={flag} className="flex items-start gap-2 text-slate-600 text-sm">
                <span className="text-red-500 font-bold mt-0.5">✕</span>
                {flag}
              </li>
            ))}
          </ul>
          <p className="text-slate-600 leading-relaxed">
            A good functional medicine practitioner works collaboratively, communicates clearly about
            costs and expectations, and never promises overnight results for chronic conditions.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Telehealth vs In-Person: What Works for Functional Medicine
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Functional medicine is one of the specialties where telehealth works exceptionally well.
            Most of what a functional medicine practitioner needs — your health history, lab
            results, and lifestyle context — can be gathered and reviewed remotely.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            Telehealth expands your options significantly. Instead of being limited to practitioners
            within driving distance, you can work with the most qualified functional medicine doctor
            for your specific condition — regardless of geography. Lab work can usually be ordered
            to a local draw site, and test kits (gut microbiome, DUTCH hormone panels, etc.) are
            mailed directly to you.
          </p>
          <p className="text-slate-600 leading-relaxed">
            In-person visits may be preferred for initial physical exams or when complex procedures
            are involved. Many patients do a hybrid approach: in-person for the first visit and
            telehealth for follow-ups.
          </p>
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-amber-800 text-sm">
              <strong>Tip:</strong> When searching our directory, use the Telehealth filter to find
              practitioners who see patients remotely — including across state lines where their
              license permits.
            </p>
          </div>
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
          <h2 className="text-lg font-semibold text-slate-800 mb-3">Related Resources</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/guides/what-is-functional-medicine" className="text-teal-700 hover:text-teal-900 text-sm font-medium">
                What Is Functional Medicine? A Complete Guide →
              </Link>
            </li>
            <li>
              <Link href="/guides/functional-medicine-vs-integrative-medicine" className="text-teal-700 hover:text-teal-900 text-sm font-medium">
                Functional Medicine vs. Integrative Medicine: What{"'"}s the Difference? →
              </Link>
            </li>
            <li>
              <Link href="/categories/functional-medicine-doctors" className="text-teal-700 hover:text-teal-900 text-sm font-medium">
                Browse Functional Medicine Doctors (MD/DO) →
              </Link>
            </li>
          </ul>
        </section>

        {/* CTA */}
        <div className="rounded-xl bg-teal-900 text-white p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Find a Verified Functional Medicine Doctor</h2>
          <p className="text-teal-200 mb-6 text-sm leading-relaxed max-w-lg mx-auto">
            Our directory includes verified IFM-certified practitioners with telehealth options,
            specialty filters, and real practice information — so you can make a confident choice.
          </p>
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Find a Verified Functional Medicine Doctor →
          </Link>
        </div>
      </article>
    </div>
  )
}
