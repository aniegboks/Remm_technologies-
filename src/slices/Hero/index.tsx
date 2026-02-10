"use client";

import { useState, useEffect } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { motion } from "framer-motion";
import Button from "@/components/ui/button";
import { PrismicNextLink } from "@prismicio/next";
import Container from "@/components/ui/container";
import Loading from "@/components/ui/loading";
export type HeroProps = {
  slice: Content.HeroSlice;
};

export default function Hero({ slice }: HeroProps) {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const ease = [0.19, 1, 0.22, 1]; // Premium "Expo" easing

  return (
    <>
    <Loading />
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        {slice.variation === "alternate" ? (
          <section className="relative min-h-[80dvh] w-full bg-[#fbfbfb] overflow-hidden selection:bg-neutral-900 selection:text-white font-heading">
            {/* --- DECORATIVE LAYERS --- */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(50%_50%_at_50%_0%,rgba(99,102,241,0.05)_0%,rgba(255,255,255,0)_100%)]" />
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] brightness-100 contrast-150" />
            </div>

            <div className="relative z-10 px-6 pt-32 md:pt-48 pb-20">
              <div className="mx-auto max-w-7xl">
                {/* --- TOP GRID: TEXT CONTENT --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-24">
                  <div className="lg:col-span-8">
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={!isLoading ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 1, ease: [0.5, 0.5, 0.5, 0.5] }}
                    >
                      <div className="flex items-center space-x-3 mb-8">
                        <span className="h-px w-12 bg-neutral-200" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#034966]">
                          Built for Scale
                        </span>
                      </div>
                      <div className="text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-neutral-re">
                        <PrismicRichText field={slice.primary.heading} />
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={!isLoading ? { opacity: 1 } : {}}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="lg:col-span-4 lg:pb-2"
                  >
                    <div className="text-md text-neutral-700 font-body leading-relaxed mb-8">
                      <PrismicRichText field={slice.primary.body} />
                    </div>
                  </motion.div>
                </div>

                {/* --- CENTER SECTION: IMAGE WITH UI ELEMENTS --- */}
                {slice.primary.image?.url && (
                  <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={!isLoading ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 1.2,
                      ease: [0.5, 0.5, 0.5, 0.5],
                      delay: 0.4,
                    }}
                    className="relative group"
                  >
                    {/* Floating UI Card - Analytics */}
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute -top-12 -left-6 z-20 hidden xl:block p-4 bg-white/80 backdrop-blur-xl border border-neutral-100 rounded-2xl shadow-2xl shadow-indigo-500/10"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#034966]/10 flex items-center justify-center">
                          <div className="w-4 h-2 bg-[#034966] rounded-sm" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase text-neutral-400">
                            Throughput
                          </p>
                          <p className="text-sm font-bold text-neutral-900">
                            99.98%
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Main Image Viewport */}
                    <div className="relative rounded-[2rem] md:rounded-[3.5rem] p-3 md:p-6 bg-white border border-neutral-100 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.06)] overflow-hidden">
                      <div className="relative aspect-video overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-neutral-50">
                        <PrismicNextImage
                          field={slice.primary.image}
                          fill
                          className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s] ease"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/10 to-transparent" />
                      </div>
                    </div>

                    {/* Floating UI Card - Status */}
                    <motion.div
                      animate={{ y: [0, 10, 0] }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                      }}
                      className="absolute -bottom-6 -right-6 z-20 hidden xl:block p-4 bg-white/80 backdrop-blur-xl border border-neutral-100 rounded-2xl shadow-2xl shadow-neutral-200"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[11px] font-bold text-neutral-900 uppercase">
                          Live Operations
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </div>
          </section>
        ) : (
          <section className="relative min-h-screen flex items-center justify-center py-24 overflow-hidden">
            <Container>
              <div className="relative z-10">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={!isLoading ? { opacity: 1, scale: 1 } : {}}
                    className="mb-8 px-4 py-1 border border-neutral-200 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400"
                  >
                    Architecture & Design
                  </motion.div>

                  <div className="overflow-hidden mb-8">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={!isLoading ? { y: 0 } : {}}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      className="text-5xl md:text-8xl font-bold tracking-tighter uppercase italic text-neutral-900"
                    >
                      <PrismicRichText field={slice.primary.heading} />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={!isLoading ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 }}
                    className="text-neutral-500 text-lg md:text-xl max-w-2xl mb-12"
                  >
                    <PrismicRichText field={slice.primary.body} />
                  </motion.div>

                  <div className="flex gap-4 mb-20">
                    {slice.primary.button_group?.map((item, i) => (
                      <PrismicNextLink key={i} field={item.button_link}>
                        <Button
                          variant="outline"
                          className="rounded-full px-10 py-7 uppercase tracking-widest text-[10px] border-neutral-200 hover:bg-black hover:text-white transition-all"
                        >
                          {item.button_label}
                        </Button>
                      </PrismicNextLink>
                    ))}
                  </div>

                  {slice.primary.image?.url && (
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={!isLoading ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.8, duration: 1 }}
                      className="relative w-full max-w-5xl aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl"
                    >
                      <PrismicNextImage
                        field={slice.primary.image}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/5" />
                    </motion.div>
                  )}
                </div>
              </div>
            </Container>
            {/* Subtle background branding */}
            <div className="absolute top-0 right-0 p-10 font-mono text-[10px] text-neutral-100 uppercase vertical-text hidden md:block">
              Innovation_Standard_001
            </div>
          </section>
        )}
      </section>
    </>
  );
}
