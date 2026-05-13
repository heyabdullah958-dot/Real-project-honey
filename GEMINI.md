# Amazing Natures — Project Memory

## Project Status (as of May 10, 2026)
- **Framework:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4.
- **Visuals:** Cinematic GSAP ScrollTrigger + HTML5 Canvas Hero (192 frames).
- **Core Pages:** Home, Shop (/products), About, Science, Blog, FAQ, Contact, Wellness Quiz, Checkout.
- **E-commerce:** Zustand Cart Store + Slide-out Drawer.
- **Design:** Dark Mode (#050505), Glassmorphism, Amber/Golden highlights.

## Locked Hero Scenario
- **Source:** `/public/honey-frames/00001.jpg` to `00192.jpg`.
- **Motion:** Lid lifts and camera deep dives into the jar opening.
- **Transitions:** `scrub: 1.2`, `pin: true`, `end: +=600%`.

## Current State
- All functional phases from the implementation plan are complete.
- Science section features 192-frame Cinematic Pour Canvas animation.
- Product images use `mix-blend-multiply` CSS trick to hide white backgrounds on dark theme.
- Build is passing and verified.
- SEO and Schema markup are integrated.

## Pending Items
- **Logo:** Final SVG to be placed in `/public/assets/brand`.
- **Shipping:** Logic to be updated once international shipping is confirmed.
- **Legal:** TGA compliance review for health claims.
- **Hosting:** Deployed to Vercel (https://amazing-natures-beta.vercel.app).

## Final Launch Checklist

### 1. Content & Copy
- [x] All pages have real content (Home, Shop, About, Science, Quiz, Contact, Checkout)
- [ ] Spelling and grammar checked on every page
- [x] Contact information is correct (Email, Phone)
- [ ] All links work (test every single one)
- [x] Call-to-action (CTA) buttons on every page
- [ ] Privacy policy page added
- [ ] Terms of service page added
- [ ] 404 error page designed

### 2. Images & Media
- [ ] All images are compressed (under 200KB each)
- [x] Images use proper formats (WebP/JPEG for photos, SVG for icons)
- [ ] Every image has alt text
- [x] No stretched or pixelated images
- [ ] Favicon uploaded
- [ ] Open Graph image set
- [ ] Logo is crisp and properly sized

### 3. SEO (Search Engine Optimization)
- [x] Unique page title for every page
- [x] Meta description for every page
- [ ] Open Graph tags set
- [ ] Twitter card tags set
- [x] H1 heading on every page
- [x] Heading hierarchy is correct
- [x] URL slugs are clean and readable
- [ ] Sitemap.xml generated
- [ ] Robots.txt file configured
- [ ] Canonical URLs set

### 4. Performance & Speed
- [x] Page loads fast (optimized via Next.js)
- [x] Images are lazy loaded (Next.js default)
- [x] CSS and JavaScript files are minified (Next.js default)
- [x] Fonts are optimized

### 5. Mobile & Responsive
- [x] Website looks perfect on mobile phones
- [x] Website looks perfect on tablets
- [x] Website looks perfect on desktop
- [x] Text is readable on mobile
- [x] Buttons and links are easy to tap
- [x] Navigation menu works on mobile (hamburger menu)
- [x] No horizontal scrolling

### 6. Security
- [x] SSL certificate active (via Vercel)
- [x] Environment variables used (never hardcoded)
- [x] No sensitive data exposed
- [ ] Form inputs are validated and sanitized (Checkout/Contact needs review)

### 7. Forms & Functionality
- [ ] All forms submit correctly
- [x] Form validation works (Checkout)
- [ ] Success/error messages show
- [ ] Email notifications arrive

### 8. Analytics & Tracking
- [ ] Google Analytics 4 installed
- [ ] Google Search Console connected
- [ ] Event tracking on key CTAs
- [ ] Cookie consent banner added

### 9. Accessibility
- [ ] All images have alt text
- [x] Color contrast is sufficient
- [x] Website is navigable with keyboard
- [x] Focus states visible

### 10. Pre-Launch Final Checks
- [x] Custom domain connected (Vercel sub-domain)
- [x] Website works on major browsers
- [x] Backup of all code pushed to GitHub

### 11. Post-Launch
- [ ] Submit sitemap to Google Search Console
- [ ] Share the live link
