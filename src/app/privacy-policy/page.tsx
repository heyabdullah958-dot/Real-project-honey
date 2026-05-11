"use client";

import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
  return (
    <div className="py-32 px-6 max-w-4xl mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 md:p-16 rounded-[3rem] border-amber-500/10"
      >
        <h1 className="text-4xl md:text-6xl font-display font-bold text-text-primary mb-8 text-center">
          Privacy <span className="text-amber-500">Policy</span>
        </h1>
        
        <div className="prose prose-invert prose-amber max-w-none space-y-8 text-text-muted">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">1. Introduction</h2>
            <p>
              Welcome to Amazing Natures. We value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website and purchase our premium Manuka honey products.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">2. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, such as your name, email address, shipping address, and payment information when you place an order. We also collect automated data about your device and how you interact with our site to improve your experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">3. How We Use Your Information</h2>
            <p>
              Your data is used to process orders, communicate with you about your purchase, provide customer support, and, with your consent, send you updates about our products and wellness insights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">4. Data Security</h2>
            <p>
              We implement industry-standard security measures, including SSL encryption, to ensure that your personal and payment data is handled securely. We never store credit card details on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">5. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information at any time. If you wish to exercise these rights, please contact us at zeeshan.ahmed2691@gmail.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">6. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us via our Contact page or email us directly.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
