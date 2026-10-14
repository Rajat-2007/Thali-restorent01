'use client'

import { useEffect, useRef } from 'react'

const sauces = [
  { name: 'Mint Chutney', origin: 'Pudina & Green Chilli', desc: 'Bright, herbal, and cooling. A counterpoint to every warming spice on the plate.', color: '#16A34A' },
  { name: 'Tamarind Chutney', origin: 'Imli & Jaggery', desc: 'Sweet, sour, and deeply complex. The soul of Indian street food, elevated.', color: '#92400E' },
  { name: 'Raita', origin: 'Dahi & Coriander', desc: 'Cool and creamy. The quiet mediator between heat and harmony.', color: '#F5F0EB' },
]

export function SignatureSauces() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

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
          scrub: 1,
          onUpdate: (self) => {
            if (video.duration) video.currentTime = self.progress * video.duration
          },
        })
      }

      // Card tilt — desktop only
      const isFine = window.matchMedia('(pointer: fine)').matches
      if (isFine && cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('[data-sauce-card]')
        cards.forEach((card) => {
          const el = card as HTMLElement
          el.addEventListener('mousemove', (e: MouseEvent) => {
            const rect = el.getBoundingClientRect()
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12
            gsap.to(el, { rotateX: y, rotateY: x, duration: 0.4, ease: 'power2.out', transformPerspective: 600 })
          })
          el.addEventListener('mouseleave', () => {
            gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power2.out' })
          })
        })
      }

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.querySelectorAll('[data-sauce-card]'),
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1,
            stagger: 0.15, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 75%' },
          }
        )
      }
    }
    initGSAP()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="sauces"
      className="relative bg-canvas"
      style={{ height: '250vh' }}
      aria-labelledby="sauces-headline"
    >
      <div className="sticky top-0 overflow-hidden flex items-end pb-10 md:pb-16" style={{ height: '100svh', minHeight: '500px' }}>
        {/* Video */}
        <div className="absolute inset-0 z-0" data-cursor="video">
          <video
            ref={videoRef}
            className="video-scrub gpu"
            src="/videos/video-5.mp4"
            muted
            playsInline
            preload="none"
            aria-label="Chutney ribbons pouring gracefully through the air"
          />
        </div>

        <div className="absolute inset-0 z-10 bg-gradient-to-t from-canvas/90 via-canvas/30 to-transparent" aria-hidden="true" />

        <div className="relative z-20 w-full px-5 md:px-10 max-w-screen-xl mx-auto">
          <div className="mb-6 md:mb-10">
            <p className="section-label mb-3 opacity-70">05 — Signature Accompaniments</p>
            <h2
              id="sauces-headline"
              className="font-fraunces font-light text-charcoal leading-tight text-balance"
              style={{ fontSize: 'clamp(1.8rem, 5vw, 5rem)' }}
            >
              Liquid <em className="italic text-charcoal-light">poetry.</em>
            </h2>
          </div>

          {/* Cards — 1 col mobile, 3 col md+ */}
          <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-5">
            {sauces.map((sauce, i) => (
              <div
                key={sauce.name}
                data-sauce-card={i}
                className="bg-canvas/90 backdrop-blur-sm p-5 md:p-7 border border-cream-dark"
                style={{ opacity: 0, transformStyle: 'preserve-3d' }}
              >
                <div className="w-8 h-1 mb-4 rounded-full" style={{ backgroundColor: sauce.color }} aria-hidden="true" />
                <h3 className="font-fraunces font-light text-charcoal mb-1" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.4rem)' }}>{sauce.name}</h3>
                <p className="section-label mb-3">{sauce.origin}</p>
                <p className="font-inter font-light text-charcoal-muted leading-relaxed text-pretty" style={{ fontSize: 'clamp(0.78rem, 1vw, 0.9rem)' }}>{sauce.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
