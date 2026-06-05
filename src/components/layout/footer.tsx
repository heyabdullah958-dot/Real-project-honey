"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const AnimatedLink = ({ href, children }: { href: string; children: string }) => {
  return (
    <Link href={href} className="group relative block w-fit overflow-hidden">
      <motion.div
        className="relative flex"
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
        {children.split("").map((char, i) => (
          <motion.span
            key={i}
            variants={{
              rest: { y: 0, opacity: 1, color: "var(--text-secondary)" },
              hover: { 
                y: [0, -2, 0], 
                opacity: 1, 
                color: "#d97706", // amber-600
                transition: { 
                  duration: 0.4, 
                  delay: i * 0.02,
                  ease: [0.22, 1, 0.36, 1] 
                }
              }
            }}
            className="inline-block whitespace-pre text-sm"
          >
            {char}
          </motion.span>
        ))}
        {/* Shimmer Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-700/20 to-transparent w-full h-full skew-x-12"
          variants={{
            rest: { x: "-100%" },
            hover: { 
              x: "200%",
              transition: { duration: 0.8, ease: "easeInOut", delay: 0.1 } 
            }
          }}
        />
      </motion.div>
    </Link>
  );
};

const SocialIcon = ({ icon: Icon, href = "#" }: { icon: React.ElementType; href?: string }) => (
  <motion.a
    href={href}
    whileHover={{ scale: 1.15 }}
    className="relative group p-2 text-amber-900/80 hover:text-amber-700 transition-colors duration-300"
  >
    <Icon className="w-5 h-5 relative z-10" />
    <AnimatePresence>
      <motion.div
        className="absolute inset-0 bg-amber-700/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        initial={{ scale: 0 }}
        whileHover={{ scale: 1.5, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
      />
    </AnimatePresence>
    <motion.div
      className="absolute inset-0 drop-shadow-[0_0_12px_rgba(217,119,6,0.7)] opacity-0 group-hover:opacity-100 transition-opacity"
    />
  </motion.a>
);

const Footer = () => {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="bg-white relative pt-16 pb-8 px-8 mt-12 overflow-visible border-t border-amber-900/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 relative z-10 text-center md:text-left justify-items-center md:justify-items-start">
        {/* Brand */}
        <div className="col-span-1 md:col-span-1 flex flex-col items-center md:items-start">
          <Link href="/" className="flex items-center gap-3 mb-6 group" aria-label="Amazing Natures Home">
            <motion.div
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image 
                src="/assets/brand/Amazing_Natures_logo_design_202605111144.jpeg" 
                alt="Amazing Natures Logo" 
                width={32} 
                height={32} 
                className="w-8 h-8 object-contain rounded-md"
              />
            </motion.div>
            <span className="text-xl font-display font-bold tracking-tight text-text-primary">
              AMAZING <span className="text-amber-700">NATURES</span>
            </span>
          </Link>
          <p className="text-text-secondary text-sm leading-relaxed mb-6 max-w-xs">
            Nature&apos;s most robust bioactive profile, ethically harvested from the pristine wilderness of Australia.
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
            <SocialIcon icon={Mail} href="mailto:Zeeshan.ahmed2691@gmail.com" />
            <SocialIcon icon={MapPin} href="https://www.google.com/maps/search/?api=1&query=8+Gingelly+Close,+Point+Cook,+VIC,+3030" />
            <SocialIcon icon={ArrowRight} />
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-amber-600 font-display font-bold mb-6 uppercase tracking-widest text-[10px]">Shop</h4>
          <ul className="space-y-4 flex flex-col items-center md:items-start">
            <li><AnimatedLink href="/products">All Honey</AnimatedLink></li>
            <li><AnimatedLink href="/products/mgo-800">Premium MGO 800+</AnimatedLink></li>
            <li><AnimatedLink href="/wellness-quiz">Wellness Quiz</AnimatedLink></li>
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-amber-600 font-display font-bold mb-6 uppercase tracking-widest text-[10px]">Information</h4>
          <ul className="space-y-4 flex flex-col items-center md:items-start">
            <li><AnimatedLink href="/about">Our Story</AnimatedLink></li>
            <li><AnimatedLink href="/science">Science of MGO</AnimatedLink></li>
            <li><AnimatedLink href="/blog">Wellness Blog</AnimatedLink></li>
            <li><AnimatedLink href="/contact">Contact Us</AnimatedLink></li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div className="relative flex flex-col items-center md:items-start w-full max-w-sm">
          <h4 className="text-amber-600 font-display font-bold mb-6 uppercase tracking-widest text-[10px]">Location</h4>
          <div className="w-full h-32 rounded-2xl overflow-hidden border border-amber-900/20 grayscale hover:grayscale-0 transition-all duration-700 mb-6">
            <iframe 
                src="https://maps.google.com/maps?q=8%20Gingelly%20Close,%20Point%20Cook,%20VIC,%203030&t=&z=14&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                title="Amazing Natures Point Cook HQ Location"
            ></iframe>
          </div>
          
          <h4 className="text-amber-600 font-display font-bold mb-6 uppercase tracking-widest text-[10px]">Newsletter</h4>
          <p className="text-amber-800 text-sm mb-6 text-center md:text-left">Join our community for updates.</p>
          
          <motion.div 
            className="group relative w-full"
            whileHover="active"
          >
            <motion.div
              className="absolute -inset-4 bg-amber-700/25 blur-3xl rounded-full opacity-0 group-hover:opacity-100 pointer-events-none"
              variants={{
                active: {
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.9, 0.5],
                  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }
              }}
            />
            
            <form className="flex flex-col sm:flex-row gap-3 relative z-10 w-full items-center">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-amber-700/10 border border-amber-900/10 rounded-2xl px-5 py-4 text-sm text-text-primary focus:outline-none focus:border-amber-700 w-full transition-all duration-500 placeholder:text-text-muted h-14"
              />
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-14 h-14 amber-gradient rounded-2xl flex items-center justify-center text-white shadow-lg shadow-amber-700/10 shrink-0"
              >
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-amber-900/5 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="text-text-secondary/80 text-[10px] uppercase tracking-[0.3em] font-bold text-center">
            &copy; {currentYear} AMAZING NATURES. PROUDLY AUSTRALIAN MADE.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-amber-900/60 text-[9px] uppercase tracking-[0.2em] font-bold">
              Created by sevennodesb2b
            </span>
            <div className="w-5 h-5 relative shrink-0">
              <Image 
                src="/assets/brand/SevennodesLogo_smallpdf.jpg" 
                alt="sevennodesb2b Logo" 
                fill
                className="object-contain brightness-90"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          <AnimatedLink href="/privacy-policy">Privacy Policy</AnimatedLink>
          <AnimatedLink href="/shipping-policy">Shipping & Returns</AnimatedLink>
          <AnimatedLink href="/terms-of-service">Terms of Service</AnimatedLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;