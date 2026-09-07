/** Public site origin. Always sourced from NEXT_PUBLIC_SITE_URL. */
export const BASE =
  (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://functionalmddirectory.com').replace(/\/$/, '')

export const CITY_PAGES_PATH = '/functional-medicine-doctors'

export function cityPageUrl(slug: string): string {
  return `${BASE}${CITY_PAGES_PATH}/${slug}`
}
