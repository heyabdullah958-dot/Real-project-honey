"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/use-cart-store";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, getTotalPrice } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-void/60 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-void border-l border-amber-900/20 z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-amber-900/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-amber-500" />
                <h2 className="text-xl font-display font-bold text-text-primary">Your Cart</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/5 rounded-full transition-colors text-text-muted hover:text-text-primary"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-6 opacity-40">
                   <div className="w-20 h-20 amber-gradient rounded-full flex items-center justify-center text-void">
                     <ShoppingBag className="w-10 h-10" />
                   </div>
                   <p className="text-text-secondary uppercase tracking-widest text-xs font-bold">Your cart is empty</p>
                   <Button onClick={() => setIsOpen(false)} variant="outline">Start Shopping</Button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden glass-panel border-amber-900/10">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-grow flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-sm font-bold text-text-primary group-hover:text-amber-500 transition-colors uppercase tracking-tight">
                            {item.name}
                          </h4>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-text-muted hover:text-error transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="text-[10px] text-text-muted uppercase tracking-widest">
                          MGO {item.mgo} • {item.size}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-earth/50 rounded-lg p-1 border border-amber-900/10">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center text-text-muted hover:text-amber-500 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button 
                             onClick={() => updateQuantity(item.id, item.quantity + 1)}
                             className="w-6 h-6 flex items-center justify-center text-text-muted hover:text-amber-500 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-amber-500">${item.price * item.quantity}.00</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-amber-900/10 bg-night/50 flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <span className="text-text-muted uppercase tracking-[0.2em] text-xs font-bold">Subtotal</span>
                  <span className="text-2xl font-display font-bold text-amber-500">${getTotalPrice()}.00</span>
                </div>
                <div className="flex flex-col gap-3">
                  <Link href="/checkout" onClick={() => setIsOpen(false)}>
                    <Button className="w-full h-14 text-base">Proceed to Checkout</Button>
                  </Link>
                  <p className="text-[10px] text-center text-text-muted uppercase tracking-widest">
                    Taxes and shipping calculated at checkout
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
