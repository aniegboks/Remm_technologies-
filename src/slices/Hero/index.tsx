
"use client";

import { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { motion } from "framer-motion";
import Button from "@/components/ui/button";

export type HeroProps = {
  slice: Content.HeroSlice;
};

export default function Hero({ slice }: HeroProps) {
  const ease = [0.19, 1, 0.22, 1] as const;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative w-full min-h-[45dvh] bg-[#f8f9fa] overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[45dvh]">

        {/* LEFT: CORPORATE CONTENT */}
        <div className="flex items-center px-6 py-12 sm:px-12 lg:px-16 xl:px-24">
          <div className="w-full max-w-xl">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
            >
              {/* Eyebrow */}
              <div className="mb-6">
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#034966]">
                  Technology & Innovation
                </span>
              </div>

              {/* Heading */}
              <div className="text-[clamp(2.5rem,4.5vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-neutral-900 [&_p]:mb-0">
                <PrismicRichText field={slice.primary.heading} />
              </div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease }}
                className="mt-5 max-w-lg text-base md:text-lg leading-relaxed text-neutral-600 [&_p]:mb-0"
              >
                <PrismicRichText field={slice.primary.body} />
              </motion.div>

              {/* CTA Buttons */}
              {slice.variation === "default" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4, ease }}
                  className="flex flex-wrap items-center gap-4 mt-8"
                >
                  {slice.primary.button_group.map((item, index) => (
                    <PrismicNextLink
                      key={index}
                      field={item.button_link}
                    >
                      <Button
                        variant="outline"
                        className="rounded-none px-8 py-5 text-[11px] font-semibold uppercase tracking-[0.12em] border-neutral-900 bg-neutral-900 text-white hover:bg-[#034966] hover:border-[#034966] hover:text-white transition-colors duration-300"
                      >
                        {item.button_label}
                      </Button>
                    </PrismicNextLink>
                  ))}
                </motion.div>
              )}
            </motion.div>

          </div>
        </div>

        {/* RIGHT: FULL-HEIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease }}
          className="relative w-full min-h-[45dvh] overflow-hidden"
        >
          {slice.primary.image?.url && (
            <PrismicNextImage
              field={slice.primary.image}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          )}
        </motion.div>

      </div>
    </section>
  );
}
