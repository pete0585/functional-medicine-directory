'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Stethoscope, Loader2 } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [secret, setSecret] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret }),
      })
      if (res.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-100 px-4">
      <div className="card p-10 w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-700">
            <Stethoscope className="h-6 w-6 text-white" aria-label="Admin" />
          </div>
        </div>
        <h1 className="text-xl font-bold text-slate-900 text-center mb-6">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Admin Secret</label>
            <input
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              required
              className="input"
              placeholder="Enter admin secret"
            />
          </div>
          {error && (
            <p className="text-xs text-red-500 text-center">Invalid secret. Try again.</p>
          )}
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  )
}
