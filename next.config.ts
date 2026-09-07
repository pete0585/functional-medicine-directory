import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  // Keep city page folders available so sitemap filesystem discovery works at runtime.
  outputFileTracingIncludes: {
    '/sitemap.xml': ['./app/functional-medicine-doctors/**/*'],
  },
}

export default nextConfig
