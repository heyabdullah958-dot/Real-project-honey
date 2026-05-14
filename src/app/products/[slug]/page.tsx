import { notFound } from "next/navigation";
import Image from "next/image";
import { Star, ShieldCheck, Beaker, Leaf, ArrowRight } from "lucide-react";
import { products } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ProductBuyActions } from "@/components/products/product-buy-actions";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} | Amazing Natures Manuka Honey`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Amazing Natures`,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Schema.org Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.image,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": "Amazing Natures"
    },
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "AUD",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <div className="py-12 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Image Gallery */}
          <div className="flex flex-col gap-6">
            <div className="relative aspect-square glass-panel rounded-[2.5rem] overflow-hidden group">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 mix-blend-multiply"
                priority
              />
              <div className="absolute top-6 left-6">
                 <span className="amber-gradient text-void px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl">
                   MGO {product.mgo}
                 </span>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square glass-panel rounded-2xl overflow-hidden opacity-50 hover:opacity-100 transition-opacity cursor-pointer relative">
                   <Image src={product.image} alt={`${product.name} view ${i + 1}`} fill className="object-cover mix-blend-multiply" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-2">
                 {[...Array(5)].map((_, i) => (
                   <Star key={i} className={cn("w-4 h-4", i < product.rating ? "fill-amber-500 text-amber-500" : "text-text-muted")} />
                 ))}                 <span className="text-xs text-text-muted uppercase tracking-widest ml-2">Verified Activity Level</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-amber-500 mt-2">${product.price}.00 AUD</p>
            </div>

            <p className="text-lg text-text-secondary leading-relaxed">
              {product.description}
            </p>

            <div className="flex flex-col gap-4">
               <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-amber-900/10">
                  <div className="w-10 h-10 amber-gradient rounded-xl flex items-center justify-center text-void">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text-primary uppercase tracking-wider">Activity Grade</h4>
                    <p className="text-xs text-text-muted">{product.activity} Bio-Active Profile</p>
                  </div>
               </div>
            </div>

            <ProductBuyActions product={product} />

            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-amber-900/10">
               <div className="flex flex-col items-center gap-2 text-center">
                  <Beaker className="w-5 h-5 text-amber-500" />
                  <span className="text-[10px] uppercase tracking-tighter text-text-muted">Scientifically Verified</span>
               </div>
               <div className="flex flex-col items-center gap-2 text-center">
                  <Leaf className="w-5 h-5 text-amber-500" />
                  <span className="text-[10px] uppercase tracking-tighter text-text-muted">Cold Extracted</span>
               </div>
               <div className="flex flex-col items-center gap-2 text-center">
                  <ArrowRight className="w-5 h-5 text-amber-500" />
                  <span className="text-[10px] uppercase tracking-tighter text-text-muted">Pure Australian</span>
               </div>
            </div>
          </div>
        </div>

        {/* Detailed Info Sections */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-16">
           <div className="flex flex-col gap-6">
              <h2 className="text-3xl font-display font-bold text-text-primary">Key Benefits</h2>
              <ul className="grid grid-cols-1 gap-4">
                {product.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-4 text-text-secondary">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    {benefit}
                  </li>
                ))}
              </ul>
           </div>
           <div className="glass-panel p-8 rounded-3xl">
              <h3 className="text-xl font-display font-bold text-text-primary mb-4">Recommended Use</h3>
              <p className="text-text-secondary leading-relaxed text-sm">
                Best used for {product.bestFor.toLowerCase()}. We recommend taking one teaspoon daily for optimal results. Can be added to warm tea, spread on toast, or taken directly.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
