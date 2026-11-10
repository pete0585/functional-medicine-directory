import { z } from 'zod'
import { text, optional, email, state, website, phone, list, stableSlug, submissionRoute } from './submission-core'

export const schema=z.object({full_name:text(160).min(2),practice_name:optional(200),practitioner_type:z.enum(['md','do','np','nd','pa','dc','other']),city:text(100).min(1),state,email,phone,website,address:optional(300),zip:optional(10),bio:optional(1000),accepting_new_patients:z.boolean().default(true),telehealth_available:z.boolean().default(false),is_ifm_certified:z.boolean().default(false)}).strict()
export function buildRow(d:z.infer<typeof schema>){return {...d,slug:stableSlug(d.full_name,d.email,d.city,d.state),listing_tier:'unclaimed',listing_tier_rank:4,is_active:false,is_approved:false,do_not_email:true,source:'self_submitted'}}
export const POST=submissionRoute(schema,buildRow,{field:'source',value:'self_submitted'})
