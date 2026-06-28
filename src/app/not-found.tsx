"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden bg-white">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-700/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-amber-700 font-bold uppercase tracking-[0.5em] text-xs mb-6 block">Error 404</span>
          <h1 className="text-7xl md:text-9xl font-display font-bold text-text-primary mb-8">
            Lost in the <br /><span className="text-amber-700">Nectar?</span>
          </h1>
          <p className="text-text-muted text-lg md:text-xl mb-12 leading-relaxed">
            The page you are looking for has either drifted away or never existed in our hive. 
            Let's get you back to the golden liquid.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="h-14 px-8 amber-gradient text-white hover:brightness-110 font-bold uppercase tracking-widest flex items-center gap-2">
                <Home className="w-5 h-5" /> Back to Home
              </Button>
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="h-14 px-8 rounded-2xl border border-amber-700/20 text-text-primary hover:bg-amber-700/5 font-bold uppercase tracking-widest flex items-center gap-2 transition-all"
            >
              <ArrowLeft className="w-5 h-5" /> Go Back
            </button>
          </div>
        </motion.div>
      </div>

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-amber-700/20 rounded-full blur-[1px]"
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        />
      ))}
    </div>
  );
}
