import { Beaker, ShieldCheck, Microscope, Zap } from "lucide-react";
import Link from "next/link";

export default function SciencePage() {
  return (
    <div className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-6 mb-20 max-w-3xl">
           <span className="text-amber-700 font-medium tracking-[0.3em] uppercase text-xs">Education Hub</span>
           <h1 className="text-5xl md:text-7xl font-display font-bold text-text-primary leading-[1.1]">
             The Science of <br /><span className="text-amber-700">MGO Activity Level</span>
           </h1>
           <p className="text-xl text-text-secondary leading-relaxed mt-4">
             Understanding the distinctive bioactive profile that makes Australian Manuka honey a world-renowned wellness superfood.
           </p>
        </div>

        {/* What is MGO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-32">
           <div className="glass-panel p-10 rounded-[3rem] border-amber-700/10">
              <h2 className="text-3xl font-display font-bold text-text-primary mb-6">What is MGO?</h2>
              <div className="space-y-6 text-text-secondary leading-relaxed">
                <p>
                  Methylglyoxal (MGO) is the naturally occurring compound that gives Manuka honey its distinctive bioactive activity. While all honey has some level of bio-active properties, Manuka is unique because its MGO levels are stable and resistant to heat and light.
                </p>
                <p>
                  The higher the MGO number, the stronger the bioactive activity and the more premium the honey is for wellness support.
                </p>
              </div>
              <div className="mt-10 flex items-center gap-4 p-4 rounded-2xl bg-amber-700/5 border border-amber-700/10">
                 <Zap className="w-6 h-6 text-amber-700" />
                 <span className="text-sm font-bold text-text-primary uppercase tracking-widest">Bio-Active Powerhouse</span>
              </div>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: ShieldCheck, title: "Natural Support", text: "Supports overall wellness profile." },
                { icon: Beaker, title: "Wellness Support", text: "Premium bioactive properties." },
                { icon: Microscope, title: "Scientifically Verified", text: "Verified activity levels." },
                { icon: Zap, title: "Energy", text: "Raw, natural glucose for stamina." }
              ].map((item, i) => (
                <div key={i} className="glass-panel p-8 rounded-3xl flex flex-col gap-4">
                   <item.icon className="w-8 h-8 text-amber-700" />
                   <h4 className="font-display font-bold text-text-primary">{item.title}</h4>
                   <p className="text-text-secondary text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
           </div>
        </div>

        {/* Extraction Process */}
        <div className="relative py-24 glass-panel rounded-[4rem] overflow-hidden px-10 text-center flex flex-col items-center gap-10">
           <div className="absolute inset-0 amber-gradient opacity-5" />
           <div className="relative z-10 max-w-2xl flex flex-col gap-6">
              <h2 className="text-4xl font-display font-bold text-text-primary">Our Cold Extraction Process</h2>
              <p className="text-text-secondary leading-relaxed">
                Most commercial honeys are heat-treated, which destroys delicate enzymes. Amazing Natures uses a specialized cold-extraction method to ensure every vital component remains intact.
              </p>
           </div>
           <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              <div className="flex flex-col gap-2">
                 <span className="text-4xl font-display font-bold text-amber-700">01</span>
                 <h5 className="font-bold text-text-primary uppercase text-xs tracking-widest">Harvesting</h5>
                 <p className="text-text-muted text-xs">Carefully collected from wild Australian Manuka blooms.</p>
              </div>
              <div className="flex flex-col gap-2">
                 <span className="text-4xl font-display font-bold text-amber-700">02</span>
                 <h5 className="font-bold text-text-primary uppercase text-xs tracking-widest">Cold Filtering</h5>
                 <p className="text-text-muted text-xs">Slowly filtered at hive temperatures (approx. 35°C).</p>
              </div>
              <div className="flex flex-col gap-2">
                 <span className="text-4xl font-display font-bold text-amber-700">03</span>
                 <h5 className="font-bold text-text-primary uppercase text-xs tracking-widest">Testing</h5>
                 <p className="text-text-muted text-xs">Independent lab verification of MGO and purity.</p>
              </div>
           </div>
        </div>

        {/* Lab Reports CTA */}
        <div className="mt-32 flex flex-col items-center text-center gap-10 bg-earth/30 p-16 rounded-[4rem] border border-amber-900/10">
           <div className="flex flex-col gap-3">
              <h3 className="text-4xl md:text-5xl font-display font-bold text-text-primary">The Gold Standard</h3>
              <p className="text-text-secondary text-lg">Unwavering commitment to quality in every drop.</p>
           </div>
           <Link 
             href="/products" 
             className="h-14 w-full md:w-auto px-10 rounded-full bg-amber-700/10 border border-amber-700 text-amber-900 font-bold hover:bg-amber-700/20 transition-all uppercase tracking-widest text-xs flex items-center justify-center shadow-lg shadow-amber-900/10"
           >
             EXPLORE THE COLLECTION
           </Link>
        </div>      </div>
    </div>
  );
}
