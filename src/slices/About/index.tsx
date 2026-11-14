"use client";

import { Content } from "@prismicio/client";
import {
  SliceComponentProps,
  PrismicRichText,
} from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Container from "@/components/ui/container";

export type AboutProps = SliceComponentProps<Content.AboutSlice>;

export default function About({ slice }: AboutProps) {
  const {
    about_img,
    heading,
    intro,
    second_paragraph,
    second_about_img,
  } = slice.primary;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-white py-16 text-slate-800 lg:py-24"
    >
      <Container>
        <div className="flex flex-col gap-16 lg:gap-24">
          {/* ROW 1: IMAGE LEFT, HEADING AND PARAGRAPH RIGHT */}
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              {about_img?.url && (
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-slate-50">
                  <PrismicNextImage
                    field={about_img}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col space-y-5 lg:col-span-6">
              {heading && (
                <h2 className="text-xl leading-snug font-medium tracking-tight text-slate-900 sm:text-2xl">
                  {heading}
                </h2>
              )}

              {intro && (
                <div className="space-y-4 text-sm leading-relaxed text-slate-500 sm:text-base">
                  <PrismicRichText field={intro} />
                </div>
              )}
            </div>
          </div>

          {/* ROW 2: SECOND PARAGRAPH LEFT, SECOND IMAGE RIGHT */}
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14">
            <div className="order-2 flex flex-col space-y-4 lg:order-1 lg:col-span-6">
              {second_paragraph && (
                <div className="space-y-4 text-sm leading-relaxed text-slate-500 sm:text-base">
                  <PrismicRichText field={second_paragraph} />
                </div>
              )}
            </div>

            <div className="order-1 lg:order-2 lg:col-span-6">
              {second_about_img?.url && (
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-slate-50">
                  <PrismicNextImage
                    field={second_about_img}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}