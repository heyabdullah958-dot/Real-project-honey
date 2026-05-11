import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All Manuka Honey | Amazing Natures Australia",
  description: "Browse our premium range of Australian Manuka honey. From daily wellness MGO 30 to clinical grade MGO 800+, all lab-certified and cold-extracted.",
  openGraph: {
    title: "Shop All Manuka Honey | Amazing Natures Australia",
    description: "Premium Australian Manuka honey, cold-extracted and lab-verified.",
    images: [{ url: "/assets/products/4.jpeg" }],
  },
};

import { products } from "@/lib/data";
import { ProductCard } from "@/components/products/product-card";

export default function ProductsPage() {
  return (
    <div className="py-32 px-6 min-h-screen bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="flex flex-col gap-4">
            <span className="text-amber-500 font-bold tracking-[0.4em] uppercase text-[10px]">
              The Full Collection
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-text-primary leading-tight">
              Purity In <br /> Every <span className="text-amber-500">Grade.</span>
            </h1>
          </div>
          <p className="text-text-muted max-w-md leading-relaxed text-lg">
            Discover the perfect balance of taste and potency. Every jar is sustainably sourced and independently certified for MGO content.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {/* Potency Guide Table */}
        <div className="mt-32 glass-panel rounded-[2rem] p-8 md:p-12 overflow-x-auto">
          <h2 className="text-2xl font-display font-bold text-text-primary mb-8">Potency Comparison</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-amber-900/10 text-[10px] uppercase tracking-widest text-text-muted">
                <th className="pb-4 font-medium">Grade</th>
                <th className="pb-4 font-medium">Best For</th>
                <th className="pb-4 font-medium">Antibacterial</th>
                <th className="pb-4 font-medium">Taste Profile</th>
                <th className="pb-4 font-medium text-right">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-900/5">
              {products.map((p) => (
                <tr key={p.id} className="group hover:bg-white/5 transition-colors">
                  <td className="py-6 font-display font-bold text-amber-500">MGO {p.mgo}</td>
                  <td className="py-6 text-sm text-text-secondary">{p.bestFor}</td>
                  <td className="py-6 text-sm text-text-secondary">{p.antibacterial}</td>
                  <td className="py-6 text-sm text-text-secondary">{p.taste}</td>
                  <td className="py-6 text-sm text-text-primary font-bold text-right">${p.price}.00</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
