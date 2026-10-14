'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

const ingredients = [
  {
    id: 1,
    title: 'Crispy Pastry Shell',
    sub: 'Hand-rolled & fried at 165°C',
    x: '72%',
    y: '22%',
    originX: '55%',
    originY: '35%',
  },
  {
    id: 2,
    title: 'Spiced Potato Filling',
    sub: 'Crushed with whole cumin & ginger',
    x: '76%',
    y: '48%',
    originX: '52%',
    originY: '48%',
  },
  {
    id: 3,
    title: 'Sweet Green Peas',
    sub: 'Tossed with mustard seeds',
    x: '70%',
    y: '72%',
    originX: '56%',
    originY: '60%',
  },
  {
    id: 4,
    title: 'Fresh Coriander Leaf',
    sub: 'Organic mountain grown',
    x: '20%',
    y: '24%',
    originX: '45%',
    originY: '38%',
  },
  {
    id: 5,
    title: 'Toasted Cumin Seeds',
    sub: 'Dry-roasted at 180°C',
    x: '16%',
    y: '52%',
    originX: '44%',
    originY: '54%',
  },
  {
    id: 6,
    title: 'Deggi Chilli Flakes',
    sub: 'Mild radiant warmth',
    x: '22%',
    y: '74%',
    originX: '46%',
    originY: '65%',
  },
]

export function SamosaSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)
  const labelsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const section = sectionRef.current
      const video = videoRef.current
      const visual = visualRef.current
      const labels = labelsRef.current
      if (!section) return

      // Scroll scrubbing timeline across the 250vh section
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

      // Central samosa visual scales and floats apart on scroll
      if (visual) {
        tl.fromTo(
          visual,
          { scale: 0.95, rotate: -1 },
          { scale: 1.2, rotate: 1.5, ease: 'none' },
          0
        )
      }

      // Apple-style connector lines & ingredient labels reveal progressively
      if (labels) {
        const items = labels.querySelectorAll('[data-ingredient]')
        items.forEach((item, i) => {
          const startTime = 0.15 + i * 0.1
          const endTime = startTime + 0.35

          tl.fromTo(
            item,
            { opacity: 0, scale: 0.85, x: i < 3 ? -15 : 15 },
            {
              opacity: 1,
              scale: 1,
              x: 0,
              ease: 'power1.out',
            },
            startTime
          )
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
      style={{ height: '260vh' }}
      aria-labelledby="samosa-headline"
    >
      <div
        className="sticky top-0 overflow-hidden flex items-center justify-center"
        style={{ height: '100svh', minHeight: '520px' }}
      >
        {/* Visual Layer (Video + Image fallback with 3D scale explosion) */}
        <div
          ref={visualRef}
          className="absolute inset-0 z-0 will-change-transform flex items-center justify-center"
          data-cursor="video"
        >
          <video
            ref={videoRef}
            className="video-scrub gpu"
            src="/videos/video-2.mp4"
            muted
            playsInline
            preload="none"
            aria-label="Exploded golden samosa with floating pastry layers, filling and peas"
          />
          <Image
            src="/images/image-2.webp"
            alt="Exploded golden samosa with crisp flaky crust separated mid-air revealing spiced potato, peas and herbs"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* Soft studio lighting gradient */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(250,250,248,0.15) 0%, rgba(250,250,248,0.7) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Section title overlay */}
        <div className="absolute top-14 md:top-20 left-5 md:left-12 xl:left-24 z-20 pointer-events-none">
          <p className="section-label mb-2 md:mb-3 opacity-75">
            02 — Anatomy of Craft
          </p>
          <h2
            id="samosa-headline"
            className="font-fraunces font-light text-charcoal leading-tight text-balance"
            style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
          >
            The Samosa,
            <br />
            <em className="italic text-charcoal-light">Deconstructed.</em>
          </h2>
          <p className="font-inter font-light text-charcoal-muted text-xs md:text-sm mt-3 max-w-xs leading-relaxed">
            Every layer suspended in mid-air. Inspired by precision engineering schematics.
          </p>
        </div>

        {/* Desktop Apple-style exploded connector tags with pulse nodes */}
        <div
          ref={labelsRef}
          className="absolute inset-0 z-20 hidden sm:block max-w-7xl mx-auto pointer-events-none"
          aria-label="Interactive ingredient breakdown"
        >
          {ingredients.map((ing) => (
            <div
              key={ing.id}
              data-ingredient={ing.id}
              className="absolute flex items-center gap-3 will-change-transform"
              style={{ left: ing.x, top: ing.y }}
            >
              {/* Connector line with pulse dot */}
              <div className="flex items-center">
                <span className="relative flex h-2.5 w-2.5 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
                </span>
                <div className="w-8 md:w-16 h-px bg-charcoal/40" />
              </div>

              {/* Exploded callout card */}
              <div className="bg-canvas/90 backdrop-blur-md px-3.5 py-2 border border-cream-dark shadow-sm">
                <h3 className="font-fraunces font-normal text-charcoal text-xs md:text-sm leading-snug">
                  {ing.title}
                </h3>
                <p className="font-inter font-light text-charcoal-muted text-[11px] leading-tight mt-0.5">
                  {ing.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile floating tags */}
        <div className="sm:hidden absolute bottom-8 left-5 right-5 z-20">
          <p className="section-label mb-2 text-charcoal-muted">Key Components:</p>
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ing) => (
              <span
                key={ing.id}
                className="section-label bg-canvas/90 backdrop-blur-sm px-2.5 py-1.5 text-charcoal border border-cream-dark shadow-xs"
              >
                {ing.title}
              </span>
            ))}
          </div>
        </div>

        {/* Big subtle editorial section number in background */}
        <div className="absolute bottom-6 md:bottom-8 right-5 md:right-12 z-20 pointer-events-none" aria-hidden="true">
          <span
            className="font-fraunces font-light text-charcoal/[0.08]"
            style={{ fontSize: 'clamp(4rem, 12vw, 12rem)' }}
          >
            02
          </span>
        </div>
      </div>
    </section>
  )
}
