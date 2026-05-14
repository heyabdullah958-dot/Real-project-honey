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
| **Admin Email** | heyabdullah958@gmail.com (updated from zeeshan...) |

---

## 2. Complete File Structure

```
src/
├── app/
│   ├── api/
│   │   ├── contact/route.ts    ← POST: Sends contact inquiry to admin via Resend
│   │   └── orders/route.ts     ← POST: Processes COD orders, sends emails to admin & customer
│   ├── layout.tsx              ← Root layout: fonts, Navbar, Footer, SmoothScroll, CartDrawer, CookieConsent
│   ├── page.tsx                ← Home page: HeroCanvas + all sections
│   ├── globals.css             ← Global CSS, design tokens, logoPulse keyframes
│   ├── about/page.tsx          ← Features "The Beginning" + Australian Origin Map
│   ├── blog/page.tsx
│   ├── checkout/page.tsx       ← CheckoutForm + OrderSummary + ThankYouView
│   ├── contact/page.tsx        ← Fully wired Contact form + Google Map
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
│   │   └── hero-canvas.tsx     ← ⭐ MAIN HERO: 192-frame canvas + GSAP scroll-synced animation
│   ├── layout/
│   │   ├── navbar.tsx          ← Fixed navbar, logo with glow ring & heartbeat pulse
│   │   ├── footer.tsx          ← Featuring site-wide location Map
│   │   ├── cart-drawer.tsx     ← Slide-out cart (Zustand powered)
│   │   ├── cookie-consent.tsx
│   │   └── smooth-scroll.tsx   ← Lenis + GSAP synced momentum scroll
│   ├── checkout/
│   │   ├── checkout-form.tsx   ← COD form: Fully wired to /api/orders + Verification Map
│   │   ├── order-summary.tsx   ← Shows cart items + total
│   │   └── thank-you-view.tsx  ← Success screen after order
│   ├── products/
│   │   ├── product-card.tsx    ← Clean, effect-free display of transparent product JPEGs
│   │   └── product-buy-actions.tsx
│   ├── sections/               ← Various homepage sections
│   └── ui/
│       └── button.tsx          ← Shared button component
│
├── lib/
│   ├── data.ts                 ← 5 Products: Updated with official transparent NPA images
│   ├── email-templates.ts      ← Premium HTML templates for Order & Contact emails
│   └── utils.ts                ← cn() utility (clsx + tailwind-merge)
│
├── store/
│   └── use-cart-store.ts       ← Zustand cart: persists in memory, cleared after order
│
└── types/
    └── index.ts                ← Product type, CartItem type
```

---

## 3. Key Component Details

### 🎬 hero-canvas.tsx
- **192 JPEG frames** from `/public/honey-frames/00001.jpg` to `00192.jpg`
- **Animation model:** `scrub: 0.1` (synced with Lenis), `end: "+=200%"`, `pin: true`
- **Synchronization:** Linked to GSAP ticker via `SmoothScroll` for jitter-free frames.
- **Persistence:** `lastFrameRef` stores position across re-renders.

### 🗺️ navbar.tsx
- **Logo:** `w-16 h-16` default → `w-12 h-12` when scrolled.
- **Effects:** Amber `ring-2`, subtle radial glow, and `animate-logo-pulse` (breathing effect).
- **Responsive:** Text `text-2xl` → `text-xl` on scroll.

### 🛒 use-cart-store.ts (Zustand)
- Handles `addItem`, `removeItem`, `clearCart`.
- Integration: Form triggers `clearCart()` after successful API response.

### 🧾 checkout-form.tsx
- **Wired:** Connects to `/api/orders`.
- **Validation:** All fields required, auto-capitalization for name/city.
- **Visuals:** Includes a "Ships from Sydney" verification map.

### 📦 product-card.tsx
- **Clean Display:** User requested removal of all CSS effects (mix-blend, glow, shimmer).
- Images show as-is using `object-contain` on transparent `npa X.jpeg` files.

### 🌊 smooth-scroll.tsx (Lenis)
- Multipliers: `wheelMultiplier: 1.8`, `touchMultiplier: 2.8`.
- GSAP Sync: Ticker-driven `lenis.raf` for perfect animation alignment.

---

## 4. Products Data (Static — src/lib/data.ts)

| ID | Name | MGO | Image |
|----|------|-----|-------|
| mgo-30 | Manuka Honey MGO 30 | 30 | `npa 5.jpeg` |
| mgo-100 | Manuka Honey MGO 100 | 100 | `npa 10.jpeg` |
| mgo-263 | Manuka Honey MGO 263 | 263 | `npa 13.jpeg` |
| mgo-400 | Manuka Honey MGO 400 | 400 | `npa 20.jpeg` |
| mgo-800 | Manuka Honey MGO 800 | 800 | `npa 20.jpeg` |

---

## 5. Current Feature Status

| Feature | Status | Notes |
|---------|--------|-------|
| Hero animation | ✅ Working | Synced scrub, jitter-free |
| COD Backend | ✅ Done | /api/orders wired with Resend |
| Contact API | ✅ Done | /api/contact wired with Resend |
| Order emails | ✅ Done | Admin & Customer templates live |
| Smooth scroll | ✅ Working | Buttery momentum (1.8x/2.8x) |
| Logo Effects | ✅ Done | Breathing pulse + Amber glow |
| Google Maps | ✅ Done | Footer, About, and Checkout |
| Product Images | ✅ Updated | Replaced with NPA transparent set |

---

## 6. Pending / TODO

### 🔴 High Priority
- **Domain Verification:** Complete DNS setup in Resend Dashboard to remove 403 sandbox limits.
- **Admin Email:** Revert to `heyabdullah958@gmail.com` once domain is verified (currently using signup email for sandbox).

### 🟡 Medium Priority
- Image optimization audit.
- Analytics integration (GA4).

---

## 7. Environment Variables

| Variable | Value | Used For |
|----------|-------|---------|
| `RESEND_API_KEY` | `re_Se7...` | Email delivery |
| `ADMIN_EMAIL` | `abdullahhere958@gmail.com` | Sandbox recipient |

---

## Rules for AI (Don't Break These)

1. **NEVER change** hero canvas from scrub back to auto-play.
2. **KEEP** the logo breathing animation and glow ring.
3. **DO NOT** re-apply `mix-blend-multiply` to product cards (User prefers clean display).
4. **ALWAYS** ensure `SmoothScroll` syncing with `gsap.ticker`.
5. **LOCATION:** Business is centered in **Sydney, NSW, Australia**.
6. **Next.js 16.2.6** (Turbopack) is used — build is verified and passsing.
7. **BRAND COLOR:** Use `amber-700` or darker for brand accents (replacing `amber-500`) to ensure contrast against white/cream backgrounds.
8. **LEGAL COMPLIANCE:** NEVER use "Antibacterial", "Lab Certified", "Pay on Arrival", "healing", "cure", "medicine", or "treatment". 
9. **TERMINOLOGY:** Use "Scientifically Verified", "Bioactive Profile", "Secure Payment", and "Wellness Support".
10. **PAYMENT:** Payments are processed securely via standard checkout (No "Pay on arrival").
