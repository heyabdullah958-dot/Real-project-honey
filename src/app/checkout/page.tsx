"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { OrderSummary } from "@/components/checkout/order-summary";
import { ThankYouView } from "@/components/checkout/thank-you-view";
import { ShieldCheck, Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const [isSuccess, setIsSuccess] = useState(false);

  if (isSuccess) {
    return <ThankYouView />;
  }

  return (
    <div className="min-h-screen bg-white pt-12 pb-24 px-6 relative overflow-hidden">
      {/* Subtle Amber Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/[0.03] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-500/[0.02] blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <div className="flex flex-col gap-4">
             <Link href="/products" className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-text-muted hover:text-amber-500 transition-colors group w-fit">
                <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
                Return to Shop
             </Link>
             <h1 className="text-4xl md:text-6xl font-display font-bold text-text-primary tracking-tight">
               Secure <span className="text-amber-500">Checkout</span>
             </h1>
          </div>
          <div className="flex items-center gap-6 px-6 py-3 rounded-2xl bg-white/[0.03] border border-white/5">
             <div className="flex items-center gap-3">
                <Lock className="w-4 h-4 text-amber-500" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-text-primary">Encrypted</span>
             </div>
             <div className="w-px h-4 bg-white/10" />
             <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-text-primary">Verified</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
           {/* Left: Form */}
           <div className="lg:col-span-7">
              <CheckoutForm onSuccess={() => setIsSuccess(true)} />
           </div>

           {/* Right: Summary */}
           <div className="lg:col-span-5">
              <OrderSummary />
           </div>
        </div>
      </div>
    </div>
  );
}
