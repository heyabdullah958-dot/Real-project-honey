"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/use-cart-store";
import { Product } from "@/types";
import { ShoppingBag, ArrowRight } from "lucide-react";

interface PromoCarouselProps {
  products: Product[];
}

export const PromoCarousel = ({ products }: PromoCarouselProps) => {
  const router = useRouter();
  const { addItem, clearCart, setIsOpen } = useCartStore();

  const handleBundleClick = (product: Product) => {
    // Direct checkout flow: clear cart, add bundle, and redirect to checkout
    clearCart();
    addItem(product);
    setIsOpen(false);
    router.push("/checkout");
  };

  if (!products || products.length === 0) return null;

  // Duplicate items to ensure a seamless infinite scrolling loop
  const listItems = [...products, ...products, ...products];

  return (
    <section className="py-24 bg-cream/30 border-y border-amber-700/10 overflow-hidden relative w-full">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <span className="text-amber-700 font-bold uppercase tracking-[0.4em] text-[10px] mb-3 block">
          Limited Bundle Offers
        </span>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary">
          Premium <span className="text-amber-700">Value Packs</span>
        </h2>
        <p className="text-text-muted mt-2 text-sm max-w-md mx-auto">
          Skip the cart and secure our handpicked bioactive collections directly at discounted rates.
        </p>
      </div>

      {/* Marquee Wrapper */}
      <div className="relative w-full overflow-hidden flex py-4">
        {/* Left & Right Glass Gradients to fade out the edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#FBF5E9] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#FBF5E9] to-transparent z-10 pointer-events-none" />

        {/* Marquee Inner Flex */}
        <div className="flex gap-6 animate-marquee hover:pause-marquee shrink-0 min-w-full">
          {listItems.map((product, idx) => (
            <div
              key={`${product.id}-${idx}`}
              onClick={() => handleBundleClick(product)}
              className="w-[300px] md:w-[350px] shrink-0 glass-panel rounded-3xl p-6 border border-amber-700/10 hover:border-amber-700/40 transition-all duration-300 cursor-pointer group hover:scale-[1.02] shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span
                    className="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider shadow-sm"
                    style={{ backgroundColor: product.color || "#C49A2A", color: "#050505" }}
                  >
                    MGO {product.mgo}
                  </span>
                  <span className="text-[10px] text-amber-700 font-bold uppercase tracking-widest">
                    {product.size} Jar
                  </span>
                </div>

                <h3 className="text-lg font-heading font-bold text-text-primary leading-snug group-hover:text-amber-700 transition-colors mb-2 line-clamp-1">
                  {product.name}
                </h3>
                
                <p className="text-xs text-text-muted line-clamp-2 leading-relaxed mb-4">
                  {product.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-amber-700/5 mt-auto">
                <div>
                  <span className="text-[9px] text-text-muted uppercase tracking-wider block">
                    Special Offer
                  </span>
                  <span className="text-xl font-bold text-text-primary">
                    ${product.price}.00 AUD
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-amber-700 group-hover:text-amber-900 transition-colors">
                  Buy Bundle <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
