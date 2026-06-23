'use client';

import React, { useRef, useEffect } from 'react';
import { VideoBackground } from './VideoBackground';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function DiscoverySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    if (!sectionRef.current || !textRef.current || !cardsContainerRef.current) return;

    const ctx = gsap.context(() => {
      // Pin the text content on desktop
      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": () => {
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            pin: textRef.current,
            pinSpacing: false,
          });
        }
      });

      // Reveal Text Lines
      gsap.fromTo(
        textRef.current?.querySelectorAll('.reveal-text') || [],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          }
        }
      );

      // Parallax float cards
      const cards = cardsContainerRef.current?.children;
      if (cards && cards.length > 0) {
        gsap.utils.toArray(cards).forEach((card: any, i) => {
          gsap.fromTo(card,
            { y: 150, opacity: 0, rotateX: 10 },
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'bottom 20%',
                toggleActions: 'play reverse play reverse'
              }
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="discovery" ref={sectionRef} className="relative min-h-[150vh] w-full pt-32 pb-48 flex items-start">
      <VideoBackground 
        src="/videos/planet.mp4" 
        overlayOpacity={0.7}
      />
      
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col lg:flex-row gap-16 lg:gap-24 h-full relative">
        {/* Left constraints container for sticky */}
        <div className="lg:w-1/2 lg:h-screen lg:pointer-events-none z-10">
          <div ref={textRef} className="lg:pointer-events-auto pt-16 lg:pt-32 max-w-xl">
            <div className="reveal-text inline-flex mb-6 items-center gap-2 px-0 py-1">
              <span className="font-sans text-[11px] md:text-sm text-white/50 font-medium tracking-widest uppercase">
                Chapter II.
              </span>
            </div>
            
            <h2 className="reveal-text font-sans text-5xl md:text-7xl font-semibold tracking-[-0.03em] mb-6 leading-[1.05] text-white">
              A new world <br/>
              <span className="text-white/40">emerges.</span>
            </h2>
            <p className="reveal-text text-lg md:text-2xl text-white/50 font-medium tracking-tight leading-relaxed mb-10">
              A celestial body reveals itself from the cosmic dust. Structural anomalies and cyber-organic landscapes form before your eyes.
            </p>
          </div>
        </div>

        {/* Right side scrolling content: Floating Constellations */}
        <div ref={cardsContainerRef} className="lg:w-1/2 flex flex-col gap-32 lg:pt-[45vh] pb-[20vh] z-20">
          {[
            { id: 'Alpha', title: 'Atmospheric density', desc: 'Quantum particulates coalesce into breathable data streams.', glow: 'rgba(255, 255, 255, 0.1)' },
            { id: 'Beta', title: 'Core emergence', desc: 'Harmonic resonance from deep within the planetary crust.', glow: 'rgba(255, 255, 255, 0.05)' },
            { id: 'Gamma', title: 'Surface crystallization', desc: 'Raw computational power solidifying into monumental structures.', glow: 'rgba(255, 255, 255, 0.15)' }
          ].map((item, index) => (
            <div key={item.id} className={`group relative flex flex-col gap-6 ${index % 2 !== 0 ? 'lg:ml-32 lg:-mr-16' : 'lg:mr-24 lg:-ml-8'}`}>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-1000 blur-3xl rounded-full" />
              
              <div className="flex items-center gap-6">
                <div className="w-16 h-[1px] bg-white/20 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
                <span className="font-sans text-xs uppercase tracking-[0.3em] text-white/40 group-hover:text-white transition-colors duration-500">Sector {item.id}</span>
              </div>
              
              <div>
                <h3 className="text-4xl md:text-5xl font-sans font-semibold tracking-tight text-white mb-6 transform group-hover:translate-x-4 transition-transform duration-700 ease-out">
                  {item.title}
                </h3>
                <p className="text-lg text-white/40 font-medium leading-relaxed max-w-sm group-hover:text-white/70 transition-colors duration-500 transform group-hover:translate-x-4">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
