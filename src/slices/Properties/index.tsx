"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";
import Container from "@/components/ui/container";
import { RevealAnimation } from "@/utils/reveal_animation";

export type PropertiesProps = SliceComponentProps<Content.PropertiesSlice>;

const Properties: FC<PropertiesProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative py-24 bg-[#FCFCFC] z-30"
    >
      <Container>
        {/* HEADER SECTION: Wrapped in a single div to fix children error */}
        <RevealAnimation>
          <div className="max-w-3xl mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-[#034966]" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[#034966]">
                Product Ecosystem
              </span>
            </div>
            <div className="text-4xl md:text-6xl font-heading font-semibold tracking-tighter text-neutral-900 mb-6">
              <PrismicRichText field={slice.primary.heading} />
            </div>
            <div className="text-lg text-neutral-500 font-body max-w-xl leading-relaxed">
              <PrismicRichText field={slice.primary.paragraph} />
            </div>
          </div>
        </RevealAnimation>

        {/* BENTO GRID: Wrapped in a single div to fix children error */}
        <RevealAnimation>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* CARD 1: LARGE IMAGE (Spans 8) */}
            {slice.primary.image_navigator[0] && (
              <div className="md:col-span-8 group relative overflow-hidden rounded-[2rem] border border-neutral-100 bg-white p-2 h-[500px]">
                <PrismicNextLink field={slice.primary.image_navigator[0].navigator_link} className="block h-full relative overflow-hidden rounded-[1.8rem]">
                  {/* Internal wrapper div for the Link */}
                  <div className="relative h-full w-full">
                    <PrismicNextImage 
                      field={slice.primary.image_navigator[0].display_img} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-8 left-8 text-white">
                      <div className="text-2xl font-heading font-bold tracking-tight">
                        <PrismicRichText field={slice.primary.image_navigator[0].heading} />
                      </div>
                      <div className="text-sm opacity-80 font-body mt-2">
                        <PrismicRichText field={slice.primary.image_navigator[0].paragraph} />
                      </div>
                    </div>
                  </div>
                </PrismicNextLink>
              </div>
            )}

            {/* CARD 2: TECHNICAL ACCENT (Spans 4) */}
            <div className="md:col-span-4 rounded-[2rem] bg-[#034966] p-8 flex flex-col justify-between text-white shadow-xl shadow-bg-[#034966]">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20 text-xl">
                ✧
              </div>
              <div>
                <h4 className="text-xl font-heading font-bold mb-2 tracking-tight">Business Applications and Development</h4>
                <p className="text-indigo-100 text-sm font-body leading-relaxed">
                  Custom-built low code solutions tailored to your business needs, ensuring seamless integration and optimal performance.
                </p>
              </div>
            </div>

            {/* CARD 3: SECONDARY IMAGE (Spans 4) */}
            {slice.primary.image_navigator[1] && (
              <div className="md:col-span-4 group relative overflow-hidden rounded-[2rem] border border-neutral-100 bg-white p-2 h-[400px]">
                <PrismicNextLink field={slice.primary.image_navigator[1].navigator_link} className="block h-full relative overflow-hidden rounded-[1.8rem]">
                  <div className="relative h-full w-full">
                    <PrismicNextImage 
                      field={slice.primary.image_navigator[1].display_img} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                      <div className="text-xl font-heading font-bold text-white leading-tight tracking-tight">
                        <PrismicRichText field={slice.primary.image_navigator[1].heading} />
                      </div>
                    </div>
                  </div>
                </PrismicNextLink>
              </div>
            )}

            {/* CARD 4: DATA METRIC (Spans 4) */}
            <div className="md:col-span-4 rounded-[2rem] border border-neutral-100 bg-white p-8 flex flex-col justify-center items-center text-center">
              <div className="text-5xl font-heading font-bold tracking-tighter text-neutral-900 mb-2">99.9%</div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-neutral-400">System Uptime</span>
              <div className="mt-8 flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-neutral-100" />
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-white bg-[#034966]/20 flex items-center justify-center text-[9px] font-bold text-[#034966]">
                  +12k
                </div>
              </div>
            </div>

            {/* CARD 5: FINAL IMAGE (Spans 4) */}
            {slice.primary.image_navigator[2] && (
              <div className="md:col-span-4 group relative overflow-hidden rounded-[2rem] border border-neutral-100 bg-white p-2 h-[400px]">
                <PrismicNextLink field={slice.primary.image_navigator[2].navigator_link} className="block h-full relative overflow-hidden rounded-[1.8rem]">
                  <div className="relative h-full w-full">
                    <PrismicNextImage 
                      field={slice.primary.image_navigator[2].display_img} 
                      fill 
                      className="object-cover brightness-95 group-hover:brightness-100 transition-all duration-700"
                    />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-sm border border-white/50">
                        <div className="text-sm font-heading font-bold text-neutral-900 tracking-tight">
                          <PrismicRichText field={slice.primary.image_navigator[2].heading} />
                        </div>
                      </div>
                    </div>
                  </div>
                </PrismicNextLink>
              </div>
            )}
          </div>
        </RevealAnimation>
      </Container>
    </section>
  );
};

export default Properties;