"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/use-cart-store";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { toggleCart, getTotalItems } = useCartStore();

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalItems = mounted ? getTotalItems() : 0;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Science", href: "/science" },
    { name: "Quiz", href: "/wellness-quiz" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      {/* Announcement Banner */}
      <div className="fixed top-0 left-0 right-0 h-[36px] bg-amber-700 text-white flex items-center justify-center text-center px-4 text-[10px] md:text-xs font-bold uppercase tracking-widest z-50">
        🐝 Free Delivery on all Australian orders over $150
      </div>

      <nav
        className={cn(
          "fixed top-[36px] left-0 right-0 z-50 transition-all duration-300 px-6 py-3 bg-[#FBF5E9]/90 backdrop-blur-lg border-b border-amber-900/10"
        )}
        aria-label="Main Navigation"
      >
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        {/* Logo - Centered on mobile absolute */}
        <Link href="/" className="flex items-center gap-3 group relative z-20" aria-label="Amazing Natures Home">
          <div className={cn(
            "relative transition-all duration-500 ease-in-out rounded-xl p-1 bg-white",
            "ring-2 ring-amber-700/20 group-hover:ring-amber-700/60 shadow-[0_0_24px_rgba(155,101,0,0.15)] group-hover:shadow-[0_0_32px_rgba(155,101,0,0.35)]",
            "w-12 h-12"
          )}>
            <Image 
              src="/assets/brand/Amazing_Natures_logo_design_202605111144.jpeg" 
              alt="Amazing Natures Logo" 
              fill
              sizes="48px"
              className="object-contain rounded-lg animate-logo-pulse group-hover:scale-110 transition-transform"
            />
          </div>
          <span className={cn(
            "font-display font-bold tracking-tight text-text-primary hidden sm:inline-block transition-all duration-500 text-xl"
          )}>
            AMAZING <span className="text-amber-700">NATURES</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-text-secondary hover:text-amber-700 transition-colors uppercase tracking-widest"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative"
            onClick={toggleCart}
            aria-label={`Open Cart (${totalItems} items)`}
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-amber-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Button>
          
          <Link href="/admin" className="hidden md:flex">
            <Button variant="outline" className="px-4 py-2 text-xs uppercase tracking-wider font-semibold border-amber-700/20 hover:border-amber-700/60 text-amber-900">Sign In</Button>
          </Link>

          <Link href="/products" className="hidden md:flex">
            <Button className="px-4 py-2 text-xs uppercase tracking-wider font-semibold">Shop Now</Button>
          </Link>

          <button 
            className="md:hidden text-text-primary p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#FBF5E9] border-b border-amber-900/10 shadow-lg p-6 md:hidden animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-text-secondary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-3 mt-2">
              <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full">Sign In</Button>
              </Link>
              <Link href="/products" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full">Shop Now</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
    </>
  );
};

export default Navbar;
