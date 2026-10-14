'use client'

import { useEffect, useRef } from 'react'

const steps = [
  {
    num: '01', title: 'Source',
    desc: 'Every ingredient is hand-selected from heritage farms across India. We work directly with small growers to ensure provenance, freshness, and ethical sourcing.',
    ingredient: 'Fresh Tomatoes · Organic Onions · Kerala Ginger',
  },
  {
    num: '02', title: 'Prep',
    desc: 'Mise en place is sacred. Each vegetable is cut to exact specifications. Spices are toasted fresh, ground by hand. Nothing comes pre-processed.',
    ingredient: 'Whole Spices · Heritage Paneer · Farm Butter',
  },
  {
    num: '03', title: 'Cook',
    desc: 'Our chefs trained in the royal kitchens of Rajasthan follow dum cooking techniques — slow, sealed, patient. The result speaks for itself.',
    ingredient: 'Cream · Kashmiri Saffron · Green Chilli',
  },
  {
    num: '04', title: 'Plate',
    desc: 'The thali is assembled with architectural precision. Every bowl placed with intention. The plate is a canvas. The food is the art.',
    ingredient: 'Fresh Coriander · Rose Water · Gold Leaf',
  },
]

export function CraftProcess() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement[]>([])

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

      if (progressRef.current) {
        gsap.fromTo(progressRef.current, { scaleX: 0 }, {
          scaleX: 1, ease: 'none',
          scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: 1 },
        })
      }

      stepsRef.current.forEach((step) => {
        if (!step) return
        gsap.fromTo(step, { opacity: 0, x: -30 }, {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: step, start: 'top 80%', toggleActions: 'play none none none' },
        })
      })
    }
    initGSAP()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="craft"
      className="relative bg-canvas"
      style={{ height: '300vh' }}
      aria-labelledby="craft-headline"
    >
      <div className="sticky top-0 overflow-hidden flex flex-col" style={{ height: '100svh', minHeight: '500px' }}>
        {/* Progress bar */}
        <div className="relative h-[2px] bg-cream-dark flex-shrink-0" aria-hidden="true">
          <div ref={progressRef} className="absolute inset-0 bg-charcoal origin-left" style={{ transform: 'scaleX(0)' }} />
        </div>

        {/* 2-col layout: video + steps */}
        <div className="flex-1 flex flex-col lg:grid lg:grid-cols-2 overflow-hidden">
          {/* Video — top on mobile, left on lg */}
          <div className="relative h-[35svh] lg:h-full flex-shrink-0 order-1 lg:order-1" data-cursor="video">
            <video
              ref={videoRef}
              className="video-scrub gpu"
              src="/videos/video-4.mp4"
              muted
              playsInline
              preload="none"
              aria-label="Fresh ingredients assembling into a gourmet Indian dish"
            />
          </div>

          {/* Steps — scrollable on mobile */}
          <div className="flex-1 flex flex-col justify-start lg:justify-center px-5 md:px-10 lg:px-14 py-6 lg:py-0 overflow-y-auto no-scrollbar order-2">
            <p className="section-label mb-4 md:mb-8">04 — The Craft</p>
            <h2
              id="craft-headline"
              className="font-fraunces font-light text-charcoal leading-tight mb-6 md:mb-10 text-balance"
              style={{ fontSize: 'clamp(1.6rem, 4vw, 3.5rem)' }}
            >
              From farm<br />to <em className="italic text-charcoal-light">thali.</em>
            </h2>

            <div className="flex flex-col gap-5 md:gap-7">
              {steps.map((step, i) => (
                <div
                  key={step.num}
                  ref={(el) => { if (el) stepsRef.current[i] = el }}
                  className="flex gap-3 md:gap-5 group"
                  style={{ opacity: 0 }}
                >
                  <span className="font-fraunces font-light text-charcoal-muted text-base md:text-lg flex-shrink-0 pt-0.5">{step.num}</span>
                  <div className="border-t border-cream-dark pt-3 md:pt-4 flex-1 min-w-0">
                    <h3 className="font-fraunces font-light text-charcoal mb-1.5" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.4rem)' }}>
                      {step.title}
                    </h3>
                    <p className="font-inter font-light text-charcoal-muted leading-relaxed mb-1.5 text-pretty" style={{ fontSize: 'clamp(0.78rem, 1vw, 0.9rem)' }}>
                      {step.desc}
                    </p>
                    <p className="section-label text-accent">{step.ingredient}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
