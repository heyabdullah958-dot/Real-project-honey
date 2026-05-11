"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 40;
const PRIORITY_FRAMES = 5;

// Helper to split text into chars for staggering
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
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Phase 1: Performance Optimized Loading
  useEffect(() => {
    const loadImages = async () => {
      const imgs: HTMLImageElement[] = [];
      
      // 1. Create all image objects first
      for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();
        const frameNumber = i.toString().padStart(3, "0");
        img.src = `/honey-frames/ezgif-frame-${frameNumber}.jpg`;
        imgs.push(img);
      }

      // 2. Prioritize first 5 frames for instant paint
      try {
        const priorityPromises = imgs.slice(0, PRIORITY_FRAMES).map(img => {
          return new Promise((resolve) => {
            img.onload = () => {
              if (img.decode) {
                img.decode().then(resolve).catch(resolve);
              } else {
                resolve(null);
              }
            };
            if (img.complete) {
              if (img.decode) {
                img.decode().then(resolve).catch(resolve);
              } else {
                resolve(null);
              }
            }
          });
        });
        await Promise.all(priorityPromises);
      } catch (e) {
        console.error("Priority decode failed", e);
      }

      setImages(imgs);
      setIsLoaded(true);

      // 3. Decode remainder in background
      imgs.slice(PRIORITY_FRAMES).forEach(img => {
        if (img.decode) {
          img.decode().catch(() => {});
        }
      });
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (!isLoaded || images.length === 0 || !canvasRef.current || !containerRef.current) return;

    const context = canvasRef.current.getContext("2d", { alpha: false });
    if (!context) return;

    const canvas = canvasRef.current;
    
    // GSAP Scroll Animation State - Initialized early to avoid ReferenceError
    const scrollObj = { frame: 0 };

    // Resize Debounce
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
      const img = images[idx];
      if (!img || !img.complete) return;
      
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width / 2) - (img.width / 2) * scale;
      const y = (canvas.height / 2) - (img.height / 2) * scale;
      
      context.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    window.addEventListener("resize", handleResize);
    updateCanvasSize();

    // GSAP Scroll Animation & Cinematic Sequence
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=250%",
        pin: true,
        scrub: 1.2, // Smoother lag on fast scroll
        invalidateOnRefresh: true,
        onUpdate: () => {
          renderFrame(Math.round(scrollObj.frame));
        }
      }
    });

    // 1. Canvas frame animation
    tl.to(scrollObj, { 
      frame: FRAME_COUNT - 1, 
      ease: "none",
      duration: 1 
    }, 0);

    // 2. ACT I — Brand reveal
    tl.fromTo(".act-1-chars .char", 
      { y: 60, opacity: 0, filter: "blur(8px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", stagger: 0.02, ease: "power4.out", duration: 0.2 },
      0.05
    )
    .to(".act-1-block", { scale: 1.03, ease: "none", duration: 0.2 }, 0.1)
    .fromTo(".act-1-shimmer",
      { backgroundPositionX: "200%" },
      { backgroundPositionX: "-200%", ease: "none", duration: 0.3 },
      0.05
    )
    .to(".act-1-block", { y: -80, opacity: 0, ease: "power2.in", duration: 0.1 }, 0.28);

    // 3. ACT II — Feature reveal
    tl.fromTo(".act-2-eyebrow",
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, ease: "expo.out", duration: 0.15 },
      0.35
    )
    .fromTo(".act-2-heading",
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, ease: "expo.out", duration: 0.2 },
      0.38
    )
    .fromTo(".act-2-clip",
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", ease: "power3.inOut", duration: 0.2 },
      0.45
    )
    .to(".act-2-block", { x: -60, opacity: 0, filter: "blur(4px)", ease: "power3.in", duration: 0.15 }, 0.65);

    // 4. ACT III — Deep dive
    tl.fromTo(".act-3-line-1",
      { x: 120, opacity: 0 },
      { x: 0, opacity: 1, ease: "expo.out", duration: 0.2 },
      0.72
    )
    .fromTo(".act-3-line-2",
      { x: 120, opacity: 0 },
      { x: 0, opacity: 1, ease: "expo.out", duration: 0.2 },
      0.78
    )
    .fromTo(".act-3-zoom",
      { scale: 1.8, opacity: 0 },
      { scale: 1.0, opacity: 1, ease: "back.out(1.2)", duration: 0.25 },
      0.75
    )
    .to(".act-3-block", { scale: 0.9, opacity: 0, duration: 0.1 }, 0.95);

    return () => {
      window.removeEventListener("resize", handleResize);
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isLoaded, images]);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-void">
      {/* GPU layer promotion with will-change */}
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full object-cover"
        style={{ willChange: 'transform' }}
      />
      
      {/* Cinematic Overlays */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        
        {/* ACT I: Brand Reveal */}
        <div className="act-1-block absolute inset-0 flex flex-col items-center justify-center opacity-0">
          <div className="text-center px-6">
            <span className="text-amber-500 font-heading font-bold uppercase tracking-eyebrow text-[10px] mb-4 block">
              Australian Manuka Excellence
            </span>
            <h1 className="act-1-chars text-6xl md:text-9xl font-display font-semibold text-text-primary leading-display">
              <span className="block">{splitChars("Nature's")}</span>
              <span className="act-1-shimmer text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-600 bg-[length:200%_auto]">
                {splitChars("Purest Gold")}
              </span>
            </h1>
          </div>
        </div>

        {/* ACT II: Feature Reveal */}
        <div className="act-2-block absolute inset-0 flex items-center justify-start px-12 md:px-24 opacity-0">
          <div className="max-w-xl">
            <span className="act-2-eyebrow text-amber-500 font-heading font-bold text-[10px] uppercase tracking-eyebrow mb-4 block">
              Engineered by Nature
            </span>
            <h2 className="act-2-heading text-5xl md:text-8xl font-display font-semibold text-text-primary leading-display">
              Bio-Active <br />
              <span className="act-2-clip text-amber-500 inline-block">Potency.</span>
            </h2>
          </div>
        </div>

        {/* ACT III: Deep Dive */}
        <div className="act-3-block absolute inset-0 flex items-center justify-end px-12 md:px-24 opacity-0">
          <div className="text-right max-w-xl">
            <span className="text-amber-500 font-heading font-bold text-[10px] uppercase tracking-eyebrow mb-4 block">
              Pure Internal Glow
            </span>
            <h2 className="text-5xl md:text-8xl font-display font-semibold text-text-primary leading-display">
              <span className="act-3-line-1 block">The</span>
              <span className="act-3-line-2 act-3-zoom block text-amber-500">Deep Dive.</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4">
        <div className="w-[1px] h-12 bg-gradient-to-b from-amber-500 to-transparent animate-pulse" />
        <span className="text-[10px] text-amber-500/50 uppercase tracking-[0.3em] font-bold">
          Scroll to explore
        </span>
      </div>
      
      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-void flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
            <span className="text-xs text-amber-500 font-bold uppercase tracking-widest">
              Charging Potency...
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
