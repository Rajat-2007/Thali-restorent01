'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const section = sectionRef.current
      const video = videoRef.current
      const headline = headlineRef.current
      const sub = subRef.current
      const cta = ctaRef.current
      if (!section) return

      // Entrance animation
      const tl = gsap.timeline({ delay: 2.4 })
      if (headline) tl.fromTo(headline, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' })
      if (sub) tl.fromTo(sub, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.6')
      if (cta) tl.fromTo(cta, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.5')

      // Video scrubbing
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

      // Parallax headline on scroll
      if (headline) {
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          onUpdate: (self) => gsap.set(headline, { y: self.progress * -80 }),
        })
      }

      // Mouse parallax — desktop only
      const isFinePointer = window.matchMedia('(pointer: fine)').matches
      if (isFinePointer && parallaxRef.current) {
        const handleMouse = (e: MouseEvent) => {
          const x = (e.clientX / window.innerWidth - 0.5) * 20
          const y = (e.clientY / window.innerHeight - 0.5) * 15
          gsap.to(parallaxRef.current, { x, y, duration: 1.5, ease: 'power2.out' })
        }
        window.addEventListener('mousemove', handleMouse, { passive: true })
        return () => window.removeEventListener('mousemove', handleMouse)
      }
    }

    initGSAP()
  }, [])

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex items-center justify-center overflow-hidden bg-canvas"
      style={{ height: '100svh', minHeight: '600px' }}
      aria-labelledby="hero-headline"
    >
      {/* Background video */}
      <div className="absolute inset-0 z-0" data-cursor="video">
        <video
          ref={videoRef}
          className="video-scrub gpu"
          src="/videos/video-1.mp4"
          muted
          playsInline
          preload="auto"
          aria-label="Exploded royal Indian thali — ingredients float elegantly"
        />
        {/* Image fallback */}
        <Image
          src="/images/image-1.webp"
          alt="Royal Indian Thali with all dishes arranged beautifully"
          fill
          className="object-cover"
          priority
          style={{ zIndex: -1 }}
          sizes="100vw"
        />
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{ background: 'linear-gradient(to bottom, rgba(250,250,248,0.25) 0%, transparent 40%, rgba(250,250,248,0.55) 100%)' }}
        aria-hidden="true"
      />

      {/* Content */}
      <div ref={parallaxRef} className="relative z-20 text-center px-5 max-w-5xl mx-auto w-full gpu">
        <p className="section-label mb-5 md:mb-7 opacity-70">Est. 2024 · Mumbai, India</p>

        <div ref={headlineRef} style={{ opacity: 0 }}>
          <h1
            id="hero-headline"
            className="font-fraunces font-light text-charcoal leading-none tracking-tight mb-5 md:mb-8 text-balance"
            style={{ fontSize: 'clamp(3.5rem, 12vw, 10rem)' }}
          >
            The Royal
            <br />
            <em className="font-light italic text-charcoal-light">Thali</em>
          </h1>
        </div>

        <p
          ref={subRef}
          className="font-inter font-light text-charcoal-muted max-w-xs sm:max-w-sm md:max-w-md mx-auto mb-8 md:mb-12 leading-relaxed text-pretty"
          style={{ opacity: 0, fontSize: 'clamp(0.875rem, 1.5vw, 1.1rem)' }}
        >
          An editorial journey through India&apos;s most celebrated culinary heritage. Every ingredient, every spice, every plate — crafted with intention.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-col xs:flex-row items-center justify-center gap-3 md:gap-5"
          style={{ opacity: 0 }}
        >
          <button
            onClick={() => scrollTo('#reserve')}
            className="group relative inline-flex items-center gap-3 px-7 md:px-10 py-3.5 md:py-4 bg-charcoal text-canvas font-inter text-xs md:text-sm tracking-widest uppercase overflow-hidden w-full xs:w-auto justify-center min-h-[48px]"
            aria-label="Reserve a table"
          >
            <span className="absolute inset-0 bg-accent translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out" aria-hidden="true" />
            <span className="relative">Reserve Table</span>
            <span className="relative" aria-hidden="true">→</span>
          </button>

          <button
            onClick={() => scrollTo('#story')}
            className="group inline-flex items-center gap-2 font-inter text-xs md:text-sm tracking-widest uppercase text-charcoal w-full xs:w-auto justify-center py-3.5 md:py-4 min-h-[48px]"
            aria-label="Explore our menu"
          >
            <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-charcoal after:group-hover:w-full after:transition-all after:duration-400">
              Explore Menu
            </span>
            <span aria-hidden="true">↓</span>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2" aria-hidden="true">
        <span className="section-label opacity-40">Scroll</span>
        <div className="w-px h-10 md:h-12 bg-charcoal/25 relative overflow-hidden">
          <div className="absolute top-0 w-full h-1/2 bg-charcoal/50 animate-[pulse-soft_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  )
}
