"use client";

import { useCartStore } from "@/store/use-cart-store";
import { ShieldCheck, Truck, Award, Plus, Minus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const OrderSummary = () => {
  const [mounted, setMounted] = useState(false);
  const { items, getTotalPrice, updateQuantity, removeItem, shippingFee } = useCartStore();
  const subtotal = getTotalPrice();
  const total = subtotal + shippingFee;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <div className="flex flex-col gap-6 lg:gap-8 lg:sticky lg:top-32 animate-pulse">
      <div className="glass-panel p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border-white/5 bg-white/[0.02] h-[400px] md:h-[500px]" />
    </div>
  );

  return (
    <div className="flex flex-col gap-6 lg:gap-8 lg:sticky lg:top-32">
      <div className="glass-panel p-5 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-700/5 blur-[60px] rounded-full pointer-events-none" />
        
        <h3 className="text-xl font-display font-bold text-text-primary mb-6 md:mb-8 tracking-tight">Order Summary</h3>
        
        <div className="flex flex-col gap-5 md:gap-6 max-h-[400px] lg:max-h-[350px] overflow-y-auto pr-2 mb-6 md:mb-8 scrollbar-thin scrollbar-thumb-amber-700/20">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex justify-between items-start md:items-center gap-4 group"
              >
                <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-xl flex items-center justify-center border border-white/5 overflow-hidden shrink-0 shadow-sm">
                    <img src={item.image} alt={item.name} className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <h4 className="text-sm font-bold text-text-primary leading-tight truncate">{item.name}</h4>
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="flex items-center bg-white/[0.05] border border-white/10 rounded-lg p-0.5 md:p-1">
                        <button 
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-text-muted hover:text-amber-700 transition-colors"
                        >
                          <Minus className="w-2.5 h-2.5 md:w-3 md:h-3" />
                        </button>
                        <span className="w-5 md:w-6 text-center text-[10px] md:text-[11px] font-bold text-text-primary">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-text-muted hover:text-amber-700 transition-colors"
                        >
                          <Plus className="w-2.5 h-2.5 md:w-3 md:h-3" />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-text-muted hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-3 md:w-3.5 h-3 md:h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0 flex flex-col items-end">
                  <span className="text-sm font-bold text-text-primary block">${item.price * item.quantity}</span>
                  <span className="text-[9px] text-text-muted uppercase tracking-wider">${item.price} ea</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {items.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm text-text-muted">Your sanctuary is empty.</p>
            </div>
          )}
        </div>

        <div className="space-y-4 pt-6 border-t border-white/5">
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Subtotal</span>
            <span className="text-text-primary font-bold">AUD ${subtotal}.00</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Shipping</span>
            <span className={shippingFee === 0 ? "text-amber-700 font-bold uppercase tracking-widest text-[10px]" : "text-text-primary font-bold"}>
              {shippingFee === 0 ? "Complimentary" : `AUD $${shippingFee}.00`}
            </span>
          </div>
          <div className="flex justify-between items-center pt-4">
            <span className="text-lg font-display font-bold text-text-primary">Total</span>
            <span className="text-2xl font-bold text-amber-700">AUD ${total}.00</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {[
          { icon: ShieldCheck, text: "Authenticity Guaranteed" },
          { icon: Award, text: "Quality Assured" },
          { icon: Truck, text: "Insured Shipping" }
        ].map((badge, i) => (
          <div key={i} className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <badge.icon className="w-5 h-5 text-amber-700/50" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-muted">{badge.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
