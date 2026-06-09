"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/use-cart-store";
import { Product } from "@/types";
import { getProducts } from "@/lib/products";
import { ArrowRight, Gift } from "lucide-react";

interface ProductDetailCarouselProps {
  productSlug: string;
}

const getPackQuantity = (slug: string): number => {
  const match = slug.match(/-pack-(\d+)/);
  return match ? parseInt(match[1]) : 1;
};

export const ProductDetailCarousel = ({ productSlug }: ProductDetailCarouselProps) => {
  const [bundles, setBundles] = useState<Product[]>([]);
  const [parentPrice, setParentPrice] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { addItem, clearCart, setIsOpen } = useCartStore();

  useEffect(() => {
    let isMounted = true;
    getProducts()
      .then((allProducts) => {
        if (!isMounted) return;
        const filtered = allProducts.filter((p) => p.parentSlug === productSlug);
        const parent = allProducts.find((p) => p.slug === productSlug);
        
        setBundles(filtered);
        if (parent) {
          setParentPrice(parent.price);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load products in details carousel", err);
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [productSlug]);

  const handleBundleClick = (product: Product) => {
    // Clear cart, add bundle, close cart drawer, and redirect to checkout
    clearCart();
    addItem(product);
    setIsOpen(false);
    router.push("/checkout");
  };

  // Cleanly return null if loading or no bundles are configured (preventing layout gap/crash)
  if (loading || bundles.length === 0) return null;

  return (
    <div className="w-full my-6 flex flex-col gap-4">
      <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider">
        <Gift className="w-4 h-4 text-amber-700" />
        <span>Special Bundle Offers Available</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {bundles.map((bundle) => {
          const qty = getPackQuantity(bundle.slug);
          const totalSinglePrice = parentPrice * qty;
          const savings = totalSinglePrice - bundle.price;

          const savingsText = savings > 0 ? `Save $${savings}.00 AUD` : "";
          const offerText = qty === 3 
            ? "We are offering it in a pack of three too" 
            : qty === 5 
            ? "And a pack of five too" 
            : `Available in a pack of ${qty} too`;

          return (
            <button
              key={bundle.id}
              onClick={() => handleBundleClick(bundle)}
              className="text-left flex flex-col justify-between p-5 rounded-2xl glass-panel border border-amber-700/10 hover:border-amber-700/40 transition-all duration-300 group hover:scale-[1.01] cursor-pointer"
            >
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-amber-700 bg-amber-700/5 px-2.5 py-1 rounded-full">
                    {bundle.size} Pack
                  </span>
                  {savingsText && (
                    <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-600/5 px-2.5 py-1 rounded-full">
                      {savingsText}
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-heading font-bold text-text-primary mb-1">
                  {offerText}
                </h4>
                <p className="text-[11px] text-text-muted">
                  Pure MGO {bundle.mgo} Manuka Honey in bulk value.
                </p>
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-amber-700/5 w-full">
                <span className="text-sm font-bold text-text-primary">
                  ${bundle.price}.00 AUD
                </span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-amber-700 flex items-center gap-1 group-hover:text-amber-900 transition-colors">
                  Buy Bundle <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductDetailCarousel;
