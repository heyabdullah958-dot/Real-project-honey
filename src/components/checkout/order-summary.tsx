"use client";

import { useCartStore } from "@/store/use-cart-store";
import { ShieldCheck, Truck, Award, Plus, Minus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const OrderSummary = () => {
  const [mounted, setMounted] = useState(false);
  const { items, getTotalPrice, updateQuantity, removeItem } = useCartStore();
  const subtotal = getTotalPrice();
  const shipping = 0; // Complimentary
  const total = subtotal + shipping;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <div className="flex flex-col gap-8 sticky top-32 animate-pulse">
      <div className="glass-panel p-8 md:p-10 rounded-[2.5rem] border-white/5 bg-white/[0.02] h-[500px]" />
    </div>
  );

  return (
    <div className="flex flex-col gap-8 sticky top-32">
      <div className="glass-panel p-8 md:p-10 rounded-[2.5rem] border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-700/5 blur-[60px] rounded-full pointer-events-none" />
        
        <h3 className="text-xl font-display font-bold text-text-primary mb-8 tracking-tight">Order Summary</h3>
        
        <div className="flex flex-col gap-6 max-h-[350px] overflow-y-auto pr-2 mb-8 scrollbar-thin scrollbar-thumb-amber-700/20">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex justify-between items-center group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center border border-white/5 overflow-hidden shrink-0 shadow-sm">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-contain mix-blend-multiply" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-sm font-bold text-text-primary leading-tight">{item.name}</h4>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center bg-white/[0.05] border border-white/10 rounded-lg p-1">
                        <button 
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-6 h-6 flex items-center justify-center text-text-muted hover:text-amber-700 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-[11px] font-bold text-text-primary">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-text-muted hover:text-amber-700 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-text-muted hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
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
            <span className="text-amber-700 font-bold uppercase tracking-widest text-[10px]">Complimentary</span>
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
          { icon: Award, text: "Independently Tested" },
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
