import Link from 'next/link'
import { MapPin, Phone, Globe, ShieldCheck, Star, Clock } from 'lucide-react'
import type { Listing } from '@/types'
import { PRACTITIONER_TYPES } from '@/types'
import { formatPhone, formatWebsite } from '@/lib/utils'

interface ListingCardProps {
  listing: Listing
}

export default function ListingCard({ listing }: ListingCardProps) {
  const isFeatured = listing.listing_tier === 'featured'
  const isVerified = listing.listing_tier === 'verified' || isFeatured

  return (
    <Link href={`/listings/${listing.slug}`} className="block group">
      <div className={`card-hover p-5 h-full flex flex-col ${isFeatured ? 'ring-2 ring-amber-400' : ''}`}>
        {isFeatured && (
          <div className="flex items-center gap-1 mb-3">
            <span className="badge-featured text-xs">
              <Star className="h-3 w-3 mr-0.5" />
              Featured
            </span>
          </div>
        )}

        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 truncate group-hover:text-teal-700 transition-colors">
              {listing.full_name}
            </h3>
            {listing.practice_name && listing.practice_name !== listing.full_name && (
              <p className="text-xs text-slate-500 truncate mt-0.5">{listing.practice_name}</p>
            )}
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            {listing.practitioner_type && (
              <span className="badge-teal text-xs">
                {PRACTITIONER_TYPES[listing.practitioner_type] ?? listing.practitioner_type.toUpperCase()}
              </span>
            )}
            {isVerified && (
              <span className="badge-verified text-xs flex items-center gap-0.5">
                <ShieldCheck className="h-3 w-3" />
                Verified
              </span>
            )}
          </div>
        </div>

        <div className="space-y-1.5 text-sm text-slate-500 flex-1">
          {(listing.city || listing.state) && (
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-teal-500 shrink-0" />
              <span className="truncate">
                {[listing.city, listing.state].filter(Boolean).join(', ')}
              </span>
            </div>
          )}
          {listing.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-teal-500 shrink-0" />
              <span>{formatPhone(listing.phone)}</span>
            </div>
          )}
          {listing.website && (
            <div className="flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-teal-500 shrink-0" />
              <span className="truncate">{formatWebsite(listing.website)}</span>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {listing.is_ifm_certified && (
            <span className="badge-amber text-xs">IFM Certified</span>
          )}
          {listing.telehealth_available && (
            <span className="badge bg-teal-50 text-teal-700 text-xs">Telehealth</span>
          )}
          {listing.accepting_new_patients && (
            <span className="flex items-center gap-1 text-xs text-teal-600">
              <Clock className="h-3 w-3" />
              Accepting patients
            </span>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-cream-200">
          <span className="text-xs font-medium text-teal-700 group-hover:text-teal-800 transition-colors">
            View profile →
          </span>
        </div>
      </div>
    </Link>
  )
}
