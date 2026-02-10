"use client";

import { FC, useState, useEffect } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import Carousel from "@/components/ui/carousel";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "@/components/ui/loading";

/**
 * Using Content.ContentSlice to match your Prismic type exports.
 */
export type MetricProps = SliceComponentProps<Content.ContentSlice>;

const Metric: FC<MetricProps> = ({ slice }) => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // LOGIC: High-performance loading simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Small buffer before removing the loader for visual smoothness
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        // Random increments for a more "organic" loading feel
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 80);
    return () => clearInterval(timer);
  }, []);

  // Safe mapping of the carousel images
  const carouselImages = (slice.primary.gallery_img || [])
    .filter((item) => item.gal_img?.url)
    .map((item) => ({
      url: item.gal_img.url as string,
      alt: item.gal_img.alt || "Portfolio perspective",
    }));

  const ease = [0.76, 0, 0.24, 1];

  return (
    <>
      {/* 1. INITIALIZE LOADER */}
      <Loading />

      {/* 2. MAIN SECTION CONTENT */}
      <section className="relative w-full min-h-screen bg-[#FCFCFC] flex flex-col items-center pt-32 pb-24 overflow-hidden selection:bg-black selection:text-white">
        
        {/* Ambient background washes */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-5%] left-[-2%] w-[50vw] h-[50vw] bg-red-100/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[-5%] w-[40vw] h-[40vw] bg-blue-100/15 rounded-full blur-[120px]" />
        </div>

        {/* Header Text Reveal */}
        <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={!isLoading ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-white/50 border border-slate-200/50 backdrop-blur-sm"
          >
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
              Catalog // {slice.id.slice(0, 6)}
            </span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={!isLoading ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease:"easeInOut" }}
              className="text-6xl md:text-8xl font-bold tracking-tight text-slate-900 leading-[1.05]"
            >
              <PrismicRichText field={slice.primary.title} />
            </motion.div>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={!isLoading ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-8 text-slate-500 font-light text-lg md:text-xl max-w-xl leading-relaxed"
          >
            {slice.primary.over_paragraph}
          </motion.p>
        </div>

        {/* 3. HARDWARE CAROUSEL FRAME */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 40 }}
          animate={!isLoading ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
          className="relative z-20 w-full max-w-[1200px] px-6"
        >
          <div className="p-1 rounded-[2.5rem] bg-gradient-to-b from-slate-200/50 to-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)]">
            <div className="p-2 bg-white rounded-[2.3rem] border border-white shadow-inner">
              <div className="relative overflow-hidden rounded-[1.8rem] bg-slate-50 aspect-4/5 md:aspect-16/10 lg:aspect-3/2 w-full">
                {/* Carousel only mounts after loading to ensure smooth entry */}
                {!isLoading && <Carousel images={carouselImages} />}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 4. FOOTER DETAILS */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={!isLoading ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="relative z-10 w-full max-w-6xl px-10 mt-24"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-t border-slate-200/60">
            <FooterItem label="Location" value={slice.primary.geo} />
            <FooterItem label="Discipline" value="IT solutions" />
            <FooterItem label="Year" value="2024" />
            <div className="flex justify-end items-center">
              <span className="text-[10px] font-mono font-bold uppercase tracking-tighter text-[#034966] hover:text-black transition-colors underline underline-offset-4">
                Dicipline → Tecnology
              </span>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

// Helper for clean footer layout
const FooterItem = ({ label, value }: { label: string; value: any }) => (
  <div>
    <p className="text-[10px] font-mono uppercase text-slate-400 tracking-widest mb-1">{label}</p>
    <p className="text-sm font-semibold text-slate-800">{value}</p>
  </div>
);

export default Metric;