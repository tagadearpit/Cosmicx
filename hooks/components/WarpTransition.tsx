'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

export function WarpTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current || !ringRef.current) return;

    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
      if (index === 0) return; // Skip Hero on initial load

      ScrollTrigger.create({
        trigger: section,
        start: 'top 55%', 
        onEnter: () => triggerWarp(),
        onEnterBack: () => triggerWarp(),
      });
    });

    const triggerWarp = () => {
      if (!containerRef.current || !ringRef.current) return;

      const targets = [containerRef.current, ringRef.current, ...linesRef.current].filter(Boolean);
      if (targets.length > 0) {
        gsap.killTweensOf(targets);
      }

      // Global Flash
      gsap.fromTo(containerRef.current,
        { opacity: 0.15 },
        { opacity: 0, duration: 1.5, ease: 'power2.out' }
      );

      // Core Expansion Ring
      gsap.fromTo(ringRef.current,
        { scale: 0.5, opacity: 0.8 },
        { scale: 3.5, opacity: 0, duration: 2, ease: 'power3.out' }
      );

      // Streaks/Warp lines zooming past
      linesRef.current.forEach((line) => {
        if (!line) return;
        
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * (window.innerWidth / 4) + 50;
        const startX = Math.cos(angle) * radius;
        const startY = Math.sin(angle) * radius;
        
        const scale = Math.random() * 30 + 10;
        
        gsap.fromTo(line,
          { 
            x: startX, 
            y: startY, 
            scaleX: 0, 
            opacity: 0, 
            rotation: (angle * 180) / Math.PI 
          },
          {
            x: startX * 4, 
            y: startY * 4,
            scaleX: scale,
            opacity: Math.random() * 0.5 + 0.1,
            duration: Math.random() * 0.5 + 0.4,
            ease: 'power4.in',
            onComplete: () => {
              gsap.to(line, { opacity: 0, duration: 0.2 });
            }
          }
        );
      });
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-[90] opacity-0 mix-blend-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-white" />
      
      <div 
        ref={ringRef}
        className="absolute rounded-full border border-white/40 bg-[radial-gradient(circle,rgba(255,255,255,0.3)_0%,transparent_70%)] w-[30vh] h-[30vh] blur-[10px]"
      />

      <div className="absolute inset-0 flex items-center justify-center">
        {Array.from({ length: 24 }).map((_, i) => (
          <div 
            key={i}
            ref={(el) => {
              if (el) linesRef.current[i] = el;
            }}
            className="absolute h-[1px] w-[5vw] bg-gradient-to-r from-transparent via-white to-transparent origin-center"
          />
        ))}
      </div>
    </div>
  );
}
