'use client';

import React, { ReactNode } from 'react';
import { motion } from 'motion/react';

export function HyperspaceFadeIn({ children, delay = 0 }: { children: ReactNode, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, filter: 'blur(20px)' }}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 1.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
