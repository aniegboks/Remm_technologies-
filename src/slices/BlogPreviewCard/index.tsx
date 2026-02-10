"use client";

import { FC, useRef } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Container from "@/components/ui/container";

export type BlogPreviewCardProps = SliceComponentProps<Content.BlogPreviewCardSlice>;

const BlogPreviewCard: FC<BlogPreviewCardProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-24 md:py-48 bg-[#fdfdfd] text-slate-900 overflow-hidden"
    >
      <Container>
        <div className="flex flex-col gap-32 md:gap-56">
          {/* Mapping through the Blog Group */}
          {slice.primary.blog_group.map((item, index) => (
            <BlogCardItem key={index} item={item} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
};

const BlogCardItem = ({ item, index }: { item: any; index: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax and Zoom Logic
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.15]);
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity }}
      className="group relative grid grid-cols-1 md:grid-cols-12 gap-12 items-center"
    >
      {/* 1. Blog Image - Alternating Sides */}
      <div className={`md:col-span-7 ${index % 2 !== 0 ? "md:order-last" : ""}`}>
        <motion.div 
          className="relative overflow-hidden aspect-[14/9] rounded-[2.5rem] md:rounded-[4rem] bg-slate-100 shadow-xl shadow-black/5"
          whileHover={{ scale: 0.98 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div style={{ scale: smoothScale, y: smoothY }} className="relative h-full w-full">
            <PrismicNextImage 
              field={item.blog_image} 
              fill 
              className="object-cover"
              priority={index < 2}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* 2. Content Column */}
      <div className={`md:col-span-5 flex flex-col ${index % 2 !== 0 ? "md:pr-12" : "md:pl-12"}`}>
        
        {/* Blog Text (Category/Tag) */}
        <div className="flex items-center gap-4 mb-6">
          <span className="h-[1px] w-10 bg-slate-200" />
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-slate-400">
            {item.blog_text}
          </span>
        </div>

        {/* Blog Heading */}
        <div className="relative mb-6 overflow-hidden">
          <motion.div 
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="[&_h2]:text-4xl [&_h2]:md:text-6xl [&_h2]:font-medium [&_h2]:leading-[1.1] [&_h2]:tracking-tighter [&_h2]:text-slate-950"
          >
            <PrismicRichText field={item.blog_heading} />
          </motion.div>
        </div>

        {/* Blog Caption */}
        <p className="mb-10 max-w-sm text-slate-500 font-serif italic text-lg leading-relaxed">
          {item.blog_caption}
        </p>

        {/* Blog Link */}
        <PrismicNextLink
          field={item.blog_label}
          className="inline-flex items-center gap-5 group/link w-fit"
        >
          <div className="relative h-12 w-12 flex items-center justify-center rounded-full border border-slate-200 bg-white group-hover/link:bg-slate-900 transition-all duration-500 group-hover/link:scale-110">
            <svg 
              width="15" height="15" viewBox="0 0 15 15" fill="none" 
              className="text-slate-900 group-hover/link:text-white transition-colors duration-500"
            >
              <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" />
            </svg>
          </div>
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">
            Read more 
          </span>
        </PrismicNextLink>
      </div>
    </motion.div>
  );
};

export default BlogPreviewCard;