"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { motion } from "framer-motion";

export type PartnersCarouselProps = SliceComponentProps<Content.PartnersCarouselSlice>;

const PartnersCarousel: FC<PartnersCarouselProps> = ({ slice }) => {
  const items = slice.primary.partners_carousel;
  
  // Split items for two rows
  const firstRow = items.slice(0, Math.ceil(items.length / 2));
  const secondRow = items.slice(Math.ceil(items.length / 2));

  return (
    <section className="py-24 bg-white overflow-hidden border-y border-neutral-100">
      <div className="flex flex-col gap-16">
        
        {/* Centered Minimalist Label */}
        <div className="flex flex-col items-center text-center px-6">
          <p className="text-[11px] font-body uppercase tracking-[0.4em] text-neutral-400 font-bold">
            Collaborators & Partners
          </p>
          {/* Optional: Add a tiny divider for extra detail */}
          <div className="w-8 h-[1px] bg-neutral-200 mt-4" />
        </div>

        {/* The Marquee Container with edge fading mask */}
        <div className="flex flex-col gap-10 relative [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
          
          {/* ROW 1: RIGHT TO LEFT */}
          <div className="flex overflow-hidden">
            <motion.div 
              className="flex flex-nowrap gap-20 pr-20"
              animate={{ x: [0, -1500] }} 
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 50,
                  ease: "linear",
                },
              }}
            >
              {[...firstRow, ...firstRow, ...firstRow].map((item, index) => (
                <PartnerCard key={`row1-${index}`} item={item} />
              ))}
            </motion.div>
          </div>

          {/* ROW 2: LEFT TO RIGHT */}
          <div className="flex overflow-hidden">
            <motion.div 
              className="flex flex-nowrap gap-20 pr-20"
              initial={{ x: -1500 }}
              animate={{ x: 0 }} 
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 55, 
                  ease: "linear",
                },
              }}
            >
              {[...secondRow, ...secondRow, ...secondRow].map((item, index) => (
                <PartnerCard key={`row2-${index}`} item={item} />
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

// Reusable Sub-component
const PartnerCard = ({ item }: { item: any }) => (
  <div className="flex items-center gap-6 flex-shrink-0 group cursor-default">
    <div className="w-10 h-10 relative grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
      <PrismicNextImage 
        field={item.partner_img} 
        fill 
        className="object-contain" 
      />
    </div>
    
    <div className="text-[20px] md:text-[24px] font-body font-light text-neutral-400 capitalize tracking-tight group-hover:text-black transition-colors duration-500">
      <PrismicRichText field={item.partner_heading} />
    </div>
  </div>
);

export default PartnersCarousel;