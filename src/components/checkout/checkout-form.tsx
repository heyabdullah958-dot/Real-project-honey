"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ShieldCheck, Lock, CreditCard } from "lucide-react";
import { useCartStore } from "@/store/use-cart-store";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

interface FloatingInputProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}

const FloatingInput = ({ label, name, type = "text", required = true }: FloatingInputProps) => {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let val = e.target.value;
    // Auto-capitalization for Name and City
    if (name === "fullName" || name === "city") {
      val = val.charAt(0).toUpperCase() + val.slice(1);
    }
    setValue(val);
  };

  return (
    <div className="relative w-full group">
      <motion.label
        initial={false}
        animate={{
          y: isFocused || value ? -28 : 0,
          scale: isFocused || value ? 0.8 : 1,
          color: isFocused ? "#f59e0b" : "#111111B3", // text-text-primary/70
          x: isFocused || value ? -10 : 0,
        }}
        className="absolute left-6 top-4 pointer-events-none text-sm font-medium origin-top-left z-10"
      >
        {label}
      </motion.label>
      <input
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        className="w-full h-14 rounded-2xl bg-white/[0.03] border border-white/10 px-6 pt-4 text-text-primary/70 focus:outline-none focus:border-amber-700/50 transition-all duration-300 group-hover:bg-white/[0.05]"
      />
    </div>
  );
};

const CARD_OPTIONS = {
  style: {
    base: {
      color: "#f59e0b", // text-amber-500
      fontFamily: '"Inter", sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "14px",
      "::placeholder": {
        color: "rgba(255, 255, 255, 0.4)",
      },
      iconColor: "#f59e0b",
    },
    invalid: {
      color: "#ef4444",
      iconColor: "#ef4444",
    },
  },
};

export const CheckoutForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { items, getTotalPrice, clearCart } = useCartStore();
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setPaymentError(null);
    
    const formData = new FormData(e.currentTarget);
    const orderData = {
      fullName: formData.get('fullName'),
      whatsapp: formData.get('whatsapp'),
      email: formData.get('email'),
      city: formData.get('city'),
      address: formData.get('address'),
      items: items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount: getTotalPrice()
    };

    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || '';
      
      // 1. Create PaymentIntent on the backend
      const piResponse = await fetch(`${backendUrl}/api/payments/create-payment-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: orderData.totalAmount }),
      });

      if (!piResponse.ok) {
        throw new Error("Failed to initialize payment.");
      }

      const { clientSecret } = await piResponse.json();

      // 2. Confirm the payment with Stripe
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error("Card element not found");

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: orderData.fullName as string,
            email: orderData.email as string,
          },
        },
      });

      if (paymentResult.error) {
        setPaymentError(paymentResult.error.message || "Payment failed.");
        setIsLoading(false);
        return;
      }

      // 3. Payment succeeded, create the order in our backend
      if (paymentResult.paymentIntent && paymentResult.paymentIntent.status === 'succeeded') {
        let orderResponse;
        try {
          orderResponse = await fetch(`${backendUrl}/api/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...orderData,
              paymentId: paymentResult.paymentIntent.id,
              paymentStatus: 'paid'
            })
          });
          
          if (!orderResponse.ok) {
            throw new Error(`Express backend responded with status ${orderResponse.status}`);
          }
        } catch (backendError) {
          console.warn("Express backend failed, falling back to local Next.js API route:", backendError);
          orderResponse = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...orderData,
              paymentId: paymentResult.paymentIntent.id,
              paymentStatus: 'paid'
            })
          });
        }

        if (orderResponse.ok) {
          onSuccess(); 
        } else {
          setPaymentError("Payment successful, but failed to save order. Please contact support.");
        }
      }
    } catch (error: any) {
      console.error("Order submit error:", error);
      setPaymentError(error.message || "An error occurred. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      <div className="flex flex-col gap-6">
        <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-amber-700/70 ml-4">Shipping Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FloatingInput label="Full Name" name="fullName" />
          <FloatingInput label="WhatsApp Number" name="whatsapp" type="tel" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FloatingInput label="Email Address" name="email" type="email" />
          <FloatingInput label="City" name="city" />
        </div>
        <div className="relative group">
          <motion.label
            initial={false}
            className="absolute left-6 top-4 pointer-events-none text-sm font-medium text-text-primary/70 z-10"
          >
            Detailed Shipping Address
          </motion.label>
          <textarea
            name="address"
            required
            rows={3}
            className="w-full rounded-2xl bg-white/[0.03] border border-white/10 px-6 pt-10 text-text-primary/70 focus:outline-none focus:border-amber-700/50 transition-all duration-300 group-hover:bg-white/[0.05] resize-none"
          />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between ml-4">
           <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-amber-800">PAYMENT DETAILS</h3>
        </div>
        <div className="glass-panel p-8 rounded-[2rem] border-amber-700/20 bg-amber-700/[0.02] flex flex-col gap-6">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-700/10 flex items-center justify-center text-amber-700">
                 <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-text-primary text-sm uppercase tracking-widest">Secure Credit Card</h4>
                <p className="text-[10px] text-text-secondary uppercase tracking-wider leading-relaxed mt-1">
                  All transactions are secure and encrypted via Stripe
                </p>
              </div>
           </div>

           <div className="p-4 rounded-xl bg-black/20 border border-white/5">
             <CardElement options={CARD_OPTIONS} />
           </div>
           
           {paymentError && (
             <p className="text-red-500 text-xs mt-2">{paymentError}</p>
           )}
        </div>
      </div>

      {/* Sustainable Shipping Info */}
      <div className="px-6 py-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-4">
        <div className="mt-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-amber-800">
            <path d="M21 8L12 3L3 8V16L12 21L21 16V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 21V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 8L12 13L21 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 5.5L11 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M12 13V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M17 12L12 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M12 8C12 8 13.5 6 15.5 6C17.5 6 18 7.5 18 8C18 10 12 13 12 13Z" fill="#9B6500" fillOpacity="0.3"/>
          </svg>
        </div>
        <div>
          <h5 className="text-[10px] uppercase tracking-widest font-bold text-amber-800 mb-1">100% Carbon-Neutral, Plastic-Free Shipping</h5>
          <p className="text-[10px] text-text-muted leading-relaxed">
            Every jar is meticulously packed in sustainable wood-wool or recycled honeycomb paper for ultimate protection and environmental care.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <motion.button
          whileHover={{ scale: stripe && !isLoading ? 1.02 : 1 }}
          whileTap={{ scale: stripe && !isLoading ? 0.98 : 1 }}
          disabled={isLoading || !stripe || !elements}
          className="relative w-full h-16 rounded-2xl overflow-hidden amber-gradient text-void font-bold uppercase tracking-[0.3em] text-xs shadow-2xl shadow-amber-700/20 group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {/* Shimmer Effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-[50%] skew-x-12"
            animate={{ x: ["-100%", "300%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isLoading ? "Processing Payment..." : "Complete Secure Payment"}
            {!isLoading && <ChevronRight className="w-4 h-4" />}
          </span>
        </motion.button>
      </div>
    </form>
  );
};
