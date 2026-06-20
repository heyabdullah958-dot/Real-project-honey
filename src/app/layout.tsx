import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import CartDrawer from "@/components/layout/cart-drawer";
import CookieConsent from "@/components/layout/cookie-consent";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://amazingnatures.com.au"),
  title: {
    default: "Amazing Natures | Premium Australian Manuka Honey",
    template: "%s | Amazing Natures"
  },
  description: "Nature's purity, bottled in liquid gold. Experience the amazing standard of natural bioactivity with raw, ethically harvested Australian Manuka.",
  keywords: ["Manuka Honey", "Australian Honey", "MGO 800", "Ethically Harvested Honey", "Raw Honey Australia"],
  authors: [{ name: "Amazing Natures" }],
  creator: "Amazing Natures",
  publisher: "Amazing Natures",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://amazingnatures.com.au",
    siteName: "Amazing Natures",
    title: "Amazing Natures | Premium Australian Manuka Honey",
    description: "Nature's purity, bottled in liquid gold. The amazing standard of natural bioactivity.",
    images: [
      {
        url: "/assets/products/mgo-30.webp",
        width: 1200,
        height: 630,
        alt: "Amazing Natures Liquid Gold",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amazing Natures | Premium Australian Manuka Honey",
    description: "Experience the amazing standard of natural bioactivity.",
    images: ["/assets/products/mgo-30.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FBF5E9] text-text-primary selection:bg-amber-700/30">
        {/* GA4 script removed — add real Measurement ID when Analytics is configured */}
        <SmoothScroll />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <CartDrawer />
        <CookieConsent />
      </body>
    </html>
  );
}
