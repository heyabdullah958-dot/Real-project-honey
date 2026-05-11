import { Leaf, ShieldCheck, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <span className="text-amber-500 font-medium tracking-[0.3em] uppercase text-xs">Our Story</span>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-text-primary">
                Bottled <span className="text-amber-500">Gold</span> from the Wild.
              </h1>
            </div>
            <p className="text-lg text-text-secondary leading-relaxed max-w-xl">
              Amazing Natures was born from a simple belief: that nature holds the ultimate power for healing and wellness. Our journey began in the pristine wilderness of Australia, where the unique Manuka flower blooms.
            </p>
            <div className="flex items-center gap-4 p-6 glass-panel rounded-3xl border-amber-500/10">
               <div className="w-12 h-12 amber-gradient rounded-2xl flex items-center justify-center text-void">
                 <Leaf className="w-6 h-6" />
               </div>
               <div>
                 <h4 className="font-bold text-text-primary uppercase tracking-widest text-xs">Sustainably Sourced</h4>
                 <p className="text-text-muted text-xs">Respecting the bees, the land, and the process.</p>
               </div>
            </div>
          </div>
          <div className="relative aspect-[4/5] glass-panel rounded-[3rem] overflow-hidden">
             <div className="absolute inset-0 amber-gradient opacity-10" />
             <div className="absolute inset-0 flex items-center justify-center text-text-muted text-sm uppercase tracking-widest">
               [ Image: Australian Hive & Wilderness ]
             </div>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          <div className="flex flex-col gap-6 p-10 glass-panel rounded-[2.5rem]">
             <ShieldCheck className="w-10 h-10 text-amber-500" />
             <h3 className="text-2xl font-display font-bold text-text-primary">Uncompromising Purity</h3>
             <p className="text-text-secondary text-sm leading-relaxed">
               We never compromise on the quality of our honey. No additives, no excessive heating—just pure, raw Manuka exactly as nature intended.
             </p>
          </div>
          <div className="flex flex-col gap-6 p-10 glass-panel rounded-[2.5rem] border-amber-500/20">
             <Beaker className="w-10 h-10 text-amber-500" />
             <h3 className="text-2xl font-display font-bold text-text-primary">Science Verified</h3>
             <p className="text-text-secondary text-sm leading-relaxed">
               Every batch is laboratory tested to verify its MGO content, ensuring you receive the therapeutic potency you pay for.
             </p>
          </div>
          <div className="flex flex-col gap-6 p-10 glass-panel rounded-[2.5rem]">
             <Heart className="w-10 h-10 text-amber-500" />
             <h3 className="text-2xl font-display font-bold text-text-primary">Wellness First</h3>
             <p className="text-text-secondary text-sm leading-relaxed">
               Our goal is to support your health journey with a product that is as delicious as it is effective for immunity, skin, and digestion.
             </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center py-24 glass-panel rounded-[3rem] border-amber-500/10 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[100px]" />
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

import Link from "next/link";
import { Beaker } from "lucide-react";
