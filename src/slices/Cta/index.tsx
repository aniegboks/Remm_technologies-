"use client";

import { asText, isFilled, type Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Container from "@/components/ui/container";

export type CtaProps = SliceComponentProps<Content.CtaSlice>;

const Cta = ({ slice }: CtaProps) => {
  const { primary } = slice;

  const heading = asText(primary.cta_heading) || "Ready to get started?";
  const description = primary.cta_description ?? "";
  const buttonLabel = primary.button_label ?? "Get started";
  const hasButtonLink = isFilled.link(primary.button_link);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      style={{ fontFamily: "'Montserrat', sans-serif" }}
      className="relative flex min-h-[45dvh] items-center justify-center overflow-hidden py-32 font-sans selection:bg-white selection:text-black"
    >
      {/* Background image and overlay */}
      <div className="absolute inset-0 z-0">
        {isFilled.image(primary.cta_img) && (
          <PrismicNextImage
            field={primary.cta_img}
            fill
            priority={false}
            className="object-cover"
            alt=""
          />
        )}
        {/* Updated overlay using the teal color from the reference image */}
        <div className="absolute inset-0 bg-[#0B4B62]/80" />
      </div>
      <div className="relative z-10 flex flex-col items-center text-center">
        <Container >
          <div className="mx-auto flex max-w-3xl flex-col items-center">
            <h2 className="mb-6 text-4xl font-medium tracking-tight text-white md:text-6xl lg:text-7xl">
              {heading}
            </h2>

            {description && (
              <p className="mb-10 max-w-xl text-sm leading-relaxed text-white/90 md:text-base">
                {description}
              </p>
            )}
            {hasButtonLink ? (
              <PrismicNextLink
                field={primary.button_link}
                className="mt-6 inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-sm font-medium text-black shadow-lg transition-transform duration-300 hover:scale-105"
              >
                {buttonLabel || "Get started"}
              </PrismicNextLink>
            ) : (
              <a
                href="mailto:ruth.c@remmtechnologies.com"
                className="mt-6 inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-sm font-medium text-black shadow-lg transition-transform duration-300 hover:scale-105"
              >
                {buttonLabel || "Get started"}
              </a>
            )}
          </div>
        </Container>
      </div>

    </section>
  );
};

export default Cta;