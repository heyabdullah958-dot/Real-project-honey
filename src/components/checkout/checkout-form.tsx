"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ShieldCheck } from "lucide-react";

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
          color: isFocused ? "#f59e0b" : "#9ca3af",
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
        className="w-full h-14 rounded-2xl bg-white/[0.03] border border-white/10 px-6 pt-4 text-text-primary focus:outline-none focus:border-amber-500/50 transition-all duration-300 group-hover:bg-white/[0.05]"
      />
    </div>
  );
};

export const CheckoutForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate premium processing
    setTimeout(() => {
      onSuccess();
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      <div className="flex flex-col gap-6">
        <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-amber-500/70 ml-4">Shipping Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FloatingInput label="Full Name" name="fullName" />
          <FloatingInput label="WhatsApp Number" name="whatsapp" type="tel" />
        </div>
        <FloatingInput label="City" name="city" />
        <div className="relative group">
          <motion.label
            initial={false}
            className="absolute left-6 top-4 pointer-events-none text-sm font-medium text-text-muted z-10"
          >
            Detailed Shipping Address
          </motion.label>
          <textarea
            required
            rows={3}
            className="w-full rounded-2xl bg-white/[0.03] border border-white/10 px-6 pt-10 text-text-primary focus:outline-none focus:border-amber-500/50 transition-all duration-300 group-hover:bg-white/[0.05] resize-none"
          />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between ml-4">
           <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-amber-500/70">Payment Method</h3>
           <span className="text-[10px] text-amber-500 font-bold px-3 py-1 bg-amber-500/10 rounded-full border border-amber-500/20 uppercase">Arrival Payment</span>
        </div>
        <div className="glass-panel p-6 rounded-[2rem] border-amber-500/20 bg-amber-500/[0.02] flex items-center justify-between group cursor-default">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                 <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-text-primary text-sm uppercase tracking-widest">White-Glove Pay-on-Arrival</h4>
                <p className="text-[10px] text-text-muted uppercase tracking-wider leading-relaxed mt-1">
                  Inspect your liquid gold at your doorstep before you pay. <br />
                  We trust our quality, and we trust you.
                </p>
              </div>
           </div>
           <div className="w-5 h-5 rounded-full border-2 border-amber-500 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
           </div>
        </div>
      </div>

      {/* Sustainable Shipping Info */}
      <div className="px-6 py-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-4">
        <div className="mt-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-amber-500">
            <path d="M21 8L12 3L3 8V16L12 21L21 16V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 21V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 8L12 13L21 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 5.5L11 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M12 13V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M17 12L12 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M12 8C12 8 13.5 6 15.5 6C17.5 6 18 7.5 18 8C18 10 12 13 12 13Z" fill="#f59e0b" fillOpacity="0.3"/>
          </svg>
        </div>
        <div>
          <h5 className="text-[10px] uppercase tracking-widest font-bold text-text-primary mb-1">100% Carbon-Neutral, Plastic-Free Shipping</h5>
          <p className="text-[10px] text-text-muted leading-relaxed">
            Every jar is packed in sustainable wood-wool or recycled honeycomb paper for ultimate protection and environmental care.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
          className="relative w-full h-16 rounded-2xl overflow-hidden amber-gradient text-void font-bold uppercase tracking-[0.3em] text-xs shadow-2xl shadow-amber-500/20 group"
        >
          {/* Shimmer Effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-[50%] skew-x-12"
            animate={{ x: ["-100%", "300%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isLoading ? "Validating Sanctuary..." : "Secure My Jar"}
            {!isLoading && <ChevronRight className="w-4 h-4" />}
          </span>
        </motion.button>
        <p className="text-center text-[10px] text-text-muted uppercase tracking-widest font-medium">
          By clicking, you agree to receive a brief Concierge Outreach for verification.
        </p>
      </div>
    </form>
  );
};
