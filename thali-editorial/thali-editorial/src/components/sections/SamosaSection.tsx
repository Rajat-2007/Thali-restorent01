'use client'

import { useEffect, useRef } from 'react'

const ingredients = [
  { id: 1, label: 'Crispy Pastry Shell', x: '72%', y: '18%' },
  { id: 2, label: 'Potato Filling', x: '75%', y: '42%' },
  { id: 3, label: 'Green Peas', x: '70%', y: '62%' },
  { id: 4, label: 'Fresh Coriander', x: '20%', y: '20%' },
  { id: 5, label: 'Cumin Seeds', x: '18%', y: '55%' },
  { id: 6, label: 'Red Chilli', x: '22%', y: '75%' },
]

export function SamosaSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const labelsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const section = sectionRef.current
      const video = videoRef.current
      const labels = labelsRef.current
      if (!section || !video) return

      video.pause()
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
        onUpdate: (self) => {
          if (video.duration) video.currentTime = self.progress * video.duration
        },
      })

      if (labels) {
        const items = labels.querySelectorAll('[data-ingredient]')
        ScrollTrigger.create({
          trigger: section,
          start: '20% top',
          end: '80% top',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress
            items.forEach((item, i) => {
              const delay = i * 0.12
              const itemProgress = Math.max(0, Math.min(1, (progress - delay) / 0.6))
              ;(item as HTMLElement).style.opacity = itemProgress.toString()
              ;(item as HTMLElement).style.transform = `translateX(${(1 - itemProgress) * 15}px)`
            })
          },
        })
      }
    }
    initGSAP()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="samosa"
      className="relative bg-canvas"
      style={{ height: '250vh' }}
      aria-labelledby="samosa-headline"
    >
      <div className="sticky top-0 overflow-hidden flex items-center" style={{ height: '100svh', minHeight: '500px' }}>
        {/* Video */}
        <div className="absolute inset-0 z-0" data-cursor="video">
          <video
            ref={videoRef}
            className="video-scrub gpu"
            src="/videos/video-2.mp4"
            muted
            playsInline
            preload="none"
            aria-label="Exploded samosa with floating pastry layers and filling"
          />
        </div>

        <div className="absolute inset-0 z-10 bg-canvas/15" aria-hidden="true" />

        {/* Content */}
        <div className="relative z-20 w-full px-5 md:px-10 max-w-screen-xl mx-auto">
          <div className="absolute top-16 md:top-20 left-5 md:left-10 xl:left-20">
            <p className="section-label mb-3 opacity-70">02 — Signature Starter</p>
            <h2
              id="samosa-headline"
              className="font-fraunces font-light text-charcoal leading-tight text-balance"
              style={{ fontSize: 'clamp(1.8rem, 4.5vw, 4.5rem)' }}
            >
              The Samosa,<br /><em className="italic text-charcoal-light">Deconstructed.</em>
            </h2>
          </div>

          {/* Desktop ingredient labels */}
          <div ref={labelsRef} className="absolute inset-0 hidden sm:block" aria-label="Ingredient labels">
            {ingredients.map((ing) => (
              <div
                key={ing.id}
                data-ingredient={ing.id}
                className="absolute flex items-center gap-2 md:gap-3"
                style={{ left: ing.x, top: ing.y, opacity: 0, transform: 'translateX(15px)' }}
                aria-label={ing.label}
              >
                <div className="w-6 md:w-12 h-px bg-charcoal/50" aria-hidden="true" />
                <div className="w-1.5 h-1.5 rounded-full bg-charcoal/70 flex-shrink-0" aria-hidden="true" />
                <span className="section-label whitespace-nowrap text-charcoal bg-canvas/80 px-2 py-0.5">
                  {ing.label}
                </span>
              </div>
            ))}
          </div>

          {/* Mobile ingredient chips */}
          <div className="sm:hidden absolute bottom-10 left-5 right-5">
            <div className="flex flex-wrap gap-2">
              {ingredients.map((ing) => (
                <span key={ing.id} className="section-label bg-canvas/80 px-2.5 py-1.5 text-charcoal rounded-sm">
                  {ing.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 md:bottom-8 right-5 md:right-10 z-20" aria-hidden="true">
          <span className="font-fraunces font-light text-charcoal/[0.06]" style={{ fontSize: 'clamp(3rem, 10vw, 10rem)' }}>02</span>
        </div>
      </div>
    </section>
  )
}
