"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/use-cart-store";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard = ({ product, className }: ProductCardProps) => {
  const { addItem, setIsOpen } = useCartStore();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setIsOpen(true);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "group relative glass-panel rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:border-amber-700/40 flex flex-col h-full",
        className
      )}
    >
      {/* Dynamic Glow Layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle at ${50 + (x.get() * 100)}% ${50 + (y.get() * 100)}%, ${product.color}22 0%, transparent 70%)`,
        }}
      />

      {/* Product Image Section */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-square overflow-hidden group/image bg-white shrink-0">
        {/* BASE LAYER: Product Image */}
        <div className="absolute inset-0 p-4 flex items-center justify-center">
          <motion.div
            animate={{ 
              scale: isHovered 
                ? (product.id === "mgo-30" ? 1.2 : 1.1) 
                : (product.id === "mgo-30" ? 1.15 : 1.05),
              y: isHovered ? -5 : 0
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </div>

        {/* Badge */}
        <div className="absolute top-6 left-6 z-20">
          <span 
            className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg"
            style={{ backgroundColor: product.color, color: "#050505" }}
          >
            MGO {product.mgo}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-8 flex flex-col gap-5 relative z-10 flex-grow">
        <div className="flex-grow">
          <span className="text-[10px] text-amber-700/70 uppercase tracking-[0.2em] font-bold block mb-2">
            {product.tagline}
          </span>
          <h3 className="text-2xl font-display font-bold text-text-primary leading-tight">
            <Link href={`/products/${product.slug}`} className="hover:text-amber-700 transition-colors">
              {product.name}
            </Link>
          </h3>
          <div className="flex items-center gap-1.5 mt-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-3 h-3 transition-colors duration-300",
                  i < product.rating ? "fill-amber-700 text-amber-700" : "text-text-muted/30"
                )}
              />
            ))}
            <span className="text-[10px] text-text-muted ml-3 uppercase tracking-widest font-medium">
              {product.size} JAR
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-text-primary tracking-tight">
              ${product.price}
            </span>
            <span className="text-[10px] text-text-muted uppercase tracking-wider font-medium">
              AUD / Free Shipping
            </span>
          </div>
          <Button 
            className="rounded-2xl h-14 w-14 group/btn transition-all duration-300"
            style={{ backgroundColor: product.color, color: "#050505" }}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-6 h-6 transition-transform duration-300 group-hover/btn:scale-110" />
          </Button>
        </div>

        <Link 
          href={`/products/${product.slug}`}
          className="text-[10px] text-center text-text-muted hover:text-amber-700 transition-colors uppercase tracking-[0.3em] font-bold mt-2"
        >
          Explore the science
        </Link>
      </div>
    </motion.div>
  );
};

