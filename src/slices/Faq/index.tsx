"use client";

import { FC, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import Container from "@/components/ui/container";
import { RevealAnimation } from "@/utils/reveal_animation";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

export type FaqProps = SliceComponentProps<Content.FaqSlice>;

const Faq: FC<FaqProps> = ({ slice }) => {
  const [displayIndex, setDisplayIndex] = useState<number | null>(null);

  return (
    <section className="py-32 bg-[#FCFCFC]">
      <Container>
        <RevealAnimation>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* LEFT SIDE: Heading */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[#034966] mb-4 block">
                Information_Base
              </span>
              <span className="text-4xl md:text-5xl font-heading font-semibold tracking-tighter text-neutral-900 mb-6 leading-[0.95]">
                <PrismicRichText field={slice.primary.heading} />
              </span>
              <div className="text-lg text-neutral-500 font-body leading-relaxed max-w-sm">
                <PrismicRichText field={slice.primary.sub_heading} />
              </div>
            </div>

            {/* RIGHT SIDE: Interactive Accordion */}
            <div className="lg:col-span-7">
              <div className="flex flex-col gap-3">
                {slice.primary.question.map(({ question, answer }, i) => {
                  const isOpen = displayIndex === i;
                  return (
                    <motion.div
                      key={i}
                      initial={false}
                      animate={{ backgroundColor: isOpen ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)" }}
                      className={twMerge(
                        "rounded-[1.5rem] border transition-all duration-500 overflow-hidden",
                        isOpen ? "border-neutral-200 shadow-xl shadow-neutral-200/40" : "border-transparent hover:border-neutral-200"
                      )}
                    >
                      <button
                        className="flex w-full items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                        onClick={() => setDisplayIndex(isOpen ? null : i)}
                      >
                        <div className="text-xl font-heading font-medium tracking-tight text-neutral-900 pr-4">
                          <PrismicRichText field={question} />
                        </div>
                        
                        {/* --- CUSTOM INTERACTIVE DROP ICON --- */}
                        <div className={twMerge(
                          "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-500",
                          isOpen ? " bg-[#034966] text-white rotate-180" : "bg-neutral-100 text-neutral-500"
                        )}>
                          <svg 
                            width="12" 
                            height="8" 
                            viewBox="0 0 12 8" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                            className="transition-transform"
                          >
                            <path 
                              d="M1 1.5L6 6.5L11 1.5" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <div className="px-8 pb-8 font-body text-base leading-relaxed text-neutral-500 max-w-2xl">
                              <PrismicRichText field={answer} />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </div>
        </RevealAnimation>
      </Container>
    </section>
  );
};

export default Faq;