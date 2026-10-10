'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

const sauces = [
  {
    name: 'Wild Mint & Cilantro Chutney',
    origin: 'Pudina & Green Chilli',
    desc: 'Bright, herbal, and vibrant. A cooling contrast to fiery spices.',
    color: '#16A34A',
    note: 'Crushed with black salt & lemon juice',
  },
  {
    name: 'Aged Tamarind & Jaggery Nectar',
    origin: 'Imli & Desi Gud',
    desc: 'Simmered with cumin and dried ginger until thick, sweet, and tangy.',
    color: '#92400E',
    note: 'Cured for 48 hours for depth',
  },
  {
    name: 'Smoked Garlic & Mustard Raita',
    origin: 'Cultured Curd & Mustard Seeds',
    desc: 'Tempered with crackling mustard seeds and roasted cumin dust.',
    color: '#F59E0B',
    note: 'Smoked with burning charcoal & ghee',
  },
]

export function SignatureSauces() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const section = sectionRef.current
      const video = videoRef.current
      const visual = visualRef.current
      const cards = cardsRef.current
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

      if (visual) {
        tl.fromTo(visual, { scale: 1, y: 0 }, { scale: 1.18, y: -20, ease: 'none' }, 0)
      }

      // Card tilt with mouse (desktop)
      const isFine = window.matchMedia('(pointer: fine)').matches
      if (isFine && cards) {
        const cardEls = cards.querySelectorAll('[data-sauce-card]')
        cardEls.forEach((card) => {
          const el = card as HTMLElement
          el.addEventListener('mousemove', (e: MouseEvent) => {
            const rect = el.getBoundingClientRect()
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16
            gsap.to(el, {
              rotateX: y,
              rotateY: x,
              translateY: -6,
              duration: 0.35,
              ease: 'power2.out',
              transformPerspective: 800,
            })
          })
          el.addEventListener('mouseleave', () => {
            gsap.to(el, {
              rotateX: 0,
              rotateY: 0,
              translateY: 0,
              duration: 0.5,
              ease: 'power2.out',
            })
          })
        })
      }

      if (cards) {
        gsap.fromTo(
          cards.querySelectorAll('[data-sauce-card]'),
          { opacity: 0, y: 50, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.12,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: cards, start: 'top 78%' },
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
      style={{ height: '240vh' }}
      aria-labelledby="sauces-headline"
    >
      <div
        className="sticky top-0 overflow-hidden flex items-end pb-10 md:pb-16"
        style={{ height: '100svh', minHeight: '520px' }}
      >
        {/* Background Visual (Video + Image fallback with scale scrub) */}
        <div ref={visualRef} className="absolute inset-0 z-0 will-change-transform" data-cursor="video">
          <video
            ref={videoRef}
            className="video-scrub gpu"
            src="/videos/video-5.mp4"
            muted
            playsInline
            preload="none"
            aria-label="Liquid chutney ribbons pouring through the air in suspension"
          />
          <Image
            src="/images/image-1.webp"
            alt="Artisanal chutneys, raitas and accompaniments served in bronze vessels"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* Studio gradient for luxury editorial legibility */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              'linear-gradient(to top, rgba(250,250,248,0.92) 0%, rgba(250,250,248,0.4) 50%, rgba(250,250,248,0.2) 100%)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-20 w-full px-5 md:px-12 max-w-screen-xl mx-auto">
          <div className="mb-6 md:mb-10">
            <p className="section-label mb-2 opacity-75">05 — Signature Accompaniments</p>
            <h2
              id="sauces-headline"
              className="font-fraunces font-light text-charcoal leading-tight text-balance"
              style={{ fontSize: 'clamp(2rem, 5vw, 4.8rem)' }}
            >
              Liquid <em className="italic text-charcoal-light">ribbons of flavour.</em>
            </h2>
          </div>

          {/* Cards with interactive 3D tilt */}
          <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-5">
            {sauces.map((sauce, i) => (
              <div
                key={sauce.name}
                data-sauce-card={i}
                className="bg-canvas/90 backdrop-blur-md p-5 md:p-7 border border-cream-dark shadow-sm transition-shadow duration-300 hover:shadow-md cursor-pointer"
                style={{ opacity: 0, transformStyle: 'preserve-3d' }}
              >
                <div
                  className="w-8 h-1 mb-4 rounded-full"
                  style={{ backgroundColor: sauce.color }}
                  aria-hidden="true"
                />
                <h3
                  className="font-fraunces font-light text-charcoal mb-1"
                  style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.45rem)' }}
                >
                  {sauce.name}
                </h3>
                <p className="section-label mb-2.5 text-accent">{sauce.origin}</p>
                <p className="font-inter font-light text-charcoal-muted leading-relaxed text-pretty text-xs md:text-sm mb-3">
                  {sauce.desc}
                </p>
                <div className="pt-2.5 border-t border-cream-dark">
                  <span className="section-label text-[10px] text-charcoal-muted">{sauce.note}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
