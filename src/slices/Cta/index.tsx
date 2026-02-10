"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Container from "@/components/ui/container";
import ContactForm from "@/components/ui/form";
import { PrismicNextImage } from "@prismicio/next";
import { motion } from "framer-motion";

export type CtaProps = SliceComponentProps<Content.CtaSlice>;

const Cta: FC<CtaProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-32 bg-white selection:bg-black selection:text-white"
    >
      <Container>
        <div className="max-w-7xl mx-auto">
          {/* HEADER SECTION */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-4xl">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-[10px] font-body uppercase tracking-[0.4em] text-neutral-400 mb-8 block font-bold"
              >
                (03) Contact // Inquiry
              </motion.span>
              <h2 className="text-6xl md:text-[9rem] font-body font-medium tracking-tighter text-black leading-[0.8] capitalize">
                Start your <br /> 
                <span className="md:ml-32 italic font-serif text-neutral-200 hover:text-black transition-colors duration-700">Journey</span>
              </h2>
            </div>
            
            <div className="hidden lg:block pb-6">
              <p className="text-[11px] font-body text-neutral-400 max-w-[180px] leading-relaxed uppercase tracking-widest">
                Global collaborations <br /> based in Summer 2026.
              </p>
            </div>
          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 border-t-[1px] border-black pt-16 gap-12 lg:gap-0">
            
            {/* LEFT: IMAGE & LUXURY CONTACT INFO */}
            <div className="lg:col-span-5 lg:pr-20 group">
              <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100 mb-16">
                <PrismicNextImage
                  field={slice.primary.cta_img}
                  fill
                  className="object-cover grayscale transition-all duration-[1.5s] cubic-bezier(0.16, 1, 0.3, 1) group-hover:grayscale-0 group-hover:scale-105"
                />
              </div>
              
              {/* CONTACT DETAILS - RESTRUCTURED FOR BREATHING ROOM */}
              <div className="space-y-16">
                {/* Location - Full Width */}
                <div className="border-b border-neutral-100 pb-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 mb-6">Location</p>
                  <p className="text-lg font-body text-black leading-tight max-w-[320px]">
                    Health Rite Building, LakeView pack 1 Estate <br />
                    opp. VGC Ikota shopping complex.
                  </p>
                </div>

                {/* Sub-grid for Email/Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="group/link">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 mb-4">Email</p>
                    <a href="mailto:ruth.c@remmtechnologies.com" className="text-base font-body text-black block overflow-hidden relative">
                      <span className="inline-block transition-transform duration-500 group-hover/link:-translate-y-full">ruth.c@remmtechnologies.com</span>
                      <span className="absolute top-0 left-0 inline-block transition-transform duration-500 translate-y-full group-hover/link:translate-y-0 text-neutral-400">Send Inquiry</span>
                    </a>
                  </div>
                  
                  <div className="group/link">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 mb-4">Phone</p>
                    <a href="tel:+2348135639774" className="text-base font-body text-black block overflow-hidden relative">
                       <span className="inline-block transition-transform duration-500 group-hover/link:-translate-y-full">+234 813 563 9774</span>
                       <span className="absolute top-0 left-0 inline-block transition-transform duration-500 translate-y-full group-hover/link:translate-y-0 text-neutral-400">Call Office</span>
                    </a>
                  </div>
                </div>

                <div className="pt-8 flex items-center gap-4">
                   <div className="w-8 h-[1px] bg-black/20" />
                   <p className="text-[10px] text-neutral-300 uppercase tracking-[0.4em]">Available // Mon — Fri</p>
                </div>
              </div>
            </div>

            {/* RIGHT: FORM COLUMN */}
            <div className="lg:col-span-7 lg:pl-20 lg:border-l-[1px] border-neutral-100">
              <div className="max-w-xl">
                <div className="mb-20">
                  <h3 className="text-5xl font-body font-medium text-black mb-8 capitalize tracking-tight leading-tight">
                    Tell us about <br /> your project.
                  </h3>
                  <p className="text-neutral-500 text-xl font-body leading-relaxed">
                    We specialize in transforming complex visions into architectural landmarks. 
                    Reach out to begin the dialogue.
                  </p>
                </div>

                {/* FORM STYLING - REFINED FOR AWARDS LOOK */}
                <div className="
                  [&_input]:bg-transparent 
                  [&_input]:border-b-[1px] 
                  [&_input]:border-neutral-200 
                  [&_input]:text-xl
                  [&_input]:font-body
                  [&_input]:py-8 
                  [&_input]:px-0 
                  [&_input]:rounded-none 
                  [&_input]:transition-all 
                  [&_input:focus]:border-black 
                  [&_input:focus]:outline-none
                  [&_input]:placeholder:text-neutral-200
                  
                  [&_textarea]:bg-transparent 
                  [&_textarea]:border-b-[1px] 
                  [&_textarea]:border-neutral-200 
                  [&_textarea]:text-xl
                  [&_textarea]:py-8
                  [&_textarea]:rounded-none 
                  [&_textarea:focus]:border-black
                  [&_textarea:focus]:outline-none
                  [&_textarea]:placeholder:text-neutral-200

                  [&_label]:text-[10px] 
                  [&_label]:uppercase 
                  [&_label]:tracking-[0.3em] 
                  [&_label]:font-bold 
                  [&_label]:text-neutral-400
                  
                  [&_button]:bg-black 
                  [&_button]:text-white 
                  [&_button]:rounded-full 
                  [&_button]:w-full
                  [&_button]:md:w-auto
                  [&_button]:px-14 
                  [&_button]:py-6 
                  [&_button]:uppercase 
                  [&_button]:text-[10px] 
                  [&_button]:font-bold 
                  [&_button]:tracking-[0.3em] 
                  [&_button]:mt-12
                  [&_button]:transition-all
                  [&_button]:duration-500
                  [&_button]:hover:bg-neutral-800
                ">
                  <ContactForm />
                </div>
              </div>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
};

export default Cta;