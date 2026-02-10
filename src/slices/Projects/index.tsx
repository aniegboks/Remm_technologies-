"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import Container from "@/components/ui/container";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicNextImage } from "@prismicio/next";
import { MapPin, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export type RecentProps = SliceComponentProps<Content.RecentSlice>;

const Recent: FC<RecentProps> = ({ slice }) => {
  return (
    <section className="py-24 bg-[#fbfbfb] overflow-hidden selection:bg-black selection:text-white">
      <Container>
        {/* HEADER SECTION */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.5em] text-[#034966] mb-4 block">
              Selection // 002
            </span>
            <div className="text-5xl md:text-7xl font-body font-medium tracking-tighter text-black leading-[0.85]">
              <PrismicRichText field={slice.primary.heading} />
            </div>
            <div className="mt-6 text-sm md:text-base font-body text-neutral-500 max-w-md leading-relaxed">
              <PrismicRichText field={slice.primary.paragraph} />
            </div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             className="flex gap-4"
          >
            {slice.primary.navigator.map(({ link, label }) => (
              <PrismicNextLink 
                key={label} 
                field={link}
                className="group flex items-center gap-2 px-6 py-3 bg-white border border-neutral-200 rounded-full text-[11px] font-mono uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-500"
              >
                {label}
                <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform duration-300" />
              </PrismicNextLink>
            ))}
          </motion.div>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 auto-rows-[300px] md:auto-rows-[350px] gap-4">
          {slice.primary.image_navigator.map(
            ({ display_img, display_link, display_text, display_geo }, index) => {
              // Logic to create the Bento pattern
              // Card 1: Large (spans 2x2)
              // Card 2: Tall (spans 1x2)
              // Card 3 & 4: Small (spans 1x1)
              const isLarge = index === 0;
              const isTall = index === 1;

              return (
                <motion.div
                  key={display_text}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`relative group overflow-hidden rounded-[2rem] bg-neutral-100 ${
                    isLarge ? "md:col-span-2 md:row-span-2" : 
                    isTall ? "md:col-span-2 md:row-span-2 lg:col-span-2" : 
                    "md:col-span-2 lg:col-span-2"
                  }`}
                >
                  <PrismicNextLink field={display_link} className="absolute inset-0 z-20">
                    <span className="sr-only">View {display_text}</span>
                  </PrismicNextLink>

                  {/* Image with Ken Burns Effect */}
                  <div className="absolute inset-0 z-0">
                    <PrismicNextImage
                      field={display_img}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0"
                    />
                    {/* Darker Gradient Overlay for Bento feel */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  </div>

                  {/* Top-Right Tag */}
                  <div className="absolute top-6 right-6 z-10">
                     <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-[-10px] group-hover:translate-y-0">
                        <ArrowUpRight size={18} />
                     </div>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-8 z-10">
                    <motion.div className="flex flex-col gap-2">
                       <span className="text-[9px] font-mono text-[#034966] uppercase tracking-[0.3em]">
                         Project.v0{index + 1}
                       </span>
                       <h3 className={`font-body font-medium text-white leading-none tracking-tighter ${
                         isLarge ? "text-4xl" : "text-2xl"
                       }`}>
                         {display_text}
                       </h3>
                       <div className="flex items-center text-white/50 mt-2">
                          <MapPin size={12} className="mr-2" />
                          <span className="text-[10px] font-mono uppercase tracking-widest">{display_geo}</span>
                       </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            }
          )}
        </div>
      </Container>
    </section>
  );
};

export default Recent;