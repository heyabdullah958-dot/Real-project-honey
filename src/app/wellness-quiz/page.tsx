"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data";
import { Product } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, RefreshCw, Zap, Shield, Info } from "lucide-react";
import confetti from "canvas-confetti";

const steps = [
  {
    id: 1,
    question: "What is your primary wellness goal?",
    options: [
      { label: "Daily Immunity", value: "immunity" },
      { label: "Digestive Support", value: "digestion" },
      { label: "Wound & Skin Care", value: "skin" },
      { label: "General Wellness", value: "general" },
    ],
  },
  {
    id: 2,
    question: "How often do you plan to use Manuka honey?",
    options: [
      { label: "Every Day", value: "daily" },
      { label: "A Few Times a Week", value: "weekly" },
      { label: "Only When Needed", value: "occasional" },
    ],
  },
  {
    id: 3,
    question: "What's your preference for taste?",
    options: [
      { label: "Mild & Sweet", value: "mild" },
      { label: "Rich & Balanced", value: "medium" },
      { label: "Intense & Earthy", value: "strong" },
    ],
  },
];

const HexagonGrid = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <div className="absolute inset-0" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='104' viewBox='0 0 60 104' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 17.32v34.64L30 69.28 0 51.96V17.32L30 0z' fill-opacity='0.1' fill='%23D4930A' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        backgroundSize: '60px 104px'
      }} />
    </div>
  );
};

const MGOScanner = ({ onComplete }: { onComplete: () => void }) => {
  const [copyIndex, setCopyIndex] = useState(0);
  const copies = [
    "Calibrating Profile...",
    "Analysing MGO Complexity...",
    "Locating Your Purest Gold Match..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCopyIndex((prev) => (prev + 1) % copies.length);
    }, 800);

    const completionTimer = setTimeout(onComplete, 2500);

    return () => {
      clearInterval(timer);
      clearTimeout(completionTimer);
    };
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="glass-panel p-16 md:p-24 rounded-[4rem] border-amber-700/20 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[500px]"
    >
      <HexagonGrid />
      
      <div className="relative w-32 h-32 mb-12">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-4 border-amber-700/20 border-t-amber-700 rounded-full"
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-amber-700 rounded-full blur-2xl"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Zap className="w-10 h-10 text-amber-700 animate-pulse" />
        </div>
      </div>

      <motion.div 
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[2px] bg-cyan-400/50 shadow-[0_0_15px_rgba(0,214,255,0.8)] z-20 pointer-events-none"
      />

      <AnimatePresence mode="wait">
        <motion.p 
          key={copyIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-amber-700 font-bold uppercase tracking-[0.4em] text-xs"
        >
          {copies[copyIndex]}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
};

const ResultCard = ({ result, onReset }: { result: Product; onReset: () => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#D4930A', '#F5C842', '#FFFFFF'] });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#D4930A', '#F5C842', '#FFFFFF'] });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="relative w-full max-w-4xl"
    >
      <div className="absolute -inset-20 bg-radial-gradient from-amber-700/10 to-transparent blur-3xl pointer-events-none opacity-50" />
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="glass-panel p-8 md:p-16 rounded-[4rem] border-amber-700/20 relative overflow-hidden transition-transform duration-200 ease-out"
      >
        <motion.div 
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-amber-700/10 to-transparent skew-x-12 pointer-events-none"
        />
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col md:flex-row items-center gap-12">
          <motion.div variants={itemVariants} className="w-full md:w-1/2 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-amber-700/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="relative z-10 w-64 h-80 bg-earth/10 rounded-3xl border border-amber-700/10 flex items-center justify-center p-8 overflow-hidden">
                 <Image src={result.image} alt={result.name} width={200} height={200} className="object-contain w-full h-full mix-blend-multiply drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]" />
              </motion.div>
            </div>
          </motion.div>
          <div className="w-full md:w-1/2 text-left flex flex-col items-center md:items-start">
            <motion.div variants={itemVariants} className="mb-6 flex flex-col items-center md:items-start">
              <span className="text-amber-700 font-bold uppercase tracking-[0.5em] text-[10px] mb-4 block">Your Match Found</span>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-text-primary mb-2 overflow-hidden flex">
                {result.name.split("").map((char, i) => (
                  <motion.span key={i} initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ delay: i * 0.02 + 0.5, duration: 0.5, ease: "circOut" }} className="inline-block whitespace-pre">{char}</motion.span>
                ))}
              </h2>
            </motion.div>
            <motion.div variants={itemVariants} className="mb-8 flex flex-wrap gap-3">
              <div className="px-6 py-3 rounded-2xl bg-amber-700 text-void font-bold text-lg flex items-center gap-2 shadow-lg shadow-amber-700/20 animate-pulse">
                <Zap className="w-5 h-5 fill-void" /> MGO {result.mgo}+ Bioactive Profile
              </div>
              <div className="px-6 py-3 rounded-2xl bg-earth/30 border border-amber-700/20 text-text-primary font-bold text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-700" /> Quality Assured
              </div>
            </motion.div>
            <motion.p variants={itemVariants} className="text-text-muted text-lg mb-10 leading-relaxed text-center md:text-left">{result.description}</motion.p>
            <motion.div variants={itemVariants} className="flex flex-col gap-4 w-full">
               <Link href={`/products/${result.slug}`} className="w-full">
                  <Button size="lg" className="w-full h-14 text-lg tracking-widest bg-amber-700 text-void hover:bg-amber-400 shadow-2xl shadow-amber-700/20 relative group overflow-hidden">
                    <span className="relative z-10 flex items-center gap-2 justify-center uppercase font-bold">Shop Now <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" /></span>
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
               </Link>
               <div className="flex flex-col items-center md:items-start gap-4 mt-6 pt-6 border-t border-amber-700/10">
                 <div className="flex flex-col items-center md:items-start gap-3">
                   <div className="flex items-center gap-2 text-amber-700 text-[10px] uppercase tracking-[0.2em] font-bold">
                     <Info className="w-4 h-4" /> Why we matched this for you
                   </div>
                   <p className="text-text-muted text-xs leading-relaxed max-w-sm text-center md:text-left">
                     Matched to align with your specific wellness focus and activity requirements for optimal natural support.
                   </p>
                 </div>
                 <button onClick={onReset} className="flex items-center gap-2 text-text-muted/50 hover:text-text-primary transition-colors text-[10px] uppercase tracking-[0.3em] mt-2">
                   <RefreshCw className="w-3 h-3" /> Re-calibrating Match
                 </button>
               </div>            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function WellnessQuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<Product | null>(null);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsAnalyzing(true);
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: string[]) => {
    const goal = finalAnswers[0];
    const frequency = finalAnswers[1];
    let recommendedSlug = "mgo-100";
    if (goal === "skin" || goal === "digestion") recommendedSlug = "mgo-400";
    else if (goal === "immunity" && frequency === "daily") recommendedSlug = "mgo-263";
    else if (goal === "general") recommendedSlug = "mgo-30";
    else if (goal === "immunity" && frequency === "occasional") recommendedSlug = "mgo-800";
    const product = products.find(p => p.slug === recommendedSlug);
    setResult(product || products[0]);
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="py-24 px-6 min-h-[90vh] flex items-center justify-center relative overflow-hidden">
      <div className="max-w-4xl w-full relative z-10">
        <AnimatePresence mode="wait">
          {!isAnalyzing && !result ? (
            <motion.div key="quiz" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20, scale: 0.95 }} className="glass-panel p-10 md:p-16 rounded-[3rem] border-amber-700/10 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-earth/20">
                 <motion.div className="h-full bg-amber-700 shadow-[0_0_15px_rgba(212,147,10,0.5)]" initial={{ width: 0 }} animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} />
              </div>
              <div className="mb-12">
                <span className="text-amber-700 font-bold text-[10px] uppercase tracking-[0.4em]">Analysis Step {currentStep + 1} of {steps.length}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-12 leading-tight">{steps[currentStep].question}</h2>
              <div className="grid grid-cols-1 gap-4 max-w-lg mx-auto">
                {steps[currentStep].options.map((option) => (
                  <button key={option.value} onClick={() => handleAnswer(option.value)} className="p-8 rounded-3xl bg-earth/30 border border-amber-900/10 text-text-secondary hover:text-text-primary hover:border-amber-700 hover:bg-amber-700/5 transition-all text-left flex items-center justify-between group">
                    <span className="font-bold tracking-wide">{option.label}</span>
                    <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </button>
                ))}
              </div>
            </motion.div>
          ) : isAnalyzing && !result ? (
            <MGOScanner key="scanner" onComplete={() => {}} />
          ) : isAnalyzing && result ? (
            <MGOScanner key="scanner" onComplete={() => setIsAnalyzing(false)} />
          ) : (
            <ResultCard key="result" result={result!} onReset={resetQuiz} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

