/**
 * Input sanitization utilities
 * Prevents XSS, SQL injection patterns, and malicious input
 */

/** Strip all HTML tags from a string */
export function stripHTML(input: string): string {
  return input.replace(/<[^>]*>/g, '').trim()
}

/** Sanitize a plain text field — no HTML, no script tags */
export function sanitizeText(input: string): string {
  return stripHTML(input)
    .replace(/[<>'"`;\\]/g, '') // Remove dangerous chars
    .substring(0, 500)           // Hard length limit
    .trim()
}

/** Sanitize email — only allow valid email characters */
export function sanitizeEmail(input: string): string {
  const clean = input.trim().toLowerCase().substring(0, 254)
  const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/
  if (!emailRegex.test(clean)) return ''
  return clean
}

/** Validate and return a safe date string */
export function sanitizeDate(input: string): string {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  if (!dateRegex.test(input)) return ''
  const date = new Date(input)
  if (isNaN(date.getTime())) return ''
  // Must be in the future
  if (date < new Date()) return ''
  return input
}

/** Sanitize guest count */
export function sanitizeGuests(input: string): string {
  const allowed = ['1','2','3','4','5','6','7','8','9+']
  return allowed.includes(input) ? input : ''
}

/** Rate limiter — simple in-memory client-side throttle */
let lastSubmit = 0
export function canSubmitForm(): boolean {
  const now = Date.now()
  if (now - lastSubmit < 10000) return false // 10 second cooldown
  lastSubmit = now
  return true
}

/** Generate a simple CSRF-like token from browser entropy */
export function generateToken(): string {
  const array = new Uint8Array(16)
  crypto.getRandomValues(array)
  return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('')
}
