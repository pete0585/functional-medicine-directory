'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ShieldCheck, Mail, CheckCircle, Stethoscope, Loader2 } from 'lucide-react'

interface ClaimProps {
  listing: {
    id: string
    full_name: string
    city: string
    state: string
    listing_tier: string
    claimed_at: string | null
  }
}

export default function ClaimPageClient({ listing }: ClaimProps) {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const showUpgrade = searchParams.get('verified') === 'true'

  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle')
  const [verified, setVerified] = useState(showUpgrade)
  const [verifyError, setVerifyError] = useState<string | null>(null)
  const [verifying, setVerifying] = useState(false)

  const alreadyClaimed = !!listing.claimed_at && listing.listing_tier !== 'unclaimed'

  useEffect(() => {
    if (!token || verified || verifyError) return
    setVerifying(true)
    fetch(`/api/claim/verify?token=${token}&listing_id=${listing.id}`)
      .then((r) => {
        if (r.ok) {
          setVerified(true)
        } else {
          setVerifyError('This verification link has expired or is invalid. Please re-submit your email below.')
        }
      })
      .catch(() => setVerifyError('Verification failed. Please try again.'))
      .finally(() => setVerifying(false))
  }, [token, listing.id, verified, verifyError])

  const handleSendToken = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listing_id: listing.id, email }),
      })
      if (res.ok) {
        setStatus('sent')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (verifying) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-teal-600 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">Verifying your claim...</p>
        </div>
      </div>
    )
  }

  if (verified) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full card p-10 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
              <CheckCircle className="h-8 w-8 text-teal-700" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-3">Listing claimed!</h1>
          <p className="text-slate-500 mb-6">
            You&apos;ve verified ownership of <strong>{listing.full_name}</strong>&apos;s listing.
            Upgrade to Verified for a badge, priority placement, and more patient inquiries.
          </p>
          <div className="space-y-3">
            <Link href={`/listings/${listing.id}?verified=true`} className="btn-amber w-full block text-center">
              Upgrade to Verified — $149/yr
            </Link>
            <Link href={`/listings/${listing.id}`} className="btn-secondary w-full block text-center text-sm">
              View My Listing
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (alreadyClaimed) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full card p-10 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
              <ShieldCheck className="h-8 w-8 text-teal-700" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-3">Already claimed</h1>
          <p className="text-slate-500 mb-6">
            {listing.full_name} in {listing.city}, {listing.state} has already been claimed.
          </p>
          <Link href="/listings" className="btn-secondary w-full block text-center">
            Back to Directory
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
              <Stethoscope className="h-8 w-8 text-teal-700" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Claim Your Listing</h1>
          <p className="text-slate-500">
            Claiming <strong>{listing.full_name}</strong> in {listing.city}, {listing.state}.
            Enter your professional email to verify ownership.
          </p>
        </div>

        {verifyError && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-600">
            {verifyError}
          </div>
        )}

        {status === 'sent' ? (
          <div className="card p-8 text-center">
            <Mail className="h-8 w-8 text-teal-600 mx-auto mb-4" />
            <h2 className="text-lg font-bold text-slate-900 mb-2">Check your email</h2>
            <p className="text-slate-500 text-sm">
              We sent a verification link to <strong>{email}</strong>. Click the link to complete
              your claim. It expires in 72 hours.
            </p>
          </div>
        ) : (
          <div className="card p-8">
            <form onSubmit={handleSendToken} className="space-y-4">
              <div>
                <label className="label">Your professional email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input"
                  placeholder="dr@yourpractice.com"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary w-full"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Verification Email'
                )}
              </button>
              {status === 'error' && (
                <p className="text-xs text-red-500 text-center">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
            <div className="mt-6 pt-6 border-t border-cream-300">
              <p className="text-xs text-slate-400 text-center">
                Free to claim — no credit card required. By claiming this listing, you confirm
                you are the practitioner or authorized representative.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
