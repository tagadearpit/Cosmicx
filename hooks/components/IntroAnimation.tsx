'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function IntroAnimation({ onComplete, onFadeStart }: { onComplete: () => void, onFadeStart: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onFadeStart();
      setTimeout(onComplete, 1000); // give time for the exit animation
    }, 3500);
    return () => clearTimeout(timer);
  }, [onComplete, onFadeStart]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1, ease: 'easeOut' } }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black"
        >
          <div className="flex flex-col items-center justify-center gap-6 overflow-hidden">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="text-white text-2xl md:text-5xl font-light tracking-[0.4em] uppercase"
            >
              System Initialized
            </motion.div>
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5, ease: 'easeInOut' }}
              className="h-[1px] bg-white w-full max-w-xs"
            />
            <motion.div
              initial={{ y: 20, opacity: 0, filter: 'blur(5px)' }}
              animate={{ y: 0, opacity: 0.5, filter: 'blur(0px)' }}
              transition={{ duration: 1, delay: 1, ease: 'easeOut' }}
              className="text-white/50 text-xs tracking-widest font-mono uppercase"
            >
              Entering the void
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
