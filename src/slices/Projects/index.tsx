
"use client";

import type { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import {
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { ArrowUpRight, MapPin, X } from "lucide-react";
import { motion } from "framer-motion";

import Container from "@/components/ui/container";

export type RecentProps = SliceComponentProps<Content.RecentSlice>;

const Recent: FC<RecentProps> = ({ slice }) => {
  const { heading, paragraph, navigator } = slice.primary;

  const cards = slice.items ?? [];

  return (
    <section className="bg-white py-20 selection:bg-neutral-900 selection:text-white">
      <Container>
        {/* Header */}
        <div className="mb-12 flex flex-col items-end justify-between gap-8 lg:flex-row">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            {isFilled.richText(heading) && (
              <div className="font-body text-3xl font-bold tracking-tight text-neutral-900 md:text-5xl">
                <PrismicRichText field={heading} />
              </div>
            )}

            {isFilled.richText(paragraph) && (
              <div className="mt-4 max-w-md font-body text-sm leading-relaxed text-neutral-500 md:text-base">
                <PrismicRichText field={paragraph} />
              </div>
            )}
          </motion.div>

          {navigator?.some(
            (item) => isFilled.link(item.link) && item.label?.trim()
          ) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-wrap gap-3"
              >
                {navigator.map((item, index) => {
                  if (!isFilled.link(item.link) || !item.label?.trim()) {
                    return null;
                  }

                  return (
                    <PrismicNextLink
                      key={`navigator-${index}`}
                      field={item.link}
                      className="group flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-5 py-2.5 text-xs font-medium text-neutral-900 transition-all duration-300 hover:bg-neutral-900 hover:text-white"
                    >
                      {item.label}
                      <ArrowUpRight
                        size={14}
                        className="transition-transform duration-300 group-hover:rotate-45"
                      />
                    </PrismicNextLink>
                  );
                })}
              </motion.div>
            )}
        </div>

        {/* Cards */}
        {cards.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((item, index) => {
              const title = item.display_text?.trim() || "";
              const location = item.display_geo?.trim() || "";
              const actionLabel =
                item.display_action_label?.trim() || "Learn more";

              const hasImage = isFilled.image(item.display_img);
              const hasLink = isFilled.link(item.display_link);

              return (
                <motion.article
                  key={`recent-card-${index}`}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-lg border border-neutral-200/80 bg-white transition-all duration-300 ease-out hover:border-neutral-300 hover:shadow-xs"
                >
                  {/* Card image */}
                  <div>
                    <div className="relative h-52 w-full overflow-hidden bg-neutral-100">
                      {hasImage && (
                        <PrismicNextImage
                          field={item.display_img}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}

                      {!hasImage && (
                        <div
                          className="flex h-full items-center justify-center text-sm text-neutral-400"
                          aria-hidden="true"
                        >
                          No image available
                        </div>
                      )}

                    </div>

                    {/* Card content */}
                    <div className="p-6">
                      {title && (
                        <h3 className="mb-2 text-xl font-bold tracking-tight text-neutral-900">
                          {title}
                        </h3>
                      )}

                      {location && (
                        <div className="mb-3 flex items-center text-xs text-neutral-500">
                          <span>{location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CMS-configurable action */}
                  <div className="px-6 pb-6 pt-0">
                    {hasLink ? (
                      <PrismicNextLink
                        field={item.display_link}
                        className="relative z-30 inline-flex items-center gap-1 text-xs font-semibold text-neutral-900 transition-colors hover:text-neutral-600"
                      >
                        {actionLabel}
                        <ArrowUpRight
                          size={13}
                          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </PrismicNextLink>
                    ) : (
                      <span className="inline-flex items-center text-xs font-semibold text-neutral-400">
                        {actionLabel}
                      </span>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
};

export default Recent;
