'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import {
  sanitizeText,
  sanitizeEmail,
  sanitizeDate,
  sanitizeGuests,
  canSubmitForm,
  generateToken,
} from '@/lib/security'

interface FormState {
  name: string
  email: string
  date: string
  guests: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  date?: string
  guests?: string
}

export function ReservationCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState<FormState>({
    name: '', email: '', date: '', guests: '', message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [rateLimited, setRateLimited] = useState(false)
  const [csrfToken] = useState(() =>
    typeof window !== 'undefined' ? generateToken() : ''
  )

  // Minimum date = today
  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: headlineRef.current, start: 'top 80%' },
          }
        )
      }
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2,
            scrollTrigger: { trigger: formRef.current, start: 'top 85%' },
          }
        )
      }
    }
    initGSAP()
  }, [])

  const validate = useCallback((): FormErrors => {
    const errs: FormErrors = {}

    const cleanName = sanitizeText(formData.name)
    if (!cleanName || cleanName.length < 2) errs.name = 'Please enter your full name.'

    const cleanEmail = sanitizeEmail(formData.email)
    if (!cleanEmail) errs.email = 'Please enter a valid email address.'

    const cleanDate = sanitizeDate(formData.date)
    if (!cleanDate) errs.date = 'Please select a future date.'

    const cleanGuests = sanitizeGuests(formData.guests)
    if (!cleanGuests) errs.guests = 'Please select the number of guests.'

    return errs
  }, [formData])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    // Strip any HTML on every keystroke
    setFormData(prev => ({ ...prev, [name]: value.replace(/<[^>]*>/g, '') }))
    // Clear field error on change
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Rate limiting
    if (!canSubmitForm()) {
      setRateLimited(true)
      setTimeout(() => setRateLimited(false), 10000)
      return
    }

    // Validation
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      // Focus first error field
      const firstErrField = Object.keys(errs)[0]
      const el = formRef.current?.querySelector(`[name="${firstErrField}"]`) as HTMLElement
      el?.focus()
      return
    }

    setSubmitting(true)

    // Sanitize all fields before "sending"
    const safePayload = {
      name: sanitizeText(formData.name),
      email: sanitizeEmail(formData.email),
      date: sanitizeDate(formData.date),
      guests: sanitizeGuests(formData.guests),
      message: sanitizeText(formData.message),
      _csrf: csrfToken,
    }

    // Simulate API call (replace with real endpoint)
    await new Promise(r => setTimeout(r, 800))
    console.log('Safe form payload:', safePayload) // ← Replace with fetch('/api/reserve', {...})

    setSubmitting(false)
    setSubmitted(true)
  }

  return (
    <section
      ref={sectionRef}
      id="reserve"
      className="relative bg-canvas py-24 md:py-44 lg:py-56 px-5 md:px-10 overflow-hidden"
      aria-labelledby="reserve-headline"
    >
      {/* Decorative number */}
      <div
        className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 font-fraunces font-light text-charcoal/[0.03] leading-none select-none pointer-events-none"
        style={{ fontSize: 'clamp(8rem, 25vw, 28rem)' }}
        aria-hidden="true"
      >
        08
      </div>

      <div className="max-w-screen-xl mx-auto relative z-10">
        <p className="section-label mb-8 md:mb-14">08 — Reserve Your Table</p>

        {!submitted ? (
          <>
            {/* Headline */}
            <div ref={headlineRef} className="mb-12 md:mb-20" style={{ opacity: 0 }}>
              <h2
                id="reserve-headline"
                className="font-fraunces font-light text-charcoal leading-tight text-balance"
                style={{ fontSize: 'clamp(2.2rem, 6vw, 7rem)' }}
              >
                Secure your
                <br />
                <em className="italic text-charcoal-light">seat at the table.</em>
              </h2>
            </div>

            {/* Form */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              autoComplete="on"
              className="max-w-2xl w-full"
              style={{ opacity: 0 }}
              aria-label="Table reservation form"
            >
              {/* Hidden CSRF token */}
              <input type="hidden" name="_csrf" value={csrfToken} readOnly />

              {/* Honeypot field — bots fill this, humans don't see it */}
              <input
                type="text"
                name="_honey"
                tabIndex={-1}
                aria-hidden="true"
                className="absolute opacity-0 pointer-events-none h-0 w-0"
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7 md:gap-y-10">

                {/* Name */}
                <div className="flex flex-col gap-1.5 col-span-1">
                  <label htmlFor="name" className="section-label">
                    Full Name <span aria-hidden="true" className="text-accent">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    maxLength={100}
                    autoComplete="name"
                    className={`input-editorial ${errors.name ? 'border-b-red-400' : ''}`}
                    placeholder="Arjun Mehta"
                    value={formData.name}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <span id="name-error" role="alert" className="text-red-500 font-inter" style={{ fontSize: '0.72rem', letterSpacing: '0.05em' }}>
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5 col-span-1">
                  <label htmlFor="email" className="section-label">
                    Email <span aria-hidden="true" className="text-accent">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    maxLength={254}
                    autoComplete="email"
                    inputMode="email"
                    className={`input-editorial ${errors.email ? 'border-b-red-400' : ''}`}
                    placeholder="arjun@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <span id="email-error" role="alert" className="text-red-500 font-inter" style={{ fontSize: '0.72rem', letterSpacing: '0.05em' }}>
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Date */}
                <div className="flex flex-col gap-1.5 col-span-1">
                  <label htmlFor="date" className="section-label">
                    Preferred Date <span aria-hidden="true" className="text-accent">*</span>
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    required
                    min={today}
                    className={`input-editorial ${errors.date ? 'border-b-red-400' : ''}`}
                    value={formData.date}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!errors.date}
                    aria-describedby={errors.date ? 'date-error' : undefined}
                  />
                  {errors.date && (
                    <span id="date-error" role="alert" className="text-red-500 font-inter" style={{ fontSize: '0.72rem', letterSpacing: '0.05em' }}>
                      {errors.date}
                    </span>
                  )}
                </div>

                {/* Guests */}
                <div className="flex flex-col gap-1.5 col-span-1">
                  <label htmlFor="guests" className="section-label">
                    Guests <span aria-hidden="true" className="text-accent">*</span>
                  </label>
                  <select
                    id="guests"
                    name="guests"
                    required
                    className={`input-editorial bg-transparent appearance-none ${errors.guests ? 'border-b-red-400' : ''}`}
                    value={formData.guests}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!errors.guests}
                    aria-describedby={errors.guests ? 'guests-error' : undefined}
                  >
                    <option value="" disabled>Select guests</option>
                    {['1','2','3','4','5','6','7','8','9+'].map(n => (
                      <option key={n} value={n}>{n} {n === '1' ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                  {errors.guests && (
                    <span id="guests-error" role="alert" className="text-red-500 font-inter" style={{ fontSize: '0.72rem', letterSpacing: '0.05em' }}>
                      {errors.guests}
                    </span>
                  )}
                </div>

                {/* Message — full width */}
                <div className="flex flex-col gap-1.5 col-span-1 sm:col-span-2">
                  <label htmlFor="message" className="section-label">
                    Special Requests <span className="text-charcoal-muted font-inter normal-case" style={{ fontSize: '0.65rem' }}>(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    maxLength={500}
                    className="input-editorial resize-none"
                    placeholder="Dietary requirements, celebrations, special arrangements..."
                    value={formData.message}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  <span className="self-end section-label text-charcoal-muted">
                    {formData.message.length}/500
                  </span>
                </div>
              </div>

              {/* Rate limit warning */}
              {rateLimited && (
                <p role="alert" className="mt-4 text-amber-600 font-inter text-xs tracking-wide">
                  Please wait a moment before submitting again.
                </p>
              )}

              {/* Submit */}
              <div className="mt-10 md:mt-14">
                <button
                  type="submit"
                  disabled={submitting || rateLimited}
                  className="group relative inline-flex items-center gap-4 px-8 md:px-12 py-4 md:py-5 bg-charcoal text-canvas font-inter text-sm tracking-widest uppercase overflow-hidden w-full sm:w-auto justify-center disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
                  aria-busy={submitting}
                >
                  <span
                    className="absolute inset-0 bg-accent translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out group-disabled:translate-x-[-101%]"
                    aria-hidden="true"
                  />
                  <span className="relative">
                    {submitting ? 'Confirming…' : 'Confirm Reservation'}
                  </span>
                  {!submitting && <span className="relative text-lg" aria-hidden="true">→</span>}
                </button>
              </div>

              <p className="mt-5 font-inter font-light text-charcoal-muted leading-relaxed" style={{ fontSize: 'clamp(0.65rem, 0.9vw, 0.75rem)' }}>
                We will confirm within 24 hours. Immediate assistance: <a href="tel:+919876543210" className="underline">+91 98765 43210</a>
                <br />Your data is never shared or sold. 🔒
              </p>
            </form>
          </>
        ) : (
          /* Success state */
          <div className="max-w-xl" role="alert" aria-live="polite">
            <div ref={headlineRef}>
              <p className="section-label mb-5 text-accent">✓ Reservation Received</p>
              <h2
                className="font-fraunces font-light text-charcoal leading-tight mb-5"
                style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
              >
                We look forward
                <br />
                <em className="italic text-charcoal-light">to welcoming you.</em>
              </h2>
              <p className="font-inter font-light text-charcoal-muted leading-relaxed" style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1rem)' }}>
                A confirmation is on its way to <strong>{sanitizeEmail(formData.email)}</strong>.
                <br />Table for <strong>{sanitizeGuests(formData.guests)}</strong> on <strong>{sanitizeDate(formData.date)}</strong>.
                <br /><br />— The Thali Team
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer strip */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-cream-dark" aria-hidden="true" />
      <div className="relative mt-24 md:mt-32 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-t border-cream-dark pt-6">
        <p className="section-label text-charcoal-muted">© {new Date().getFullYear()} Thali Restaurant. Mumbai, India.</p>
        <div className="flex gap-6">
          <button
            onClick={() => alert('Privacy policy — coming soon')}
            className="section-label text-charcoal-muted hover:text-charcoal transition-colors"
          >
            Privacy
          </button>
          <button
            onClick={() => alert('Terms — coming soon')}
            className="section-label text-charcoal-muted hover:text-charcoal transition-colors"
          >
            Terms
          </button>
        </div>
      </div>
    </section>
  )
}
