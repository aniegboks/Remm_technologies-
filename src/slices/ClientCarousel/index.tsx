"use client";

import { FC } from "react";
import Container from "@/components/ui/container";
import { motion } from "framer-motion";

interface ClientItem {
  name: string;
  logoUrl?: string;
}

const STATIC_CLIENTS: ClientItem[] = [
  { name: "Acme Corp" },
  { name: "Global Tech" },
  { name: "Nexus Industries" },
  { name: "Vortex Media" },
  { name: "Apex Solutions" },
  { name: "Zenith Labs" },
];

const ClientCarousel: FC = () => {
  return (
    <section className="py-24 bg-white overflow-hidden selection:bg-black selection:text-white">
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

            <p className="max-w-sm text-sm font-body text-neutral-500 leading-relaxed mb-10">
              We partner with industry-leading organizations to build exceptional products and scale globally.
            </p>

            <a
              href="#contact"
              className="inline-flex items-center gap-4 group"
            >
              <span className="px-6 py-3 bg-black text-white rounded-full text-[10px] font-mono uppercase tracking-[0.2em] transition-all hover:bg-neutral-800">
                Partner With Us
              </span>
            </a>
          </div>

          {/* STATIC GRID SIDE */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-4">
            {STATIC_CLIENTS.map((client, index) => (
              <div
                key={index}
                className="relative aspect-[1.3/1] bg-neutral-50 rounded-2xl p-6 flex flex-col items-center justify-between border border-neutral-100 transition-all duration-300 hover:bg-neutral-100/50 hover:border-neutral-200 shadow-sm"
              >
                {/* Spacer */}
                <div className="h-4" />

                {/* Logo Placeholder / Representation */}
                <div className="relative w-full flex items-center justify-center grayscale opacity-70">
                  <span className="font-bold tracking-wider text-neutral-800 text-sm md:text-base">
                    {client.name}
                  </span>
                </div>

                {/* Subtitle / Label */}
                <div className="w-full text-center mt-4">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 font-bold">
                    Partner
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
};

export default ClientCarousel;