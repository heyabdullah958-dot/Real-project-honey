"use client";

import { useCartStore } from "@/store/use-cart-store";
import { ShieldCheck, Truck, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const OrderSummary = () => {
  const [mounted, setMounted] = useState(false);
  const { items, getTotalPrice } = useCartStore();
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
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-[60px] rounded-full pointer-events-none" />
        
        <h3 className="text-xl font-display font-bold text-text-primary mb-8 tracking-tight">Order Summary</h3>
        
        <div className="flex flex-col gap-6 max-h-[300px] overflow-y-auto pr-2 mb-8 scrollbar-thin scrollbar-thumb-amber-500/20">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-earth/30 rounded-xl flex items-center justify-center border border-white/5 overflow-hidden">
                   <img src={item.image} alt={item.name} className="w-10 h-10 object-contain mix-blend-multiply" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-primary">{item.name}</h4>
                  <p className="text-[10px] text-text-muted uppercase tracking-widest">Qty: {item.quantity}</p>
                </div>
              </div>
              <span className="text-sm font-bold text-text-primary">${item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <div className="space-y-4 pt-6 border-t border-white/5">
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Subtotal</span>
            <span className="text-text-primary font-bold">AUD ${subtotal}.00</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Shipping</span>
            <span className="text-amber-500 font-bold uppercase tracking-widest text-[10px]">Complimentary</span>
          </div>
          <div className="flex justify-between items-center pt-4">
            <span className="text-lg font-display font-bold text-text-primary">Total</span>
            <span className="text-2xl font-bold text-amber-500">AUD ${total}.00</span>
          </div>
        </div>

        {/* Verified Lab Report Badge */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="mt-8 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex items-center gap-4 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h5 className="text-[10px] uppercase tracking-widest font-bold text-text-primary">Verified Activity Report</h5>
            <p className="text-[9px] text-amber-500/70 uppercase tracking-wider font-medium group-hover:text-amber-500 transition-colors">
              Batch-Tested in Australia. <br />
              Click to view MGO 800+ activity level certificate
            </p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {[
          { icon: ShieldCheck, text: "Authenticity Guaranteed" },
          { icon: Award, text: "Independently Tested" },
          { icon: Truck, text: "Insured Shipping" }
        ].map((badge, i) => (
          <div key={i} className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <badge.icon className="w-5 h-5 text-amber-500/50" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-muted">{badge.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
