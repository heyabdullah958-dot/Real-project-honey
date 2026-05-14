# Design Specification: Checkout Polish & Global Compliance Cleanup
**Date:** 2026-05-15
**Status:** Draft

## 1. Overview
This design covers a comprehensive cleanup of the "Amazing Natures" project to ensure compliance with legal requirements (removing medical/prohibited terminology), enhancing visual contrast (the "Deep Gold" transition), and polishing the checkout experience for Cash on Delivery (COD).

## 2. Checkout UI Refinements (src/app/checkout/page.tsx & related)

### 2.1 Payment Method (COD Polish)
- **Component:** `CheckoutForm`
- **Header:** Change to "PREMIUM PAY-ON-ARRIVAL" (`text-amber-800`).
- **Description:** "Inspect your liquid gold at your doorstep before you pay. We trust our quality, and we trust you." (`text-text-secondary`).
- **Security:** Retain the `Lock` icon but update its color to match the new amber scheme.

### 2.2 Shipping Section (Eco-Friendly)
- **Component:** `CheckoutForm`
- **Header:** "100% CARBON-NEUTRAL & PLASTIC-FREE" (`text-amber-800`).
- **Description:** "Every jar is meticulously packed in sustainable wood-wool or recycled honeycomb paper for ultimate protection and environmental care."
- **Icon:** Update icon color to `text-amber-800`.

### 2.3 Cleanup & Removals
- **Order Summary:** Delete the entire "AUTHENTICITY GUARANTEED" / "VERIFIED ACTIVITY REPORT" card from `src/components/checkout/order-summary.tsx`.
- **Links:** Remove any "Click to view certificate" buttons or links throughout the checkout flow.
- **Disclaimers:** Delete the concierge outreach text ("By clicking, you agree to receive a brief Concierge Outreach...") at the bottom of the checkout form and in `thank-you-view.tsx`.

### 2.4 Visual Accessibility
- **Inputs:** Update `FloatingInput` and `textarea` in `CheckoutForm` to use `text-text-primary/70` for input text and labels (when floating) to ensure readability.
- **Button Text:** Update main checkout button from "SECURE MY JAR" (if present) or current text to "PROCEED TO SECURE PAYMENT".

## 3. Global "Deep Gold" Transformation

### 3.1 Color Migration
- **globals.css:** Update theme variables. Shift `--color-amber-500` to the value of `--color-amber-700` (or a similar deep gold).
- **Search & Replace:** Replace all Tailwind utility classes `text-amber-500`, `bg-amber-500`, and `border-amber-500` with their `amber-700` counterparts.
- **Exceptions:** Use `amber-800` or `amber-900` where needed for contrast against light backgrounds.

### 3.2 Science Page Specifics
- **Button:** Update the "EXPLORE THE COLLECTION" button text to `text-amber-900` to stand out on its background.
- **Alignment:** Ensure the button is properly aligned/centered on mobile devices.

## 4. Compliance & Terminology

### 4.1 About Page (src/app/about/page.tsx)
- **Card Header:** Change "LAB CERTIFIED" to "SCIENTIFICALLY VERIFIED".
- **Content:** Change "therapeutic potency" to "bioactive profile".

### 4.2 Prohibited Terms Sweep
Search and remove/replace the following terms project-wide:
- "Antibacterial" -> "Bioactive" or remove.
- "Lab Certified" -> "Scientifically Verified".
- "Concierge" -> remove.
- "Arrival" (except in "PAY-ON-ARRIVAL") -> "Delivery".

## 5. Mobile Button Alignment
- Ensure all major CTA buttons (Checkout, Science CTA, Product Cards) are full-width or appropriately centered on mobile screens (viewport < 768px).

---
**Spec Review:**
- No placeholders (TBD/TODO).
- Consistent with user request for COD and Deep Gold.
- Scope is manageable for a single implementation plan.
