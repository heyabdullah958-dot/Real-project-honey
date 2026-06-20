import { Button } from "@/components/ui/button";
import { Mail, Sparkles } from "lucide-react";

const NewsletterSection = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-amber-700/5 z-0" />
      
      <div className="max-w-5xl mx-auto relative z-10 glass-panel p-12 md:p-24 rounded-[4rem] border-amber-700/10 flex flex-col items-center text-center gap-10">
         <div className="w-20 h-20 amber-gradient rounded-3xl rotate-12 flex items-center justify-center text-white shadow-[0_20px_50px_rgba(212,147,10,0.3)]">
            <Mail className="w-10 h-10 -rotate-12" />
         </div>

         <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center gap-2 text-amber-700 text-xs font-bold uppercase tracking-[0.4em]">
              <Sparkles className="w-4 h-4" />
              <span>Join the Community</span>
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-text-primary">
               Get <span className="text-amber-700">10% Off</span> Your <br />First Order
            </h2>
            <p className="text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
               Subscribe to receive wellness tips, exclusive early access to new batches, and a special welcome gift.
            </p>
         </div>

         <form className="w-full max-w-lg flex flex-col md:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="flex-grow h-14 rounded-full bg-white border border-amber-900/20 px-8 text-text-primary focus:outline-none focus:border-amber-700 transition-all text-sm"
              required
            />
            <Button size="lg" className="h-14 px-10">Subscribe Now</Button>
         </form>

         <p className="text-[10px] text-text-muted uppercase tracking-widest">
            By subscribing, you agree to our privacy policy. No spam, just gold.
         </p>
      </div>
    </section>
  );
};

export default NewsletterSection;
