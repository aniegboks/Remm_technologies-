"use client";

import { FC, useState, useMemo } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { motion, AnimatePresence } from "framer-motion";

export type PartnerCardsProps = SliceComponentProps<Content.PartnerCardsSlice>;

const MotionLink = motion(PrismicNextLink);

const PartnerCards: FC<PartnerCardsProps> = ({ slice }) => {
  const [activeFilter, setActiveFilter] = useState("Popular");

  const categories = useMemo(() => {
    const tags = slice.primary.partner_card
      .map((item) => item.partner_tag)
      .filter(Boolean) as string[];
    const uniqueTags = Array.from(new Set(tags));
    return uniqueTags.includes("Popular") ? uniqueTags : ["Popular", ...uniqueTags];
  }, [slice.primary.partner_card]);

  const filteredPartners = useMemo(() => {
    return slice.primary.partner_card.filter(
      (item) => item.partner_tag === activeFilter,
    );
  }, [activeFilter, slice.primary.partner_card]);

  return (
    <section className="bg-white text-black py-24 md:py-32 px-6">
      {/* --- HERO SECTION --- */}
      <div className="max-w-7xl mx-auto mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#034966] mb-4 block">
              Our Ecosystem
            </span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[0.95] mb-8">
              {slice.primary.partner_title}
              <span className="text-[#034966]">.</span>
            </h1>
          </div>
          <div className="lg:col-span-4 lg:pt-12">
            <div className="text-gray-500 text-lg border-l-2 border-gray-100 pl-6 py-2">
              {slice.primary.partner_content}
            </div>
          </div>
        </div>

        {/* Restore Hero Image with Parallax Zoom */}
        <div className="mt-16 rounded-3xl overflow-hidden bg-gray-100 aspect-[21/9] relative group">
          <motion.div 
            className="w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
          >
            <PrismicNextImage
              field={slice.primary.partner_hero}
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* --- TABS --- */}
        <div className="flex flex-wrap items-center gap-x-10 gap-y-4 mb-16 border-b border-gray-100 pb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`text-sm uppercase tracking-widest font-medium transition-all relative py-2 ${
                activeFilter === cat ? "text-black" : "text-gray-400 hover:text-black"
              }`}
            >
              {cat}
              {activeFilter === cat && (
                <motion.span 
                  layoutId="activeTab" 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-[#034966]" 
                />
              )}
            </button>
          ))}
        </div>

        {/* --- GRID --- */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          <AnimatePresence mode="popLayout">
            {filteredPartners.map((item, index) => (
              <MotionLink
                key={`${activeFilter}-${index}`}
                field={item.partner_link}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover="hover"
                variants={{
                  hover: { 
                    y: -8,
                    transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } 
                  }
                }}
                className="group relative block bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-none"
              >
                <div className="relative p-8 flex flex-col min-h-[380px] z-10">
                  <div className="flex justify-between items-start mb-12">
                    {/* PARALLAX LOGO ZOOM */}
                    <motion.div 
                      className="w-14 h-14 relative"
                      variants={{
                        hover: { 
                          scale: 1.2,
                          x: 10,
                          y: -5,
                          transition: { duration: 0.5, ease: "easeOut" } 
                        }
                      }}
                    >
                      <PrismicNextImage
                        field={item.partner_image}
                        fill
                        className="object-contain grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                    </motion.div>
                    
                    {item.partner_tag && (
                      <span className="text-[10px] py-1 px-3 rounded-full bg-gray-50 text-gray-400 font-bold uppercase tracking-widest group-hover:text-[#034966] transition-colors">
                        {item.partner_tag}
                      </span>
                    )}
                  </div>

                  <div className="mt-auto">
                    <h2 className="text-2xl font-bold mb-3 tracking-tight">
                      {item.partner_heading}
                    </h2>
                    <div className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                      {item.partner_content}
                    </div>
                  </div>

                  {/* Arrow Slide */}
                  <motion.div 
                    variants={{
                      hover: { x: 10, color: "#034966" }
                    }}
                    className="absolute bottom-8 right-8 text-gray-300"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14m-7-7l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                </div>
              </MotionLink>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnerCards;