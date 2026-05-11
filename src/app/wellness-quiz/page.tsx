"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data";
import { Product } from "@/types";
import Link from "next/link";
import { ArrowRight, RefreshCw, CheckCircle2 } from "lucide-react";

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

export default function WellnessQuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<Product | null>(null);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: string[]) => {
    const goal = finalAnswers[0];
    const frequency = finalAnswers[1];
    
    let recommendedSlug = "mgo-100";

    if (goal === "skin" || goal === "digestion") {
      recommendedSlug = "mgo-400";
    } else if (goal === "immunity" && frequency === "daily") {
      recommendedSlug = "mgo-263";
    } else if (goal === "general") {
      recommendedSlug = "mgo-30";
    } else if (goal === "immunity" && frequency === "occasional") {
      recommendedSlug = "mgo-800";
    }

    const product = products.find(p => p.slug === recommendedSlug);
    setResult(product);
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <div className="py-24 px-6 min-h-[80vh] flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-panel p-10 md:p-16 rounded-[3rem] border-amber-500/10 text-center"
            >
              <div className="mb-12">
                <span className="text-amber-500 font-bold text-xs uppercase tracking-[0.3em]">
                  Step {currentStep + 1} of {steps.length}
                </span>
                <div className="w-full h-1 bg-earth mt-4 rounded-full overflow-hidden">
                   <motion.div 
                     className="h-full amber-gradient" 
                     initial={{ width: 0 }}
                     animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                   />
                </div>
              </div>

              <h2 className="text-3xl font-display font-bold text-text-primary mb-12">
                {steps[currentStep].question}
              </h2>

              <div className="grid grid-cols-1 gap-4">
                {steps[currentStep].options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className="p-6 rounded-2xl bg-earth/50 border border-amber-900/10 text-text-secondary hover:text-text-primary hover:border-amber-500 hover:bg-amber-500/5 transition-all text-left flex items-center justify-between group"
                  >
                    <span className="font-medium">{option.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-panel p-10 md:p-16 rounded-[3rem] border-amber-500/20 text-center flex flex-col items-center gap-8"
            >
              <div className="w-20 h-20 amber-gradient rounded-full flex items-center justify-center text-void mb-4 shadow-[0_0_40px_rgba(212,147,10,0.4)]">
                 <CheckCircle2 className="w-10 h-10" />
              </div>
              
              <div className="flex flex-col gap-2">
                 <h2 className="text-4xl font-display font-bold text-text-primary">Your Match Found</h2>
                 <p className="text-text-secondary">Based on your goals, we recommend:</p>
              </div>

              <div className="w-full p-8 rounded-3xl bg-night border border-amber-900/10 flex flex-col gap-4">
                 <span className="text-[10px] uppercase tracking-widest font-bold text-amber-500">The Perfect Grade</span>
                 <h3 className="text-2xl font-display font-bold text-text-primary">{result.name}</h3>
                 <p className="text-sm text-text-muted leading-relaxed">
                   {result.description}
                 </p>
                 <div className="flex justify-center gap-2">
                   {[...Array(result.potency)].map((_, i) => (
                     <div key={i} className="w-2 h-2 rounded-full bg-amber-500" />
                   ))}
                 </div>
              </div>

              <div className="flex flex-col gap-4 w-full">
                 <Link href={`/products/${result.slug}`} className="w-full">
                    <Button size="lg" className="w-full">View Recommended Product</Button>
                 </Link>
                 <button 
                   onClick={resetQuiz}
                   className="flex items-center justify-center gap-2 text-text-muted hover:text-amber-500 transition-colors text-xs uppercase tracking-widest"
                 >
                   <RefreshCw className="w-3 h-3" /> Start Over
                 </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
