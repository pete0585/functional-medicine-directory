import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Functional Medicine for Gut Health: SIBO, IBS, and Leaky Gut | FunctionalMDDirectory.com',
  description:
    'Functional medicine targets the root cause of gut problems — dysbiosis, food sensitivities, intestinal permeability — using stool analysis, SIBO breath tests, and microbiome protocols conventional GI rarely orders.',
}

export const revalidate = 86400

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What tests does a functional medicine doctor order for gut health?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Functional medicine doctors commonly order: comprehensive stool analysis (GI-MAP or Genova GI Effects) to assess microbiome diversity, pathogens, and inflammation; SIBO breath test (lactulose or glucose challenge) to detect small intestinal bacterial overgrowth; organic acids test (OAT) to identify yeast and bacterial metabolites; food sensitivity panels; and sometimes zonulin serum testing as a marker of intestinal permeability. These are not typically ordered by conventional gastroenterologists.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can functional medicine cure IBS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Functional medicine does not promise a cure, but many IBS patients experience significant or complete symptom resolution when the underlying root cause is identified and addressed. Common root causes found in functional medicine IBS workups include SIBO (present in 60–70% of IBS patients in some studies), food sensitivities (especially gluten and FODMAPs), gut dysbiosis, and intestinal permeability. Addressing these through targeted protocols — not just symptom management — often produces durable improvement.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is leaky gut a real medical condition?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Intestinal permeability — the clinical term for what is colloquially called \"leaky gut\" — is a real and measurable phenomenon. Research has documented increased intestinal permeability in conditions including celiac disease, Crohn\'s disease, IBS, and various autoimmune conditions. Functional medicine practitioners measure it using zonulin, lactulose/mannitol ratio testing, or indirect markers. Conventional gastroenterology acknowledges intestinal permeability but does not yet have standardized treatment protocols for it outside of celiac disease.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is SIBO treated in functional medicine?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Functional medicine SIBO treatment typically follows a three-phase approach: (1) Eradication — rifaximin (pharmaceutical antibiotic) and/or herbal antimicrobial protocols (oregano oil, berberine, allicin). Some cases use an elemental diet for 2–3 weeks to starve bacteria. (2) Repair — gut lining support with L-glutamine, zinc carnosine, and anti-inflammatory nutrients. (3) Rebalance and prevent recurrence — low-FODMAP diet introduction, prokinetic agents (ginger, 5-HTP) to support the migrating motor complex, and microbiome reseeding with targeted probiotics.',
      },
    },
  ],
}

export default function GutHealthFMPage() {
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
          <Link href="/listings" className="hover:text-teal-700">Directory</Link>
          <span>/</span>
          <span className="text-slate-600 font-medium">Gut Health</span>
        </nav>

        <h1 className="text-4xl font-bold text-slate-900 leading-tight mb-6">
          Functional Medicine for Gut Health: SIBO, IBS, and Leaky Gut
        </h1>

        <p className="text-lg text-slate-600 leading-relaxed mb-8">
          Functional medicine approaches gut health by targeting the root cause — dysbiosis, food sensitivities,
          intestinal permeability — rather than managing symptoms with antacids, laxatives, or indefinite dietary
          restriction. For patients who have cycled through conventional gastroenterology without resolution,
          functional medicine offers a different investigative framework with different tools.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Functional Medicine Takes a Different Approach</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Conventional gastroenterology excels at ruling out structural problems — cancer, IBD, celiac disease,
            polyps — through colonoscopy, endoscopy, and standard bloodwork. What it is not designed to do is
            investigate <em>why</em> your gut is dysfunctional in the absence of a diagnosable disease.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            Functional medicine fills that gap. A functional medicine workup for gut complaints typically includes
            comprehensive stool analysis, SIBO breath testing, food sensitivity evaluation, and organic acids
            testing — none of which are standard in a conventional GI referral. These tests reveal the microbial
            and biochemical conditions driving your symptoms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Three Conditions Functional Medicine Doctors Commonly Treat</h2>

          <div className="space-y-6">
            <div className="border-l-4 border-teal-600 pl-5">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">SIBO (Small Intestinal Bacterial Overgrowth)</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-2">
                SIBO occurs when bacteria that belong in the large intestine proliferate in the small intestine,
                fermenting carbohydrates before they can be absorbed. Symptoms include bloating (often severe,
                especially after eating), gas, abdominal pain, and altered bowel habits — virtually identical to IBS.
                Research suggests SIBO is present in 60–70% of IBS-diagnosed patients.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                <strong>Functional medicine treatment:</strong> Rifaximin antibiotic and/or herbal antimicrobial protocols
                (oregano oil, berberine, allicin) + elemental diet in resistant cases. Phase 2: gut lining repair.
                Phase 3: prokinetic agents to prevent recurrence by supporting the migrating motor complex between meals.
              </p>
            </div>

            <div className="border-l-4 border-teal-600 pl-5">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">IBS (Irritable Bowel Syndrome)</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-2">
                IBS is a symptom diagnosis — it describes a pattern (bloating, cramping, diarrhea and/or constipation)
                without identifying a cause. Conventional treatment focuses on symptom management: fiber, antispasmodics,
                low-FODMAP diet, and SSRIs for brain-gut axis modulation.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                <strong>Functional medicine treatment:</strong> Investigation of the underlying driver first (SIBO?
                food sensitivities? dysbiosis? post-infectious gut changes?). Then targeted microbiome rebalancing —
                removing pathogenic bacteria, reintroducing beneficial strains with targeted probiotics, repairing gut
                lining, and introducing FODMAPs systematically once the underlying issue is addressed.
              </p>
            </div>

            <div className="border-l-4 border-teal-600 pl-5">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Leaky Gut (Intestinal Permeability)</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-2">
                Intestinal permeability describes a breakdown of the tight junctions between intestinal epithelial cells,
                allowing partially digested food particles, bacterial toxins (LPS), and microbial fragments to pass into
                the bloodstream. This drives systemic inflammation and immune activation — linked to autoimmune conditions,
                food sensitivities, brain fog, skin issues, and more.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                <strong>Functional medicine treatment:</strong> A 5R protocol — Remove (inflammatory foods, pathogens,
                stressors), Replace (digestive enzymes, stomach acid support), Reinoculate (beneficial bacteria),
                Repair (gut lining with L-glutamine, zinc carnosine, deglycyrrhizinated licorice, aloe), and Rebalance
                (sleep, stress, movement). Elimination diets are commonly used in the first 4–8 weeks.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-10 border-t border-slate-200 pt-10">
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

        {/* CTA */}
        <div className="rounded-xl bg-teal-900 text-white p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Find a Functional Medicine Doctor for Gut Health</h2>
          <p className="text-teal-200 mb-6 text-sm leading-relaxed">
            Browse our directory of IFM-certified physicians and licensed naturopathic doctors who specialize in gut health, SIBO, and microbiome medicine.
          </p>
          <Link
            href="/listings"
            className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Search the Directory →
          </Link>
        </div>

        {/* Related */}
        <div className="mt-8 space-y-2 text-sm">
          <Link href="/guides/does-insurance-cover-functional-medicine" className="block text-teal-600 hover:text-teal-800 font-medium">Does Insurance Cover Functional Medicine? →</Link>
          <Link href="/guides/what-is-functional-medicine" className="block text-teal-600 hover:text-teal-800 font-medium">What Is Functional Medicine? →</Link>
          <Link href="/guides/how-to-find-a-functional-medicine-doctor" className="block text-teal-600 hover:text-teal-800 font-medium">How to Find a Functional Medicine Doctor →</Link>
        </div>
      </div>
    </>
  )
}
