"use client";

import { motion } from "framer-motion";

export default function TermsOfServicePage() {
  return (
    <div className="pt-[140px] pb-32 px-6 max-w-4xl mx-auto min-h-screen md:pt-36">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 md:p-16 rounded-[3rem] border-amber-700/10"
      >
        <h1 className="text-4xl md:text-6xl font-display font-bold text-text-primary mb-8 text-center">
          Terms of <span className="text-amber-700">Service</span>
        </h1>
        
        <div className="prose prose-invert prose-amber max-w-none space-y-8 text-text-muted">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using Amazing Natures, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">2. Product Information</h2>
            <p>
              We strive to provide accurate descriptions and pricing for our premium Manuka honey products. However, we do not warrant that product descriptions or other content are error-free. Prices are subject to change without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">3. Ordering and Payment</h2>
            <p>
              Orders placed through our website are subject to acceptance. We reserve the right to refuse or cancel any order for reasons including product availability, errors in pricing, or suspicion of fraudulent activity.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">4. Shipping and Returns</h2>
            <p>
              Shipping times and costs are calculated at checkout. Our return policy for our natural products is governed by hygiene and safety standards. Please contact us for specific return inquiries.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">5. Limitation of Liability</h2>
            <p>
              Amazing Natures shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or products.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">6. Governing Law</h2>
            <p>
              These terms are governed by the laws of Australia. Any disputes shall be resolved in the courts of Australia.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
