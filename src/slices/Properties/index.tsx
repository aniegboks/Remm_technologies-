"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import {
  SliceComponentProps,
  PrismicRichText,
} from "@prismicio/react";
import {
  PrismicNextLink,
  PrismicNextImage,
} from "@prismicio/next";
import Container from "@/components/ui/container";
import { RevealAnimation } from "@/utils/reveal_animation";

export type PropertiesProps =
  SliceComponentProps<Content.PropertiesSlice>;

const Properties: FC<PropertiesProps> = ({ slice }) => {
  const { heading, paragraph, image_navigator } = slice.primary;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative z-30 overflow-hidden bg-[#073f56] py-24 selection:bg-[#034966] selection:text-white"
    >
      {/* BACKGROUND ABSTRACT IMAGE */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-overlay"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop')",
        }}
      />

      <Container>
        <div className="relative z-10">
          <RevealAnimation>
            <>
              {/* HEADER SECTION */}
              {(heading || paragraph) && (
                <div className="mb-12 max-w-2xl">
                  {heading && (
                    <div className="mb-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
                      <PrismicRichText field={heading} />
                    </div>
                  )}

                  {paragraph && (
                    <div className="text-sm leading-relaxed text-neutral-200 md:text-base">
                      <PrismicRichText field={paragraph} />
                    </div>
                  )}
                </div>
              )}

              {/* PROPERTY CARDS */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {image_navigator?.map((item, index) => {
                  const headingNode = item.heading?.[0];

                  const cardTitle =
                    headingNode && "text" in headingNode
                      ? headingNode.text
                      : "property";

                  const hasLinkLabel = Boolean(item.link_label?.trim());

                  const hasValidLink =
                    item.navigator_link &&
                    item.navigator_link.link_type !== "Any";

                  const showCTA = hasLinkLabel && hasValidLink;

                  return (
                    <div
                      key={`${cardTitle}-${index}`}
                      className="group relative flex flex-col justify-between rounded-md bg-white p-6 shadow-md transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl md:p-7"
                    >
                      <div>
                        {/* TOP HEADER */}
                        <div className="mb-6 flex items-center">
                          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-md border border-neutral-100 bg-neutral-50 shadow-xs">
                            {item.display_img?.url ? (
                              <div className="relative h-6 w-6">
                                <PrismicNextImage
                                  field={item.display_img}
                                  fill
                                  className="object-contain"
                                  sizes="24px"
                                />
                              </div>
                            ) : (
                              <span className="text-base font-bold text-neutral-800">
                                ✦
                              </span>
                            )}
                          </div>
                        </div>

                        {/* CARD TITLE */}
                        <div className="mb-3">
                          {item.heading && (
                            <div className="text-xl font-bold tracking-tight text-neutral-900">
                              <PrismicRichText field={item.heading} />
                            </div>
                          )}
                        </div>

                        {/* DESCRIPTION */}
                        {item.paragraph && (
                          <div className="mb-6 line-clamp-3 text-xs leading-relaxed text-neutral-500">
                            <PrismicRichText field={item.paragraph} />
                          </div>
                        )}
                      </div>

                      {/* PRISMIC-CONTROLLED CTA */}
                      {/* PRISMIC-CONTROLLED CTA */}
                      {item.link_label?.trim() && (
                        <div className="flex items-center justify-end border-t border-neutral-100 pt-4">
                          {hasValidLink ? (
                            <PrismicNextLink
                              field={item.navigator_link}
                              className="inline-flex items-center justify-center rounded-md bg-neutral-900 px-4 py-2 text-xs font-bold text-white shadow-xs transition-all duration-200 hover:scale-[1.02] hover:bg-[#073f56]"
                            >
                              {item.link_label}
                            </PrismicNextLink>
                          ) : (
                            <span className="inline-flex items-center justify-center rounded-md bg-neutral-900 px-4 py-2 text-xs font-bold text-white">
                              {item.link_label}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          </RevealAnimation>
        </div>
      </Container>
    </section>
  );
};

export default Properties;