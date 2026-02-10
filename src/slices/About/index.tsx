"use client";

import { FC, useRef } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";
import { motion, useScroll, useTransform } from "framer-motion";
import Container from "@/components/ui/container";
import Button from "@/components/ui/button";

export type AboutProps = SliceComponentProps<Content.AboutSlice>;

const About: FC<AboutProps> = ({ slice }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // We use scrollYProgress to track the intersection of this section with the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Sophisticated Parallax: Text moves slightly faster than scroll for "float" feel
  const textY = useTransform(scrollYProgress, [0, 0.5], [150, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      ref={containerRef}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      /* CRITICAL: 
         - relative z-10: Higher than Hero's z-0
         - min-h-screen: Ensures enough scroll space to see the reveal
         - bg-white: To fully cover the sticky Hero
      */
      className="relative z-10 min-h-40dvh bg-white shadow-[0_-50px_100px_rgba(0,0,0,0.1)]"
    >
      {/* Visual Transition: Top edge rounded for a "Sheet" feel */}
      <div className="absolute top-0 left-0 w-full h-32 -translate-y-full bg-gradient-to-t from-white to-transparent pointer-events-none" />

      <Container>
        <div className="py-32 md:py-56">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left: Editorial Content */}
            <div className="lg:col-span-7">
              <motion.div style={{ y: textY }} className="space-y-12">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-neutral-400">
                    // 01 The Mission
                  </span>
                </div>

                <div className="text-[clamp(2.5rem,6vw,5.5rem)] font-heading font-medium leading-[0.95] tracking-tighter text-neutral-900">
                   {slice.primary.links.map(({ about, label }) => (
                      <PrismicNextLink key={label} field={about} className="block transition-all duration-700 hover:text-[#034966]">
                        {label}<span className="text-[#034966]">.</span>
                      </PrismicNextLink>
                    ))}
                </div>

                <div className="max-w-md border-l border-neutral-100 pl-10 space-y-8">
                   <div className="text-lg text-neutral-500 font-body leading-relaxed">
                      {slice.variation === "default" ? (
                        <PrismicRichText field={slice.primary.history} />
                      ) : (
                        <PrismicRichText field={slice.primary.caption} />
                      )}
                   </div>
                   
                   <div className="flex gap-4">
                    {slice.primary.links.map(({ about, label }) => (
                      <PrismicNextLink key={label} field={about}>
                        <Button
                          variant="secondary"
                          className="rounded-full px-8 py-4 border-neutral-200 text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-500"
                        >
                          Discover More
                        </Button>
                      </PrismicNextLink>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: Parallax Image Column */}
            <div className="lg:col-span-5 relative">
              {slice.primary.about_img?.url && (
                <div className="relative aspect-4/5 rounded-4xl overflow-hidden bg-neutral-50 shadow-2xl">
                  <motion.div 
                    style={{ y: imageY }}
                    className="absolute inset-[-10%] w-[120%] h-[120%]"
                  >
                    <PrismicNextImage
                      field={slice.primary.about_img}
                      fill
                      className="object-cover brightness-[0.95]"
                    />
                  </motion.div>
                  {/* Glassmorphic Caption */}
                  <div className="absolute top-6 right-6 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                     <span className="text-[9px] font-mono text-white/90 uppercase tracking-widest">Aesthetics.v01</span>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </Container>

      {/* Background Micro-Detail */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-neutral-100" />
    </section>
  );
};

export default About;