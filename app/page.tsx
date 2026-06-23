'use client';

import React, { useState } from 'react';
import { Navbar } from '@/hooks/components/Navbar';
import { HeroSection } from '@/hooks/components/HeroSection';
import { DiscoverySection } from '@/hooks/components/DiscoverySection';
import { SystemsSection } from '@/hooks/components/SystemsSection';
import { CommandSection } from '@/hooks/components/CommandSection';
import { CTASection } from '@/hooks/components/CTASection';
import { ScrollProgress } from '@/hooks/components/ScrollProgress';
import { WarpTransition } from '@/hooks/components/WarpTransition';
import { IntroAnimation } from '@/hooks/components/IntroAnimation';
import { HyperspaceFadeIn } from '@/hooks/components/HyperspaceFadeIn';

export default function Home() {
  const [introStartedFade, setIntroStartedFade] = useState(false);
  const [introUnmount, setIntroUnmount] = useState(false);

  return (
    <main className="bg-black text-white min-h-screen selection:bg-white/20 selection:text-white">
      {!introUnmount && (
        <IntroAnimation 
          onFadeStart={() => setIntroStartedFade(true)}
          onComplete={() => setIntroUnmount(true)} 
        />
      )}
      
      {introStartedFade && (
        <React.Fragment>
          <ScrollProgress />
          <WarpTransition />
          
          <HyperspaceFadeIn delay={0}>
            <Navbar />
          </HyperspaceFadeIn>
          
          <HyperspaceFadeIn delay={0.2}>
            <HeroSection />
          </HyperspaceFadeIn>
          
          <HyperspaceFadeIn delay={0.2}>
            <DiscoverySection />
          </HyperspaceFadeIn>
          
          <HyperspaceFadeIn delay={0.2}>
            <SystemsSection />
          </HyperspaceFadeIn>
          
          <HyperspaceFadeIn delay={0.2}>
            <CommandSection />
          </HyperspaceFadeIn>
          
          <HyperspaceFadeIn delay={0.2}>
            <CTASection />
          </HyperspaceFadeIn>
        </React.Fragment>
      )}
    </main>
  );
}
