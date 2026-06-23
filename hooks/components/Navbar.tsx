'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Menu, X } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'border-b border-white/10 bg-black/50 backdrop-blur-3xl py-4' 
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex items-center justify-between">
          <div className="flex items-center gap-2 font-sans text-lg font-semibold tracking-[-0.02em] text-white">
            <span>CosmicX</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 font-sans text-xs font-medium text-white/50 transition-colors">
            <a href="#discovery" className="hover:text-white transition-colors duration-300">Discovery</a>
            <a href="#systems" className="hover:text-white transition-colors duration-300">Connection</a>
            <a href="#command" className="hover:text-white transition-colors duration-300">Intelligence</a>

            <button className="px-5 py-2.5 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-all hover:scale-105 active:scale-95 text-xs">
              Enter
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button 
              className="text-white/80 hover:text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center"
          >
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col items-center gap-8 font-sans text-3xl font-semibold tracking-tight text-white">
              <a href="#discovery" onClick={() => setMobileMenuOpen(false)}>Discovery</a>
              <a href="#systems" onClick={() => setMobileMenuOpen(false)}>Connection</a>
              <a href="#command" onClick={() => setMobileMenuOpen(false)}>Intelligence</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

