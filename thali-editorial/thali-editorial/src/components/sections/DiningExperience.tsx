'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

const gallery = [
  { src: '/images/image-1.webp', alt: 'Royal Indian thali, fully assembled with all components', aspect: 'aspect-[4/5]' },
  { src: '/images/image-2.webp', alt: 'Exploded golden samosa revealing potato and pea filling', aspect: 'aspect-[3/4]' },
  { src: '/images/image-3.webp', alt: 'Indian spices arranged in geometric floating composition', aspect: 'aspect-[4/5]' },
  { src: '/images/image-4.webp', alt: 'Premium luxury Indian dining table with floating herbs and steam', aspect: 'aspect-[3/4]' },
]

export function DiningExperience() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
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
          end: '30% top',
          scrub: 1.5,
          onUpdate: (self) => {
            if (video.duration) video.currentTime = self.progress * video.duration
          },
        })
      }

      if (headlineRef.current) {
        gsap.fromTo(headlineRef.current, { opacity: 0, y: 60 }, {
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: headlineRef.current, start: 'top 80%' },
        })
      }

      if (galleryRef.current) {
        const imgs = galleryRef.current.querySelectorAll('[data-gallery-item]')
        imgs.forEach((img, i) => {
          const el = img as HTMLElement
          const direction = i % 2 === 0 ? 1 : -1
          gsap.fromTo(el, { opacity: 0, y: 60 * direction, scale: 0.93 }, {
            opacity: 1, y: 0, scale: 1,
            duration: 1.1, delay: i * 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: galleryRef.current, start: 'top 75%' },
          })

          // Image parallax inside each cell
          ScrollTrigger.create({
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
            onUpdate: (self) => {
              const speed = i % 2 === 0 ? 30 : -30
              const imgEl = el.querySelector('img')
              if (imgEl) gsap.set(imgEl, { y: self.progress * speed - speed / 2 })
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
      {/* Video intro */}
      <div className="relative overflow-hidden" style={{ height: '60svh', minHeight: '350px' }} data-cursor="video">
        <video
          ref={videoRef}
          className="video-scrub gpu"
          src="/videos/video-6.mp4"
          muted
          playsInline
          preload="none"
          aria-label="Premium Indian dining table reveal with floating ingredients assembling"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-canvas z-10" aria-hidden="true" />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-5">
          <p className="section-label mb-3 md:mb-5 text-charcoal/80">06 — The Experience</p>
          <h2
            id="experience-headline"
            ref={headlineRef}
            className="font-fraunces font-light text-charcoal text-center leading-tight text-balance"
            style={{ fontSize: 'clamp(2.2rem, 7vw, 7rem)', opacity: 0 }}
          >
            Where time<br /><em className="italic text-charcoal-light">slows down.</em>
          </h2>
        </div>
      </div>

      {/* Gallery — 2 col on all screens, staggered heights */}
      <div className="px-5 md:px-10 py-16 md:py-28 max-w-screen-xl mx-auto">
        <div ref={galleryRef} className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 items-end">
          {gallery.map((img, i) => (
            <div
              key={i}
              data-gallery-item={i}
              className={`relative overflow-hidden ${img.aspect} ${
                i === 1 ? 'mt-6 md:mt-14' : i === 3 ? 'mt-3 md:mt-8' : ''
              }`}
              style={{ opacity: 0 }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="mt-16 md:mt-28 max-w-3xl mx-auto text-center">
          <blockquote>
            <p
              className="font-fraunces font-light italic text-charcoal-light leading-snug text-balance"
              style={{ fontSize: 'clamp(1.3rem, 3.5vw, 2.8rem)' }}
            >
              &ldquo;The thali is not a meal. It is a conversation between flavours that have known each other for centuries.&rdquo;
            </p>
            <footer className="mt-5 md:mt-8">
              <cite className="section-label not-italic text-charcoal-muted">
                — Chef Arjun Mehta, Head Chef &amp; Culinary Director
              </cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
