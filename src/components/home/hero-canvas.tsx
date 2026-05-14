"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 192;
const PRIORITY_FRAMES = 10;

const splitChars = (text: string) => {
  return text.split("").map((char, i) => (
    <span key={i} className="char inline-block">
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

export const HeroCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastFrameRef = useRef(0);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      const imgs: HTMLImageElement[] = [];
      for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();
        const frameNumber = i.toString().padStart(5, "0");
        img.src = `/honey-frames/${frameNumber}.jpg`;
        imgs.push(img);
      }

      try {
        const priorityPromises = imgs.slice(0, PRIORITY_FRAMES).map(img => {
          return new Promise((resolve) => {
            img.onload = () => {
              if (img.decode) img.decode().then(resolve).catch(resolve);
              else resolve(null);
            };
            if (img.complete) {
              if (img.decode) img.decode().then(resolve).catch(resolve);
              else resolve(null);
            }
          });
        });
        await Promise.all(priorityPromises);
      } catch (e) {
        console.error("Priority decode failed", e);
      }

      setImages(imgs);
      setIsLoaded(true);

      imgs.slice(PRIORITY_FRAMES).forEach(img => {
        if (img.decode) img.decode().catch(() => {});
      });
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (!isLoaded || images.length === 0 || !canvasRef.current || !containerRef.current) return;

    const context = canvasRef.current.getContext("2d", { alpha: false });
    if (!context) return;

    const canvas = canvasRef.current;
    const scrollObj = { frame: lastFrameRef.current };

    let resizeTimer: ReturnType<typeof setTimeout>;
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(Math.round(scrollObj.frame));
    };

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateCanvasSize, 150);
    };

    const renderFrame = (index: number) => {
      const idx = Math.min(FRAME_COUNT - 1, Math.max(0, index));
      lastFrameRef.current = idx;
      const img = images[idx];
      if (!img || !img.complete) return;
      
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width / 2) - (img.width / 2) * scale;
      const y = (canvas.height / 2) - (img.height / 2) * scale;
      
      context.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    window.addEventListener("resize", handleResize);
    updateCanvasSize();

    // ✅ Scrub model — scroll-connected, cinematic
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 0.1,             // ← Reduced from 1.2 because Lenis handles smoothing
        invalidateOnRefresh: true,
        fastScrollEnd: true,
        preventOverlaps: true,
      }
    });

    tl.to(scrollObj, { 
      frame: FRAME_COUNT - 1, 
      ease: "none", 
      duration: 1,
      onUpdate: () => {
        renderFrame(Math.round(scrollObj.frame));
      }
    }, 0);

    tl.fromTo(".act-1-block", { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, ease: "power2.out", duration: 0.15 }, 0)
    .fromTo(".act-1-chars .char", { y: 60, opacity: 0, filter: "blur(8px)" }, { y: 0, opacity: 1, filter: "blur(0px)", stagger: 0.02, ease: "power4.out", duration: 0.2 }, 0.05)
    .to(".act-1-block", { y: -80, opacity: 0, ease: "power2.in", duration: 0.1 }, 0.2);

    tl.fromTo(".act-2-block", { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "power3.out", duration: 0.15 }, 0.25)
    .fromTo(".act-2-eyebrow", { opacity: 0, x: -30 }, { opacity: 1, x: 0, ease: "expo.out", duration: 0.15 }, 0.28)
    .fromTo(".act-2-heading", { opacity: 0, x: -100 }, { opacity: 1, x: 0, ease: "expo.out", duration: 0.2 }, 0.3)
    .fromTo(".act-2-clip", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", ease: "power3.inOut", duration: 0.2 }, 0.35)
    .to(".act-2-block", { x: -60, opacity: 0, filter: "blur(4px)", ease: "power3.in", duration: 0.15 }, 0.5);

    tl.fromTo(".act-3-block", { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "power3.out", duration: 0.15 }, 0.55)
    .fromTo(".act-3-line-1", { x: 120, opacity: 0 }, { x: 0, opacity: 1, ease: "expo.out", duration: 0.2 }, 0.58)
    .fromTo(".act-3-line-2", { x: 120, opacity: 0 }, { x: 0, opacity: 1, ease: "expo.out", duration: 0.2 }, 0.62)
    .fromTo(".act-3-bullets li", { opacity: 0, x: 20 }, { opacity: 1, x: 0, stagger: 0.1, ease: "power2.out", duration: 0.2 }, 0.65)
    .to(".act-3-block", { scale: 0.9, opacity: 0, duration: 0.15 }, 0.8);

    tl.fromTo(".act-4-block", { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, ease: "power4.out", duration: 0.2 }, 0.85)
    .fromTo(".act-4-content", { y: 60, opacity: 0 }, { y: 0, opacity: 1, ease: "expo.out", duration: 0.2 }, 0.88);

    return () => {
      window.removeEventListener("resize", handleResize);
      tl.kill();
    };
  }, [isLoaded, images]);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#FBF5E9]">
      <canvas
        ref={canvasRef}
        className="block w-full h-full object-cover"
        style={{
          willChange: 'transform',
        }}
      />
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="act-1-block absolute inset-0 flex flex-col items-center justify-center opacity-0">
          <div className="text-center px-6">
            <span className="text-amber-500 font-bold uppercase tracking-[0.5em] text-[10px] mb-4 block">Pure Australian Gold</span>
            <h1 className="act-1-chars text-6xl md:text-9xl font-display font-semibold text-[#FBF5E9] leading-display">
              <span className="block">{splitChars("Amazing")}</span>
              <span className="text-amber-500">{splitChars("Natures")}</span>
            </h1>
          </div>
        </div>
        <div className="act-2-block absolute inset-0 flex items-center justify-start px-12 md:px-24 opacity-0">
          <div className="max-w-xl">
            <span className="act-2-eyebrow text-amber-500 font-bold text-[10px] uppercase tracking-eyebrow mb-4 block">Engineered by Nature</span>
            <h2 className="act-2-heading text-5xl md:text-8xl font-display font-semibold text-[#FBF5E9] leading-display">Bio-Active <br /><span className="act-2-clip text-amber-500 inline-block">Activity.</span></h2>
          </div>
        </div>
        <div className="act-3-block absolute inset-0 flex items-center justify-end px-12 md:px-24 opacity-0">
          <div className="text-right max-w-xl">
            <span className="text-amber-500 font-bold text-[10px] uppercase tracking-eyebrow mb-4 block">Molecular Excellence</span>
            <h2 className="text-5xl md:text-8xl font-display font-semibold text-[#FBF5E9] leading-display mb-8">
              <span className="act-3-line-1 block">The Science</span>
              <span className="act-3-line-2 block text-amber-500">of MGO.</span>
            </h2>
            <ul className="act-3-bullets space-y-4 text-text-secondary/80 font-medium tracking-wide">
              <li>• Lab-Tested Bioactivity</li>
              <li>• Pure Monofloral Source</li>
              <li>• Cold-Extraction Process</li>
            </ul>
          </div>
        </div>
        <div className="act-4-block absolute inset-0 flex flex-col items-center justify-center opacity-0">
          <div className="act-4-content text-center px-6">
            <h2 className="text-5xl md:text-8xl font-display font-bold text-[#FBF5E9] mb-12">Secure Your <br /><span className="text-amber-500">Liquid Gold.</span></h2>
            <Link href="/products" className="inline-block bg-amber-500 text-void font-bold uppercase tracking-[0.2em] px-12 py-6 rounded-2xl hover:bg-amber-400 transition-all shadow-xl hover:scale-105 active:scale-95 pointer-events-auto">Shop Collection</Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4">
        <div className="w-[1px] h-12 bg-gradient-to-b from-text-primary/20 to-transparent animate-pulse" />
        <span className="text-[10px] text-text-muted/50 uppercase tracking-[0.3em] font-bold">Scroll to explore</span>
      </div>
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#FBF5E9] flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
            <span className="text-xs text-amber-500 font-bold uppercase tracking-widest">Charging Activity...</span>
          </div>
        </div>
      )}
    </div>
  );
};
