'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const floatingTagsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const container = containerRef.current
      const video = videoRef.current
      const imageEl = imageRef.current
      const headline = headlineRef.current
      const sub = subRef.current
      const cta = ctaRef.current
      const floatingTags = floatingTagsRef.current
      if (!container) return

      // Entrance animation on load
      const tl = gsap.timeline({ delay: 2.2 })
      if (headline) tl.fromTo(headline, { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out' })
      if (sub) tl.fromTo(sub, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.7')
      if (cta) tl.fromTo(cta, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.6')
      if (floatingTags) tl.fromTo(floatingTags, { opacity: 0 }, { opacity: 1, duration: 1 }, '-=0.4')

      // Scroll scrubbing timeline
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
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

      // As user scrolls: Exploded Thali expands outward with 3D scale and floating elements
      if (imageEl) {
        scrollTl.to(imageEl, {
          scale: 1.35,
          y: -40,
          ease: 'power1.inOut',
        }, 0)
      }

      // Headline moves slower, fades out into floating elements
      if (headline) {
        scrollTl.to(headline, {
          y: -120,
          opacity: 0,
          scale: 0.9,
          ease: 'power2.in',
        }, 0)
      }

      if (sub) {
        scrollTl.to(sub, {
          y: -80,
          opacity: 0,
          ease: 'power2.in',
        }, 0)
      }

      if (cta) {
        scrollTl.to(cta, {
          y: -60,
          opacity: 0,
          ease: 'power2.in',
        }, 0)
      }

      // Floating component tags reveal and drift outward as you scrub
      if (floatingTags) {
        const tags = floatingTags.querySelectorAll('[data-hero-tag]')
        tags.forEach((tag, i) => {
          const dirX = i % 2 === 0 ? -1 : 1
          const dirY = i < 2 ? -1 : 1
          scrollTl.fromTo(
            tag,
            { opacity: 0, scale: 0.8, x: 0, y: 0 },
            {
              opacity: 1,
              scale: 1,
              x: dirX * (40 + i * 20),
              y: dirY * (30 + i * 15),
              ease: 'power1.out',
            },
            0.15 + i * 0.1
          )
        })
      }

      // Mouse Parallax (desktop)
      const isFinePointer = window.matchMedia('(pointer: fine)').matches
      if (isFinePointer && imageEl) {
        const handleMouse = (e: MouseEvent) => {
          const x = (e.clientX / window.innerWidth - 0.5) * 24
          const y = (e.clientY / window.innerHeight - 0.5) * 18
          gsap.to(imageEl, { x, y, duration: 1.4, ease: 'power2.out' })
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
      ref={containerRef}
      id="hero"
      className="relative bg-canvas"
      style={{ height: '230vh' }}
      aria-labelledby="hero-headline"
    >
      {/* Sticky viewport container */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-[100svh] min-h-[600px] overflow-hidden flex items-center justify-center"
      >
        {/* Background Visual (Video + Image fallback with 3D scale scrub) */}
        <div ref={imageRef} className="absolute inset-0 z-0 will-change-transform" data-cursor="video">
          <video
            ref={videoRef}
            className="video-scrub gpu"
            src="/videos/video-1.mp4"
            muted
            playsInline
            preload="auto"
            aria-label="Exploded royal Indian thali — components float outward"
          />
          <Image
            src="/images/image-1.webp"
            alt="Royal Indian Thali fully exploded into suspended floating bowls, naan and fragrant spices"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>

        {/* Soft studio lighting overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(250,250,248,0.2) 0%, rgba(250,250,248,0.7) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Floating component labels that separate during scroll scrub */}
        <div ref={floatingTagsRef} className="absolute inset-0 z-20 pointer-events-none hidden sm:block max-w-6xl mx-auto">
          <div data-hero-tag className="absolute top-[22%] left-[10%] bg-canvas/85 backdrop-blur-md px-3.5 py-1.5 border border-cream-dark shadow-sm">
            <span className="section-label text-charcoal">Basmati Rice · Saffron Infused</span>
          </div>
          <div data-hero-tag className="absolute top-[20%] right-[12%] bg-canvas/85 backdrop-blur-md px-3.5 py-1.5 border border-cream-dark shadow-sm">
            <span className="section-label text-charcoal">Butter Naan · Clay Tandoor</span>
          </div>
          <div data-hero-tag className="absolute bottom-[24%] left-[12%] bg-canvas/85 backdrop-blur-md px-3.5 py-1.5 border border-cream-dark shadow-sm">
            <span className="section-label text-charcoal">Dal Makhani · 24-Hr Simmer</span>
          </div>
          <div data-hero-tag className="absolute bottom-[22%] right-[10%] bg-canvas/85 backdrop-blur-md px-3.5 py-1.5 border border-cream-dark shadow-sm">
            <span className="section-label text-charcoal">Paneer Tikka · Smoked Charcoal</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-30 text-center px-5 max-w-5xl mx-auto w-full gpu pointer-events-auto">
          <p className="section-label mb-4 md:mb-6 opacity-75">
            Royal Cuisine · Exploded Editorial
          </p>

          <div ref={headlineRef} style={{ opacity: 0 }}>
            <h1
              id="hero-headline"
              className="font-fraunces font-light text-charcoal leading-none tracking-tight mb-5 md:mb-8 text-balance"
              style={{ fontSize: 'clamp(3.5rem, 11vw, 9.5rem)' }}
            >
              The Royal
              <br />
              <em className="font-light italic text-charcoal-light">Thali</em>
            </h1>
          </div>

          <p
            ref={subRef}
            className="font-inter font-light text-charcoal-muted max-w-xs sm:max-w-sm md:max-w-md mx-auto mb-8 md:mb-11 leading-relaxed text-pretty"
            style={{ opacity: 0, fontSize: 'clamp(0.875rem, 1.4vw, 1.1rem)' }}
          >
            Scroll to deconstruct centuries of culinary craftsmanship. Every dish, spice, and garnish floats into suspension.
          </p>

          {/* Magnetic CTA Buttons */}
          <div
            ref={ctaRef}
            className="flex flex-col xs:flex-row items-center justify-center gap-3 md:gap-5"
            style={{ opacity: 0 }}
          >
            <button
              onClick={() => scrollTo('#reserve')}
              className="group relative inline-flex items-center gap-3 px-8 md:px-11 py-3.5 md:py-4 bg-charcoal text-canvas font-inter text-xs md:text-sm tracking-widest uppercase overflow-hidden w-full xs:w-auto justify-center min-h-[48px] shadow-sm hover:shadow-md transition-shadow"
              aria-label="Reserve a table"
            >
              <span className="absolute inset-0 bg-accent translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out" aria-hidden="true" />
              <span className="relative">Reserve Table</span>
              <span className="relative" aria-hidden="true">→</span>
            </button>

            <button
              onClick={() => scrollTo('#samosa')}
              className="group inline-flex items-center gap-2 font-inter text-xs md:text-sm tracking-widest uppercase text-charcoal w-full xs:w-auto justify-center py-3.5 md:py-4 min-h-[48px]"
              aria-label="Explore the exploded view"
            >
              <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-charcoal after:group-hover:w-full after:transition-all after:duration-400">
                Explore Exploded View
              </span>
              <span aria-hidden="true">↓</span>
            </button>
          </div>
        </div>

        {/* Scroll scrub hint */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none" aria-hidden="true">
          <span className="section-label opacity-50 tracking-widest">Scroll to Scrub</span>
          <div className="w-px h-10 md:h-12 bg-charcoal/25 relative overflow-hidden">
            <div className="absolute top-0 w-full h-1/2 bg-charcoal animate-[pulse-soft_2s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    </section>
  )
}
