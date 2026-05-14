import { Beaker, ShieldCheck, Microscope, Zap } from "lucide-react";

export default function SciencePage() {
  return (
    <div className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-6 mb-20 max-w-3xl">
           <span className="text-amber-500 font-medium tracking-[0.3em] uppercase text-xs">Education Hub</span>
           <h1 className="text-5xl md:text-7xl font-display font-bold text-text-primary leading-[1.1]">
             The Science of <br /><span className="text-amber-500">MGO Activity Level</span>
           </h1>
           <p className="text-xl text-text-secondary leading-relaxed mt-4">
             Understanding the distinctive bioactive profile that makes Australian Manuka honey a world-renowned wellness superfood.
           </p>
        </div>

        {/* What is MGO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-32">
           <div className="glass-panel p-10 rounded-[3rem] border-amber-500/10">
              <h2 className="text-3xl font-display font-bold text-text-primary mb-6">What is MGO?</h2>
              <div className="space-y-6 text-text-secondary leading-relaxed">
                <p>
                  Methylglyoxal (MGO) is the naturally occurring compound that gives Manuka honey its distinctive bioactive activity. While all honey has some level of bio-active properties, Manuka is unique because its MGO levels are stable and resistant to heat and light.
                </p>
                <p>
                  The higher the MGO number, the stronger the bioactive activity and the more premium the honey is for wellness support.
                </p>
              </div>
              <div className="mt-10 flex items-center gap-4 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10">
                 <Zap className="w-6 h-6 text-amber-500" />
                 <span className="text-sm font-bold text-text-primary uppercase tracking-widest">Bio-Active Powerhouse</span>
              </div>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: ShieldCheck, title: "Immunity", text: "Supports natural defense systems." },
                { icon: Beaker, title: "Gut Health", text: "Helps balance digestive bacteria." },
                { icon: Microscope, title: "Wellness Support", text: "Premium bioactive properties." },
                { icon: Zap, title: "Energy", text: "Raw, natural glucose for stamina." }
              ].map((item, i) => (
                <div key={i} className="glass-panel p-8 rounded-3xl flex flex-col gap-4">
                   <item.icon className="w-8 h-8 text-amber-500" />
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
                 <span className="text-4xl font-display font-bold text-amber-500">01</span>
                 <h5 className="font-bold text-text-primary uppercase text-xs tracking-widest">Harvesting</h5>
                 <p className="text-text-muted text-xs">Carefully collected from wild Australian Manuka blooms.</p>
              </div>
              <div className="flex flex-col gap-2">
                 <span className="text-4xl font-display font-bold text-amber-500">02</span>
                 <h5 className="font-bold text-text-primary uppercase text-xs tracking-widest">Cold Filtering</h5>
                 <p className="text-text-muted text-xs">Slowly filtered at hive temperatures (approx. 35°C).</p>
              </div>
              <div className="flex flex-col gap-2">
                 <span className="text-4xl font-display font-bold text-amber-500">03</span>
                 <h5 className="font-bold text-text-primary uppercase text-xs tracking-widest">Testing</h5>
                 <p className="text-text-muted text-xs">Independent lab verification of MGO and purity.</p>
              </div>
           </div>
        </div>

        {/* Lab Reports CTA */}
        <div className="mt-32 flex flex-col md:flex-row items-center justify-between gap-12 bg-earth/30 p-12 rounded-[3rem] border border-amber-900/10">
           <div className="flex flex-col gap-2">
              <h3 className="text-3xl font-display font-bold text-text-primary">Ready to See the Proof?</h3>
              <p className="text-text-secondary">Download our latest independent batch reports.</p>
           </div>
           <button className="h-14 px-10 rounded-full bg-transparent border border-amber-500 text-amber-500 font-bold hover:bg-amber-500/10 transition-all uppercase tracking-widest text-xs">
             Download Independent Reports (PDF)
           </button>
        </div>
      </div>
    </div>
  );
}
