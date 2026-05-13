# Amazing Natures — Project Memory (AI Context File)
> Last updated: 13 May 2026 | Read this BEFORE reading any source files.

---

## 1. Project Overview

| Key | Value |
|-----|-------|
| **Brand** | Amazing Natures — Premium Australian Manuka Honey |
| **Framework** | Next.js 16.2.6 (App Router), TypeScript, Tailwind CSS v4 |
| **Deployment** | Vercel → https://amazing-natures-beta.vercel.app |
| **Repo** | GitHub (pushed, connected to Vercel) |
| **Design** | Dark Mode `#050505`, Amber/Gold `#f59e0b`, Glassmorphism |
| **Fonts** | Cormorant Garamond (display), Outfit (heading), Inter (body) |
| **Payment** | Cash on Delivery ONLY — no Stripe, no card processing |
| **Shipping** | Australia only (for now) |

---

## 2. Complete File Structure

```
src/
├── app/
│   ├── layout.tsx              ← Root layout: fonts, Navbar, Footer, SmoothScroll, CartDrawer, CookieConsent
│   ├── page.tsx                ← Home page: HeroCanvas + all sections
│   ├── globals.css             ← Global CSS, design tokens
│   ├── about/page.tsx
│   ├── blog/page.tsx
│   ├── checkout/page.tsx       ← CheckoutForm + OrderSummary + ThankYouView
│   ├── contact/page.tsx        ← Contact form (NOT wired — no API yet)
│   ├── faq/page.tsx
│   ├── not-found.tsx
│   ├── privacy-policy/page.tsx
│   ├── products/
│   │   ├── page.tsx            ← Product grid + Potency comparison table
│   │   └── [slug]/page.tsx     ← Individual product detail page
│   ├── robots.ts
│   ├── science/page.tsx
│   ├── sitemap.ts
│   ├── shipping-policy/page.tsx
│   ├── terms-of-service/page.tsx
│   └── wellness-quiz/page.tsx
│
├── components/
│   ├── home/
│   │   └── hero-canvas.tsx     ← ⭐ MAIN HERO: 192-frame canvas + GSAP scroll animation
│   ├── layout/
│   │   ├── navbar.tsx          ← Fixed navbar, logo with glow ring, sticky shrink on scroll
│   │   ├── footer.tsx
│   │   ├── cart-drawer.tsx     ← Slide-out cart (Zustand powered)
│   │   ├── cookie-consent.tsx
│   │   └── smooth-scroll.tsx   ← Lenis smooth scroll (wraps whole app)
│   ├── checkout/
│   │   ├── checkout-form.tsx   ← COD form: name, whatsapp, city, address — FAKE submit (setTimeout)
│   │   ├── order-summary.tsx   ← Shows cart items + total
│   │   └── thank-you-view.tsx  ← Success screen after order
│   ├── products/
│   │   ├── product-card.tsx    ← 3D tilt card, dark warm gradient bg, amber glow
│   │   └── product-buy-actions.tsx
│   ├── sections/               ← Various homepage sections
│   └── ui/
│       └── button.tsx          ← Shared button component
│
├── lib/
│   ├── data.ts                 ← All 5 products (static, not from DB)
│   └── utils.ts                ← cn() utility (clsx + tailwind-merge)
│
├── store/
│   └── use-cart-store.ts       ← Zustand cart: items, add, remove, total
│
└── types/
    └── index.ts                ← Product type, CartItem type
```

---

## 3. Key Component Details

### 🎬 hero-canvas.tsx (MOST COMPLEX FILE)
- **192 JPEG frames** from `/public/honey-frames/00001.jpg` to `00192.jpg`
- **Current animation model:** `scrub: 1.2`, `end: "+=200%"`, `pin: true`
- **Frame persistence:** `lastFrameRef` stores last frame across re-mounts
- **Safety flags:** `fastScrollEnd: true`, `preventOverlaps: true`
- **Text acts:** 4 acts (act-1 through act-4) animate in/out via GSAP timeline
- **DO NOT change:** scrub model, frame count, act structure

### 🗺️ navbar.tsx
- Logo: `/public/assets/brand/Amazing_Natures_logo_design_202605111144.jpeg`
- Logo size: `w-14 h-14 md:w-16 md:h-16` default → `w-12 h-12` when scrolled
- Has amber `ring` glow + hover effect
- Brand text: `text-2xl` default → `text-xl` when scrolled
- `isScrolled` triggers at `window.scrollY > 20`

### 🛒 use-cart-store.ts (Zustand)
- State: `items: CartItem[]`, `isOpen: boolean`
- Actions: `addItem`, `removeItem`, `updateQuantity`, `clearCart`, `toggleCart`
- Cart persists in memory only (no localStorage)

### 🧾 checkout-form.tsx
- Fields: Full Name, WhatsApp Number, City, Address (textarea)
- Payment: COD only — hardcoded "White-Glove Pay-on-Arrival" display
- Submit: **FAKE** — `setTimeout(onSuccess, 2000)` — **no real API call**
- **TODO:** Wire to `/api/orders` POST endpoint

