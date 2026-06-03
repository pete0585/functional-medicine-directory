import type { Metadata } from 'next'
import { CheckCircle } from 'lucide-react'
import SubmitForm from '@/components/SubmitForm'

export const metadata: Metadata = {
  title: 'List Your Functional Medicine Practice',
  description:
    'Add your functional medicine practice to our directory. Free to list. Verified and featured plans available for premium placement.',
}

const BENEFITS = [
  'Free basic listing — no credit card required',
  'Appear in searches by location and specialty',
  'Verified badge for credibility ($149/yr)',
  'Featured placement at top of results ($299/yr)',
  'IFM certification highlight',
  'Telehealth flag for remote patients',
]

export default function SubmitPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-slate-900">List Your Practice</h1>
        <p className="mt-3 text-slate-500 max-w-xl mx-auto">
          Join thousands of functional medicine practitioners on the only directory built specifically for your niche.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <SubmitForm />
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="font-semibold text-slate-800 mb-4">Why List Here?</h2>
            <ul className="space-y-3">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-slate-600">
                  <CheckCircle className="h-4 w-4 text-teal-600 mt-0.5 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-6 bg-amber-50 border-amber-200">
            <h2 className="font-semibold text-amber-900 mb-3">Upgrade Options</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-semibold text-slate-800">Verified</span>
                  <span className="text-sm font-bold text-amber-800">$149/yr</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Verified badge, priority placement, IFM highlight.
                </p>
              </div>
              <div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-semibold text-slate-800">Featured</span>
                  <span className="text-sm font-bold text-amber-800">$299/yr</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Top of search results, featured on homepage, amber badge.
                </p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <p className="text-xs text-slate-400">
              Compare: IFM&apos;s Find a Practitioner requires full IFM membership ($500+/yr) just to be listed.
              We list all functional medicine practitioners — certified or not — starting at free.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
