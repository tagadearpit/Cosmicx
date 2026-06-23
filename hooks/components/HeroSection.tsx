'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { VideoBackground } from './VideoBackground';
import { ParticleBackground } from './ParticleBackground';
import { ChevronDown } from 'lucide-react';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '120%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <VideoBackground 
        src="/videos/nebula.mp4" 
        poster="" 
        overlayOpacity={0.65}
        priority={true}
      />
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)]" />
      <ParticleBackground />
      
      <motion.div 
        style={{ y: textY, opacity, scale }}
        className="relative z-20 flex flex-col items-center justify-center text-center px-6 max-w-6xl mx-auto mt-16"
      >
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md relative overflow-hidden group">
            <span className="font-sans text-[11px] md:text-sm text-white/80 tracking-wide font-medium flex items-center gap-2">
              Chapter I.
            </span>
          </div>
          
          <h1 className="font-sans text-5xl md:text-7xl lg:text-[8rem] font-semibold tracking-[-0.04em] leading-[1.05] mb-6">
            <motion.span 
              className="block overflow-hidden text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Arrival.
            </motion.span>
            <motion.span 
              className="block overflow-hidden text-white/50"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              The vast unknown.
            </motion.span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="text-lg md:text-2xl text-white/70 max-w-2xl mx-auto font-medium tracking-tight leading-relaxed mb-10"
          >
            Enter a limitless expanse of interconnected data nodes. The universe expands before you, infinite and silent.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={() => document.getElementById('discovery')?.scrollIntoView({behavior: 'smooth'})}
              className="px-8 py-3.5 rounded-full bg-white text-black font-semibold hover:scale-105 active:scale-95 transition-all text-sm md:text-base tracking-tight"
            >
              Explore now
            </button>
            <button 
              onClick={() => document.getElementById('command')?.scrollIntoView({behavior: 'smooth'})}
              className="px-8 py-3.5 rounded-full bg-transparent text-white font-semibold hover:bg-white/10 transition-all text-sm md:text-base tracking-tight flex items-center gap-2"
            >
              Watch the film <span className="text-white/50 text-xs">▶</span>
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
      >
        <span className="font-sans text-[10px] font-medium uppercase tracking-[0.4em] text-white/40 mb-3">Scroll to explore</span>
        <motion.div
           animate={{ y: [0, 8, 0] }}
           transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
