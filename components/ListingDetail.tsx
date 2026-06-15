import Link from 'next/link'
import { MapPin, Phone, Globe, ShieldCheck, Star, Clock, Video, CheckCircle, Award } from 'lucide-react'
import type { Listing } from '@/types'
import { PRACTITIONER_TYPES } from '@/types'
import { formatPhone, formatWebsite } from '@/lib/utils'

interface ListingDetailProps {
  listing: Listing
  monthlyViews: number
}

export default function ListingDetail({ listing, monthlyViews }: ListingDetailProps) {
  const isFeatured = listing.listing_tier === 'featured'
  const isVerified = listing.listing_tier === 'verified' || isFeatured
  const isClaimed = listing.listing_tier !== 'unclaimed' && listing.listing_tier != null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className={`card p-8 ${isFeatured ? 'ring-2 ring-amber-400' : ''}`}>
          {isFeatured && (
            <div className="flex items-center gap-1 mb-4">
              <span className="badge-featured">
                <Star className="h-3 w-3 mr-1" />
                Featured Listing
              </span>
            </div>
          )}

          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{listing.full_name}</h1>
              {listing.practice_name && listing.practice_name !== listing.full_name && (
                <p className="text-slate-500 mt-1">{listing.practice_name}</p>
              )}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                {listing.practitioner_type && (
                  <span className="badge-teal">
                    {PRACTITIONER_TYPES[listing.practitioner_type] ?? listing.practitioner_type.toUpperCase()}
                  </span>
                )}
                {isVerified && (
                  <span className="badge-verified flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Verified Listing
                  </span>
                )}
                {listing.is_ifm_certified && (
                  <span className="badge-amber flex items-center gap-1">
                    <Award className="h-3.5 w-3.5" />
                    IFM Certified
                  </span>
                )}
              </div>
            </div>
          </div>

          {isClaimed && listing.bio && (
            <div className="mt-6">
              <h2 className="text-sm font-semibold text-slate-700 mb-2">About</h2>
              <p className="text-slate-600 leading-relaxed">{listing.bio}</p>
            </div>
          )}

          {listing.specialties && listing.specialties.length > 0 && (
            <div className="mt-6">
              <h2 className="text-sm font-semibold text-slate-700 mb-3">Specialties</h2>
              <div className="flex flex-wrap gap-2">
                {listing.specialties.map((s, i) => (
                  <span key={i} className="badge-teal">{s}</span>
                ))}
              </div>
            </div>
          )}

          {listing.conditions_treated && listing.conditions_treated.length > 0 && (
            <div className="mt-6">
              <h2 className="text-sm font-semibold text-slate-700 mb-3">Conditions Treated</h2>
              <div className="flex flex-wrap gap-2">
                {listing.conditions_treated.map((c, i) => (
                  <span key={i} className="badge bg-cream-200 text-slate-700">{c}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Stats dashboard for claimed listings */}
        {isClaimed && (
          <div className='rounded-xl border border-blue-200 bg-blue-50 p-4'>
            <p className='text-xs font-semibold uppercase tracking-wide text-blue-600'>Profile Activity</p>
            <p className='mt-1 text-3xl font-bold text-blue-900'>{monthlyViews}</p>
            <p className='text-sm text-blue-700'>people viewed your profile this month</p>
            {listing.listing_tier === 'free' && (
              <p className='mt-2 text-xs text-blue-600'>
                0 could contact you.{' '}
                <a href={`/claim/${listing.id}?upgrade=true`} className='underline font-medium'>
                  Upgrade to be reachable →
                </a>
              </p>
            )}
          </div>
        )}

        {!isClaimed && (
          <div className="card p-6 border-dashed border-2 border-cream-300 bg-teal-50">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-teal-600 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-semibold text-teal-900 text-sm">Is this your practice?</h3>
                <p className="text-sm text-teal-700 mt-1">
                  Claim this listing to update your information and appear higher in search results.
                  Free to claim — verified listings get more patient inquiries.
                </p>
                <Link
                  href={`/claim/${listing.id}`}
                  className="btn-primary mt-3 text-sm py-2"
                >
                  Claim This Listing
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="card p-6">
          <h2 className="text-sm font-semibold text-slate-700 mb-4">Contact & Location</h2>
          <div className="space-y-3">
            {(listing.city || listing.state) && (
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-teal-600 mt-0.5 shrink-0" />
                <div>
                  {listing.address && (
                    <p className="text-sm text-slate-600">{listing.address}</p>
                  )}
                  <p className="text-sm text-slate-600">
                    {[listing.city, listing.state, listing.zip].filter(Boolean).join(', ')}
                  </p>
                </div>
              </div>
            )}
            {isClaimed ? (
              <>
                {listing.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-teal-600 shrink-0" />
                    <a href={`tel:${listing.phone}`} className="text-sm text-teal-700 hover:text-teal-900 font-medium">
                      {formatPhone(listing.phone)}
                    </a>
                  </div>
                )}
                {listing.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-teal-600 shrink-0" />
                    <a
                      href={listing.website.startsWith('http') ? listing.website : `https://${listing.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-teal-700 hover:text-teal-900 font-medium truncate"
                    >
                      {formatWebsite(listing.website)}
                    </a>
                  </div>
                )}
              </>
            ) : (
              <div className='rounded-lg border border-gray-200 bg-gray-50 p-4 text-center'>
                <p className='text-sm text-gray-500'>
                  Phone, website, and bio are only visible after this provider claims their listing.
                </p>
                <a
                  href={`/claim/${listing.id}`}
                  className='mt-2 inline-block text-sm font-medium text-blue-600 hover:underline'
                >
                  Is this you? Claim your free profile →
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-sm font-semibold text-slate-700 mb-4">Quick Info</h2>
          <ul className="space-y-2.5">
            <li className="flex items-center gap-2.5 text-sm">
              {listing.accepting_new_patients ? (
                <>
                  <Clock className="h-4 w-4 text-teal-500" />
                  <span className="text-teal-700 font-medium">Accepting new patients</span>
                </>
              ) : (
                <>
                  <Clock className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-500">Not accepting new patients</span>
                </>
              )}
            </li>
            <li className="flex items-center gap-2.5 text-sm">
              {listing.telehealth_available ? (
                <>
                  <Video className="h-4 w-4 text-teal-500" />
                  <span className="text-teal-700 font-medium">Telehealth available</span>
                </>
              ) : (
                <>
                  <Video className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-500">In-person only</span>
                </>
              )}
            </li>
            {listing.is_ifm_certified && (
              <li className="flex items-center gap-2.5 text-sm">
                <Award className="h-4 w-4 text-amber-500" />
                <span className="text-amber-700 font-medium">IFM Certified</span>
              </li>
            )}
          </ul>
        </div>

        {isVerified && (
          <div className="card p-6 bg-teal-50 border-teal-200">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="h-5 w-5 text-teal-700" />
              <span className="text-sm font-semibold text-teal-900">Verified Listing</span>
            </div>
            <p className="text-xs text-teal-700">
              This practitioner has verified their information on FunctionalMDDirectory.com.
            </p>
          </div>
        )}

        {!isVerified && isClaimed && (
          <div className="card p-6 bg-amber-50 border-amber-200">
            <h3 className="text-sm font-semibold text-amber-900 mb-2">Upgrade to Verified</h3>
            <p className="text-xs text-amber-800 mb-3">
              Get a verified badge, appear higher in search results, and attract more patients.
            </p>
            <ul className="space-y-1 mb-4">
              {['Verified badge on your profile', 'Priority placement in search', 'IFM certification highlight', 'Patient inquiry tracking'].map((f) => (
                <li key={f} className="flex items-center gap-1.5 text-xs text-amber-800">
                  <CheckCircle className="h-3.5 w-3.5 text-amber-600" />
                  {f}
                </li>
              ))}
            </ul>
            <p className="text-xs font-bold text-amber-900 mb-2">$149/year</p>
            <Link
              href={`/claim/${listing.id}?verified=true`}
              className="btn-amber text-xs py-2 w-full text-center"
            >
              Upgrade to Verified
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
