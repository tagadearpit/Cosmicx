'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  direction: number;
  depth: number;
}

export function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles on client side to avoid hydration mismatch
    const newParticles = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * 10,
      direction: Math.random() > 0.5 ? 1 : -1,
      depth: Math.random() * 3, // For parallex or blur
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 perspective-[1000px]">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            filter: `blur(${particle.depth}px)`,
            opacity: particle.opacity,
          }}
          initial={{
            opacity: 0,
            y: 0,
          }}
          animate={{
            opacity: [0, particle.opacity, particle.opacity, 0],
            y: [0, -200 - (particle.depth * 50)],
            x: [0, particle.direction * 50],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
