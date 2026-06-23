'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function MissionTimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    if (!sectionRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      // Animate the central line
      gsap.fromTo(lineRef.current,
        { height: 0 },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            end: 'bottom 80%',
            scrub: true,
          }
        }
      );

      // Animate each timeline item
      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        const isLeft = index % 2 === 0;
        gsap.fromTo(item,
          { opacity: 0, x: isLeft ? -50 : 50, filter: 'blur(10px)' },
          {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 75%',
            }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const timelineData = [
    { year: '2026', title: 'Nexus Initialization', desc: 'First cyber-organic synchronization achieved across the primary core.' },
    { year: '2031', title: 'Orbital Expansion', desc: 'Automated builders construct the first Ring Gate, connecting the outer sectors.' },
    { year: '2045', title: 'Sentient Protocol', desc: 'AI entities reach self-optimizing complexity, requiring the establishment of Bridge Alpha.' },
    { year: '2089', title: 'Unknown Anomaly', desc: 'A signal of undetermined origin is intercepted, prompting a system-wide Defcon 1 alert.' },
  ];

  return (
    <section id="timeline" ref={sectionRef} className="relative min-h-screen w-full py-32 bg-black border-y border-white/10">
      <div className="absolute inset-0 pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <span className="font-sans text-[11px] md:text-sm font-medium text-white/50 mb-4 block">Chapter IV.</span>
          <h2 className="font-sans text-5xl md:text-6xl font-semibold tracking-[-0.03em] mb-4 leading-tight text-white">Historical Archives.</h2>
        </div>

        <div className="relative">
          {/* Center line background */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2" />
          {/* Animated line */}
          <div ref={lineRef} className="absolute left-[20px] md:left-1/2 top-0 w-[1px] bg-white -translate-x-1/2 origin-top" />

          <div className="flex flex-col gap-16 md:gap-24">
            {timelineData.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div 
                  key={index} 
                  ref={el => { itemsRef.current[index] = el; }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${isLeft ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-[20px] md:left-1/2 w-4 h-4 bg-black border-[3px] border-white rounded-full -translate-x-1/2 mt-2 md:mt-0 z-10" />
                  
                  <div className="md:w-1/2" /> {/* Spacer */}
                  
                  <div className={`md:w-1/2 pl-12 md:pl-0 ${isLeft ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                    <div className="p-8 md:p-10 rounded-3xl bg-white/5 backdrop-blur-3xl border border-white/10 hover:bg-white/10 transition-colors">
                      <div className="font-sans text-xl md:text-2xl font-semibold text-white/50 mb-2 group-hover:scale-105 origin-left md:group-hover:origin-[inherit] transition-transform">{item.year}</div>
                      <h3 className="text-2xl font-sans font-semibold text-white tracking-[-0.03em] mb-4">{item.title}</h3>
                      <p className="text-white/60 text-base font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
