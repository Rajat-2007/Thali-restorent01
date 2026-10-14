'use client'

import { useEffect, useRef, Suspense } from 'react'
import dynamic from 'next/dynamic'

const SpiceParticles = dynamic(() => import('@/components/three/SpiceParticles'), { ssr: false })

const spices = [
  { name: 'Turmeric', origin: 'Erode, Tamil Nadu', color: '#F59E0B', desc: 'Golden root of healing and warmth.' },
  { name: 'Red Chilli', origin: 'Guntur, Andhra Pradesh', color: '#DC2626', desc: 'Fire that awakens every palate.' },
  { name: 'Cardamom', origin: 'Idukki, Kerala', color: '#16A34A', desc: 'The queen of spices, cool and floral.' },
  { name: 'Cinnamon', origin: 'Sri Lanka border, Kerala', color: '#92400E', desc: 'Warmth that lingers on the tongue.' },
  { name: 'Star Anise', origin: 'Arunachal Pradesh', color: '#7C3AED', desc: 'A celestial star in every biryani.' },
  { name: 'Black Pepper', origin: 'Wayanad, Kerala', color: '#1C1917', desc: 'King of spices. Bold. Unapologetic.' },
]

export function SpicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const section = sectionRef.current
      const video = videoRef.current
      if (!section) return

      if (video) {
        video.pause()
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
          onUpdate: (self) => {
            if (video.duration) video.currentTime = self.progress * video.duration
          },
        })
      }

      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' },
          }
        )
      }

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('[data-card]')
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            stagger: 0.08, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 75%', toggleActions: 'play none none none' },
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
      style={{ height: '220vh' }}
      aria-labelledby="spices-headline"
    >
      <div className="sticky top-0 overflow-hidden" style={{ height: '100svh', minHeight: '500px' }}>
        {/* Video */}
        <div className="absolute inset-0 z-0" data-cursor="video">
          <video
            ref={videoRef}
            className="video-scrub gpu"
            src="/videos/video-3.mp4"
            muted
            playsInline
            preload="none"
            aria-label="Indian spices exploding and floating in slow motion"
          />
        </div>

        {/* Three.js particles */}
        <div className="absolute inset-0 z-10 pointer-events-none" aria-hidden="true">
          <Suspense fallback={null}>
            <SpiceParticles />
          </Suspense>
        </div>

        <div className="absolute inset-0 z-20 bg-canvas/25" aria-hidden="true" />

        {/* Content */}
        <div className="relative z-30 h-full flex flex-col justify-between px-5 md:px-10 py-14 md:py-20 max-w-screen-xl mx-auto">
          <div ref={headlineRef} style={{ opacity: 0 }}>
            <p className="section-label mb-3 opacity-70">03 — The Spice Constellation</p>
            <h2
              id="spices-headline"
              className="font-fraunces font-light text-charcoal leading-tight text-balance"
              style={{ fontSize: 'clamp(1.8rem, 4.5vw, 4.5rem)' }}
            >
              Six spices.<br /><em className="italic text-charcoal-light">A thousand stories.</em>
            </h2>
          </div>

          {/* Spice cards — 2 col mobile, 3 col md, 6 col lg */}
          <div ref={cardsRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 md:gap-4">
            {spices.map((spice, i) => (
              <div
                key={spice.name}
                data-card={i}
                className="group relative bg-canvas/80 backdrop-blur-[2px] p-3 md:p-4 border border-cream-dark hover:-translate-y-1 transition-transform duration-300 cursor-default"
                style={{ opacity: 0 }}
              >
                <div className="w-3 h-3 rounded-full mb-2 md:mb-3 flex-shrink-0" style={{ backgroundColor: spice.color }} aria-hidden="true" />
                <h3 className="font-fraunces font-light text-charcoal text-sm md:text-base mb-0.5 leading-snug">{spice.name}</h3>
                <p className="section-label mb-1 md:mb-2 leading-snug">{spice.origin}</p>
                <p className="font-inter font-light text-charcoal-muted text-xs leading-relaxed hidden md:block">{spice.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
