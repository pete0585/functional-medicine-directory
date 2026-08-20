import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import ClaimPageClient from './ClaimPageClient'
import { createServiceClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Claim Your Listing | FunctionalMDDirectory.com',
  description: 'Claim and verify your functional medicine practice listing.',
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ClaimPage({ params }: PageProps) {
  const { id } = await params

  const supabase = await createServiceClient()
  // Accept either UUID id or slug
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)
  const { data: listing } = await supabase
    .from('fm_listings')
    .select('id, full_name, city, state, listing_tier, claimed_at')
    .eq(isUUID ? 'id' : 'slug', id)
    .single()

  if (!listing) notFound()

  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><div className="animate-pulse text-slate-400">Loading...</div></div>}>
      <ClaimPageClient listing={listing} />
    </Suspense>
  )
}
