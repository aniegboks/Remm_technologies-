"use client";

import { FC, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Container from "@/components/ui/container";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicNextImage } from "@prismicio/next";
import { motion } from "framer-motion";
import { PrismicRichText } from "@prismicio/react";

export type ClientCarouselProps = SliceComponentProps<Content.ClientCarouselSlice>;

interface ClientGroupItem {
  client_img: any;
  client_name: any;
}

const ClientCarousel: FC<ClientCarouselProps> = ({ slice }) => {
  const [isHovered, setIsHovered] = useState(false);

  const midPoint = Math.ceil(slice.primary.client_group.length / 2);
  const leftCol = slice.primary.client_group.slice(0, midPoint);
  const rightCol = slice.primary.client_group.slice(midPoint);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-24 bg-white overflow-hidden selection:bg-black selection:text-white"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* CONTENT SIDE */}
          <div className="lg:col-span-5 z-10">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-[10px] font-mono font-bold uppercase tracking-[0.5em] text-[#034966] mb-6 block"
            >
              (05) Trust // Network
            </motion.span>

            <h2 className="text-5xl md:text-6xl font-body font-medium tracking-tighter text-black leading-[0.95] mb-8">
              Collaborating <br />
              <span className="italic font-serif text-neutral-300 text-4xl md:text-5xl">Global Leaders</span>
            </h2>

            <div className="max-w-sm text-sm font-body text-neutral-500 leading-relaxed mb-10">
              {slice.primary.clients_heading}
            </div>

            {slice.primary.client_button.map((item, i) => (
              <PrismicNextLink
                key={i}
                field={item.client_link}
                className="inline-flex items-center gap-4 group"
              >
                <span className="px-6 py-3 bg-black text-white rounded-full text-[10px] font-mono uppercase tracking-[0.2em] transition-all">
                  {item.client_label}
                </span>
              </PrismicNextLink>
            ))}
          </div>

          {/* AUTO-MOVING CAROUSEL SIDE */}
          <div 
            className="lg:col-span-7 relative h-[500px] flex gap-4 overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* COLUMN 1: UPWARD */}
            <motion.div
              animate={{ y: isHovered ? undefined : [0, -1200] }}
              transition={{ 
                ease: "linear", 
                duration: 45, 
                repeat: Infinity 
              }}
              className="flex-1 flex flex-col gap-4"
            >
              {[...leftCol, ...leftCol, ...leftCol].map((item, index) => (
                <ClientCard key={index} item={item as unknown as ClientGroupItem} />
              ))}
            </motion.div>

            {/* COLUMN 2: DOWNWARD */}
            <motion.div
              animate={{ y: isHovered ? undefined : [-1200, 0] }}
              transition={{ 
                ease: "linear", 
                duration: 45, 
                repeat: Infinity 
              }}
              className="flex-1 flex flex-col gap-4"
            >
              {[...rightCol, ...rightCol, ...rightCol].map((item, index) => (
                <ClientCard key={index} item={item as unknown as ClientGroupItem} />
              ))}
            </motion.div>

            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white via-white/80 to-transparent z-10" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent z-10" />
          </div>
        </div>
      </Container>
    </section>
  );
};

const ClientCard = ({ item }: { item: ClientGroupItem }) => (
  <div className="relative aspect-[1.3/1] bg-neutral-50 rounded-2xl p-6 flex flex-col items-center justify-between border border-neutral-100 transition-all duration-500 hover:bg-neutral-100/50">
    {/* Spacer to push logo to center-ish */}
    <div className="h-4" />
    
    <div className="relative w-full h-8 grayscale opacity-60">
      <PrismicNextImage
        field={item.client_img}
        fill
        className="object-contain px-2"
      />
    </div>

    {/* CLIENT NAME AT THE BOTTOM */}
    <div className="w-full text-center mt-4">
      <div className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 font-bold">
        <PrismicRichText field={item.client_name} />
      </div>
    </div>
  </div>
);

export default ClientCarousel;