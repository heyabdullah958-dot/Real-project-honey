import { notFound } from "next/navigation";
import Image from "next/image";
import { Star, ShieldCheck, Beaker, Leaf, ArrowRight, MapPin } from "lucide-react";
import { getProducts, getProductBySlug } from "@/lib/products";
import { cn } from "@/lib/utils";
import { ProductBuyActions } from "@/components/products/product-buy-actions";
import { ProductDetailCarousel } from "@/components/products/product-detail-carousel";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
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
  const allProducts = await getProducts();
  return allProducts.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

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
    <div className="pt-[140px] pb-12 px-6 md:pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr,1.2fr] gap-16 items-center">
          {/* Left: Product Image */}
          <div className="w-full flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-square bg-white rounded-[3rem] border border-amber-900/5 p-6 sm:p-10 md:p-12 flex items-center justify-center shadow-2xl shadow-amber-900/5 group">
              <div className="relative w-full h-full">
                {product.image?.startsWith('data:') ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 drop-shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
                  />
                ) : (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain transition-transform duration-700 group-hover:scale-105 drop-shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
                    priority
                  />
                )}
              </div>
              <div className="absolute top-8 left-8">
                 <span className="amber-gradient text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                   MGO {product.mgo}
                 </span>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-2">
                 {[...Array(5)].map((_, i) => (
                   <Star key={i} className={cn("w-4 h-4", i < product.rating ? "fill-amber-700 text-amber-700" : "text-text-muted")} />
                 ))}                 <span className="text-xs text-text-muted uppercase tracking-widest ml-2">Verified Activity Level</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-amber-700 mt-2">${product.price}.00 AUD</p>
            </div>

            <ProductDetailCarousel productSlug={product.slug} />

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
                <Beaker className="w-5 h-5 text-amber-700" />
                <span className="text-[10px] uppercase tracking-tighter text-text-muted">Quality Assured</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <Leaf className="w-5 h-5 text-amber-700" />
                <span className="text-[10px] uppercase tracking-tighter text-text-muted">Ethically Harvested</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <MapPin className="w-5 h-5 text-amber-700" />
                <span className="text-[10px] uppercase tracking-tighter text-text-muted">Australian Origin</span>
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
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-700" />
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