### 📦 product-card.tsx
- 3D tilt via Framer Motion `useSpring`, `useTransform`, `rotateX`, `rotateY`
- Image container: `radial-gradient(ellipse at 50% 40%, #1c1008 → #0a0603 → #050302)`
- NO `mix-blend-multiply` — product images show with true colors
- Inset `box-shadow` vignette fades white JPEG edges into dark bg
- `drop-shadow-2xl` for product depth
- Product-color bloom intensifies on hover

### 🌊 smooth-scroll.tsx (Lenis)
- `duration: 1.2`
- `wheelMultiplier: 1.8` — each scroll gesture carries 1.8× further
- `touchMultiplier: 2.8` — mobile swipes carry further

---

## 4. Products Data (Static — src/lib/data.ts)

| ID | Name | MGO | Price | Color |
|----|------|-----|-------|-------|
| mgo-30 | Manuka Honey MGO 30 | 30 | $14 | `#C8A96E` |
| mgo-100 | Manuka Honey MGO 100 | 100 | $18 | `#C49A2A` |
| mgo-263 | Manuka Honey MGO 263 | 263 | $40 | `#D4930A` |
| mgo-400 | Manuka Honey MGO 400 | 400 | $70 | `#B87800` |
| mgo-800 | Manuka Honey MGO 800 | 800 | $160 | `#9B6500` |

Product images: `/public/assets/products/mgo-{grade}.png`

---

## 5. Dependencies (package.json)

```json
"dependencies": {
  "canvas-confetti": "^1.9.4",
  "framer-motion": "^12.38.0",
  "gsap": "^3.15.0",
  "lenis": "^1.3.23",
  "lucide-react": "^1.14.0",
  "next": "16.2.6",
  "react": "19.2.4",
  "zustand": "^5.0.13"
}
```

---

## 6. Current Feature Status

| Feature | Status | Notes |
|---------|--------|-------|
| Hero canvas animation | ✅ Working | scrub:1.2, end:+=200% |
| Product pages | ✅ Working | 5 products, static data |
| Cart + Drawer | ✅ Working | Zustand, no persistence |
| Checkout UI | ✅ Working | COD form, beautiful UI |
| Checkout API | ❌ NOT DONE | setTimeout fake only |
| Order emails | ❌ NOT DONE | No Resend integration yet |
| Contact form | ❌ NOT DONE | Form UI exists, no API |
| Smooth scroll | ✅ Working | Lenis 1.8x multiplier |
| Logo prominence | ✅ Done | Glow ring, shrink on scroll |
| Product card bg | ✅ Done | Warm dark gradient, no mix-blend |
| SEO meta tags | ✅ Done | All pages |
| Cookie consent | ✅ Done | UI component present |
| 404 page | ✅ Done | not-found.tsx exists |
| Privacy Policy | ✅ Done | Page exists |
| Terms of Service | ✅ Done | Page exists |
| Sitemap | ✅ Done | sitemap.ts auto-generates |
| Robots.txt | ✅ Done | robots.ts exists |

---

## 7. Pending / TODO

### 🔴 High Priority
- **COD Backend:** Create `/api/orders` Route Handler → send email to admin via Resend
- **Contact form API:** Create `/api/contact` Route Handler
- **Resend setup:** `npm install resend`, add `RESEND_API_KEY` to `.env.local` + Vercel

### 🟡 Medium Priority
- Product images compression (some over 200KB)
- All images need alt text audit
- Open Graph image properly set
- Google Analytics 4 (gtag)

### 🟢 Low Priority
- Logo: Replace JPEG with proper SVG in `/public/assets/brand`
- TGA compliance review for health claims
- International shipping logic

---

## 8. Environment Variables

| Variable | Value | Used For |
|----------|-------|---------|
| `RESEND_API_KEY` | `re_xxxx` (NOT YET ADDED) | Order + contact emails |

Add to: `.env.local` locally, Vercel Dashboard → Environment Variables in production.

---

## 9. Design System Tokens

```css
--color-void: #050505          /* Main bg */
--color-earth: #1a0f02         /* Warm dark */
--color-amber: #f59e0b         /* Primary accent */
--color-text-primary: #f5f5f0  /* Main text */
--color-text-secondary: #a8a29e /* Muted text */
```

---

## 10. Admin Contact Info (in codebase)
- **Email:** zeeshan.ahmed2691@gmail.com
- **Phone:** 0405 686 486
- **Address:** 123 Wilderness Way, New South Wales 2000, Australia

---

## Rules for AI (Don't Break These)

1. **NEVER change** hero canvas from scrub model back to auto-play
2. **NEVER use** `mix-blend-multiply` on product images
3. **NEVER add** Stripe or card payment — COD only
4. **ALWAYS** use Next.js Route Handlers for any API (no separate Express server)
5. **ALWAYS** read this file first before reading any source files
6. **Font classes:** `font-display` = Cormorant, `font-heading` = Outfit, default = Inter
7. **Next.js version is 16.2.6** — check `/node_modules/next/dist/docs/` for API changes before writing Next.js-specific code
