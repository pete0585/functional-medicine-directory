'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin } from 'lucide-react'

interface SearchBarProps {
  size?: 'default' | 'large'
  initialQuery?: string
  initialState?: string
}

export default function SearchBar({ size = 'default', initialQuery = '', initialState = '' }: SearchBarProps) {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)
  const [state, setState] = useState(initialState)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    if (state.trim()) params.set('state', state.trim())
    router.push(`/listings?${params.toString()}`)
  }

  const isLarge = size === 'large'

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-2 w-full ${isLarge ? 'max-w-2xl' : 'max-w-xl'}`}>
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Name, specialty, or condition..."
          className={`input pl-10 ${isLarge ? 'py-4 text-base' : ''}`}
        />
      </div>
      <div className="relative sm:w-36">
        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
          className={`input pl-10 ${isLarge ? 'py-4 text-base' : ''} appearance-none`}
        >
          <option value="">All States</option>
          {US_STATES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <button type="submit" className={`btn-primary ${isLarge ? 'py-4 px-8 text-base' : ''} whitespace-nowrap`}>
        Search
      </button>
    </form>
  )
}

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
  'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC',
]
