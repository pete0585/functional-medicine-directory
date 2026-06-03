'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { CATEGORIES, US_STATES } from '@/types'
import { Filter, X } from 'lucide-react'

export default function FilterSidebar() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === null || value === '') {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    params.delete('page')
    router.push(`/listings?${params.toString()}`)
  }

  const clearAll = () => {
    router.push('/listings')
  }

  const hasFilters = Array.from(searchParams.keys()).some((k) => k !== 'q')

  const currentState = searchParams.get('state') ?? ''
  const currentType = searchParams.get('type') ?? ''
  const currentCategory = searchParams.get('category') ?? ''

  return (
    <aside className="w-full">
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
            <Filter className="h-4 w-4 text-teal-600" />
            Filters
          </div>
          {hasFilters && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-red-500 transition-colors"
            >
              <X className="h-3 w-3" />
              Clear
            </button>
          )}
        </div>

        <div className="space-y-5">
          <div>
            <label className="label">State</label>
            <select
              value={currentState}
              onChange={(e) => updateFilter('state', e.target.value || null)}
              className="input"
            >
              <option value="">All States</option>
              {US_STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Practitioner Type</label>
            <select
              value={currentType}
              onChange={(e) => updateFilter('type', e.target.value || null)}
              className="input"
            >
              <option value="">All Types</option>
              <option value="md">MD (Medical Doctor)</option>
              <option value="do">DO (Osteopathic)</option>
              <option value="np">NP/APRN</option>
              <option value="nd">ND (Naturopathic)</option>
              <option value="pa">PA (Physician Assistant)</option>
              <option value="dc">DC (Chiropractor)</option>
            </select>
          </div>

          <div>
            <label className="label">Specialty</label>
            <select
              value={currentCategory}
              onChange={(e) => updateFilter('category', e.target.value || null)}
              className="input"
            >
              <option value="">All Specialties</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.label.split('(')[0].trim()}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="label">Options</label>
            <FilterCheckbox
              label="Telehealth Available"
              paramKey="telehealth"
              value="true"
              searchParams={searchParams}
              onUpdate={updateFilter}
            />
            <FilterCheckbox
              label="Accepting New Patients"
              paramKey="accepting"
              value="true"
              searchParams={searchParams}
              onUpdate={updateFilter}
            />
            <FilterCheckbox
              label="IFM Certified"
              paramKey="ifm"
              value="true"
              searchParams={searchParams}
              onUpdate={updateFilter}
            />
          </div>
        </div>
      </div>
    </aside>
  )
}

function FilterCheckbox({
  label,
  paramKey,
  value,
  searchParams,
  onUpdate,
}: {
  label: string
  paramKey: string
  value: string
  searchParams: URLSearchParams
  onUpdate: (key: string, value: string | null) => void
}) {
  const isChecked = searchParams.get(paramKey) === value

  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => onUpdate(paramKey, isChecked ? null : value)}
        className="h-4 w-4 rounded border-cream-300 text-teal-700 focus:ring-teal-500"
      />
      <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{label}</span>
    </label>
  )
}
