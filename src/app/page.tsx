import { HeroCanvas } from "@/components/home/hero-canvas";
import { ProductCard } from "@/components/products/product-card";
import { products } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Beaker, ShieldCheck, Zap } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505]">
      {/* Cinematic Hero Canvas Sequence */}
      <HeroCanvas />

      {/* Narrative Section: The Science of Potency */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-amber-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">
                The Science of MGO
              </span>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-text-primary mb-8 leading-tight">
                Not All Honey <br /> Is Created <span className="text-amber-500">Equal.</span>
              </h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    <Beaker className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-text-primary mb-2">Certified Methylglyoxal</h4>
                    <p className="text-text-muted leading-relaxed">
                      MGO is the compound that gives Manuka its unique antibacterial power. We certify every jar for precision.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-text-primary mb-2">100% Raw & Unfiltered</h4>
                    <p className="text-text-muted leading-relaxed">
                      Cold-pressed to preserve the vital enzymes and bio-active nutrients that industrial heating destroys.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-text-primary mb-2">Maximum Bio-Activity</h4>
                    <p className="text-text-muted leading-relaxed">
                      Harvested from Australia&apos;s pristine Leptospermum forests for clinical-grade antibacterial potency.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-[3rem] overflow-hidden border border-amber-500/20 glass-panel p-2">
                <div className="w-full h-full rounded-[2.5rem] bg-earth/30 relative overflow-hidden flex items-center justify-center">
                  <Image 
                    src="/honey-frames/ezgif-frame-001.jpg" 
                    alt="Manuka Honey Potency" 
                    fill
                    className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                  <div className="absolute bottom-12 left-12 right-12">
                    <div className="flex items-end justify-between">
                      <div>
                        <span className="text-amber-500 font-bold text-5xl block mb-2">800+</span>
                        <span className="text-text-primary font-bold uppercase tracking-widest text-xs">Clinical MGO Grade</span>
                      </div>
                      <div className="h-1 w-32 bg-amber-500/20 rounded-full overflow-hidden">
                        <div className="h-full w-full bg-amber-500 animate-[shimmer_2s_infinite]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid Section */}
      <section className="py-32 px-6 bg-earth/5 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className="max-w-2xl">
              <span className="text-amber-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">
                The Core Range
              </span>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-text-primary mb-6">
                Choose Your <span className="text-amber-500">Potency.</span>
              </h2>
            </div>
            <Link 
              href="/products" 
              className="group flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-amber-500 border-b border-amber-500/20 pb-2 hover:border-amber-500 transition-all"
            >
              Shop Full Collection
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Wellness Quiz CTA */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="glass-panel p-16 md:p-24 rounded-[4rem] border-amber-500/20 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/[0.02] transition-colors duration-700" />
            
            <div className="relative z-10">
              <span className="text-amber-500 font-bold uppercase tracking-[0.5em] text-[10px] mb-8 block">
                Personalized Wellness
              </span>
              <h3 className="text-4xl md:text-6xl font-display font-bold text-text-primary mb-8">
                Which Manuka is <br /> right for you?
              </h3>
              <p className="text-text-muted text-lg mb-12 max-w-xl mx-auto leading-relaxed">
                Unlock the full potential of your health. Take our expert-designed quiz to find your ideal MGO rating based on your unique wellness goals.
              </p>
              <Link 
                href="/wellness-quiz"
                className="inline-block bg-amber-500 text-void font-bold uppercase tracking-[0.2em] px-12 py-6 rounded-2xl hover:bg-amber-400 transition-all shadow-2xl shadow-amber-500/20 hover:scale-105 active:scale-95"
              >
                Find My Match
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
