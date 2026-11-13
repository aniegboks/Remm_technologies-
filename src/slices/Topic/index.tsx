"use client";

import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

import Container from "@/components/ui/container";
import { RevealAnimation } from "@/utils/reveal_animation";

export type TopicProps = SliceComponentProps<Content.TopicSlice>;

const Topic: FC<TopicProps> = ({ slice }) => {
  const { heading, sub_paragraph, image, paragraph, button_group } =
    slice.primary;

  const hasButtons = button_group?.some((button) => button.label?.trim());

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative overflow-hidden bg-[#fafafa] pb-16 pt-36 selection:bg-[#073f56] selection:text-white md:pb-24 md:pt-44 lg:pt-48"
    >
      <Container>
        <div className="mx-auto max-w-6xl">
          {/* HEADER */}
          <RevealAnimation>
            <header className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
              {isFilled.richText(heading) && (
                <div className="mb-4 text-3xl font-bold leading-tight tracking-tight text-neutral-950 md:text-5xl">
                  <PrismicRichText field={heading} />
                </div>
              )}

              {isFilled.richText(sub_paragraph) && (
                <div className="mx-auto max-w-xl text-sm leading-7 text-neutral-500 md:text-base">
                  <PrismicRichText field={sub_paragraph} />
                </div>
              )}
            </header>
          </RevealAnimation>

          {/* FEATURE IMAGE */}
          <RevealAnimation>
            <div className="relative mb-12 w-full overflow-hidden rounded-md bg-neutral-100">
              {isFilled.image(image) ? (
                <PrismicNextImage
                  field={image}
                  sizes="(max-width: 768px) 100vw, 1200px"
                  className="block h-auto w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                />
              ) : (
                <div className="flex aspect-[16/9] w-full items-center justify-center">
                  <p className="text-sm text-neutral-400">
                    Add a feature image in Prismic
                  </p>
                </div>
              )}
            </div>
          </RevealAnimation>

          {/* ARTICLE CONTENT */}
          <RevealAnimation>
            <div className="mx-auto max-w-2xl">
              {isFilled.keyText(paragraph) && (
                <div className="text-sm leading-8 text-neutral-600 md:text-base md:leading-9">
                  {paragraph}
                </div>
              )}

              {/* BUTTON GROUP */}
              {hasButtons && (
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  {button_group.map((button, index) => {
                    if (!button.label?.trim()) return null;

                    const hasLink = isFilled.link(button.link);

                    const className =
                      "inline-flex items-center justify-center rounded-md bg-[#073f56] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#034966]";

                    return hasLink ? (
                      <PrismicNextLink
                        key={`${button.label}-${index}`}
                        field={button.link}
                        className={className}
                      >
                        {button.label}
                      </PrismicNextLink>
                    ) : (
                      <a
                        key={`${button.label}-${index}`}
                        href="mailto:ruth.c@remmtechnologies.com"
                        className={className}
                      >
                        {button.label}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </RevealAnimation>
        </div>
      </Container>
    </section>
  );
};

export default Topic;

