'use client';

import React, { useRef, useEffect } from 'react';
import { VideoBackground } from './VideoBackground';
import { motion, useScroll, useTransform } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Fingerprint } from 'lucide-react';

export function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -50]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    if (!sectionRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current?.children || [], 
        { y: 80, opacity: 0, rotateX: 20 },
        {
          y: 0, opacity: 1, rotateX: 0, 
          duration: 1.5, stagger: 0.2, ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 40%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Video 5 Placeholder: Universe Burst */}
      <motion.div style={{ scale }} className="absolute inset-0 w-full h-full transform-gpu">
        <VideoBackground 
          src="/videos/reveal.mp4" 
          overlayOpacity={0.5}
        />
        {/* Glow vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.9)_100%)] pointer-events-none z-10" />
      </motion.div>

      <motion.div 
        style={{ y, opacity }}
        className="relative z-20 text-center px-6 flex flex-col items-center" 
        ref={textRef}
      >
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-xl relative">
             <Fingerprint className="w-6 h-6 text-white/50" />
          </div>
        </div>

        <div className="font-sans text-[11px] md:text-sm font-medium text-white/50 mb-6 tracking-widest uppercase">
          Chapter V.
        </div>
        <h2 className="font-sans text-6xl md:text-8xl lg:text-[10rem] font-semibold tracking-[-0.04em] mb-10 max-w-5xl mx-auto leading-[0.9] text-white">
          Transcendence.
        </h2>
        <p className="text-white/50 text-xl font-medium max-w-2xl mx-auto mb-16 tracking-tight">The universe expands beyond imagination. A majestic frontier of endless potential awaits your arrival.</p>
        
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group relative px-10 py-5 bg-white text-black rounded-full font-semibold tracking-tight text-base hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 mx-auto overflow-hidden"
        >
          <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-10 block">Enter the void</span>
          <span className="absolute inset-0 z-10 flex items-center justify-center translate-y-10 transition-transform duration-300 group-hover:translate-y-0 text-black">Enter the void</span>
        </button>
      </motion.div>

      <div className="absolute bottom-6 left-0 right-0 text-center z-20">
        <p className="font-sans text-[11px] text-white/30 font-medium">
          &copy; 2026 Cosmic Nexus. The journey is infinite.
        </p>
      </div>
    </section>
  );
}
