
"use client";

import { asText, isFilled, type Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Container from "@/components/ui/container";
import ContactForm from "@/components/ui/form";

export type CtaProps = SliceComponentProps<Content.CtaSlice>;

const Cta = ({ slice }: CtaProps) => {
  const { primary } = slice;

  const heading = asText(primary.cta_heading) || "Talk to our support team";
  const description = primary.cta_description ?? "";

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative overflow-hidden py-20 md:py-28"
    >
      {/* Background image */}
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

        <div className="absolute inset-0 bg-[#0B4B62]/85" />
      </div>

      <Container>
        <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Left content */}
          <div className="flex flex-col text-white">
            <h2 className="max-w-xl text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
              {heading}
            </h2>

            {description && (
              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/80 md:text-base">
                {description}
              </p>
            )}

            <div className="mt-10">
              <p className="text-sm font-medium text-white">
                We'd love to hear from you.
              </p>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/70">
                Have a question about our services or need assistance?
                Send us a message and our team will get back to you.
              </p>
            </div>
          </div>

          {/* Right contact form */}
          <div className="w-full">
            <ContactForm />
          </div>

        </div>
      </Container>
    </section>
  );
};

export default Cta;
