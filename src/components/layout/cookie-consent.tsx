"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Shield } from "lucide-react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 z-[100] md:left-auto md:w-[400px]"
        >
          <div className="glass-panel p-6 rounded-3xl border-amber-500/20 shadow-2xl relative overflow-hidden bg-[#050505]/95">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-amber-500" />
              </div>
              <div className="flex-1">
                <h4 className="text-text-primary font-bold mb-2">Respecting Your Privacy</h4>
                <p className="text-text-muted text-xs leading-relaxed mb-4">
                  We use cookies to enhance your experience and analyze our traffic. By clicking "Accept", you consent to our use of cookies. Read our{" "}
                  <Link href="/privacy-policy" className="text-amber-500 underline underline-offset-4">
                    Privacy Policy
                  </Link>.
                </p>
                <div className="flex gap-3">
                  <Button onClick={acceptCookies} size="sm" className="bg-amber-500 text-void hover:bg-amber-400 font-bold px-6">
                    Accept
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setIsVisible(false)}
                    className="text-text-muted hover:text-text-primary"
                  >
                    Decline
                  </Button>
                </div>
              </div>
            </div>
            {/* Subtle glow */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
