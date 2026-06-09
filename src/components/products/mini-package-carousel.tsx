"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Gift } from "lucide-react";
import { Product } from "@/types";
import { useCartStore } from "@/store/use-cart-store";

interface MiniPackageCarouselProps {
  bundles: Product[];
  parentProduct: Product;
}

export const MiniPackageCarousel = ({
  bundles,
  parentProduct,
}: MiniPackageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const { addItem, clearCart, setIsOpen } = useCartStore();

  if (!bundles || bundles.length === 0) return null;

  const current = bundles[currentIndex];

  const handleBundleClick = () => {
    clearCart();
    addItem(current);
    setIsOpen(false);
    router.push("/checkout");
  };

  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % bundles.length);
  const handlePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + bundles.length) % bundles.length);

  const packCount = current.slug.match(/-pack-(\d+)/)?.[1] ?? "?";
  const singlePrice = parentProduct.price;
  const totalWithout = singlePrice * Number(packCount);
  const savings = totalWithout - current.price;

  return (
    <div className="flex flex-col h-full glass-panel rounded-[2.5rem] overflow-hidden border border-amber-700/10 hover:border-amber-700/30 transition-all duration-500">
      {/* Header */}
      <div className="flex items-center gap-2 px-6 pt-6 pb-3">
        <Gift className="w-4 h-4 text-amber-700 shrink-0" />
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-700">
          Bundle Packs
        </span>
      </div>

      {/* Slide Area */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col h-full"
          >
            {/* Product Image */}
            <div className="relative w-full h-52 bg-white flex items-center justify-center p-6 shrink-0">
              {/* MGO Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span
                  className="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider shadow-sm"
                  style={{
                    backgroundColor: parentProduct.color || "#C49A2A",
                    color: "#050505",
                  }}
                >
                  MGO {current.mgo}
                </span>
              </div>
              {/* Savings badge */}
              {savings > 0 && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm">
                    Save ${savings}.00
                  </span>
                </div>
              )}
              {current.image?.startsWith("data:") ? (
                <img
                  src={current.image}
                  alt={current.name}
                  className="max-h-full max-w-full object-contain drop-shadow-xl"
                />
              ) : (
                <Image
                  src={current.image}
                  alt={current.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-8 drop-shadow-xl"
                />
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col gap-3 px-6 py-5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700 bg-amber-700/8 px-3 py-1 rounded-full border border-amber-700/10">
                  {packCount} × 250G JAR
                </span>
              </div>
              <h3 className="text-lg font-heading font-bold text-text-primary leading-snug line-clamp-2">
                {current.name}
              </h3>
              <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">
                {current.description}
              </p>
              {/* Price + CTA */}
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-amber-700/8">
                <div>
                  <span className="text-[9px] text-text-muted uppercase tracking-wider block">
                    Special Offer
                  </span>
                  <span className="text-xl font-bold text-text-primary">
                    ${current.price}.00 AUD
                  </span>
                </div>
                <button
                  onClick={handleBundleClick}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-700 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-amber-800 active:scale-95 transition-all duration-200 shadow-lg shadow-amber-700/20"
                >
                  Buy Bundle <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      {bundles.length > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-amber-700/8">
          <div className="flex gap-2">
            {bundles.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? "w-5 h-1.5 bg-amber-700"
                    : "w-1.5 h-1.5 bg-amber-700/25"
                }`}
                aria-label={`Go to bundle ${idx + 1}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="w-8 h-8 rounded-full border border-amber-700/20 flex items-center justify-center hover:bg-amber-700/5 transition-colors text-text-secondary"
              aria-label="Previous bundle"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-8 h-8 rounded-full border border-amber-700/20 flex items-center justify-center hover:bg-amber-700/5 transition-colors text-text-secondary"
              aria-label="Next bundle"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
