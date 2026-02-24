import React from "react";
import { createClient } from "@prismicio/client";
import { repositoryName } from "@/prismicio";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import Container from "./ui/container";
import { RevealAnimation } from "@/utils/reveal_animation";
import Image from "next/image";
import { Content } from "@prismicio/client";

/**
 * Type-safe props for our columns
 */
interface FooterColumnProps {
  title: string;
  links: any[] | undefined;
  labelKey: string;
  linkKey: string;
}

const Footer = async () => {
  const client = createClient(repositoryName);
  let settings: Content.SettingsDocument;

  try {
    settings = await client.getSingle<Content.SettingsDocument>("settings");
  } catch (e) {
    console.error("Footer failed to fetch settings:", e);
    return null;
  }

  const { data } = settings;

  return (
    <footer className="relative pt-48 pb-16 bg-[#034966] text-white border-t border-white/10 overflow-hidden">
      {/* Large Decorative Watermark */}
      <div className="absolute top-10 -right-20 pointer-events-none select-none opacity-[0.05]">
        <span className="text-[10vw] font-black uppercase leading-none tracking-tighter">
          Remm Technologies
        </span>
      </div>

      <Container>
        <RevealAnimation>
          <div className="relative z-10">
            {/* Top Tier */}
            <div className="flex flex-col lg:flex-row justify-between items-start gap-32 mb-40">
              <div className="max-w-md">
                <Link href="/" className="inline-block mb-16 group">
                  <Image
                    src="/images/img-1.png"
                    alt="Logo"
                    width={60}
                    height={60}
                    className="transition-transform duration-1000 group-hover:rotate-[360deg] brightness-0 invert"
                  />
                </Link>
                <p className="text-[14px] md:text-[15px] leading-[1.8] tracking-tight text-white/70 font-light">
                  Remm technologies is an IT solutions company dedicated to
                  helping businesses grow through innovative and reliable
                  technology services. We provide tailored solutions that
                  optimize operations.
                </p>
              </div>

              {/* Minimalist Large Newsletter */}
              <div className="w-full lg:w-[400px]">
                <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/40 block mb-10">
                  / Newsletter Subscription
                </span>
                <form className="relative group border-b border-white/20 pb-4 focus-within:border-white transition-all duration-700">
                  <input
                    type="email"
                    placeholder="EMAIL ADDRESS"
                    className="bg-transparent w-full text-lg font-light outline-none placeholder:text-white/20 uppercase tracking-widest text-white"
                  />
                  <button
                    type="submit"
                    className="absolute right-0 bottom-4 text-xs font-bold tracking-widest hover:text-white/60 transition-colors"
                  >
                    SEND ↗
                  </button>
                </form>
              </div>
            </div>

            {/* Middle Tier */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-20 mb-48 pt-20 border-t border-white/5">
              <div className="lg:col-span-1">
                <FooterColumn
                  title="Explore"
                  links={data.navigation}
                  labelKey="label"
                  linkKey="link"
                />
              </div>
              <div className="lg:col-span-1">
                <FooterColumn
                  title="Services"
                  links={data.cta}
                  labelKey="cta_label"
                  linkKey="cta_link"
                />
              </div>
              <div className="lg:col-span-1">
                <FooterColumn
                  title="Legal"
                  links={data.lega}
                  labelKey="legal_label"
                  linkKey="legal_link"
                />
              </div>

              {/* Office Location */}
              <div className="col-span-2 lg:col-start-5 lg:text-right">
                <h2 className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] mb-10 text-white/40">
                  Office
                </h2>
                <p className="text-sm font-medium text-white/90 leading-[2] uppercase tracking-wider">
                  Health Rite Building, LakeView pack 1 Estate opp.
                  <br />
                  VGC Ikota shopping complex.
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-[10px] font-mono text-white/40 lg:justify-end uppercase">
                  <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
                  Local Time {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>

            {/* Bottom Tier */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-10 pt-10 border-t border-white/10">
              <div className="flex gap-10">
                {data.socials?.map(({ icon_link, icons }, index) => (
                  <PrismicNextLink
                    key={`social-${index}`}
                    field={icon_link}
                    className="group relative"
                  >
                    <PrismicNextImage
                      field={icons}
                      className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-all duration-500 group-hover:-translate-y-1 brightness-0 invert"
                    />
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all" />
                  </PrismicNextLink>
                ))}
              </div>

              <div className="flex items-center gap-6 text-[9px] font-mono uppercase tracking-[0.5em] text-white/30">
                <span>© {new Date().getFullYear()} Remm Technologies</span>
                <span className="w-px h-4 bg-white/10" />
                <span>All Rights Reserved</span>
              </div>
            </div>
          </div>
        </RevealAnimation>
      </Container>
    </footer>
  );
};

const FooterColumn = ({
  title,
  links,
  labelKey,
  linkKey,
}: FooterColumnProps) => (
  <div className="flex flex-col items-start">
    <h2 className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] mb-12 text-white/40">
      {`// ${title}`}
    </h2>
    <div className="flex flex-col gap-5">
      {links?.map((item, index) => (
        <PrismicNextLink
          key={index}
          field={item[linkKey]}
          className="group text-[12px] uppercase tracking-[0.1em] text-white/60 hover:text-white transition-all duration-300 flex items-center"
        >
          <span className="w-0 group-hover:w-4 h-[1px] bg-white transition-all duration-500 mr-0 group-hover:mr-2" />
          {item[labelKey]}
        </PrismicNextLink>
      ))}
    </div>
  </div>
);

export default Footer;