import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import { GrainOverlay } from '@/components/ui/GrainOverlay'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { SmoothScroll } from '@/components/layout/SmoothScroll'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

// Using Google Fonts CDN for Fraunces via @import in globals.css
// but also declaring the CSS var here for Tailwind usage
const frauncesMeta = {
  variable: '--font-fraunces',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://thali-restaurant.com'),
  title: 'Thali — A Royal Indian Culinary Journey',
  description: 'An editorial luxury dining experience. Michelin-star Indian cuisine crafted with heritage spices, premium ingredients, and artisan techniques.',
  keywords: ['Indian cuisine', 'fine dining', 'Michelin', 'luxury restaurant', 'thali'],
  authors: [{ name: 'Thali Restaurant' }],
  openGraph: {
    title: 'Thali — Royal Indian Culinary Experience',
    description: 'Where tradition meets luxury. An editorial dining journey.',
    type: 'website',
    images: ['/images/image-1.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thali — Royal Indian Culinary Experience',
    images: ['/images/image-1.webp'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FAFAF8',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,300;1,9..144,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-canvas text-charcoal overflow-x-hidden">
        <GrainOverlay />
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
