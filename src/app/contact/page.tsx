"use client";

import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSuccess(true);
        e.currentTarget.reset();
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      alert("An error occurred. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-6 mb-20">
           <span className="text-amber-500 font-medium tracking-[0.3em] uppercase text-xs">Connect</span>
           <h1 className="text-5xl md:text-7xl font-display font-bold text-text-primary leading-[1.1]">
             Get in <span className="text-amber-500">Touch</span>
           </h1>
           <p className="text-xl text-text-secondary leading-relaxed max-w-2xl">
             Have questions about our Manuka grades or your order? Our team of wellness experts is here to help.
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
           {/* Contact Form */}
           <div className="glass-panel p-8 md:p-12 rounded-[3rem] border-amber-500/10">
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-6 py-10">
                  <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500">
                    <Send className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-text-primary">Message Sent!</h3>
                  <p className="text-text-secondary">Thank you for reaching out. Our team will get back to you shortly.</p>
                  <Button variant="outline" onClick={() => setIsSuccess(false)}>Send Another Message</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] uppercase tracking-widest text-text-muted font-bold ml-4">Full Name</label>
                        <input name="name" required type="text" className="h-14 rounded-2xl bg-void border border-amber-900/20 px-6 text-text-primary focus:outline-none focus:border-amber-500 transition-all" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] uppercase tracking-widest text-text-muted font-bold ml-4">Email Address</label>
                        <input name="email" required type="email" className="h-14 rounded-2xl bg-void border border-amber-900/20 px-6 text-text-primary focus:outline-none focus:border-amber-500 transition-all" />
                      </div>
                  </div>
                  <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-widest text-text-muted font-bold ml-4">Subject</label>
                      <input name="subject" required type="text" className="h-14 rounded-2xl bg-void border border-amber-900/20 px-6 text-text-primary focus:outline-none focus:border-amber-500 transition-all" />
                  </div>
                  <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-widest text-text-muted font-bold ml-4">Message</label>
                      <textarea name="message" required className="h-40 rounded-2xl bg-void border border-amber-900/20 px-6 py-4 text-text-primary focus:outline-none focus:border-amber-500 transition-all resize-none"></textarea>
                  </div>
                  <Button disabled={isLoading} size="lg" className="h-14 mt-4 flex gap-2">
                      <Send className="w-4 h-4" /> {isLoading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
           </div>

           {/* Info */}
           <div className="flex flex-col gap-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                 <div className="flex flex-col gap-4">
                    <div className="w-12 h-12 amber-gradient rounded-2xl flex items-center justify-center text-void">
                       <Mail className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-text-primary uppercase tracking-widest text-sm">Email Us</h4>
                    <p className="text-text-secondary text-sm">zeeshan.ahmed2691@gmail.com</p>
                 </div>
                 <div className="flex flex-col gap-4">
                    <div className="w-12 h-12 amber-gradient rounded-2xl flex items-center justify-center text-void">
                       <Phone className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-text-primary uppercase tracking-widest text-sm">Call Us</h4>
                    <p className="text-text-secondary text-sm">0405 686 486</p>
                 </div>
              </div>

              <div className="glass-panel p-8 rounded-3xl border-amber-500/10">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500">
                       <MapPin className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-text-primary uppercase tracking-widest text-sm">Our Hives</h4>
                 </div>
                 <p className="text-text-secondary text-sm leading-relaxed">
                    Amazing Natures HQ<br />
                    123 Wilderness Way<br />
                    New South Wales, 2000<br />
                    Australia
                 </p>
              </div>

              <div className="bg-amber-500/5 p-8 rounded-3xl border border-amber-500/10">
                 <h4 className="font-bold text-text-primary uppercase tracking-widest text-xs mb-4">Support Hours</h4>
                 <div className="flex flex-col gap-2 text-sm text-text-secondary">
                    <div className="flex justify-between">
                       <span>Mon - Fri</span>
                       <span>9:00 AM - 5:00 PM AEST</span>
                    </div>
                    <div className="flex justify-between">
                       <span>Sat - Sun</span>
                       <span>Closed (Bees at work)</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
