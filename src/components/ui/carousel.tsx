"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

type CarouselImage = {
  url: string;
  alt?: string;
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaLink?: string;
};

interface CarouselProps {
  images: CarouselImage[];
  autoSlideDelay?: number;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

const DEFAULT_TITLE = "Technology That Moves Your Business Forward";

const DEFAULT_DESCRIPTION =
  "Tailored digital solutions designed to streamline operations and protect critical assets.";

export default function Carousel({
  images,
  autoSlideDelay = 6000,
}: CarouselProps) {
  const [[activeIndex, direction], setActive] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  const paginate = (newIndex: number) => {
    if (newIndex === activeIndex) return;
    const dir = newIndex > activeIndex ? 1 : -1;
    setActive([newIndex, dir]);
  };

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % images.length;
    setActive([nextIndex, 1]);
  };

  const handlePrev = () => {
    const prevIndex = (activeIndex - 1 + images.length) % images.length;
    setActive([prevIndex, -1]);
  };

  useEffect(() => {
    if (images.length < 2 || isPaused) return;

    const interval = setInterval(() => {
      setActive(([current]) => [(current + 1) % images.length, 1]);
    }, autoSlideDelay);

    return () => clearInterval(interval);
  }, [images.length, autoSlideDelay, isPaused]);

  if (!images?.length) return null;

  const activeImage = images[activeIndex % images.length];

  const titleText = activeImage.title?.trim() || DEFAULT_TITLE;
  const descriptionText = activeImage.description?.trim() || DEFAULT_DESCRIPTION;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured solutions"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="group relative h-full min-h-[520px] w-full overflow-hidden bg-[#090d16] md:min-h-[620px]"
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={`${activeIndex}-${activeImage.url}`}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 32 },
            opacity: { duration: 0.35 },
          }}
          className="absolute inset-0 h-full w-full"
        >
          {/* Background image */}
          <div
            role="img"
            aria-label={activeImage.alt ?? ""}
            className="absolute inset-0 h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: `url("${activeImage.url}")`,
            }}
          />

          {/* Clean Dark Overlay for Sharp Contrast */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#090d16]/95 via-[#090d16]/70 to-[#090d16]/20 md:from-[#090d16]/90 md:via-[#090d16]/50 md:to-transparent"
          />

          {/* Content Container */}
          <div className="relative z-10 flex h-full min-h-[520px] items-center px-6 py-16 sm:px-12 md:min-h-[620px] md:px-20 lg:px-32">
            <div className="max-w-xl">
              {/* Split Title Animation */}
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl md:leading-[1.12] overflow-hidden flex flex-wrap">
                {titleText.split(" ").map((word, wordIndex) => (
                  <span key={wordIndex} className="inline-block overflow-hidden mr-[0.25em]">
                    <motion.span
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      transition={{
                        delay: 0.1 + wordIndex * 0.04,
                        duration: 0.45,
                        ease: [0.215, 0.61, 0.355, 1],
                      }}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </h2>

              {/* Split Description Animation */}
              <p className="mb-8 max-w-lg text-base font-normal leading-relaxed text-slate-300 sm:text-lg overflow-hidden flex flex-wrap">
                {descriptionText.split(" ").map((word, wordIndex) => (
                  <span key={wordIndex} className="inline-block overflow-hidden mr-[0.25em]">
                    <motion.span
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      transition={{
                        delay: 0.25 + wordIndex * 0.015,
                        duration: 0.4,
                        ease: [0.215, 0.61, 0.355, 1],
                      }}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </p>

              {activeImage.ctaLink && (
                <motion.div
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.4, ease: "easeOut" }}
                >
                  <Link
                    href={activeImage.ctaLink}
                    className="group/btn inline-flex items-center gap-2 rounded-full bg-[#ed3237] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#d12930] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    <span>{activeImage.ctaLabel?.trim() || "Learn More"}</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Floating Modern Pill Dock (Controls & Indicators) */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-6 z-20 md:bottom-8 md:left-20 lg:left-32">
          <div className="flex items-center gap-4 rounded-full border border-white/15 bg-[#090d16]/80 px-4 py-2 text-white">
            {/* Slide Index Counter */}
            <span className="text-xs font-mono font-medium tracking-wider text-slate-400">
              {String(activeIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </span>

            <div className="h-3 w-px bg-white/20" />

            {/* Progress Pill Indicators */}
            <div className="flex items-center gap-1.5">
              {images.map((_, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => paginate(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300"
                    style={{
                      width: isActive ? "24px" : "6px",
                      backgroundColor: isActive ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.4)",
                    }}
                  >
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-[#ed3237]"
                        initial={{ width: "0%" }}
                        animate={{ width: isPaused ? "0%" : "100%" }}
                        transition={{ duration: autoSlideDelay / 1000, ease: "linear" }}
                        key={activeIndex}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="h-3 w-px bg-white/20" />

            {/* Compact Arrows */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous slide"
                className="p-1 rounded-full text-slate-300 transition-colors hover:text-white hover:bg-white/10"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next slide"
                className="p-1 rounded-full text-slate-300 transition-colors hover:text-white hover:bg-white/10"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}