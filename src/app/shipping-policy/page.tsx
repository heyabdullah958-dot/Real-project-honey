"use client";

import { motion } from "framer-motion";

export default function ShippingPolicyPage() {
  return (
    <div className="pt-[140px] pb-32 px-6 max-w-4xl mx-auto min-h-screen md:pt-36">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 md:p-16 rounded-[3rem] border-amber-700/10"
      >
        <h1 className="text-4xl md:text-6xl font-display font-bold text-text-primary mb-8 text-center">
          Shipping & <span className="text-amber-700">Returns</span>
        </h1>
        
        <div className="prose prose-invert prose-amber max-w-none space-y-8 text-text-muted">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">1. Shipping Policy</h2>
            <p>
              At Amazing Natures, we ensure our premium honey is delivered with care. We offer domestic shipping across Australia and international shipping to selected regions.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Domestic (Australia): 3-5 business days.</li>
              <li>International: 7-14 business days (depending on customs).</li>
              <li>Free domestic shipping on orders over $100.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">2. Tracking Your Order</h2>
            <p>
              Once your order is shipped, you will receive a tracking number via email to monitor your golden delivery in real-time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">3. Returns & Refunds</h2>
            <p>
              Due to the nature of our food products, we can only accept returns if the item is damaged during transit or if the seal is broken upon delivery.
            </p>
            <p>
              To initiate a return, please contact us within 48 hours of delivery with photographic evidence of the damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">4. Non-Returnable Items</h2>
            <p>
              Opened jars or products used by the customer cannot be returned due to hygiene and safety regulations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">5. Contact</h2>
            <p>
              For any shipping or return-related queries, reach out to us at zeeshan.ahmed2691@gmail.com.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
