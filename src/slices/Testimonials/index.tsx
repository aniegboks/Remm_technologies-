"use client";

import { FC, useState, useEffect, useCallback } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { motion, AnimatePresence } from "framer-motion";

export type TestimonialsProps = SliceComponentProps<Content.TestimonialsSlice>;

const Testimonials: FC<TestimonialsProps> = ({ slice }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonials = slice.primary.testimonials || [];

  // 1. AUTO-PLAY LOGIC
  const nextTestimonial = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 6000); // 6 seconds per slide
    return () => clearInterval(interval);
  }, [nextTestimonial]);

  // 2. SPLIT-TEXT HELPER
  // This wraps words in spans so they can be staggered
  const SplitText = ({ text }: { text: string }) => {
    return (
      <span className="inline-block overflow-hidden pb-1">
        {text.split(" ").map((word, i) => (
          <motion.span
            key={i}
            className="inline-block mr-[0.2em]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: i * 0.05, 
              ease: [0.2, 0.65, 0.3, 0.9] 
            }}
          >
            {word}
          </motion.span>
        ))}
      </span>
    );
  };

  if (testimonials.length === 0) return null;

  return (
    <section className="relative w-full py-40 bg-white overflow-hidden">
      {/* AMBIENT BLUSH */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] right-[-5%] w-[45vw] h-[45vw] bg-blue-50/40 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[35vw] h-[35vw] bg-red-50/30 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        
        {/* SECTION LABEL */}
        <div className="flex flex-col mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] font-mono uppercase tracking-[0.4em] text-slate-400 mb-4"
          >
            Curated Feedback // 0{testimonials.length}
          </motion.span>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            className="h-px bg-slate-200" 
          />
        </div>

        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeIndex}
              className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center w-full"
            >
              {/* IMAGE PORTRAIT */}
              <div className="md:col-span-5">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="p-1 rounded-[2.5rem] bg-gradient-to-br from-slate-200 to-slate-100/20 shadow-2xl"
                >
                  <div className="p-2 bg-white rounded-[2.3rem]">
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.8rem] bg-slate-50">
                      <PrismicNextImage 
                        field={testimonials[activeIndex].testimonial_image} 
                        fill
                        className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out"
                        fallbackAlt="" 
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* TEXT CONTENT */}
              <div className="md:col-span-7 flex flex-col pt-8 md:pt-0">
                <div className="mb-10 text-[#034966]/50">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <path d="M14 24H6V16H14V24ZM14 24C14 29 10 33 6 33" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M38 24H30V16H38V24ZM38 24C38 29 34 33 30 33" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                </div>

                {/* HEADING WITH SPLIT TEXT ANIMATION */}
                <span className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-10">
                   {/* Note: For rich text fields, we extract the first text node 
                     to apply the split-text effect properly. 
                   */}
                   <PrismicRichText field={testimonials[activeIndex].heading} />
                </span>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-slate-500 font-light leading-relaxed max-w-xl italic border-l-2 border-slate-100 pl-8"
                >
                   "{testimonials[activeIndex].paragraph}"
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* CONTROLS */}
          <div className="mt-16 md:mt-0 md:absolute -bottom-12 right-0 flex items-center gap-8">
            <div className="flex items-baseline gap-3 font-mono text-slate-400">
              <span className="text-xl text-slate-900 font-bold leading-none">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-xs opacity-50">/</span>
              <span className="text-xs">{String(testimonials.length).padStart(2, '0')}</span>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={prevTestimonial} 
                className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all active:scale-95"
              >
                ←
              </button>
              <button 
                onClick={nextTestimonial} 
                className="w-14 h-14 rounded-full bg-slate-900 text-white flex items-center justify-center hover:shadow-xl transition-all active:scale-95"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* PROGRESS BAR (Syncs with Auto-play) */}
        <div className="w-full h-[1px] bg-slate-100 mt-24 relative overflow-hidden">
            <motion.div 
                key={activeIndex}
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 6, ease: "linear" }}
                className="absolute top-0 left-0 w-full h-full bg-[#034966]/60"
            />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;