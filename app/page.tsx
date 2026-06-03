import type { Metadata } from 'next'
import Link from 'next/link'
import { ShieldCheck, Award, Search, ArrowRight, Video, Users, Beaker, CheckCircle } from 'lucide-react'
import SearchBar from '@/components/SearchBar'
import ListingCard from '@/components/ListingCard'
import { getFeaturedListings, getListingCount } from '@/lib/data'
import { CATEGORIES } from '@/types'

export const metadata: Metadata = {
  title: 'Find a Functional Medicine Doctor Near You | FunctionalMDDirectory.com',
  description:
    'Find an IFM-certified functional medicine doctor near you. Search integrative medicine specialists, root cause physicians, and holistic practitioners by location and specialty.',
}

const TOP_CITIES = [
  { name: 'New York', state: 'NY' },
  { name: 'Los Angeles', state: 'CA' },
  { name: 'Chicago', state: 'IL' },
  { name: 'Houston', state: 'TX' },
  { name: 'Phoenix', state: 'AZ' },
  { name: 'Austin', state: 'TX' },
  { name: 'Denver', state: 'CO' },
  { name: 'Seattle', state: 'WA' },
  { name: 'Miami', state: 'FL' },
  { name: 'Atlanta', state: 'GA' },
  { name: 'Boston', state: 'MA' },
  { name: 'San Diego', state: 'CA' },
]

const STATS = [
  { label: 'IFM-certified practitioners in our network', value: '15,000+' },
  { label: 'Specialties & conditions covered', value: '40+' },
  { label: 'States with verified listings', value: '50' },
]

export default async function HomePage() {
  const [featured, listingCount] = await Promise.all([
    getFeaturedListings(6).catch(() => []),
    getListingCount().catch(() => 0),
  ])

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-hero pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-100 border border-teal-200 px-4 py-2 text-sm text-teal-700 mb-6">
            <Award className="h-4 w-4 text-teal-600" />
            <span>
              {listingCount > 0
                ? `${listingCount.toLocaleString()} functional medicine practitioners listed`
                : 'The directory built for functional medicine practitioners'}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-slate-900 leading-tight sm:text-5xl md:text-6xl tracking-tight">
            Find a doctor who treats{' '}
            <span className="text-teal-700">root causes</span>,{' '}
            <br className="hidden sm:block" />
            not just symptoms
          </h1>

          <p className="mt-5 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Conventional medicine treats symptoms. Functional medicine finds why. Search
            IFM-certified physicians, integrative specialists, and root cause practitioners
            who actually have time to listen.
          </p>

          <div className="mt-8 flex justify-center">
            <SearchBar size="large" />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <Video className="h-4 w-4 text-teal-400" />
              Telehealth options
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-teal-400" />
              Verified listings
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="h-4 w-4 text-amber-400" />
              IFM-certified filter
            </span>
            <span className="flex items-center gap-1.5">
              <Search className="h-4 w-4 text-teal-400" />
              Free to search
            </span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-cream-300 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-teal-700">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <h2 className="section-title">Browse by Specialty</h2>
            <p className="section-subtitle mx-auto">
              Functional medicine encompasses many disciplines. Find the right type of practitioner for your specific needs.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="card-hover p-5 text-center group"
              >
                <div className="text-3xl mb-3">{cat.icon}</div>
                <h3 className="text-sm font-semibold text-slate-800 group-hover:text-teal-700 transition-colors leading-snug">
                  {cat.label.split('(')[0].trim()}
                </h3>
                <p className="mt-1.5 text-xs text-slate-400 line-clamp-2">{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      {featured.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="section-title">Featured Practitioners</h2>
                <p className="section-subtitle">Verified functional medicine doctors with premium listings</p>
              </div>
              <Link href="/listings" className="btn-secondary hidden sm:flex text-sm py-2">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link href="/listings" className="btn-secondary">
                View All Practitioners <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Browse by City */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <h2 className="section-title">Find a Functional Medicine Doctor Near You</h2>
            <p className="section-subtitle mx-auto">Browse practitioners in major cities across the US</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {TOP_CITIES.map((city) => (
              <Link
                key={`${city.name}-${city.state}`}
                href={`/listings?city=${encodeURIComponent(city.name)}&state=${city.state}`}
                className="card p-4 text-sm font-medium text-slate-700 hover:text-teal-700 hover:border-teal-200 hover:bg-teal-50 transition-all text-center"
              >
                {city.name}, {city.state}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Functional Medicine */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-teal-900 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Why Functional Medicine?</h2>
          <p className="text-teal-200 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Most conventional doctors have 7 minutes per patient. Functional medicine practitioners
            spend 60-90 minutes understanding your unique biology, history, and lifestyle — then
            create a personalized plan to address the root cause of your symptoms.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
            {[
              {
                icon: Beaker,
                title: 'Advanced Testing',
                desc: 'Comprehensive labs, gut microbiome analysis, hormone panels, and genetic testing that conventional medicine rarely orders.',
              },
              {
                icon: Users,
                title: 'Root Cause Focus',
                desc: 'Instead of prescribing to mask symptoms, functional medicine doctors investigate why your body is out of balance.',
              },
              {
                icon: CheckCircle,
                title: 'Personalized Plans',
                desc: 'Nutrition, lifestyle, targeted supplements, and precision medicine tailored to your unique biochemistry.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-800 shrink-0">
                  <Icon className="h-5 w-5 text-teal-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{title}</h3>
                  <p className="text-sm text-teal-300 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA for practitioners */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-amber-50 border-y border-amber-200">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Are you a functional medicine practitioner?</h2>
          <p className="text-slate-600 mb-6">
            Join thousands of functional medicine doctors, NPs, and integrative practitioners
            who list on FunctionalMDDirectory.com. Free basic listing. Upgrade to Verified ($149/yr)
            for premium placement and a verified badge.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/submit" className="btn-amber">
              List Your Practice — Free
            </Link>
            <Link href="/listings" className="btn-secondary">
              Browse the Directory
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
