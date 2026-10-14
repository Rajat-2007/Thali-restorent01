'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

const gallery = [
  {
    src: '/images/image-1.webp',
    alt: 'Royal Indian thali fully assembled with all components in warm daylight',
    aspect: 'aspect-[4/5]',
    caption: '01 · The Exploded Royal Thali',
  },
  {
    src: '/images/image-2.webp',
    alt: 'Crispy samosa deconstructed in mid-air with spiced potato and peas',
    aspect: 'aspect-[3/4]',
    caption: '02 · Deconstructed Samosa',
  },
  {
    src: '/images/image-3.webp',
    alt: 'Geometric still life of authentic Indian whole spices',
    aspect: 'aspect-[4/5]',
    caption: '03 · Spice Constellation',
  },
  {
    src: '/images/image-4.webp',
    alt: 'Overhead royal dining table with steam, fresh herbs and brass vessels',
    aspect: 'aspect-[3/4]',
    caption: '04 · The Dining Table',
  },
]

export function DiningExperience() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const introVisualRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const section = sectionRef.current
      const video = videoRef.current
      const introVisual = introVisualRef.current
      const headline = headlineRef.current
      const galleryEl = galleryRef.current
      if (!section) return

      // Video and image scale scrub for the intro reveal
      if (introVisual) {
        gsap.to(introVisual, {
          scale: 1.15,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'top top',
            scrub: 1.2,
            onUpdate: (self) => {
              if (video && video.duration) {
                video.currentTime = self.progress * video.duration
              }
            },
          },
        })
      }

      if (headline) {
        gsap.fromTo(
          headline,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: { trigger: headline, start: 'top 80%' },
          }
        )
      }

      // Multi-plane gallery parallax: odd and even cards glide at different speeds
      if (galleryEl) {
        const items = galleryEl.querySelectorAll('[data-gallery-item]')
        items.forEach((item, i) => {
          const el = item as HTMLElement
          const speed = i % 2 === 0 ? 35 : -35

          gsap.fromTo(
            el,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: i * 0.1,
              ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 85%' },
            }
          )

          // Smooth parallax glide inside
          gsap.to(el, {
            y: speed,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          })
        })
      }
    }
    initGSAP()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative bg-canvas overflow-hidden"
      aria-labelledby="experience-headline"
    >
      {/* Video / Visual Header with Scale Scrub */}
      <div
        className="relative overflow-hidden flex items-center justify-center"
        style={{ height: '70svh', minHeight: '400px' }}
        data-cursor="video"
      >
        <div ref={introVisualRef} className="absolute inset-0 will-change-transform">
          <video
            ref={videoRef}
            className="video-scrub gpu"
            src="/videos/video-6.mp4"
            muted
            playsInline
            preload="none"
            aria-label="Premium Indian dining table reveal with floating dishes assembling"
          />
          <Image
            src="/images/image-4.webp"
            alt="Overhead royal dining table reveal with floating herbs and rising steam"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(250,250,248,0.3) 0%, rgba(250,250,248,0.7) 70%, rgba(250,250,248,1) 100%)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-20 text-center px-5 max-w-4xl mx-auto">
          <p className="section-label mb-3 md:mb-5 text-charcoal/80">
            06 — The Culinary Theatre
          </p>
          <h2
            id="experience-headline"
            ref={headlineRef}
            className="font-fraunces font-light text-charcoal leading-tight text-balance"
            style={{ fontSize: 'clamp(2.4rem, 7vw, 6.8rem)', opacity: 0 }}
          >
            Where time
            <br />
            <em className="italic text-charcoal-light">slows down.</em>
          </h2>
        </div>
      </div>

      {/* Multi-Plane Parallax Editorial Gallery */}
      <div className="px-5 md:px-12 py-16 md:py-28 max-w-screen-xl mx-auto">
        <div ref={galleryRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 items-start">
          {gallery.map((img, i) => (
            <div
              key={i}
              data-gallery-item={i}
              className={`group relative overflow-hidden bg-cream-dark border border-cream-dark shadow-sm hover:shadow-md transition-shadow will-change-transform ${
                i === 1 ? 'sm:mt-12' : i === 3 ? 'sm:mt-8' : ''
              }`}
              style={{ opacity: 0 }}
            >
              <div className={`relative ${img.aspect} overflow-hidden`}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-3 bg-canvas/90 border-t border-cream-dark">
                <p className="section-label text-charcoal text-[11px]">{img.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Editorial Quote */}
        <div className="mt-20 md:mt-32 max-w-3xl mx-auto text-center px-4">
          <blockquote>
            <p
              className="font-fraunces font-light italic text-charcoal-light leading-snug text-balance"
              style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.8rem)' }}
            >
              &ldquo;The thali is not a meal. It is a conversation between flavours that have known each other for centuries.&rdquo;
            </p>
            <footer className="mt-6 md:mt-8">
              <cite className="section-label not-italic text-charcoal-muted">
                — Chef Arjun Mehta · Culinary Director
              </cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
