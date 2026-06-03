'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, ExternalLink, Loader2 } from 'lucide-react'
import type { Listing } from '@/types'
import { formatPhone } from '@/lib/utils'

interface AdminTableProps {
  listings: Listing[]
  onApprove: (id: string) => Promise<void>
  onReject: (id: string) => Promise<void>
}

export default function AdminTable({ listings, onApprove, onReject }: AdminTableProps) {
  const [processing, setProcessing] = useState<string | null>(null)

  const handle = async (id: string, action: 'approve' | 'reject') => {
    setProcessing(id)
    try {
      if (action === 'approve') await onApprove(id)
      else await onReject(id)
    } finally {
      setProcessing(null)
    }
  }

  if (listings.length === 0) {
    return (
      <div className="card p-12 text-center">
        <p className="text-slate-400">No listings to review.</p>
      </div>
    )
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-cream-300">
          <thead className="bg-cream-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Practitioner</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Location</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Contact</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Tier</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-200 bg-white">
            {listings.map((listing) => (
              <tr key={listing.id} className="hover:bg-cream-50">
                <td className="px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{listing.full_name}</p>
                    {listing.practice_name && (
                      <p className="text-xs text-slate-500">{listing.practice_name}</p>
                    )}
                    <p className="text-xs text-slate-400 uppercase">{listing.practitioner_type}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">
                  {listing.city}, {listing.state}
                </td>
                <td className="px-4 py-3">
                  {listing.phone && <p className="text-xs text-slate-600">{formatPhone(listing.phone)}</p>}
                  {listing.email && <p className="text-xs text-slate-500">{listing.email}</p>}
                  {listing.website && (
                    <a
                      href={listing.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-teal-600 hover:text-teal-800"
                    >
                      Website <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`badge text-xs ${
                      listing.listing_tier === 'featured'
                        ? 'badge-featured'
                        : listing.listing_tier === 'verified'
                        ? 'badge-verified'
                        : listing.listing_tier === 'free'
                        ? 'badge-free'
                        : 'bg-orange-100 text-orange-800'
                    }`}
                  >
                    {listing.listing_tier}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {processing === listing.id ? (
                    <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
                  ) : (
                    <div className="flex items-center gap-2">
                      {!listing.is_approved && (
                        <button
                          onClick={() => handle(listing.id, 'approve')}
                          className="flex items-center gap-1 rounded-lg bg-teal-100 px-2 py-1 text-xs font-medium text-teal-800 hover:bg-teal-200 transition-colors"
                        >
                          <CheckCircle className="h-3.5 w-3.5" />
                          Approve
                        </button>
                      )}
                      {listing.is_active && (
                        <button
                          onClick={() => handle(listing.id, 'reject')}
                          className="flex items-center gap-1 rounded-lg bg-red-100 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-200 transition-colors"
                        >
                          <XCircle className="h-3.5 w-3.5" />
                          Remove
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
