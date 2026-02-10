"use client";

import { FC, useRef, useState, useEffect } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import Button from "@/components/ui/button";
import { ArrowUpRight, Plus, ArrowDown } from "lucide-react";

export type PartnersContentProps =
  SliceComponentProps<Content.PartnersContentSlice>;

interface PartnerItem {
  partner_image?: any;
  partner_heading?: string | null;
  partner_content?: string | null;
  partner_link?: any;
  partner_label?: string | null;
}

const PartnersContent: FC<PartnersContentProps> = ({ slice }) => {
  const containerRef = useRef<HTMLElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 800);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 100,
  });
  const imageScale = useTransform(smoothProgress, [0, 0.2], [1.1, 1]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);

  const titleText = slice.primary.title ?? "Strategic Alliances";
  const titleWords = titleText.split(" ").filter(Boolean);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-white"
          >
            <div className="flex flex-col items-center">
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-neutral-400 mb-4">
                System.Initialize
              </span>
              <span className="text-7xl font-bold tabular-nums tracking-tighter">
                {progress}%
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main ref={containerRef} className="relative bg-white text-[#1a1a1a]">
        {/* --- WHY SECTION: VERTICAL STICKY STACK --- */}
        <section className="bg-[#f8f8f8] py-32 rounded-t-[3rem] md:rounded-t-[5rem] relative z-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-24">
              <span className="text-blue-600 font-mono text-xs uppercase tracking-widest">
                Capabilities
              </span>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mt-4">
                {slice.primary.reason_caption}
              </h2>
            </div>

            <div className="flex flex-col gap-[8vh]">
              {slice.primary.partner_variant_content?.map((item, index) => (
                <div key={index} className="sticky top-[12vh] w-full">
                  <motion.div
                    className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-[2.5rem] bg-white shadow-2xl border border-black/5"
                    style={{
                      scale: useTransform(
                        smoothProgress,
                        [0.3 + index * 0.1, 0.6 + index * 0.1],
                        [1, 0.95],
                      ),
                    }}
                  >
                    <PrismicNextImage
                      field={item.variant_image}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 flex items-center px-8 md:px-16">
                      <div className="max-w-xl text-white">
                        <span className="font-mono text-blue-400 text-sm mb-4 block">
                          0{index + 1}
                        </span>
                        <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-4">
                          {item.variant_heading}
                        </h3>
                        <p className="text-neutral-300 text-sm md:text-lg">
                          {item.variant_content}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- NETWORK LIST: RESTORED ORIGINAL PARAGRAPH & CTA --- */}
        <section className="bg-white py-32 relative z-30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16 flex justify-between items-end border-b border-gray-100 pb-8">
              <h2 className="text-3xl font-bold tracking-tighter uppercase">
                Expert Consultation
              </h2>
              <p className="text-gray-400 font-mono text-[9px] uppercase tracking-[0.2em]">
                Partner Index
              </p>
            </div>
            <div className="divide-y divide-gray-100">
              {slice.primary.partner_content?.map((item, index) => (
                <PartnerRow key={index} item={item} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

const PartnerRow = ({ item, index }: { item: PartnerItem; index: number }) => {
  const rowRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });
  const springConfig = { stiffness: 60, damping: 40, mass: 1 };

  const scale = useSpring(
    useTransform(scrollYProgress, [0, 1], [1.2, 1]),
    springConfig,
  );
  const imageY = useSpring(
    useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]),
    springConfig,
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0],
  );

  return (
    <motion.div
      ref={rowRef}
      style={{ opacity }}
      className="group grid grid-cols-1 md:grid-cols-12 gap-10 items-center py-16 transition-all duration-700 hover:bg-neutral-50/50 hover:px-10 border-b border-neutral-100 last:border-none"
    >
      {/* Index */}
      <div className="md:col-span-1 text-neutral-300 font-mono text-[10px] tracking-[0.2em]">
        / {index < 9 ? `0${index + 1}` : index + 1}
      </div>

      {/* Image */}
      <div className="md:col-span-3">
        <div className="relative w-full aspect-[4/5] overflow-hidden rounded-lg bg-neutral-100 transition-all duration-1000 group-hover:rounded-3xl">
          <motion.div
            style={{ scale, y: imageY }}
            className="relative w-full h-[150%] -top-[25%]"
          >
            <PrismicNextImage
              field={item.partner_image}
              fill
              className="object-cover grayscale-[0.4] group-hover:grayscale-0 transition-all duration-1000"
            />
          </motion.div>
        </div>
      </div>

      {/* Heading */}
      <div className="md:col-span-3">
        <h3 className="font-bold tracking-tighter uppercase text-lg lg:text-xl text-neutral-900 group-hover:translate-x-3 transition-transform duration-700">
          {item.partner_heading || "Untitled Partner"}
        </h3>
      </div>

      {/* Restored Paragraph */}
      <div className="md:col-span-3 text-neutral-400 text-[12px] leading-relaxed font-light">
        <p className="max-w-[240px] opacity-80 group-hover:opacity-100 transition-opacity duration-700">
          {item.partner_content}
        </p>
      </div>

      {/* Restored Expandable Button */}
      <div className="md:col-span-2 flex justify-end">
        <PrismicNextLink field={item.partner_link}>
          <div className="group/btn relative w-14 h-14 rounded-full border border-neutral-200 flex items-center justify-center bg-white overflow-hidden transition-all duration-700 hover:w-36 group-hover:border-neutral-950 group-hover:bg-neutral-950 group-hover:text-white">
            <span className="absolute left-7 opacity-0 group-hover/btn:opacity-100 transition-all duration-500 translate-x-2 group-hover/btn:translate-x-0 text-[10px] uppercase font-bold tracking-[0.1em]">
              {item.partner_label || "Explore"}
            </span>
            <ArrowUpRight
              size={20}
              className="transition-transform duration-700 group-hover/btn:translate-x-12 group-hover/btn:rotate-45"
            />
          </div>
        </PrismicNextLink>
      </div>
    </motion.div>
  );
};

export default PartnersContent;
