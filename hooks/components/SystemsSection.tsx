'use client';

import React, { useRef, useEffect } from 'react';
import { VideoBackground } from './VideoBackground';
import { motion, useInView } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hexagon } from 'lucide-react';

export function SystemsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rightRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current, 
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="systems" ref={sectionRef} className="relative min-h-screen w-full py-32 flex items-center overflow-hidden">
       {/* Video 3 Placeholder: Network/Galaxy */}
       <VideoBackground 
        src="/videos/network.mp4" 
        overlayOpacity={0.5}
      />

      {/* Ambient glowing web effect */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] bg-white rounded-full blur-[120px] mix-blend-screen opacity-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-white rounded-full blur-[150px] mix-blend-screen opacity-5 animate-pulse" style={{ animationDelay: '2s' }} />
        {/* Subtle grid to simulate network */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full pt-20">
        <div ref={leftRef} className="flex flex-col items-center text-center max-w-3xl mx-auto mb-24">
          <div className="inline-flex items-center gap-2 px-0 py-1 mb-6">
            <span className="font-sans text-[11px] md:text-sm font-medium text-white/40 tracking-widest uppercase">
              Chapter III.
            </span>
          </div>
          
          <h2 className="font-sans text-5xl md:text-7xl font-semibold tracking-[-0.03em] mb-8 leading-[1.05] text-white">
            Connection. <br/>
            <span className="text-white/40">Synapses fire.</span>
          </h2>
          <p className="text-white/50 font-medium text-lg md:text-2xl mb-10 tracking-tight leading-relaxed">
            Individual stars link to form an immense neural structure. The vast emptiness is replaced by a web of pulsing light and intelligence.
          </p>
        </div>

        <div ref={rightRef} className="grid grid-cols-1 md:grid-cols-3 gap-y-16 gap-x-8 lg:gap-x-16 border-t border-white/10 pt-16">
          {[
            { label: 'Network synapses', value: 'Trillions', delay: 0.1 },
            { label: 'Transmission delay', value: 'Zero', delay: 0.2 },
            { label: 'System synchrony', value: 'Perfect', delay: 0.3 }
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: stat.delay, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center relative group"
            >
              <div className="mb-4">
                <span className="font-sans text-4xl md:text-5xl font-semibold text-white tracking-tight">{stat.value}</span>
              </div>
              <span className="font-sans text-sm font-medium text-white/40 uppercase tracking-widest">{stat.label}</span>
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-700 rounded-full blur-2xl pointer-events-none" />
            </motion.div>
          ))}
          
        </div>
      </div>
    </section>
  );
}
