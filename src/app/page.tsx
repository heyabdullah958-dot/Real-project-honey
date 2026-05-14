import { HeroCanvas } from "@/components/home/hero-canvas";
import { ProductCard } from "@/components/products/product-card";
import { ScienceSection } from "@/components/sections/science-section";
import { products } from "@/lib/data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Cinematic Hero Canvas Sequence */}
      <HeroCanvas />

      {/* Narrative Section: The Science of Activity */}
      <ScienceSection />

      {/* Product Grid Section */}
      <section className="py-32 px-6 bg-amber-900/[0.04] relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className="max-w-2xl">
              <span className="text-amber-700 font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">
                The Core Range
              </span>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-text-primary mb-6">
                Choose Your <span className="text-amber-700">Activity Level.</span>
              </h2>
            </div>
            <Link 
              href="/products" 
              className="group flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-amber-700 border-b border-amber-700/20 pb-2 hover:border-amber-700 transition-all"
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
          <div className="glass-panel p-16 md:p-24 rounded-[4rem] border-amber-700/20 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-amber-700/0 group-hover:bg-amber-700/[0.02] transition-colors duration-700" />
            
            <div className="relative z-10">
              <span className="text-amber-700 font-bold uppercase tracking-[0.5em] text-[10px] mb-8 block">
                Personalized Wellness
              </span>
              <h3 className="text-4xl md:text-6xl font-display font-bold text-text-primary mb-8">
                Which Manuka is <br /> right for you?
              </h3>
              <p className="text-text-muted text-lg mb-12 max-w-xl mx-auto leading-relaxed">
                Experience the gold standard of natural bioactivity. Find your ideal MGO rating based on your unique wellness profile.
              </p>
              <Link 
                href="/wellness-quiz"
                className="inline-block bg-amber-700 text-white font-bold uppercase tracking-[0.2em] px-12 py-6 rounded-2xl hover:bg-amber-400 transition-all shadow-2xl shadow-amber-700/20 hover:scale-105 active:scale-95"
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
