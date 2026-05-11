"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    location: "Sydney, AU",
    text: "The MGO 400 has been a game-changer for my morning routine. The quality and texture are unlike any other Manuka I've tried. You can really taste the purity.",
    rating: 5,
    product: "MGO 400"
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Melbourne, AU",
    text: "I bought the MGO 800 as a gift for my father, and he's obsessed. The packaging is beautiful, and the lab reports give me total peace of mind about what I'm buying.",
    rating: 5,
    product: "MGO 800"
  },
  {
    id: 3,
    name: "Priya Sharma",
    location: "Brisbane, AU",
    text: "Using the MGO 263 for my daily immunity boost. It's smooth, delicious, and I haven't felt this good in years. Highly recommend the wellness quiz to find your match!",
    rating: 5,
    product: "MGO 263"
  }
];

const TestimonialsCarousel = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 px-6 overflow-hidden relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <span className="text-amber-500 font-medium tracking-[0.3em] uppercase text-xs">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary">
            Trusted by <span className="text-amber-500">Thousands</span>
          </h2>
        </div>

        <div className="relative w-full max-w-4xl">
          <div className="absolute -top-10 -left-10 text-amber-500/10">
            <Quote className="w-32 h-32 fill-current" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-panel p-8 md:p-16 rounded-[3rem] border-amber-500/10 text-center relative z-10"
            >
              <div className="flex justify-center gap-1 mb-8">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                ))}
              </div>
              
              <p className="text-xl md:text-2xl text-text-primary font-display leading-relaxed mb-8 italic">
                &quot;{testimonials[current].text}&quot;
              </p>

              <div className="flex flex-col gap-1">
                <h4 className="font-bold text-text-primary uppercase tracking-widest text-sm">
                  {testimonials[current].name}
                </h4>
                <p className="text-xs text-text-muted">
                  {testimonials[current].location} • Verified Buyer of {testimonials[current].product}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex justify-center gap-4 mt-12">
            <button 
              onClick={prev}
              className="w-12 h-12 rounded-full border border-amber-900/20 flex items-center justify-center text-text-secondary hover:text-amber-500 hover:border-amber-500 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={next}
              className="w-12 h-12 rounded-full border border-amber-900/20 flex items-center justify-center text-text-secondary hover:text-amber-500 hover:border-amber-500 transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
