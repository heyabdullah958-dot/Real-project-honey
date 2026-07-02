import { Metadata } from "next";

export const revalidate = 30; // Products refresh every 30s; admin changes trigger instant revalidation

export const metadata: Metadata = {
  title: "Shop All Manuka Honey | Amazing Natures Australia",
  description: "Browse our premium range of Australian Manuka honey. From daily wellness MGO 30 to premium reserve grade MGO 800+, all quality assured and ethically harvested.",
  openGraph: {
    title: "Shop All Manuka Honey | Amazing Natures Australia",
    description: "Premium Australian Manuka honey, ethically harvested and quality assured.",
    images: [{ url: "/assets/products/mgo-30.webp" }],
  },
};

import { getProducts } from "@/lib/products";
import { ProductCard } from "@/components/products/product-card";
import { MiniPackageCarousel } from "@/components/products/mini-package-carousel";

export default async function ProductsPage() {
  const allProducts = await getProducts();

  // Separate base products from bundle variants
  const baseProducts = allProducts.filter((p) => !p.parentSlug);
  const bundleProducts = allProducts.filter((p) => !!p.parentSlug);

  return (
    <div className="pt-[150px] pb-32 px-6 md:pt-40 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
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

        {/* Product + Bundle Carousel Rows */}
        <div className="flex flex-col gap-16">
          {baseProducts.map((product) => {
            const productBundles = bundleProducts.filter(
              (b) => b.parentSlug === product.slug
            );

            return (
              <div
                key={product.id}
                className={`grid gap-8 items-stretch ${
                  productBundles.length > 0
                    ? "grid-cols-1 lg:grid-cols-2"
                    : "grid-cols-1 max-w-lg"
                }`}
              >
                {/* Product Card */}
                <ProductCard product={product} />

                {/* Bundle Carousel — only if bundles exist for this MGO */}
                {productBundles.length > 0 && (
                  <MiniPackageCarousel
                    bundles={productBundles}
                    parentProduct={product}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
