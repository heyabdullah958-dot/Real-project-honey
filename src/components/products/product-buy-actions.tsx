"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/use-cart-store";
import { Product } from "@/types";

interface ProductBuyActionsProps {
  product: Product;
}

export const ProductBuyActions = ({ product }: ProductBuyActionsProps) => {
  const { addItem, setIsOpen } = useCartStore();

  const handleAddToCart = () => {
    addItem(product);
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col gap-4 pt-4">
      <Button 
        size="lg" 
        className="w-full text-base h-14"
        onClick={handleAddToCart}
      >
        Add to Cart
      </Button>
      <p className="text-[10px] text-center text-text-muted uppercase tracking-widest">
        Free standard shipping on orders over $100
      </p>
    </div>
  );
};
