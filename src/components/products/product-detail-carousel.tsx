"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useCartStore } from "@/store/use-cart-store";
import { Product } from "@/types";
import { getProducts } from "@/lib/products";
import { ArrowRight, ChevronLeft, ChevronRight, Gift } from "lucide-react";

interface ProductDetailCarouselProps {
  productSlug: string;
}

const getPackQuantity = (slug: string): number => {
  const match = slug.match(/-pack-(\d+)/);
  return match ? parseInt(match[1]) : 1;
};

export const ProductDetailCarousel = ({
  productSlug,
}: ProductDetailCarouselProps) => {
  const [bundles, setBundles] = useState<Product[]>([]);
  const [parentPrice, setParentPrice] = useState<number>(0);
  const [parentColor, setParentColor] = useState<string>("#C49A2A");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { addItem, clearCart, setIsOpen } = useCartStore();

  useEffect(() => {
    let isMounted = true;
    getProducts()
      .then((allProducts) => {
        if (!isMounted) return;
        const filtered = allProducts.filter(
          (p) => p.parentSlug === productSlug
        );
        const parent = allProducts.find((p) => p.slug === productSlug);
        setBundles(filtered);
        if (parent) {
          setParentPrice(parent.price);
          setParentColor(parent.color || "#C49A2A");
        }
        setLoading(false);
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [productSlug]);

  const handleBundleClick = (product: Product) => {
    clearCart();
    addItem(product);
    setIsOpen(false);
    router.push("/checkout");
  };

  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % bundles.length);
  const handlePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + bundles.length) % bundles.length);

  if (loading || bundles.length === 0) return null;

  const current = bundles[currentIndex];
  const qty = getPackQuantity(current.slug);
  const savings = parentPrice * qty - current.price;

  return (
    <div className="w-full my-4">
      {/* Section label */}
      <div className="flex items-center gap-2 mb-4">
        <Gift className="w-4 h-4 text-amber-700 shrink-0" />
        <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-amber-700">
          Bundle Offers — Save More
        </span>
      </div>

      {/* Carousel card */}
      <div className="relative w-full glass-panel rounded-[2rem] border border-amber-700/10 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-stretch cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x;
              if (swipe < -10000 || offset.x < -50) handleNext();
              else if (swipe > 10000 || offset.x > 50) handlePrev();
            }}
          >
            {/* Image Panel */}
            <div className="relative w-full sm:w-2/5 h-44 sm:h-auto bg-white/70 flex items-center justify-center p-6 shrink-0">
              {/* MGO badge */}
              <div className="absolute top-3 left-3">
                <span
                  className="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider shadow"
                  style={{ backgroundColor: parentColor, color: "#050505" }}
                >
                  MGO {current.mgo}
                </span>
              </div>
              {/* Pack size badge */}
              <div className="absolute top-3 right-3">
                <span className="text-[9px] font-bold uppercase tracking-widest text-amber-700 bg-amber-700/8 px-2.5 py-1 rounded-full border border-amber-700/10">
                  {qty} × 250G
                </span>
              </div>
              {current.image?.startsWith("data:") ? (
                <img
                  src={current.image}
                  alt={current.name}
                  className="max-h-36 sm:max-h-full max-w-full object-contain drop-shadow-xl"
                />
              ) : (
                <Image
                  src={current.image}
                  alt={current.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 40vw"
                  className="object-contain p-6 sm:p-10 drop-shadow-xl"
                />
              )}
            </div>

            {/* Details Panel */}
            <div className="flex flex-col justify-between p-6 sm:p-7 w-full">
              <div>
                <h4 className="text-base sm:text-lg font-heading font-bold text-text-primary leading-snug mb-2">
                  {current.name}
                </h4>
                <p className="text-xs text-text-muted leading-relaxed line-clamp-3">
                  {current.description}
                </p>
              </div>
              <div className="mt-5 flex items-end justify-between">
                <div>
                  <span className="text-[9px] text-text-muted uppercase tracking-wider block mb-0.5">
                    Special Offer
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-text-primary">
                    ${current.price}.00 AUD
                  </span>
                  {savings > 0 && (
                    <span className="text-[10px] font-bold text-emerald-600 ml-2">
                      Save ${savings}.00
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleBundleClick(current)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-700 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-amber-800 active:scale-95 transition-all duration-200 shadow-lg shadow-amber-700/20 shrink-0 ml-4"
                >
                  Buy Bundle <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators + arrows */}
      {bundles.length > 1 && (
        <div className="flex items-center justify-between mt-4 px-1">
          <div className="flex gap-2 items-center">
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
              className="w-8 h-8 rounded-full border border-amber-700/20 flex items-center justify-center hover:bg-amber-700/5 transition-colors"
              aria-label="Previous bundle"
            >
              <ChevronLeft className="w-4 h-4 text-text-secondary" />
            </button>
            <button
              onClick={handleNext}
              className="w-8 h-8 rounded-full border border-amber-700/20 flex items-center justify-center hover:bg-amber-700/5 transition-colors"
              aria-label="Next bundle"
            >
              <ChevronRight className="w-4 h-4 text-text-secondary" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailCarousel;
