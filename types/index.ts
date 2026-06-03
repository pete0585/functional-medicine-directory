export interface Listing {
  id: string
  full_name: string
  slug: string
  practitioner_type: string
  listing_tier: 'unclaimed' | 'free' | 'verified' | 'featured'
  practice_name?: string
  phone?: string
  website?: string
  email?: string
  email_source?: string
  do_not_email: boolean
  address?: string
  city: string
  state: string
  zip?: string
  latitude?: number
  longitude?: number
  specialties: string[]
  conditions_treated: string[]
  accepting_new_patients: boolean
  telehealth_available: boolean
  is_ifm_certified: boolean
  bio?: string
  is_active: boolean
  is_approved: boolean
  claimed_at?: string
  claimed_by_email?: string
  outreach_sent_at?: string
  source?: string
  listing_tier_rank?: number
  created_at: string
  updated_at: string
}

export interface Claim {
  id: string
  listing_id: string
  email: string
  token: string
  verified: boolean
  verified_at?: string
  created_at: string
  expires_at: string
  nudge_sent_at?: string
}

export interface Payment {
  id: string
  listing_id?: string
  stripe_payment_intent_id?: string
  stripe_subscription_id?: string
  amount_cents: number
  currency: string
  tier: string
  status: string
  period_start?: string
  period_end?: string
  created_at: string
}

export interface Category {
  slug: string
  label: string
  description: string
  icon: string
}

export const CATEGORIES: Category[] = [
  {
    slug: 'functional-medicine-doctors',
    label: 'Functional Medicine Doctors (MD/DO)',
    description: 'Board-certified physicians trained in functional and integrative medicine',
    icon: '🩺',
  },
  {
    slug: 'nurse-practitioners',
    label: 'Nurse Practitioners (NP/APRN)',
    description: 'Advanced practice nurses specializing in functional health',
    icon: '💊',
  },
  {
    slug: 'naturopathic-doctors',
    label: 'Naturopathic Doctors (ND)',
    description: 'Licensed NDs using natural and evidence-based therapies',
    icon: '🌿',
  },
  {
    slug: 'integrative-medicine',
    label: 'Integrative Medicine',
    description: 'Practitioners blending conventional and alternative medicine',
    icon: '⚕️',
  },
  {
    slug: 'hormone-optimization',
    label: 'Hormone Optimization',
    description: 'Specialists in hormonal balance and thyroid health',
    icon: '🔬',
  },
  {
    slug: 'gut-health',
    label: 'Gut Health & Microbiome',
    description: 'Experts in digestive health, SIBO, and microbiome restoration',
    icon: '🦠',
  },
  {
    slug: 'autoimmune-chronic-disease',
    label: 'Autoimmune & Chronic Disease',
    description: 'Root cause specialists for complex, chronic conditions',
    icon: '🛡️',
  },
  {
    slug: 'anti-aging-longevity',
    label: 'Anti-Aging & Longevity',
    description: 'Practitioners focused on healthspan optimization',
    icon: '⏳',
  },
]

export const PRACTITIONER_TYPES: Record<string, string> = {
  md: 'MD',
  do: 'DO',
  np: 'NP/APRN',
  nd: 'ND',
  dc: 'DC',
  pa: 'PA',
  other: 'Other',
}

export const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'DC',
]
