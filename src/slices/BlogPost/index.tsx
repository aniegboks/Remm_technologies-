"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";
import { motion } from "framer-motion";
import Container from "@/components/ui/container";

export type BlogPostProps = SliceComponentProps<Content.BlogPostSlice>;

const BlogPost: FC<BlogPostProps> = ({ slice }) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="py-24 md:py-48 bg-[#F9F9F9] text-slate-900"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
          <div className="lg:col-span-8">
            {/* Staggered text entrance */}
            <motion.div 
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="flex items-center gap-3 mb-10"
            >
              <span className="w-2 h-2 rounded-full bg-slate-900" />
              <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-slate-400">Editorial / 2026</span>
            </motion.div>

            <motion.div 
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="mb-12 [&_h1]:text-5xl [&_h1]:md:text-[clamp(2.5rem,6vw,5.5rem)] [&_h1]:font-medium [&_h1]:leading-[1.05] [&_h1]:tracking-tight"
            >
              <PrismicRichText field={slice.primary.blog_heading} />
            </motion.div>

            {/* THE ZOOM IMAGE: Starts large and scales down */}
            <motion.div 
              initial={{ scale: 1.5, clipPath: "inset(10% 10% 10% 10% round 5rem)" }}
              animate={{ scale: 1, clipPath: "inset(0% 0% 0% 0% round 3rem)" }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
              className="relative aspect-[16/10] w-full overflow-hidden mb-16 shadow-2xl shadow-black/10"
            >
              <PrismicNextImage field={slice.primary.blog_image} fill className="object-cover" />
            </motion.div>

            <motion.div 
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="max-w-2xl text-lg md:text-xl text-slate-600 leading-relaxed [&_p]:mb-6"
            >
              {slice.primary.blog_content}
            </motion.div>
          </div>

          {/* Sidebar - Slides in from the right */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="lg:col-span-4 lg:pt-40"
          >
            <div className="sticky top-24 flex flex-col gap-10">
              <div className="p-8 bg-white rounded-[2rem] shadow-sm border border-slate-100">
                <PrismicRichText field={slice.primary.sub_heading} />
                <div className="text-slate-700 italic font-serif text-lg mt-4">{slice.primary.sub_heading_content}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </motion.section>
  );
};

export default BlogPost;