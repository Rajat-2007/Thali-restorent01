'use client'

import { useEffect, useRef } from 'react'

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const initGSAP = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.to(bar, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          scrub: 0.3,
          start: 'top top',
          end: 'bottom bottom',
        },
      })
    }

    initGSAP()
  }, [])

  return (
    <div
      ref={barRef}
      className="progress-bar"
      style={{ width: '100%', transform: 'scaleX(0)', transformOrigin: 'left' }}
      aria-hidden="true"
      role="presentation"
    />
  )
}
