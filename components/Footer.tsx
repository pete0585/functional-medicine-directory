import Link from 'next/link'
import { Stethoscope } from 'lucide-react'
import { CATEGORIES } from '@/types'

export default function Footer() {
  return (
    <footer className="border-t border-cream-300 bg-teal-900 text-teal-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600">
                <Stethoscope className="h-5 w-5 text-white" aria-label="FunctionalMD Directory" />
              </div>
              <div className="leading-tight">
                <span className="block text-sm font-bold text-white">FunctionalMD</span>
                <span className="block text-xs text-teal-300">Directory</span>
              </div>
            </Link>
            <p className="mt-4 text-sm text-teal-300 leading-relaxed">
              The only directory built exclusively for functional and integrative medicine practitioners.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Find a Specialist</h3>
            <ul className="space-y-2">
              {CATEGORIES.slice(0, 4).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="text-sm text-teal-300 hover:text-white transition-colors"
                  >
                    {cat.label.split('(')[0].trim()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">More Specialties</h3>
            <ul className="space-y-2">
              {CATEGORIES.slice(4).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="text-sm text-teal-300 hover:text-white transition-colors"
                  >
                    {cat.label.split('(')[0].trim()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">For Practitioners</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/submit" className="text-sm text-teal-300 hover:text-white transition-colors">
                  List Your Practice
                </Link>
              </li>
              <li>
                <Link href="/listings" className="text-sm text-teal-300 hover:text-white transition-colors">
                  Browse Directory
                </Link>
              </li>
              <li>
                <a href="mailto:hello@functionalmddirectory.com" className="text-sm text-teal-300 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-xs text-teal-400">Related Directories</p>
              <div className="mt-2 space-y-1">
                <a href="https://naturopathicdoctorfinder.com" className="block text-xs text-teal-400 hover:text-teal-200 transition-colors">
                  Naturopathic Doctor Finder →
                </a>
                <a href="https://menopausedirectory.co" className="block text-xs text-teal-400 hover:text-teal-200 transition-colors">
                  Menopause Specialist Directory →
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-teal-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-teal-400">
            © {new Date().getFullYear()} FunctionalMDDirectory.com — TSV Studios LLC. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-teal-400">
            <Link href="/listings" className="hover:text-teal-200 transition-colors">Browse All</Link>
            <Link href="/submit" className="hover:text-teal-200 transition-colors">List Your Practice</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
