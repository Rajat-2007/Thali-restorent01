'use client'

import { useEffect, useRef, Suspense } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const SpiceParticles = dynamic(() => import('@/components/three/SpiceParticles'), { ssr: false })

const spices = [
  { name: 'Turmeric', origin: 'Erode, Tamil Nadu', color: '#F59E0B', desc: 'Golden root of healing and earthy fragrance.' },
  { name: 'Red Chilli', origin: 'Guntur, Andhra Pradesh', color: '#DC2626', desc: 'Smoked heat that awakens every layer of flavour.' },
  { name: 'Cardamom', origin: 'Idukki, Kerala', color: '#16A34A', desc: 'Queen of spices, sweet floral aroma.' },
  { name: 'Cinnamon', origin: 'Wayanad, Kerala', color: '#92400E', desc: 'Velvety bark sweetness that lingers.' },
  { name: 'Star Anise', origin: 'Arunachal Pradesh', color: '#7C3AED', desc: 'A celestial eight-point aromatic star.' },
  { name: 'Black Pepper', origin: 'Malabar Coast', color: '#1C1917', desc: 'King of spices. Bold, pungent, unapologetic.' },
]

export function SpicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const section = sectionRef.current
      const video = videoRef.current
      const visual = visualRef.current
      const headline = headlineRef.current
      const cards = cardsRef.current
      if (!section) return

      // Scroll scrubbing timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          onUpdate: (self) => {
            if (video && video.duration) {
              video.currentTime = self.progress * video.duration
            }
          },
        },
      })

      // Geometric spice image gently scales and rotates on scrub
      if (visual) {
        tl.fromTo(visual, { scale: 1, rotate: 0 }, { scale: 1.25, rotate: 3, ease: 'none' }, 0)
      }

      if (headline) {
        gsap.fromTo(
          headline,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' },
          }
        )
      }

      if (cards) {
        const cardItems = cards.querySelectorAll('[data-card]')
        gsap.fromTo(
          cardItems,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.08,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: cards, start: 'top 75%', toggleActions: 'play none none none' },
          }
        )
      }
    }
    initGSAP()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="spices"
      className="relative bg-canvas"
      style={{ height: '240vh' }}
      aria-labelledby="spices-headline"
    >
      <div
        className="sticky top-0 overflow-hidden flex flex-col justify-between"
        style={{ height: '100svh', minHeight: '520px' }}
      >
        {/* Visual Layer (Video + Image fallback with Three.js 3D particles) */}
        <div ref={visualRef} className="absolute inset-0 z-0 will-change-transform" data-cursor="video">
          <video
            ref={videoRef}
            className="video-scrub gpu"
            src="/videos/video-3.mp4"
            muted
            playsInline
            preload="none"
            aria-label="Indian spices exploding into suspended particle cloud"
          />
          <Image
            src="/images/image-3.webp"
            alt="Geometric composition of authentic Indian spices floating in natural daylight"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* 3D Three.js particle constellation swarming around the spices */}
        <div className="absolute inset-0 z-10 pointer-events-none" aria-hidden="true">
          <Suspense fallback={null}>
            <SpiceParticles />
          </Suspense>
        </div>

        {/* Subtle radial overlay for editorial focus */}
        <div
          className="absolute inset-0 z-15 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(250,250,248,0.2) 0%, rgba(250,250,248,0.7) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative z-30 h-full flex flex-col justify-between px-5 md:px-12 py-14 md:py-18 max-w-screen-xl mx-auto w-full">
          {/* Top Headline */}
          <div ref={headlineRef} style={{ opacity: 0 }}>
            <p className="section-label mb-2 md:mb-3 opacity-75">03 — Single-Origin Constellation</p>
            <h2
              id="spices-headline"
              className="font-fraunces font-light text-charcoal leading-tight text-balance"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 4.5rem)' }}
            >
              Six spices.
              <br />
              <em className="italic text-charcoal-light">A thousand stories.</em>
            </h2>
          </div>

          {/* Spice cards grid with subtle hover lift and 3D depth */}
          <div ref={cardsRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 md:gap-4 pb-4">
            {spices.map((spice, i) => (
              <div
                key={spice.name}
                data-card={i}
                className="group relative bg-canvas/85 backdrop-blur-md p-3.5 md:p-4 border border-cream-dark shadow-xs hover:-translate-y-1.5 transition-transform duration-300 cursor-default"
                style={{ opacity: 0 }}
              >
                <div
                  className="w-3 h-3 rounded-full mb-2 md:mb-3 flex-shrink-0"
                  style={{ backgroundColor: spice.color }}
                  aria-hidden="true"
                />
                <h3 className="font-fraunces font-light text-charcoal text-sm md:text-base mb-0.5 leading-snug">
                  {spice.name}
                </h3>
                <p className="section-label mb-1 md:mb-2 text-[10px] text-charcoal-muted leading-snug">
                  {spice.origin}
                </p>
                <p className="font-inter font-light text-charcoal-muted text-[11px] leading-relaxed hidden md:block">
                  {spice.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
