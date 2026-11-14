"use client";

import { FC, useState, useEffect } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Carousel from "@/components/ui/carousel";
import { motion } from "framer-motion";
import { asLink, isFilled } from "@prismicio/client";

export type MetricProps = SliceComponentProps<Content.ContentSlice>;

const Metric: FC<MetricProps> = ({ slice }) => {
  const [isLoading, setIsLoading] = useState(true);

  // High-performance loading simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setIsLoading(false);
    }, 400);
    return () => clearInterval(timer);
  }, []);

  // Map images and text fields from Prismic repeatable zone
  const carouselImages = (slice.primary.gallery_img ?? [])
    .filter((item) => Boolean(item.gal_img?.url))
    .map((item, index) => ({
      url: item.gal_img!.url!,
      alt: item.gal_img!.alt || `Portfolio image ${index + 1}`,
      title: item.title ?? undefined,
      description: item.description ?? undefined,
      ctaLabel: item.cta_label ?? undefined,
      ctaLink: isFilled.link(item.cta_link)
        ? asLink(item.cta_link) ?? undefined
        : undefined,
    }));

  return (
    <section className="relative w-full h-[45vh] bg-[#f8f9fa] overflow-hidden">

      {/* FULL-WIDTH HARDWARE CAROUSEL FRAME (~60vh height, zero horizontal margins) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={!isLoading ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="relative w-full h-full"
      >
        <div className="w-full h-full bg-white">
          <div className="relative overflow-hidden w-full h-full">
            {!isLoading && <Carousel images={carouselImages} />}
          </div>
        </div>
      </motion.div>

    </section>
  );
};

export default Metric;