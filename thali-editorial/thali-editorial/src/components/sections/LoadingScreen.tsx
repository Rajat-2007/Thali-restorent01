'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

// ✅ Static pre-computed values — NO Math.random() at render time
// This prevents SSR/client hydration mismatch
const PARTICLES = [
  { w: 5.2, h: 4.8, l: 12.3, t: 23.4, d: 0.4, dur: 5.2 },
  { w: 3.8, h: 6.1, l: 87.6, t: 64.2, d: 1.2, dur: 4.7 },
  { w: 6.4, h: 3.2, l: 45.1, t: 8.9,  d: 0.8, dur: 6.1 },
  { w: 2.8, h: 5.5, l: 71.8, t: 91.3, d: 2.1, dur: 4.3 },
  { w: 4.6, h: 4.1, l: 33.2, t: 47.6, d: 1.6, dur: 5.8 },
  { w: 7.2, h: 3.9, l: 56.7, t: 15.4, d: 0.2, dur: 6.5 },
  { w: 3.4, h: 6.8, l: 92.4, t: 38.2, d: 2.7, dur: 4.9 },
  { w: 5.8, h: 2.6, l: 18.5, t: 72.9, d: 1.0, dur: 5.4 },
  { w: 4.2, h: 5.3, l: 63.9, t: 55.1, d: 2.4, dur: 6.0 },
  { w: 6.0, h: 4.4, l: 27.6, t: 84.7, d: 0.6, dur: 4.6 },
  { w: 3.1, h: 7.0, l: 79.3, t: 31.8, d: 1.9, dur: 5.7 },
  { w: 5.5, h: 3.7, l: 42.8, t: 5.6,  d: 0.3, dur: 6.3 },
  { w: 4.9, h: 5.0, l: 8.4,  t: 60.3, d: 2.2, dur: 4.8 },
  { w: 2.5, h: 4.6, l: 96.1, t: 77.5, d: 1.5, dur: 5.1 },
  { w: 6.7, h: 3.4, l: 52.3, t: 42.1, d: 2.9, dur: 6.8 },
  { w: 3.9, h: 6.2, l: 74.6, t: 19.8, d: 0.9, dur: 4.4 },
  { w: 5.1, h: 4.0, l: 21.7, t: 88.4, d: 1.7, dur: 5.9 },
  { w: 4.3, h: 5.8, l: 38.9, t: 33.6, d: 0.1, dur: 6.2 },
  { w: 7.0, h: 2.9, l: 66.2, t: 51.7, d: 2.5, dur: 4.5 },
  { w: 3.6, h: 6.5, l: 84.5, t: 14.2, d: 1.3, dur: 5.5 },
]

export function LoadingScreen() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const overlay = overlayRef.current
    const counter = counterRef.current
    const text = textRef.current
    if (!overlay || !counter || !text) return

    document.body.style.overflow = 'hidden'

    const duration = 2200
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const count = Math.floor(eased * 100)
      if (counter) counter.textContent = count.toString().padStart(2, '0')
      if (progress < 1) requestAnimationFrame(tick)
      else onComplete()
    }

    requestAnimationFrame(tick)

    function onComplete() {
      if (counter) counter.textContent = '100'
      gsap.to(text, { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' })
      gsap.to(overlay, {
        yPercent: -100,
        duration: 0.9,
        ease: 'power4.inOut',
        delay: 0.3,
        onComplete: () => {
          document.body.style.overflow = ''
          setHidden(true)
        },
      })
    }
  }, [])

  if (hidden) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9998] bg-canvas flex flex-col items-center justify-center"
      aria-label="Loading"
      role="status"
    >
      {/* ✅ Static particle values — hydration safe */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-accent/20 animate-float"
            style={{
              width: `${p.w}px`,
              height: `${p.h}px`,
              left: `${p.l}%`,
              top: `${p.t}%`,
              animationDelay: `${p.d}s`,
              animationDuration: `${p.dur}s`,
            }}
          />
        ))}
      </div>

      <div ref={textRef} className="flex flex-col items-center gap-8 md:gap-12">
        {/* Brand */}
        <div className="text-center">
          <p className="section-label mb-4 md:mb-6">A Royal Culinary Experience</p>
          <h1
            className="font-fraunces font-light text-charcoal tracking-tight leading-none"
            style={{ fontSize: 'clamp(4rem, 15vw, 9rem)' }}
          >
            थाली
          </h1>
          <p className="font-fraunces font-light text-xl md:text-2xl text-charcoal-muted mt-2 italic">
            Thali
          </p>
        </div>

        {/* Counter */}
        <div className="flex items-end gap-1">
          <span
            ref={counterRef}
            className="loader-counter font-inter font-light text-charcoal tabular-nums"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}
          >
            00
          </span>
          <span
            className="font-inter font-light text-charcoal-muted mb-1"
            style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)' }}
          >
            %
          </span>
        </div>
      </div>
    </div>
  )
}
