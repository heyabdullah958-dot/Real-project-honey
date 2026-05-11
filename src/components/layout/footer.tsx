import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, ArrowRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-void border-t border-amber-900/10 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand */}
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="flex items-center gap-3 mb-6">
            <Image 
              src="/assets/brand/Amazing_Natures_logo_design_202605111144.jpeg" 
              alt="Amazing Natures Logo" 
              width={32} 
              height={32} 
              className="w-8 h-8 object-contain rounded-md"
            />
            <span className="text-xl font-display font-bold tracking-tight text-text-primary">
              AMAZING <span className="text-amber-500">NATURES</span>
            </span>
          </Link>
          <p className="text-text-muted text-sm leading-relaxed mb-6">
            Nature&apos;s most potent healing honey, cold-extracted from the pristine wilderness of Australia.
          </p>
          <div className="flex gap-4">
            <div className="text-text-secondary hover:text-amber-500 transition-colors">
              <Mail className="w-5 h-5" />
            </div>
            <div className="text-text-secondary hover:text-amber-500 transition-colors">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="text-text-secondary hover:text-amber-500 transition-colors">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-amber-500 font-display font-bold mb-6 uppercase tracking-widest text-xs">Shop</h4>
          <ul className="space-y-4">
            <li><Link href="/products" className="text-text-secondary hover:text-text-primary transition-colors text-sm">All Honey</Link></li>
            <li><Link href="/products/mgo-800" className="text-text-secondary hover:text-text-primary transition-colors text-sm">Premium MGO 800+</Link></li>
            <li><Link href="/wellness-quiz" className="text-text-secondary hover:text-text-primary transition-colors text-sm">Wellness Quiz</Link></li>
            <li><Link href="/subscriptions" className="text-text-secondary hover:text-text-primary transition-colors text-sm">Subscribe & Save</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-amber-500 font-display font-bold mb-6 uppercase tracking-widest text-xs">Information</h4>
          <ul className="space-y-4">
            <li><Link href="/about" className="text-text-secondary hover:text-text-primary transition-colors text-sm">Our Story</Link></li>
            <li><Link href="/science" className="text-text-secondary hover:text-text-primary transition-colors text-sm">Science of MGO</Link></li>
            <li><Link href="/blog" className="text-text-secondary hover:text-text-primary transition-colors text-sm">Wellness Blog</Link></li>
            <li><Link href="/contact" className="text-text-secondary hover:text-text-primary transition-colors text-sm">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-amber-500 font-display font-bold mb-6 uppercase tracking-widest text-xs">Newsletter</h4>
          <p className="text-text-muted text-sm mb-4">Join our wellness community for 10% off your first order.</p>
          <form className="flex gap-2">
            <input 
              type="email" 
              placeholder="Email address" 
              className="bg-earth border border-amber-900/20 rounded-full px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-amber-500 w-full"
            />
            <button className="w-10 h-10 amber-gradient rounded-full flex items-center justify-center text-void">
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-amber-900/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-text-muted text-[10px] uppercase tracking-tighter">
          &copy; {currentYear} AMAZING NATURES. PROUDLY AUSTRALIAN MADE.
        </p>
        <div className="flex gap-6">
          <Link href="/policies/privacy" className="text-text-muted hover:text-text-primary text-[10px] uppercase tracking-tighter transition-colors">Privacy Policy</Link>
          <Link href="/policies/shipping" className="text-text-muted hover:text-text-primary text-[10px] uppercase tracking-tighter transition-colors">Shipping & Returns</Link>
          <Link href="/policies/terms" className="text-text-muted hover:text-text-primary text-[10px] uppercase tracking-tighter transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
