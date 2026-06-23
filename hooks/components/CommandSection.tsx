'use client';

import React, { useRef, useEffect, useState } from 'react';
import { VideoBackground } from './VideoBackground';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, ShieldCheck, Cpu, Terminal, Orbit, Database } from 'lucide-react';

export function CommandSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    if (!sectionRef.current || !elementsRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(elementsRef.current?.children || [], 
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
          }
        }
      );
    }, sectionRef);

    let frameId: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      });
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      ctx.revert();
      if (section) section.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section id="command" ref={sectionRef} className="relative min-h-[120vh] w-full py-32 flex items-center overflow-hidden">
      {/* Dynamic Cursor Light */}
      <div 
        className="absolute w-[600px] h-[600px] bg-white/10 blur-[150px] rounded-full pointer-events-none z-10 transition-transform duration-300 ease-out mix-blend-screen"
        style={{ transform: `translate(${mousePosition.x - 300}px, ${mousePosition.y - 300}px)` }}
      />

       {/* Video 4 Placeholder: Command Center */}
       <VideoBackground 
        src="/videos/command.mp4" 
        overlayOpacity={0.5}
      />

      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full pt-16 flex flex-col items-center text-center" ref={elementsRef}>
        <div className="mb-24">
          <div className="inline-flex items-center gap-3 px-0 py-2 mb-4">
            <span className="font-sans text-[11px] md:text-sm font-medium text-white/50 tracking-widest uppercase">
              Chapter IV.
            </span>
          </div>
          <h2 className="font-sans text-5xl md:text-7xl font-semibold tracking-[-0.03em] mb-6 leading-tight text-white">
            Intelligence. <br/>
            <span className="text-white/40">Awakened.</span>
          </h2>
          <p className="font-sans text-lg md:text-2xl text-white/50 max-w-2xl mx-auto font-medium tracking-tight">
            The universe becomes truly alive. Data mimics consciousness. Cosmic systems operate in perfect harmony.
          </p>
        </div>

        <div className="w-full relative h-[400px] flex items-center justify-center">
          {/* Central glowing core / orbit concept */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute w-[300px] h-[300px] rounded-full border border-white/10 animate-[spin_20s_linear_infinite]" />
            <div className="absolute w-[450px] h-[450px] rounded-full border border-white/5 animate-[spin_30s_linear_infinite_reverse]" />
            <div className="absolute w-[600px] h-[600px] rounded-full border border-white/5 animate-[spin_40s_linear_infinite]" />
            <div className="w-32 h-32 rounded-full bg-white blur-[80px] opacity-10 animate-pulse" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-24 w-full z-10 px-8">
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mb-6 group-hover:border-white/30 transition-colors duration-500 bg-white/5 backdrop-blur-xl">
                <span className="w-2 h-2 rounded-full bg-white opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2 tracking-tight">Autonomous Flow</h4>
              <p className="text-white/40 text-sm font-medium leading-relaxed">Self-directing streams of energy moving effortlessly through the void.</p>
            </div>
            
            <div className="flex flex-col items-center text-center group translate-y-8">
              <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mb-6 group-hover:border-white/30 transition-colors duration-500 bg-white/5 backdrop-blur-xl">
                <span className="w-2 h-2 rounded-full bg-white opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2 tracking-tight">Collective Sync</h4>
              <p className="text-white/40 text-sm font-medium leading-relaxed">Billions of entities moving as one cohesive planetary organism.</p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mb-6 group-hover:border-white/30 transition-colors duration-500 bg-white/5 backdrop-blur-xl">
                <span className="w-2 h-2 rounded-full bg-white opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2 tracking-tight">Infinite Compute</h4>
              <p className="text-white/40 text-sm font-medium leading-relaxed">Limits dissolve as the organic network scales unconditionally.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
