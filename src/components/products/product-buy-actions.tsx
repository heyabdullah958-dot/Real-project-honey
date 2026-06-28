"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/use-cart-store";
import { Product } from "@/types";

interface ProductBuyActionsProps {
  product: Product;
}

export const ProductBuyActions = ({ product }: ProductBuyActionsProps) => {
  const { addItem, setIsOpen, items } = useCartStore();

  const cartItem = items.find((item) => item.id === product.id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;

  const isOutOfStock = product.stock === 0;
  const isStockLimitReached = product.stock !== undefined && product.stock > 0 && cartQuantity >= product.stock;

  const handleAddToCart = () => {
    if (isOutOfStock || isStockLimitReached) return;
    addItem(product);
    setIsOpen(true);
  };

  const getButtonText = () => {
    if (isOutOfStock) return "Out of Stock";
    if (isStockLimitReached) return "Limit Reached";
    return "Add to Cart";
  };

  return (
    <div className="flex flex-col gap-4 pt-4">
      <Button 
        size="lg" 
        className="w-full text-base h-14"
        onClick={handleAddToCart}
        disabled={isOutOfStock || isStockLimitReached}
      >
        {getButtonText()}
      </Button>

      {/* Stock warning messages */}
      {!isOutOfStock && product.stock !== undefined && product.stock > 0 && product.stock <= 10 && (
        <p className="text-xs font-semibold text-center text-amber-700 animate-pulse tracking-wide">
          Only {product.stock - cartQuantity} pieces available! {cartQuantity > 0 && `(${cartQuantity} in cart)`}
        </p>
      )}

      {isOutOfStock && (
        <p className="text-xs font-semibold text-center text-red-700 tracking-wide uppercase">
          Currently out of stock
        </p>
      )}

      <p className="text-[10px] text-center text-text-muted uppercase tracking-widest">
        Free standard shipping on orders over $100
      </p>
    </div>
  );
};
