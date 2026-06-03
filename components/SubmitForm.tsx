'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle, Loader2 } from 'lucide-react'

const schema = z.object({
  full_name: z.string().min(2, 'Name is required'),
  practice_name: z.string().optional(),
  practitioner_type: z.enum(['md', 'do', 'np', 'nd', 'pa', 'dc', 'other']),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  website: z.string().url('Must be a valid URL (include https://)').optional().or(z.literal('')),
  address: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().length(2, 'Select a state'),
  zip: z.string().optional(),
  bio: z.string().max(1000).optional(),
  accepting_new_patients: z.boolean(),
  telehealth_available: z.boolean(),
  is_ifm_certified: z.boolean(),
})

type FormData = z.infer<typeof schema>

export default function SubmitForm() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      practitioner_type: 'md',
      accepting_new_patients: true,
      telehealth_available: false,
      is_ifm_certified: false,
    },
  })

  const onSubmit = async (data: FormData) => {
    setError(null)
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        const body = await res.json().catch(() => ({}))
        setError((body as { error?: string }).error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    }
  }

  if (submitted) {
    return (
      <div className="card p-12 text-center max-w-lg mx-auto">
        <div className="flex justify-center mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
            <CheckCircle className="h-8 w-8 text-teal-700" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Listing Submitted!</h2>
        <p className="text-slate-500">
          Your practice has been submitted for review. We&apos;ll have it live within 24 hours.
          You&apos;ll receive an email when it&apos;s approved.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card p-8 space-y-6 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Full Name *</label>
          <input className="input" placeholder="Dr. Jane Smith" {...register('full_name')} />
          {errors.full_name && <p className="text-xs text-red-500 mt-1">{errors.full_name.message}</p>}
        </div>
        <div>
          <label className="label">Practice Name</label>
          <input className="input" placeholder="Smith Functional Medicine" {...register('practice_name')} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Practitioner Type *</label>
          <select className="input" {...register('practitioner_type')}>
            <option value="md">MD (Medical Doctor)</option>
            <option value="do">DO (Osteopathic)</option>
            <option value="np">NP/APRN</option>
            <option value="nd">ND (Naturopathic)</option>
            <option value="pa">PA (Physician Assistant)</option>
            <option value="dc">DC (Chiropractor)</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="label">Email Address *</label>
          <input className="input" type="email" placeholder="dr@yourpractice.com" {...register('email')} />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Phone</label>
          <input className="input" type="tel" placeholder="(555) 000-0000" {...register('phone')} />
        </div>
        <div>
          <label className="label">Website</label>
          <input className="input" type="url" placeholder="https://yourpractice.com" {...register('website')} />
          {errors.website && <p className="text-xs text-red-500 mt-1">{errors.website.message}</p>}
        </div>
      </div>

      <div>
        <label className="label">Street Address</label>
        <input className="input" placeholder="123 Main St" {...register('address')} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-1">
          <label className="label">City *</label>
          <input className="input" placeholder="Austin" {...register('city')} />
          {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city.message}</p>}
        </div>
        <div>
          <label className="label">State *</label>
          <select className="input" {...register('state')}>
            <option value="">—</option>
            {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state.message}</p>}
        </div>
        <div>
          <label className="label">ZIP Code</label>
          <input className="input" placeholder="78701" {...register('zip')} />
        </div>
      </div>

      <div>
        <label className="label">About Your Practice (optional)</label>
        <textarea
          className="input min-h-[100px] resize-none"
          placeholder="Brief description of your approach to functional medicine..."
          {...register('bio')}
        />
      </div>

      <div className="space-y-3">
        <label className="label">Services</label>
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input type="checkbox" className="h-4 w-4 rounded border-cream-300 text-teal-700 focus:ring-teal-500" {...register('accepting_new_patients')} />
          <span className="text-sm text-slate-700">Currently accepting new patients</span>
        </label>
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input type="checkbox" className="h-4 w-4 rounded border-cream-300 text-teal-700 focus:ring-teal-500" {...register('telehealth_available')} />
          <span className="text-sm text-slate-700">Telehealth / virtual appointments available</span>
        </label>
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input type="checkbox" className="h-4 w-4 rounded border-cream-300 text-teal-700 focus:ring-teal-500" {...register('is_ifm_certified')} />
          <span className="text-sm text-slate-700">IFM (Institute for Functional Medicine) Certified</span>
        </label>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit My Listing — Free'
        )}
      </button>

      <p className="text-xs text-slate-400 text-center">
        Free to list. Reviewed within 24 hours. No credit card required.
        Upgrade to Verified ($149/yr) or Featured ($299/yr) after listing goes live.
      </p>
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
