import { ProductCard } from "@/components/products/product-card";
import { products } from "@/lib/data";

const ProductGrid = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <span className="text-amber-500 font-medium tracking-[0.3em] uppercase text-xs">
            The Collection
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary">
            Find Your Perfect <span className="text-amber-500">MGO</span> Match
          </h2>
          <p className="text-text-secondary max-w-2xl leading-relaxed">
            From daily sweetness to clinical-grade potency, explore our range of laboratory-tested Australian Manuka honey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
