"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Heart, Zap, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const carouselImages = [
  { src: "/assets/products/mgo-30.webp", name: "MGO 30", rating: "Daily Wellness" },
  { src: "/assets/products/mgo-100.webp", name: "MGO 100", rating: "Premium Reserve" },
  { src: "/assets/products/mgo-263.webp", name: "MGO 263", rating: "Naturally Concentrated" },
  { src: "/assets/products/mgo-400.webp", name: "MGO 400", rating: "Dynamic Activity" },
  { src: "/assets/products/mgo-800.webp", name: "MGO 800", rating: "Liquid Gold Reserve" },
];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play animation removed to make it static
  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex items-center justify-center p-8 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = Math.abs(offset.x) * velocity.x;
            if (swipe < -10000 || offset.x < -50) {
              handleNext();
            } else if (swipe > 10000 || offset.x > 50) {
              handlePrev();
            }
          }}
        >
          <Image
            src={carouselImages[currentIndex].src}
            alt={`Amazing Natures ${carouselImages[currentIndex].name}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-contain transition-transform duration-1000 group-hover:scale-105 p-6"
            priority={currentIndex === 0}
          />
          {/* Subtle overlay badge */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/90 px-6 py-3 rounded-2xl border border-amber-700/20 shadow-xl flex flex-col items-center gap-1">
            <span className="font-display font-bold text-amber-700 text-lg leading-none">{carouselImages[currentIndex].name}</span>
            <span className="text-[10px] uppercase tracking-widest text-text-secondary font-bold whitespace-nowrap">{carouselImages[currentIndex].rating}</span>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        {carouselImages.map((_, idx) => (
          <div
            key={idx}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              currentIndex === idx ? "w-4 bg-amber-700" : "bg-amber-700/30"
            }`}
          />
        ))}
      </div>
    </>
  );
};

export const HeroStatic = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-[#FBF5E9] pt-36 pb-20 md:pt-44 md:pb-28 px-6 overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-700/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-amber-700/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 text-left flex flex-col gap-8"
          >
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full bg-amber-700/5 border border-amber-700/10 text-amber-900 font-bold uppercase tracking-widest text-[9px] md:text-[10px]">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" /> 100% Australian
              </span>
              <span className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full bg-amber-700/5 border border-amber-700/10 text-amber-900 font-bold uppercase tracking-widest text-[9px] md:text-[10px]">
                <Zap className="w-3.5 h-3.5 text-amber-700" /> MGO Verified
              </span>
              <span className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full bg-amber-700/5 border border-amber-700/10 text-amber-900 font-bold uppercase tracking-widest text-[9px] md:text-[10px]">
                <Heart className="w-3.5 h-3.5 text-amber-700" /> Ethically Harvested
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold text-text-primary leading-[1.05] tracking-tight">
              Nature&apos;s Purest <br />
              <span className="text-amber-700">Manuka Honey.</span>
            </h1>

            <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl font-medium">
              Experience the amazing standard of natural bioactivity. Sourced ethically from the pristine wilderness of Australia, our premium Manuka honey is cold-filtered to preserve its vital bioactive profile.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Link href="/products" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto px-10 h-14 uppercase tracking-widest text-xs font-bold">
                  Shop Collection
                </Button>
              </Link>
              <Link href="/wellness-quiz" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-10 h-14 uppercase tracking-widest text-xs font-bold flex items-center gap-2">
                  Wellness Quiz <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Column - Product Showcase Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-[3rem] p-3 glass-panel bg-white/40 border border-amber-900/10 shadow-[0_24px_64px_rgba(155,101,0,0.12)] group hover:shadow-[0_32px_80px_rgba(155,101,0,0.2)] transition-all duration-700">
              <Link href="/products" className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-white/50 block group-hover:bg-white/80 transition-colors duration-500">
                <HeroCarousel />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
