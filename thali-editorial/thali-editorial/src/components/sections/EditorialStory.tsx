'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

export function EditorialStory() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageWrapRef = useRef<HTMLDivElement>(null)
  const linesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const section = sectionRef.current
      const imageWrap = imageWrapRef.current
      const linesContainer = linesRef.current
      if (!section || !imageWrap || !linesContainer) return

      gsap.fromTo(
        imageWrap,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.4, ease: 'power4.out',
          scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none none' },
        }
      )

      const img = imageWrap.querySelector('img')
      if (img) {
        gsap.fromTo(img, { scale: 1.15 }, {
          scale: 1, duration: 1.6, ease: 'power4.out',
          scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none none' },
        })
      }

      const lines = linesContainer.querySelectorAll('[data-line]')
      gsap.fromTo(
        lines,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: linesContainer, start: 'top 75%', toggleActions: 'play none none none' },
        }
      )
    }
    initGSAP()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative py-20 md:py-36 lg:py-48 px-5 md:px-10 bg-canvas overflow-hidden"
      aria-labelledby="story-headline"
    >
      <div className="max-w-screen-xl mx-auto">
        <p className="section-label mb-8 md:mb-14" data-line>01 — Our Story</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-20 xl:gap-28 items-center">

          {/* Image */}
          <div
            ref={imageWrapRef}
            className="relative aspect-[4/3] sm:aspect-[4/4] md:aspect-[4/5] overflow-hidden order-2 lg:order-1"
            style={{ clipPath: 'inset(0 100% 0 0)' }}
          >
            <Image
              src="/images/image-1.webp"
              alt="An exploded Indian royal thali with all components floating elegantly in natural light"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Text */}
          <div ref={linesRef} className="order-1 lg:order-2 flex flex-col gap-5 md:gap-8">
            <h2
              id="story-headline"
              className="font-fraunces font-light text-charcoal leading-tight text-balance"
              style={{ fontSize: 'clamp(2rem, 5vw, 5rem)' }}
              data-line
            >
              Centuries of craft,
              <br />served
              <br /><em className="italic text-charcoal-light">with reverence.</em>
            </h2>

            <p
              className="font-inter font-light text-charcoal-muted leading-relaxed text-pretty"
              style={{ fontSize: 'clamp(0.875rem, 1.3vw, 1.1rem)' }}
              data-line
            >
              The Indian Thali is not merely a meal. It is a philosophy — a meditation on balance, contrast, and completeness. Each bowl, each bite, each spice tells a story passed through generations.
            </p>

            <p
              className="font-inter font-light text-charcoal-muted leading-relaxed text-pretty"
              style={{ fontSize: 'clamp(0.875rem, 1.3vw, 1.1rem)' }}
              data-line
            >
              At Thali, we have spent years deconstructing that tradition — studying heritage recipes, sourcing single-origin spices from small farms across Rajasthan, Kerala, and Kashmir — and reconstructing it into something that speaks to the contemporary palate without losing an ounce of soul.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 md:gap-8 pt-5 md:pt-8 border-t border-cream-dark" data-line>
              {[
                { num: '27', label: 'Heritage Recipes' },
                { num: '14', label: 'Spice Origins' },
                { num: '3', label: 'Michelin Stars' },
              ].map((stat) => (
                <div key={stat.num} className="flex flex-col gap-1">
                  <span
                    className="font-fraunces font-light text-charcoal"
                    style={{ fontSize: 'clamp(1.6rem, 3.5vw, 3rem)' }}
                  >
                    {stat.num}
                  </span>
                  <span className="section-label leading-tight">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
