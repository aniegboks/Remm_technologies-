"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import Container from "@/components/ui/container";
import { RevealAnimation } from "@/utils/reveal_animation";
import MilestoneGrid from "@/components/ui/milestones_grid";

export type MilestonesProps = SliceComponentProps<Content.MilestonesSlice>;

const Milestones: FC<MilestonesProps> = ({ slice }) => {
  return (
    <section className="py-32 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* LEFT: Heading wrapped in a single div */}
          <div className="lg:col-span-5">
            <RevealAnimation>
              <div> {/* Corrected: Single Child Wrapper */}
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-[#034966]">
                    Statistics // Analytics
                  </span>
                </div>
                
                <span className="text-5xl md:text-7xl font-heading font-medium tracking-tighter text-neutral-900 mb-8 leading-[0.9]">
                  <PrismicRichText field={slice.primary.heading} />
                </span>

                <div className="max-w-sm space-y-4">
                  <div className="text-lg text-neutral-500 font-body border-l-2 border-neutral-100 pl-6">
                    <PrismicRichText field={slice.primary.sub_heading} />
                  </div>
                </div>
              </div>
            </RevealAnimation>
          </div>

          {/* RIGHT: Grid component already handles its own children */}
          <div className="lg:col-span-7">
            <MilestoneGrid />
          </div>

        </div>
      </Container>
    </section>
  );
};

export default Milestones;