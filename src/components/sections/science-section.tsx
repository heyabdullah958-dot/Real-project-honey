"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Beaker, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const StaggerText = ({ text, className, hover = false }: { text: string; className?: string; hover?: boolean }) => {
  const letters = text.split("");
  
  return (
    <motion.span className={cn("inline-flex flex-wrap", className)}>
      {letters.map((char, i) => (char === " " ? (
        <span key={i}>&nbsp;</span>
      ) : (
        <motion.span
          key={i}
          variants={{
            initial: { y: 20, opacity: 0 },
            animate: { 
              y: 0, 
              opacity: 1,
              transition: { duration: 0.5, delay: i * 0.02, ease: [0.22, 1, 0.36, 1] }
            },
            hover: {
              y: [0, -5, 0],
              color: "#f59e0b",
              transition: { duration: 0.4, delay: i * 0.01 }
            }
          }}
          className="inline-block"
        >
          {char}
        </motion.span>
      )))}
    </motion.span>
  );
};

const ScienceItem = ({ 
  icon: Icon, 
  title, 
  description, 
  index, 
  active, 
  onHover, 
  onLeave 
}: { 
  icon: any; 
  title: string; 
  description: string; 
  index: number;
  active: boolean | null;
  onHover: () => void;
  onLeave: () => void;
}) => {
  const isDimmed = active !== null && !active;

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      viewport={{ once: true }}
      variants={{
        initial: { x: -30, opacity: 0 },
        animate: { 
          x: 0, 
          opacity: isDimmed ? 0.3 : 1,
          transition: { delay: index * 0.1, duration: 0.6, type: "spring" }
        }
      }}
      animate={{ opacity: isDimmed ? 0.3 : 1 }}
      className="flex gap-6 group cursor-default transition-opacity duration-500"
    >
      <div className="relative flex-shrink-0">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center relative z-10"
        >
          <Icon className="w-6 h-6 text-amber-500" />
        </motion.div>
        {/* Pulsing Ambient Glow */}
        <AnimatePresence>
          <motion.div
            className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </AnimatePresence>
      </div>

      <div>
        <div className="relative overflow-hidden group/text">
          <h4 className="text-xl font-bold text-text-primary mb-2">
            <motion.span whileHover="hover" initial="initial" animate="animate">
              <StaggerText text={title} />
            </motion.span>
          </h4>
          {/* Shimmer Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent w-full h-full skew-x-12 pointer-events-none"
            initial={{ x: "-100%" }}
            whileHover={{ 
              x: "200%",
              transition: { duration: 0.8, ease: "easeInOut" } 
            }}
          />
        </div>
        <p className="text-text-muted leading-relaxed transition-colors duration-500">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export const ScienceSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="relative py-32 px-6 overflow-hidden bg-[#050505]">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }}>
            <span className="text-amber-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">
              <StaggerText text="The Science of MGO" />
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-text-primary mb-8 leading-tight">
              <StaggerText text="Not All Honey" /><br />
              <StaggerText text="Is Created" /> <span className="text-amber-500"><StaggerText text="Equal." /></span>
            </h2>

            <div className="space-y-8">
              <ScienceItem
                index={0}
                icon={Beaker}
                title="Certified Methylglyoxal"
                description="MGO is the compound that gives Manuka its unique antibacterial power. We certify every jar for precision."
                active={activeIndex === null ? null : activeIndex === 0}
                onHover={() => setActiveIndex(0)}
                onLeave={() => setActiveIndex(null)}
              />
              <ScienceItem
                index={1}
                icon={ShieldCheck}
                title="100% Raw & Unfiltered"
                description="Cold-pressed to preserve the vital enzymes and bio-active nutrients that industrial heating destroys."
                active={activeIndex === null ? null : activeIndex === 1}
                onHover={() => setActiveIndex(1)}
                onLeave={() => setActiveIndex(null)}
              />
              <ScienceItem
                index={2}
                icon={Zap}
                title="Maximum Bio-Activity"
                description="Harvested from Australia's pristine Leptospermum forests for clinical-grade antibacterial potency."
                active={activeIndex === null ? null : activeIndex === 2}
                onHover={() => setActiveIndex(2)}
                onLeave={() => setActiveIndex(null)}
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] overflow-hidden border border-amber-500/20 glass-panel p-2 group">
              <div className="w-full h-full rounded-[2.5rem] bg-earth/30 relative overflow-hidden flex items-center justify-center">
                <Image 
                  src="/honey-frames/ezgif-frame-001.jpg" 
                  alt="Manuka Honey Potency" 
                  fill
                  className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2000ms] ease-out"
                />
                
                {/* Glowing Drop Animation */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-6 bg-amber-500 rounded-full blur-[2px] z-20"
                  animate={{
                    y: [0, 100, 100],
                    opacity: [0, 1, 0],
                    scale: [1, 1.2, 0.8]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeIn"
                  }}
                >
                  <div className="absolute inset-0 bg-white/40 blur-[1px] rounded-full scale-50 -translate-x-1" />
                </motion.div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                <div className="absolute bottom-12 left-12 right-12">
                  <div className="flex items-end justify-between">
                    <motion.div
                      whileHover={{ y: -5 }}
                    >
                      <span className="text-amber-500 font-bold text-5xl block mb-2 tracking-tighter">800+</span>
                      <span className="text-text-primary font-bold uppercase tracking-widest text-xs">Clinical MGO Grade</span>
                    </motion.div>
                    <div className="h-1.5 w-32 bg-amber-500/10 rounded-full overflow-hidden border border-amber-500/5">
                      <motion.div 
                        className="h-full bg-amber-500"
                        animate={{
                          x: ["-100%", "100%"]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Ambient Background Glow for Image */}
            <div className="absolute -inset-10 bg-amber-500/5 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};