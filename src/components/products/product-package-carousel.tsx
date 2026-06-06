"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Product } from "@/types";

export const ProductPackageCarousel = ({ products }: { products: Product[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play animation removed to make it static

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % products.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);

  if (!products || products.length === 0) return null;

  return (
    <div className="relative w-full max-w-5xl mx-auto my-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary">
          Premium <span className="text-amber-700">Bundles</span>
        </h2>
        <div className="flex gap-2">
          <button 
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-amber-700/20 flex items-center justify-center hover:bg-amber-700/5 transition-colors text-text-secondary"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-amber-700/20 flex items-center justify-center hover:bg-amber-700/5 transition-colors text-text-secondary"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[2rem] glass-panel border border-amber-700/10 p-4 md:p-8">
        <div className="relative h-[400px] md:h-[300px] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col md:flex-row items-center gap-6 cursor-grab active:cursor-grabbing"
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
              <div className="w-full md:w-1/3 h-48 md:h-full relative bg-white/40 rounded-2xl p-4 flex items-center justify-center">
                <Image 
                  src={products[currentIndex].image} 
                  alt={products[currentIndex].name}
                  fill
                  className="object-contain p-4 drop-shadow-xl"
                />
              </div>
              <div className="w-full md:w-2/3 flex flex-col items-center md:items-start text-center md:text-left">
                <span className="text-amber-700 font-bold tracking-widest uppercase text-[10px] mb-2 block">
                  {products[currentIndex].size}
                </span>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-text-primary mb-3">
                  {products[currentIndex].name}
                </h3>
                <p className="text-text-secondary mb-6 line-clamp-2 max-w-md">
                  {products[currentIndex].description}
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <span className="text-2xl font-bold text-text-primary">
                    ${products[currentIndex].price}
                  </span>
                  <Link href={`/products/${products[currentIndex].slug}`}>
                    <button className="px-6 py-3 rounded-full bg-amber-700 text-white font-bold text-xs uppercase tracking-widest hover:bg-amber-800 transition-colors flex items-center gap-2">
                      View Bundle <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex justify-center mt-6 gap-2">
        {products.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentIndex === idx ? "w-6 bg-amber-700" : "bg-amber-700/20"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
