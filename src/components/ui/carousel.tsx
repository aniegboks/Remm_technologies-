"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type CarouselImage = { 
  url: string; 
  alt?: string 
};

interface CarouselProps {
  images: CarouselImage[];
  autoSlideDelay?: number;
}

export default function Carousel({ images, autoSlideDelay = 5000 }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, autoSlideDelay);
    return () => clearInterval(interval);
  }, [images.length, autoSlideDelay]);

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full h-full relative group">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          className="absolute inset-0"
          // Smooth Tech Fade + slight Zoom Out
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "circOut" }}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${images[activeIndex].url})` }}
          />
          {/* Subtle gradient overlay at bottom for text legibility if needed */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* GLASS UI CONTROLS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <div className="flex items-center gap-3 px-4 py-2 bg-black/30 backdrop-blur-md border border-white/10 rounded-full shadow-lg">
          
          {/* Indicators */}
          <div className="flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300"
                style={{ 
                    width: index === activeIndex ? "24px" : "6px",
                    backgroundColor: index === activeIndex ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.2)"
                }}
              >
                {index === activeIndex && (
                    <motion.div 
                        layoutId="activeIndicator"
                        className="absolute inset-0 bg-white"
                        transition={{ duration: 0.3 }}
                    />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
}