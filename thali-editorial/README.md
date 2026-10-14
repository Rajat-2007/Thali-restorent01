# Thali — Royal Indian Editorial Experience 🍛

An Awwwards-level interactive editorial website built with:
- **Next.js 15** (App Router + Server Components)
- **GSAP + ScrollTrigger** — scroll-scrubbed videos, all animations
- **Lenis** — buttery smooth scrolling
- **Framer Motion** — page transitions
- **Three.js / React Three Fiber** — spice particle constellation
- **Tailwind CSS** — full design system
- **TypeScript**

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Add your 6 Google Flow videos to:
#    public/videos/video-1.mp4 through video-6.mp4

# 3. Start dev server
npm run dev

# 4. Open http://localhost:3000
```

---

## 📁 Project Structure

```
thali-editorial/
├── public/
│   ├── images/         # 4 editorial images (pre-loaded ✅)
│   └── videos/         # 6 Google Flow videos (add yours here)
├── src/
│   ├── app/
│   │   ├── layout.tsx  # Root layout, fonts, metadata
│   │   ├── page.tsx    # Main page
│   │   └── globals.css # Global styles
│   └── components/
│       ├── layout/     # NavBar, SmoothScroll
│       ├── sections/   # All 8 page sections
│       ├── three/      # SpiceParticles (Three.js)
│       └── ui/         # Grain, Cursor, ScrollProgress
```

---

## 📱 Mobile Responsiveness

Every section is fully mobile-optimized:
- **375px+** — xs (small phones)
- **640px+** — sm (large phones, nav CTA visible)
- **768px+** — md (tablets, 2-col layouts)
- **1024px+** — lg (desktop, full layout)

Mobile-specific features:
- Hamburger menu with full-screen overlay
- Custom cursor disabled on touch devices
- Grain opacity reduced for performance
- Particle count optimized for mobile GPU
- Video scrubbing simplified with touch support
- Touch-optimized 44px minimum tap targets
- `prefers-reduced-motion` respected
- `-webkit-overflow-scrolling: touch` on scroll containers

---

## 🎬 Video Scrubbing

Videos are scrubbed via GSAP ScrollTrigger:
```
video.currentTime = scrollProgress * video.duration
```
- Preload only hero video
- All others lazy load on scroll approach
- Videos never autoplay
- requestAnimationFrame optimized

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Canvas | `#FAFAF8` |
| Charcoal | `#2B2320` |
| Accent | `#C4622D` |
| Heading | Fraunces (serif) |
| Body | Inter (sans) |
| Motion | GSAP + Lenis |

---

## ⚡ Performance

- Server Components where possible
- Dynamic imports for Three.js (lazy)
- `next/image` with WebP + AVIF
- Only hero assets preloaded
- Low-power GPU hint for Three.js on mobile
- `dpr={[1, 1.5]}` cap on Canvas
- CLS near zero (no layout shift)

---

Built for Awwwards SOTD quality. 🏆
