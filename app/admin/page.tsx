import type { Metadata } from 'next'
import { createServiceClient } from '@/lib/supabase/server'
import AdminTable from '@/components/AdminTable'
import { revalidatePath } from 'next/cache'

export const metadata: Metadata = { title: 'Admin — FunctionalMD Directory' }

async function approveListing(id: string) {
  'use server'
  const supabase = await createServiceClient()
  await supabase.from('fm_listings').update({ is_approved: true, is_active: true }).eq('id', id)
  revalidatePath('/admin')
}

async function rejectListing(id: string) {
  'use server'
  const supabase = await createServiceClient()
  await supabase.from('fm_listings').update({ is_active: false }).eq('id', id)
  revalidatePath('/admin')
}

export default async function AdminPage() {
  const supabase = await createServiceClient()

  const [{ data: pending }, { data: all }, { count: total }] = await Promise.all([
    supabase
      .from('fm_listings')
      .select('*')
      .eq('is_approved', false)
      .order('created_at', { ascending: false }),
    supabase
      .from('fm_listings')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50),
    supabase
      .from('fm_listings')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true),
  ])

  const pendingListings = pending ?? []
  const allListings = all ?? []

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Directory Admin</h1>
      <p className="text-slate-500 text-sm mb-8">
        {total ?? 0} active listings total.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          { label: 'Total Active', value: total ?? 0, color: 'teal' },
          { label: 'Pending Review', value: pendingListings.length, color: 'amber' },
          { label: 'All Listings', value: allListings.length, color: 'slate' },
        ].map((stat) => (
          <div key={stat.label} className="card p-5">
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-sm text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {pendingListings.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Pending Review ({pendingListings.length})</h2>
          <AdminTable
            listings={pendingListings as Parameters<typeof AdminTable>[0]['listings']}
            onApprove={approveListing}
            onReject={rejectListing}
          />
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Recent Listings</h2>
        <AdminTable
          listings={allListings as Parameters<typeof AdminTable>[0]['listings']}
          onApprove={approveListing}
          onReject={rejectListing}
        />
      </div>
    </div>
  )
}
