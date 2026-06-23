'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface VideoBackgroundProps {
  src: string;
  poster?: string;
  overlayOpacity?: number;
  parallaxSpeed?: number;
  priority?: boolean;
}

export function VideoBackground({
  src,
  poster,
  overlayOpacity = 0.5,
  parallaxSpeed = 0.2, // standard parallax modifier
  priority = false,
}: VideoBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Simple parallax for the video container
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Ignore play errors (e.g. strict auto-play policies)
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
    };
  }, [isMounted]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden bg-black max-w-full"
    >
      <motion.div
        style={{ y, scale: 1.15 }}
        className="absolute inset-0 w-full h-full origin-center"
        transition={{ ease: "linear" }}
      >
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          autoPlay
          preload={priority ? "auto" : "metadata"}
          poster={poster}
          className="object-cover w-full h-full"
        >
          <source src={src} type="video/mp4" />
        </video>
      </motion.div>
      
      {/* Cinematic Overlays */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ backgroundColor: `rgba(0,0,0,${overlayOpacity})`, mixBlendMode: 'multiply' }}
      />
      {/* Vertical gradient mapping for blend between sections */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black via-black/80 to-transparent z-10 pointer-events-none opacity-90" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/90 to-transparent z-10 pointer-events-none opacity-95" />
    </div>
  );
}
