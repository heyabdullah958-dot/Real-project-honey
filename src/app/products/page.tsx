import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All Manuka Honey | Amazing Natures Australia",
  description: "Browse our premium range of Australian Manuka honey. From daily wellness MGO 30 to premium reserve grade MGO 800+, all quality assured and ethically harvested.",
  openGraph: {
    title: "Shop All Manuka Honey | Amazing Natures Australia",
    description: "Premium Australian Manuka honey, ethically harvested and quality assured.",
    images: [{ url: "/assets/products/mgo-400.png" }],
  },
};

import { getProducts } from "@/lib/products";
import { ProductCard } from "@/components/products/product-card";

export default async function ProductsPage() {
  const dynamicProducts = await getProducts();

  return (
    <div className="pt-[150px] pb-32 px-6 md:pt-40 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="flex flex-col gap-4">
            <span className="text-amber-700 font-bold tracking-[0.4em] uppercase text-[10px]">
              The Full Collection
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-text-primary leading-tight">
              Purity In <br /> Every <span className="text-amber-700">Grade.</span>
            </h1>
          </div>
          <p className="text-text-muted max-w-md leading-relaxed text-lg">
            Discover the perfect balance of taste and bioactive profile. Every jar is wild-sourced and quality assured for MGO content.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {dynamicProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {/* Activity Level Guide Table */}
        <div className="mt-32 glass-panel rounded-[2rem] p-8 md:p-12 overflow-x-auto">
          <h2 className="text-2xl font-display font-bold text-text-primary mb-8">Activity Comparison</h2>
          <table className="w-full min-w-[600px] text-left border-collapse">
            <thead>
              <tr className="border-b border-amber-900/10 text-[10px] uppercase tracking-widest text-text-muted">
                <th className="pb-4 font-medium">Grade</th>
                <th className="pb-4 font-medium">Best For</th>
                <th className="pb-4 font-medium">Bio-Active</th>
                <th className="pb-4 font-medium">Taste Profile</th>
                <th className="pb-4 font-medium text-right">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-900/5">
              {dynamicProducts.map((p) => (
                <tr key={p.id} className="group hover:bg-amber-900/5 transition-colors">
                  <td className="py-6 font-display font-bold text-amber-700">MGO {p.mgo}</td>
                  <td className="py-6 text-sm text-text-secondary">{p.bestFor}</td>
                  <td className="py-6 text-sm text-text-secondary">{p.activity}</td>
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
