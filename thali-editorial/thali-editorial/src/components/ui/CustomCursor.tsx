'use client'

import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isVideo, setIsVideo] = useState(false)
  const pos = useRef({ x: -100, y: -100 })
  const raf = useRef<number>(0)

  useEffect(() => {
    // Only on devices with fine pointer (desktop)
    const mq = window.matchMedia('(pointer: fine)')
    if (!mq.matches) return

    const cursor = cursorRef.current
    if (!cursor) return

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const tick = () => {
      if (cursor) {
        cursor.style.left = `${pos.current.x}px`
        cursor.style.top = `${pos.current.y}px`
      }
      raf.current = requestAnimationFrame(tick)
    }

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      setIsVideo(target.tagName === 'VIDEO' || target.closest('[data-cursor="video"]') !== null)
      setIsHovering(
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.getAttribute('role') === 'button'
      )
    }

    const onLeave = () => {
      setIsHovering(false)
      setIsVideo(false)
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
      className={`custom-cursor ${isHovering ? 'is-hovering' : ''} ${isVideo ? 'is-video' : ''}`}
      aria-hidden="true"
    />
  )
}
