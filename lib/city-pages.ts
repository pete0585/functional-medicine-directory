import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { CITY_PAGES_PATH } from '@/lib/site'

/** Folder names like `miami-fl`, `colorado-springs-co`, `new-york-ny`. */
const CITY_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*-[a-z]{2}$/

/**
 * Discover static city landing pages from
 * `app/functional-medicine-doctors/{city}-{state}/page.tsx`.
 */
export function getCityPageSlugs(): string[] {
  const dir = join(process.cwd(), 'app', CITY_PAGES_PATH.replace(/^\//, ''))
  if (!existsSync(dir)) return []

  return readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && CITY_SLUG_PATTERN.test(entry.name))
    .filter((entry) => existsSync(join(dir, entry.name, 'page.tsx')))
    .map((entry) => entry.name)
    .sort()
}
