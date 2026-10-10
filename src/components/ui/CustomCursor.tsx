'use client'

import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [cursorText, setCursorText] = useState('')
  const [isHovering, setIsHovering] = useState(false)
  const [isVideo, setIsVideo] = useState(false)
  const pos = useRef({ x: -100, y: -100 })
  const currentPos = useRef({ x: -100, y: -100 })
  const raf = useRef<number>(0)

  useEffect(() => {
    // Only run on non-touch devices
    const mq = window.matchMedia('(pointer: fine)')
    if (!mq.matches) return

    const cursor = cursorRef.current
    if (!cursor) return

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    // Smooth lerp trailing animation for buttery feel
    const tick = () => {
      currentPos.current.x += (pos.current.x - currentPos.current.x) * 0.18
      currentPos.current.y += (pos.current.y - currentPos.current.y) * 0.18

      if (cursor) {
        cursor.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%)`
      }
      raf.current = requestAnimationFrame(tick)
    }

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const videoZone = target.closest('[data-cursor="video"]')
      const buttonZone = target.closest('button, a, [role="button"]')

      if (videoZone) {
        setIsVideo(true)
        setCursorText('SCRUB')
      } else if (buttonZone) {
        setIsHovering(true)
        setIsVideo(false)
        setCursorText('')
      } else {
        setIsHovering(false)
        setIsVideo(false)
        setCursorText('')
      }
    }

    const onLeave = () => {
      setIsHovering(false)
      setIsVideo(false)
      setCursorText('')
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)
    raf.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[99999] transition-[width,height,background-color] duration-300 ease-out flex items-center justify-center rounded-full will-change-transform ${
        isVideo
          ? 'w-16 h-16 bg-charcoal/85 text-canvas text-[10px] tracking-widest font-inter'
          : isHovering
          ? 'w-12 h-12 bg-transparent border border-charcoal/70'
          : 'w-3 h-3 bg-charcoal'
      }`}
      aria-hidden="true"
    >
      {isVideo && <span className="select-none font-medium">{cursorText}</span>}
    </div>
  )
}
