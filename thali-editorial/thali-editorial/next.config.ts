import type { NextConfig } from 'next'

const securityHeaders = [
  // Prevent clickjacking
  { key: 'X-Frame-Options', value: 'DENY' },
  // Prevent MIME sniffing
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // XSS protection (legacy browsers)
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  // Referrer policy
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Permissions policy — disable camera, mic, geolocation
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  // HSTS — force HTTPS
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // Content Security Policy
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // Scripts: self + inline (GSAP needs this) + trusted CDNs
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
      // Styles: self + Google Fonts
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Fonts: self + Google Fonts
      "font-src 'self' https://fonts.gstatic.com data:",
      // Images: self + data URIs (for SVG placeholders)
      "img-src 'self' data: blob:",
      // Media (videos): self only
      "media-src 'self' blob:",
      // Connect: self (no external API calls)
      "connect-src 'self'",
      // Workers: self + blob (Three.js)
      "worker-src 'self' blob:",
      // Frame ancestors: none (clickjacking prevention)
      "frame-ancestors 'none'",
      // Form action: self only
      "form-action 'self'",
      // Base URI: self
      "base-uri 'self'",
      // Object: none
      "object-src 'none'",
    ].join('; '),
  },
]

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [375, 640, 768, 1024, 1280, 1536, 1920],
    // Only allow self-hosted images — no external domains
    remotePatterns: [],
  },

  // Security headers on every route
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },

  experimental: {
    optimizePackageImports: ['framer-motion', 'gsap', 'three'],
  },

  // Disable powered-by header (don't expose Next.js version)
  poweredByHeader: false,

  // Strict mode for catching React issues early
  reactStrictMode: true,
}

export default nextConfig
