
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/Thali-Restorent-and-Cafe',
  trailingSlash: true,

  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [375, 640, 768, 1024, 1280, 1536, 1920],
    remotePatterns: [],
  },

  poweredByHeader: false,
  reactStrictMode: true,

  experimental: {
    optimizePackageImports: ['framer-motion', 'gsap', 'three'],
  },
}

export default nextConfig
