"use client";

import { Leaf, ShieldCheck, Heart, Beaker, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const CinematicSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div ref={containerRef} className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[3rem] overflow-hidden group mb-32 shadow-2xl shadow-amber-700/5">
      <motion.div style={{ y, scale: 1.2 }} className="absolute inset-0">
        <Image
          src="/assets/about-hive.jpg"
          alt="Australian Manuka Hive & Wilderness"
          fill
          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
          priority
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-b from-void/40 via-transparent to-transparent opacity-40" />
      
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none shadow-[inset_0_0_100px_rgba(212,147,10,0.2)]" />

      <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="max-w-xl text-left">
          <span className="text-amber-700 font-bold uppercase tracking-[0.5em] text-[10px] mb-4 block">
            The Source of Life
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-text-primary">
            A Sanctuary of <br />
            <span className="text-amber-700">Pure Bio-Activity.</span>
          </h2>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-text-muted text-sm max-w-xs text-right mb-6 leading-relaxed">
            Every drop is a testament to the untamed beauty of the Australian wilderness and the power of monofloral excellence.
          </p>
          <div className="w-12 h-[1px] bg-amber-700/50" />
        </div>
      </div>
    </div>
  );
};

export default function AboutPage() {
  return (
    <div className="py-24 px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <CinematicSection />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4 text-left">
              <span className="text-amber-700 font-bold tracking-[0.4em] uppercase text-[10px]">The Beginning</span>
              <h1 className="text-5xl md:text-8xl font-display font-bold text-text-primary leading-[1.1]">
                Bottled <span className="text-amber-700 underline decoration-amber-700/20 underline-offset-8">Gold</span> <br /> from the Wild.
              </h1>
            </div>
            <p className="text-xl text-text-secondary leading-relaxed max-w-xl font-medium text-left">
              Amazing Natures was born from a simple belief: that nature holds the ultimate power for wellness and longevity. Our journey began in the pristine wilderness of Australia, where the unique Manuka flower blooms.
            </p>
            
            {/* Australian Heritage Map */}
            <div className="flex flex-col gap-4">
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Amazing+Natures+Manuka+Honey+Sydney+NSW+Australia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-700 font-bold tracking-widest uppercase text-[10px] flex items-center gap-2 w-fit hover:text-amber-900 transition-colors"
              >
                <MapPin className="w-3 h-3" /> Our Australian Origin
              </a>
              <div className="w-full h-48 rounded-3xl overflow-hidden border border-amber-700/10 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-700">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.898246877969!2d151.2073!3d-33.8688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ae401e8b983f%3A0x5017d6816329200!2sSydney%20NSW!5e0!3m2!1sen!2sau!4v1715560000000!5m2!1sen!2sau" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy"
                    title="Amazing Natures Australian Origin Map"
                  ></iframe>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-4 p-8 glass-panel rounded-3xl border-amber-700/10">
                 <div className="w-12 h-12 amber-gradient rounded-2xl flex items-center justify-center text-void">
                   <Leaf className="w-6 h-6" />
                 </div>
                 <h4 className="font-bold text-text-primary uppercase tracking-widest text-[10px]">Sustainably Sourced</h4>
              </div>
              <div className="flex flex-col gap-4 p-8 glass-panel rounded-3xl border-amber-700/10">
                 <div className="w-12 h-12 amber-gradient rounded-2xl flex items-center justify-center text-void">
                   <ShieldCheck className="w-6 h-6" />
                 </div>
                 <h4 className="font-bold text-text-primary uppercase tracking-widest text-[10px]">Scientifically Verified</h4>
              </div>
            </div>
          </div>
          
          <div className="relative aspect-[4/5] glass-panel rounded-[4rem] overflow-hidden group">
             <Image
               src="/assets/about-hive.jpg"
               alt="Beekeeping Process"
               fill
               className="object-cover transition-transform duration-1000 group-hover:scale-105"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-60" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          <div className="flex flex-col gap-6 p-10 glass-panel rounded-[2.5rem]">
             <ShieldCheck className="w-10 h-10 text-amber-700" />
             <h3 className="text-2xl font-display font-bold text-text-primary">Uncompromising Purity</h3>
             <p className="text-text-secondary text-sm leading-relaxed">
               We never compromise on the quality of our honey. No additives, no excessive heating—just pure, raw Manuka exactly as nature intended.
             </p>
          </div>
          <div className="flex flex-col gap-6 p-10 glass-panel rounded-[2.5rem] border-amber-700/20">
             <Beaker className="w-10 h-10 text-amber-700" />
             <h3 className="text-2xl font-display font-bold text-text-primary">Scientifically Verified</h3>
             <p className="text-text-secondary text-sm leading-relaxed">
               Every batch is scientifically verified to verify its MGO content, ensuring you receive the bioactive profile you pay for.
             </p>
          </div>
          <div className="flex flex-col gap-6 p-10 glass-panel rounded-[2.5rem]">
             <Heart className="w-10 h-10 text-amber-700" />
             <h3 className="text-2xl font-display font-bold text-text-primary">Wellness First</h3>
             <p className="text-text-secondary text-sm leading-relaxed">
               Our goal is to support your health journey with a product that is as delicious as it is effective for immunity, skin, and digestion.
             </p>
          </div>
        </div>

        <div className="text-center py-24 glass-panel rounded-[3rem] border-amber-700/10 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-amber-700/5 rounded-full blur-[100px]" />
           <div className="relative z-10 flex flex-col items-center gap-8 px-6">
             <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary">Experience the Difference</h2>
             <p className="text-text-secondary max-w-xl leading-relaxed">
               Discover why Amazing Natures is Australia&apos;s most trusted source for premium Manuka honey.
             </p>
             <Link href="/products" className="inline-flex h-14 items-center justify-center rounded-full amber-gradient px-10 text-base font-bold text-void transition-all hover:scale-105 active:scale-95">
               Shop the Collection
             </Link>
           </div>
        </div>
      </div>
    </div>
  );
}
