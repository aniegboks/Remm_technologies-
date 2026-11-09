"use client";

import { useState, useEffect, useMemo } from "react";
import { asText, isFilled } from "@prismicio/client";
import type { ImageField, RichTextField, Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { motion } from "framer-motion";

type TestimonialItem = {
  card_type?: string | null;
  name?: string | null;
  role?: string | null;
  avatar?: ImageField;
  quote?: RichTextField;
  image?: ImageField;
  background_style?: string | null;
  testimonial_image?: ImageField;
  heading?: RichTextField;
  paragraph?: string | null;
};

type TestimonialsPrimary = {
  section_heading?: RichTextField;
  section_description?: RichTextField;
  testimonials?: TestimonialItem[] | null;
};

type Props = SliceComponentProps<Content.TestimonialsSlice>;

const BACKGROUND_STYLES: Record<string, string> = {
  slate: "bg-slate-50 border border-slate-100",
  purple: "bg-purple-50 border border-purple-100",
  blue: "bg-blue-50 border border-blue-100",
  white: "bg-white border border-slate-100",
};

const Testimonials = ({ slice }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const primary = slice.primary as unknown as TestimonialsPrimary;
  const testimonials = primary.testimonials ?? [];
  const heading = asText(primary.section_heading) || "What people say";
  const description =
    typeof primary.section_description === "string"
      ? primary.section_description
      : "";

  // Duplicate testimonials array 3x to allow seamless infinite looping leftward
  const extendedTestimonials = useMemo(() => {
    if (testimonials.length === 0) return [];
    return [...testimonials, ...testimonials, ...testimonials];
  }, [testimonials]);

  // Auto-play effect: keeps ticking index forward infinitely
  useEffect(() => {
    if (testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 5000); // Changes slide every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Handle seamless loop reset when reaching the boundary of the cloned array
  useEffect(() => {
    if (testimonials.length <= 1) return;

    if (currentIndex >= testimonials.length * 2) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(currentIndex % testimonials.length);
      }, 500); // Matches the animation duration approximately to snap invisibly

      return () => clearTimeout(timeout);
    } else if (!isTransitioning) {
      const frame = requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [currentIndex, testimonials.length, isTransitioning]);

  return (
    <section className="w-full overflow-hidden bg-white py-20 text-slate-900">
      <div className="mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <div className="mb-12 flex items-center justify-between gap-6">
          <div>
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              {heading}
            </h2>
            {description && (
              <p className="mt-4 max-w-2xl text-slate-600">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* CAROUSEL */}
        {testimonials.length > 0 ? (
          <div className="relative flex flex-col items-center overflow-hidden">
            <div className="w-full overflow-hidden">
              <motion.div
                className={`flex gap-6 ${testimonials.length < 3 ? "md:justify-start" : ""}`}
                animate={{ x: `-${currentIndex * 344}px` }} // Assumes roughly 320px width + 24px gap
                transition={
                  isTransitioning
                    ? { type: "spring", stiffness: 300, damping: 30 }
                    : { duration: 0 }
                }
              >
                {extendedTestimonials.map((item, index) => {
                  const name = item.name?.trim() || asText(item.heading) || "Student";
                  const role = item.role?.trim() || "Student testimonial";
                  const isImageCard = item.card_type === "image";

                  const fullImage = isFilled.image(item.image)
                    ? item.image
                    : item.testimonial_image;
                  const avatar = isFilled.image(item.avatar)
                    ? item.avatar
                    : item.testimonial_image;

                  const quote = asText(item.quote) || item.paragraph || "";
                  const backgroundClass =
                    BACKGROUND_STYLES[item.background_style ?? "slate"] ??
                    BACKGROUND_STYLES.slate;

                  if (isImageCard) {
                    return (
                      <article
                        key={`${name}-${index}`}
                        className="relative flex h-auto min-h-[360px] flex-1 min-w-[320px] max-w-2xl flex-col justify-end overflow-hidden rounded-md bg-slate-900 p-6 text-white shadow-sm"
                      >
                        {isFilled.image(fullImage) && (
                          <img
                            src={fullImage.url}
                            alt={fullImage.alt || name}
                            className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                          />
                        )}
                        <div
                          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                          aria-hidden="true"
                        />
                        <div className="relative z-10 mt-auto">
                          <h3 className="text-lg font-bold text-white">{name}</h3>
                          <p className="mt-0.5 text-sm text-slate-300">{role}</p>
                        </div>
                      </article>
                    );
                  }

                  return (
                    <article
                      key={`${name}-${index}`}
                      className={`relative flex h-auto min-h-[280px] flex-1 min-w-[320px] max-w-2xl flex-col justify-between overflow-hidden rounded-md p-6 shadow-sm ${backgroundClass}`}
                    >
                      <div className="flex flex-col gap-4">
                        {isFilled.image(avatar) && (
                          <div className="h-12 w-12 overflow-hidden rounded-full bg-slate-200">
                            <img
                              src={avatar.url}
                              alt={avatar.alt || name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                        {quote && (
                          <p className="mb-4 text-sm leading-relaxed text-slate-700">
                            &ldquo;{quote}&rdquo;
                          </p>
                        )}
                      </div>
                      <div className="mt-auto border-t border-slate-200/60 pt-4">
                        <h3 className="text-base font-bold text-slate-900">{name}</h3>
                        <p className="mt-0.5 text-xs text-slate-500">{role}</p>
                      </div>
                    </article>
                  );
                })}
              </motion.div>
            </div>

            {/* DOT INDICATORS */}
            {testimonials.length > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsTransitioning(true);
                      setCurrentIndex(index);
                    }}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${currentIndex % testimonials.length === index
                      ? "w-8 bg-slate-900"
                      : "w-2.5 bg-slate-300 hover:bg-slate-400"
                      }`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            Add testimonial cards in Prismic to display student success stories.
          </p>
        )}
      </div>
    </section>
  );
};

export default Testimonials;