'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const navLinks = [
  { label: 'Menu', href: '#menu' },
  { label: 'Story', href: '#story' },
  { label: 'Spices', href: '#spices' },
  { label: 'Experience', href: '#experience' },
  { label: 'Reserve', href: '#reserve' },
]

export function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    setTimeout(() => {
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
    }, menuOpen ? 300 : 0)
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3 bg-canvas/90 backdrop-blur-sm shadow-sm' : 'py-4 md:py-6 bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-screen-xl mx-auto px-5 md:px-10 flex items-center justify-between">
          <Link href="/" className="font-fraunces text-charcoal font-light text-lg md:text-xl tracking-tight min-h-[44px] flex items-center" aria-label="Thali Home">
            थाली <span className="text-charcoal-muted text-sm md:text-base font-normal ml-1.5">Thali</span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-8 xl:gap-10" role="list">
            {navLinks.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className="section-label hover:text-charcoal transition-colors duration-300 relative group min-h-[44px] flex items-center"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-charcoal group-hover:w-full transition-all duration-400 ease-out" />
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => scrollTo('#reserve')}
            className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 border border-charcoal text-charcoal section-label hover:bg-charcoal hover:text-canvas transition-all duration-300 min-h-[44px]"
          >
            Reserve a Table
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2 min-h-[48px] min-w-[48px] items-center justify-center"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className={`block w-6 h-px bg-charcoal transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
            <span className={`block w-6 h-px bg-charcoal transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-6 h-px bg-charcoal transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-canvas flex flex-col justify-between px-6 pt-24 pb-8 transition-all duration-500 lg:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <ul className="flex flex-col gap-1" role="list">
          {navLinks.map((link, i) => (
            <li key={link.label} style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}>
              <button
                onClick={() => scrollTo(link.href)}
                className={`block w-full text-left font-fraunces font-light text-charcoal py-3.5 border-b border-cream-dark transition-all duration-500 min-h-[52px] ${
                  menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{ fontSize: 'clamp(2rem, 7vw, 3rem)' }}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => scrollTo('#reserve')}
          className="block w-full text-center py-4 bg-charcoal text-canvas font-inter text-sm tracking-widest uppercase min-h-[52px]"
        >
          Reserve a Table
        </button>
      </div>
    </>
  )
}
