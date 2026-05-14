import { Plus } from "lucide-react";

export default function FAQPage() {
  const faqs = [
    {
      q: "What does MGO stand for?",
      a: "MGO stands for Methylglyoxal, the naturally occurring compound that makes Manuka honey unique. The MGO rating indicates the level of bioactive activity in the honey."
    },
    {
      q: "Is your honey raw and unpasteurized?",
      a: "Yes, all Amazing Natures honey is 100% raw and cold-extracted. We never heat our honey above hive temperatures, preserving all natural enzymes and health benefits."
    },
    {
      q: "How should I store my Manuka honey?",
      a: "Manuka honey is best stored in a cool, dry place away from direct sunlight. There is no need to refrigerate it, even after opening."
    },
    {
      q: "Do you ship internationally?",
      a: "Currently, we focus on delivering the highest quality Manuka within Australia. International shipping options are being reviewed for the near future."
    },
    {
      q: "How do I know which MGO level is right for me?",
      a: "We recommend taking our Wellness Quiz! Generally, MGO 30-100 is for daily use, MGO 263-400 is for immunity and gut health, and MGO 800+ is for targeted premium bioactive grade support."
    }
  ];

  return (
    <div className="py-24 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-6 mb-20 text-center">
           <span className="text-amber-700 font-medium tracking-[0.3em] uppercase text-xs">Knowledge Base</span>
           <h1 className="text-5xl md:text-7xl font-display font-bold text-text-primary">
             Common <span className="text-amber-700">Questions</span>
           </h1>
           <p className="text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto">
             Everything you need to know about our premium Australian Manuka honey.
           </p>
        </div>

        <div className="flex flex-col gap-6">
           {faqs.map((faq, i) => (
             <div key={i} className="glass-panel p-8 rounded-3xl border-amber-700/10 hover:border-amber-700/30 transition-all cursor-default group">
                <div className="flex items-center justify-between mb-4">
                   <h3 className="text-xl font-display font-bold text-text-primary group-hover:text-amber-700 transition-colors">{faq.q}</h3>
                   <Plus className="w-5 h-5 text-amber-700" />
                </div>
                <p className="text-text-secondary leading-relaxed">
                   {faq.a}
                </p>
             </div>
           ))}
        </div>

        <div className="mt-20 text-center bg-earth/30 p-12 rounded-[3rem] border border-amber-900/10">
           <h3 className="text-2xl font-display font-bold text-text-primary mb-4">Still have questions?</h3>
           <p className="text-text-secondary mb-8">Can&apos;t find what you&apos;re looking for? Reach out to our support team.</p>
           <a href="/contact" className="inline-flex h-12 items-center justify-center rounded-full amber-gradient px-10 text-xs font-bold text-void uppercase tracking-widest hover:scale-105 transition-all">
             Contact Support
           </a>
        </div>
      </div>
    </div>
  );
}
