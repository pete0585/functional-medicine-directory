'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Stethoscope } from 'lucide-react'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-cream-300 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-700">
              <Stethoscope className="h-5 w-5 text-white" aria-label="Functional MD Directory" />
            </div>
            <div className="leading-tight">
              <span className="block text-sm font-bold text-teal-900">FunctionalMD</span>
              <span className="block text-xs text-slate-400">Directory</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/listings" className="text-sm font-medium text-slate-600 hover:text-teal-700 transition-colors">
              Find a Doctor
            </Link>
            <Link href="/categories/functional-medicine-doctors" className="text-sm font-medium text-slate-600 hover:text-teal-700 transition-colors">
              MD/DO
            </Link>
            <Link href="/categories/integrative-medicine" className="text-sm font-medium text-slate-600 hover:text-teal-700 transition-colors">
              Integrative
            </Link>
            <Link href="/categories/hormone-optimization" className="text-sm font-medium text-slate-600 hover:text-teal-700 transition-colors">
              Hormone
            </Link>
            <Link href="/submit" className="btn-primary text-sm py-2">
              List Your Practice
            </Link>
          </nav>

          <button
            className="md:hidden rounded-lg p-2 text-slate-600 hover:bg-teal-50"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-cream-300 bg-white px-4 py-4">
          <nav className="flex flex-col gap-3">
            <Link href="/listings" className="py-2 text-sm font-medium text-slate-700" onClick={() => setOpen(false)}>
              Find a Doctor
            </Link>
            <Link href="/categories/functional-medicine-doctors" className="py-2 text-sm font-medium text-slate-700" onClick={() => setOpen(false)}>
              MD/DO Doctors
            </Link>
            <Link href="/categories/integrative-medicine" className="py-2 text-sm font-medium text-slate-700" onClick={() => setOpen(false)}>
              Integrative Medicine
            </Link>
            <Link href="/categories/hormone-optimization" className="py-2 text-sm font-medium text-slate-700" onClick={() => setOpen(false)}>
              Hormone Optimization
            </Link>
            <Link href="/submit" className="btn-primary mt-2 text-center" onClick={() => setOpen(false)}>
              List Your Practice
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
