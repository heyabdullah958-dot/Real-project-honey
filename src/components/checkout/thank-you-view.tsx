"use client";

import { motion } from "framer-motion";
import { Check, Package, ShieldCheck, Award, MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { useCartStore } from "@/store/use-cart-store";

export const ThankYouView = () => {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [orderSummary, setOrderSummary] = useState("");
  const total = getTotalPrice();

  useEffect(() => {
    // Generate order summary for WhatsApp
    const summary = items.map(item => `${item.name} (x${item.quantity})`).join(", ");
    setOrderSummary(summary);

    // Confetti effect
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#D4930A', '#F5C842', '#FFFFFF'] });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#D4930A', '#F5C842', '#FFFFFF'] });
    }, 250);
    
    // Clear cart after a short delay so the WA link can still use the store data if clicked immediately
    const timeout = setTimeout(() => {
      clearCart();
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const whatsappNumber = "61405686486"; // Based on provided contact info
  const waMessage = encodeURIComponent(
    `Hello Amazing Natures! I've just placed an order for: ${orderSummary}. Total: $${total}.00. Please verify my order for delivery.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${waMessage}`;

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full glass-panel p-12 md:p-16 rounded-[3rem] border-amber-500/20 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-500/10 blur-[80px] rounded-full pointer-events-none" />
        
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="w-24 h-24 amber-gradient rounded-full flex items-center justify-center text-void mx-auto mb-10 shadow-[0_0_40px_rgba(212,147,10,0.3)]"
        >
          <Check className="w-12 h-12 stroke-[3]" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-6"
        >
          Your Liquid Gold is <br /><span className="text-amber-500">Being Prepared.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-text-secondary leading-relaxed mb-10 max-w-md mx-auto"
        >
          G&apos;day! Your liquid gold is being prepared. Our concierge will reach out via WhatsApp/Call to coordinate the perfect delivery time that suits your schedule.
        </motion.p>

        {/* WhatsApp Verification Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl overflow-hidden amber-gradient text-void font-bold uppercase tracking-[0.2em] text-xs shadow-2xl shadow-amber-500/30 group"
          >
            {/* Shimmer Effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-[50%] skew-x-12"
              animate={{ x: ["-100%", "300%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <MessageCircle className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Verify Order via WhatsApp</span>
            <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
        >
          <div className="flex flex-col items-center gap-2">
            <Package className="w-5 h-5 text-amber-500" />
            <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold">Fast Packing</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-500" />
            <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold">Lab Certified</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold">100% Authentic</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-text-muted hover:text-amber-500 transition-colors"
          >
            Continue Exploring <ArrowRight className="w-3 h-3" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};
