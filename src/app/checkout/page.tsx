"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { OrderSummary } from "@/components/checkout/order-summary";
import { ThankYouView } from "@/components/checkout/thank-you-view";
import { ShieldCheck, Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Make sure to call loadStripe outside of a component's render to avoid
// recreating the Stripe object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 
  "pk_live_51TiEIfAYBShjNQ3cfA7nqWyqxSn2Q7xCoJwaILo5HB6mezAHELKyzp5tjvAoVqnuUoRiZMygg9XvfXeWbC0ko6sQ00u4J3O9vi"
);

export default function CheckoutPage() {
  const [isSuccess, setIsSuccess] = useState(false);

  if (isSuccess) {
    return <ThankYouView />;
  }

  return (
    <div className="min-h-screen bg-white pt-[140px] pb-24 px-6 relative overflow-hidden md:pt-36">
      {/* Subtle Amber Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-700/[0.03] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-700/[0.02] blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <div className="flex flex-col gap-4">
             <Link href="/products" className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-text-muted hover:text-amber-700 transition-colors group w-fit">
                <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
                Return to Shop
             </Link>
             <h1 className="text-4xl md:text-6xl font-display font-bold text-text-primary tracking-tight">
               Secure <span className="text-amber-700">Checkout</span>
             </h1>
          </div>
          <div className="flex items-center gap-6 px-6 py-3 rounded-2xl bg-amber-700/[0.02] border border-amber-900/10">
             <div className="flex items-center gap-3">
                <Lock className="w-4 h-4 text-amber-700" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-text-primary">Encrypted</span>
             </div>
             <div className="w-px h-4 bg-amber-900/20" />
             <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-text-primary">Verified</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
           {/* Left: Form */}
           <div className="lg:col-span-7">
              <Elements stripe={stripePromise}>
                <CheckoutForm onSuccess={() => setIsSuccess(true)} />
              </Elements>
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
