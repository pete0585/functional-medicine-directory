import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Functional Medicine Doctor Directory | FunctionalMDDirectory.com',
    template: '%s | FunctionalMDDirectory.com',
  },
  description:
    'Find a functional medicine doctor near you. Search IFM-certified practitioners, integrative medicine specialists, and root cause physicians by location and specialty.',
  keywords: [
    'functional medicine doctor',
    'functional medicine near me',
    'IFM certified practitioner',
    'integrative medicine doctor',
    'root cause medicine',
    'functional medicine specialist',
    'holistic doctor',
  ],
  authors: [{ name: 'FunctionalMDDirectory.com' }],
  creator: 'FunctionalMDDirectory.com',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://functionalmddirectory.com',
    siteName: 'FunctionalMDDirectory.com',
    title: 'Find a Functional Medicine Doctor Near You',
    description:
      'Search IFM-certified practitioners and integrative medicine specialists. Find a doctor who treats the root cause, not just the symptoms.',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://functionalmddirectory.com'}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'FunctionalMDDirectory.com — Find a Functional Medicine Doctor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Find a Functional Medicine Doctor Near You',
    description: 'IFM-certified practitioners and integrative medicine specialists near you.',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://functionalmddirectory.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
