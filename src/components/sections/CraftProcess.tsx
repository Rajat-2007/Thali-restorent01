'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

const steps = [
  {
    num: '01',
    title: 'Source',
    desc: 'Every ingredient is hand-selected from heritage farms across India. Direct provenance, organic cultivation, and ethical harvest.',
    ingredient: 'Vine-Ripened Tomatoes · Himalayan Garlic · Kerala Ginger',
  },
  {
    num: '02',
    title: 'Prep & Toast',
    desc: 'Mise en place is sacred ritual. Whole spices dry-toasted fresh daily to release volatile aromatic oils. Hand-ground in stone pestles.',
    ingredient: 'Stone-Ground Masalas · Artisanal Malai Paneer · Cultured Butter',
  },
  {
    num: '03',
    title: 'Dum Cook',
    desc: 'Our master chefs seal heavy copper degs with dough ribbons, allowing flavours to concentrate gently over low embers for 8 to 14 hours.',
    ingredient: 'Velvety Malai · Mongra Saffron Strands · Mild Deggi Chilli',
  },
  {
    num: '04',
    title: 'Plate & Present',
    desc: 'The thali is assembled with architectural precision. Every bowl placed with intentional temperature and flavor progression.',
    ingredient: 'Micro Coriander · 24K Edible Gold Leaf · Royal Copper Katoris',
  },
]

export function CraftProcess() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const imagePanRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const section = sectionRef.current
      const video = videoRef.current
      const progress = progressRef.current
      const imagePan = imagePanRef.current
      if (!section) return

      // Scroll scrubbing timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          onUpdate: (self) => {
            if (video && video.duration) {
              video.currentTime = self.progress * video.duration
            }
          },
        },
      })

      // Progress bar fill across the craft timeline
      if (progress) {
        tl.fromTo(progress, { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0)
      }

      // Visual pan and slow zoom as steps progress
      if (imagePan) {
        tl.fromTo(imagePan, { scale: 1, y: 0 }, { scale: 1.15, y: -30, ease: 'none' }, 0)
      }

      // Steps reveal with stagger
      stepsRef.current.forEach((step) => {
        if (!step) return
        gsap.fromTo(
          step,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: step, start: 'top 80%', toggleActions: 'play none none none' },
          }
        )
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
      <div
        className="sticky top-0 overflow-hidden flex flex-col"
        style={{ height: '100svh', minHeight: '520px' }}
      >
        {/* Horizontal progress bar */}
        <div className="relative h-[2px] bg-cream-dark flex-shrink-0" aria-hidden="true">
          <div
            ref={progressRef}
            className="absolute inset-0 bg-charcoal origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        {/* 2-Column Layout */}
        <div className="flex-1 flex flex-col lg:grid lg:grid-cols-2 overflow-hidden">
          {/* Visual left (Video + Image fallback with slow pan scrub) */}
          <div className="relative h-[38svh] lg:h-full flex-shrink-0 overflow-hidden" data-cursor="video">
            <div ref={imagePanRef} className="absolute inset-0 will-change-transform">
              <video
                ref={videoRef}
                className="video-scrub gpu"
                src="/videos/video-4.mp4"
                muted
                playsInline
                preload="none"
                aria-label="Fresh ingredients assembling into a gourmet Indian dish"
              />
              <Image
                src="/images/image-4.webp"
                alt="Culinary ingredients and copper thali prepared with Michelin precision"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent to-canvas/50 pointer-events-none" />
          </div>

          {/* Steps right */}
          <div className="flex-1 flex flex-col justify-start lg:justify-center px-6 md:px-12 lg:px-16 py-6 lg:py-0 overflow-y-auto no-scrollbar">
            <p className="section-label mb-3 md:mb-5 opacity-75">04 — The Culinary Method</p>
            <h2
              id="craft-headline"
              className="font-fraunces font-light text-charcoal leading-tight mb-6 md:mb-10 text-balance"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3.8rem)' }}
            >
              From raw earth
              <br />
              to <em className="italic text-charcoal-light">royal table.</em>
            </h2>

            <div className="flex flex-col gap-5 md:gap-7">
              {steps.map((step, i) => (
                <div
                  key={step.num}
                  ref={(el) => {
                    if (el) stepsRef.current[i] = el
                  }}
                  className="flex gap-4 md:gap-6 group"
                  style={{ opacity: 0 }}
                >
                  <span className="font-fraunces font-light text-charcoal-muted text-base md:text-lg flex-shrink-0 pt-0.5">
                    {step.num}
                  </span>
                  <div className="border-t border-cream-dark pt-3 md:pt-4 flex-1 min-w-0">
                    <h3 className="font-fraunces font-light text-charcoal mb-1" style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.45rem)' }}>
                      {step.title}
                    </h3>
                    <p className="font-inter font-light text-charcoal-muted leading-relaxed mb-1.5 text-pretty text-xs md:text-sm">
                      {step.desc}
                    </p>
                    <p className="section-label text-accent text-[11px]">{step.ingredient}</p>
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
