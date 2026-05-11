"use client";

import { useCartStore } from "@/store/use-cart-store";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ShieldCheck, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2500);
  };

  if (isSuccess) {
    return (
      <div className="py-24 px-6 min-h-[70vh] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-12 md:p-24 rounded-[4rem] text-center flex flex-col items-center gap-8 max-w-2xl"
        >
          <div className="w-24 h-24 amber-gradient rounded-full flex items-center justify-center text-void shadow-[0_0_50px_rgba(212,147,10,0.4)]">
             <CheckCircle2 className="w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-text-primary">Order Received!</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Thank you for your purchase. We&apos;ve sent a confirmation email to your inbox. Your premium Manuka is being prepared for shipment.
          </p>
          <Link href="/products">
            <Button size="lg" className="h-14 px-12">Continue Shopping</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-24 px-6 min-h-[60vh] flex flex-col items-center justify-center text-center gap-8">
        <div className="w-20 h-20 bg-earth/50 rounded-full flex items-center justify-center text-text-muted">
           <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-display font-bold text-text-primary">Your cart is empty</h1>
        <Link href="/products">
          <Button size="lg">Browse Collection</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-display font-bold text-text-primary mb-16">
          Finalize <span className="text-amber-500">Checkout</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
           {/* Form */}
           <div className="flex flex-col gap-12">
              <form onSubmit={handleCheckout} className="flex flex-col gap-8">
                 <div className="flex flex-col gap-6">
                    <h3 className="text-xl font-display font-bold text-text-primary flex items-center gap-3">
                       <span className="w-8 h-8 rounded-full amber-gradient flex items-center justify-center text-void text-sm">1</span>
                       Shipping Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <input type="text" placeholder="First Name" className="h-14 rounded-2xl bg-earth/30 border border-amber-900/10 px-6 focus:border-amber-500 outline-none" required />
                       <input type="text" placeholder="Last Name" className="h-14 rounded-2xl bg-earth/30 border border-amber-900/10 px-6 focus:border-amber-500 outline-none" required />
                    </div>
                    <input type="email" placeholder="Email Address" className="h-14 rounded-2xl bg-earth/30 border border-amber-900/10 px-6 focus:border-amber-500 outline-none" required />
                    <input type="text" placeholder="Shipping Address" className="h-14 rounded-2xl bg-earth/30 border border-amber-900/10 px-6 focus:border-amber-500 outline-none" required />
                 </div>

                 <div className="flex flex-col gap-6">
                    <h3 className="text-xl font-display font-bold text-text-primary flex items-center gap-3">
                       <span className="w-8 h-8 rounded-full amber-gradient flex items-center justify-center text-void text-sm">2</span>
                       Payment Method
                    </h3>
                    <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex flex-col gap-4">
                       <div className="flex justify-between items-center">
                          <span className="text-sm font-bold text-text-primary">Credit / Debit Card</span>
                          <div className="flex gap-2">
                             <div className="w-8 h-5 bg-text-muted/20 rounded-sm" />
                             <div className="w-8 h-5 bg-text-muted/20 rounded-sm" />
                          </div>
                       </div>
                       <input type="text" placeholder="Card Number" className="h-12 rounded-xl bg-void border border-amber-900/10 px-4 focus:border-amber-500 outline-none" />
                    </div>
                 </div>

                 <Button 
                   size="lg" 
                   className="h-16 text-lg" 
                   disabled={isProcessing}
                 >
                    {isProcessing ? "Processing Securely..." : `Pay $${getTotalPrice()}.00 Now`}
                 </Button>

                 <div className="flex items-center justify-center gap-2 text-text-muted text-[10px] uppercase tracking-widest font-bold">
                    <ShieldCheck className="w-4 h-4 text-amber-500" />
                    Secure SSL Encrypted Payment
                 </div>
              </form>
           </div>

           {/* Summary */}
           <div className="lg:sticky lg:top-32 h-fit">
              <div className="glass-panel p-8 md:p-12 rounded-[3rem] border-amber-500/10">
                 <h3 className="text-2xl font-display font-bold text-text-primary mb-8">Order Summary</h3>
                 <div className="flex flex-col gap-6 mb-8">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div className="flex flex-col">
                           <span className="text-sm font-bold text-text-primary">{item.name}</span>
                           <span className="text-[10px] text-text-muted uppercase tracking-widest">Qty: {item.quantity} • {item.size}</span>
                        </div>
                        <span className="text-sm font-bold text-text-primary">${item.price * item.quantity}.00</span>
                      </div>
                    ))}
                 </div>

                 <div className="space-y-4 pt-8 border-t border-amber-900/10">
                    <div className="flex justify-between text-sm">
                       <span className="text-text-muted uppercase tracking-widest">Subtotal</span>
                       <span className="text-text-primary font-bold">${getTotalPrice()}.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                       <span className="text-text-muted uppercase tracking-widest">Shipping</span>
                       <span className="text-amber-500 font-bold">FREE</span>
                    </div>
                    <div className="flex justify-between items-end pt-4">
                       <span className="text-xs text-text-muted uppercase tracking-widest font-bold mb-1">Total (AUD)</span>
                       <span className="text-4xl font-display font-bold text-amber-500">${getTotalPrice()}.00</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
