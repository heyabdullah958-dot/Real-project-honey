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
  metadataBase: new URL("https://amazing-natures-beta.vercel.app"),
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
    url: "https://amazing-natures-beta.vercel.app",
    siteName: "Amazing Natures",
    title: "Amazing Natures | Premium Australian Manuka Honey",
    description: "Nature's purity, bottled in liquid gold. The amazing standard of natural bioactivity.",
    images: [
      {
        url: "/assets/products/mgo-800.png",
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
    images: ["/assets/products/mgo-800.png"],
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
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
