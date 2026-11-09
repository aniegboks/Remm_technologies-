"use client";

import React, { useState } from "react";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import {
  SettingsDocument,
  SettingsDocumentDataNavigationItem,
  SettingsDocumentDataCtaItem
} from "../../prismicio-types";
import { AnimatePresence, motion, useScroll, useMotionValueEvent, Variants } from "framer-motion";
import Image from "next/image";
import { Lock, Search, Globe } from "lucide-react";

interface SettingsProps {
  settings: SettingsDocument;
}

const menuVariants: Variants = {
  open: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { type: "tween", duration: 0.4, ease: "easeOut", staggerChildren: 0.05, delayChildren: 0.1 },
  },
  closed: {
    clipPath: "inset(0% 0% 100% 0%)",
    transition: { type: "tween", duration: 0.3, ease: "easeIn" },
  },
};

const itemVariants: Variants = {
  open: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  closed: { opacity: 0, y: 10 },
};

const Nav = ({ settings }: SettingsProps) => {
  const [isToggle, setIsToggle] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 120) {
      setHidden(true);
      setIsToggle(false);
    } else {
      setHidden(false);
    }
  });

  const navigation = (settings.data.navigation || []) as SettingsDocumentDataNavigationItem[];
  const cta = (settings.data.cta || []) as SettingsDocumentDataCtaItem[];

  return (
    <motion.nav
      variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: -50, opacity: 0 } }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-[100] bg-white flex flex-col"
    >
      {/* TOP TIER: Dark Blue #034966 */}
      <div className="bg-[#034966] text-white w-full">
        <div className="max-w-[1400px] mx-auto px-6 h-12 flex items-center justify-between lg:justify-end gap-8">

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsToggle(!isToggle)}
            aria-label="Toggle Menu"
            className="lg:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          >
            <motion.span animate={{ rotate: isToggle ? 45 : 0, y: isToggle ? 6 : 0 }} className="w-5 h-[1.5px] bg-white" />
            <motion.span animate={{ opacity: isToggle ? 0 : 1 }} className="w-5 h-[1.5px] bg-white" />
            <motion.span animate={{ rotate: isToggle ? -45 : 0, y: isToggle ? -6 : 0 }} className="w-5 h-[1.5px] bg-white" />
          </button>

          {/* Secondary Links (Desktop Only) */}
          <div className="hidden lg:flex items-center gap-6 text-[13px] font-medium tracking-wide">
            <button className="flex items-center gap-2 hover:text-[#ed3237] transition-colors"><Globe className="w-4 h-4" /> EN</button>
            <Link href="#" className="hover:text-[#ed3237] transition-colors">Locate</Link>
            <Link href="#" className="hover:text-[#ed3237] transition-colors">Help Centre</Link>
            <button className="hover:text-[#ed3237] transition-colors"><Search className="w-4 h-4" /></button>
          </div>

          {/* CTA Buttons mapped to Red #ed3237 */}
          <div className="flex h-full">
            {cta.map((item, i) => (
              <PrismicNextLink
                key={i}
                field={item.cta_link}
                className="bg-[#ed3237] hover:bg-[#d12930] text-white text-[13px] font-semibold px-6 md:px-8 h-full flex items-center gap-2 transition-colors"
              >
                <Lock className="w-4 h-4" />
                <span>{item.cta_label}</span>
              </PrismicNextLink>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM TIER: Clean White */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">

          {/* PRIMARY DESKTOP NAV LINKS (Left aligned to match reference flow) */}
          <ul className="hidden lg:flex items-center gap-8">
            {navigation.map((item, i) => (
              <li key={i}>
                <PrismicNextLink
                  field={item.link}
                  className="text-[15px] font-semibold text-[#034966] hover:text-[#ed3237] transition-colors duration-200"
                >
                  {item.label}
                </PrismicNextLink>
              </li>
            ))}
          </ul>

          {/* LOGO (Right aligned as seen in reference image) */}
          <Link href="/" className="flex items-center ml-auto">

            <Image
              src="/images/img-1.png"
              alt="Remm Technologies"
              width={100}
              height={100}
              className="h-auto w-[100px] object-contain"
            />

          </Link>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY (Flat & Minimalist) */}
      <AnimatePresence>
        {isToggle && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="absolute top-[128px] left-0 right-0 bg-white border-b border-gray-100 lg:hidden flex flex-col max-h-[80vh] overflow-y-auto"
          >
            <div className="flex flex-col py-4">
              {navigation.map((item, i) => (
                <motion.div key={i} variants={itemVariants}>
                  <PrismicNextLink
                    field={item.link}
                    onClick={() => setIsToggle(false)}
                    className="px-6 py-4 text-[15px] font-semibold text-[#034966] hover:text-[#ed3237] hover:bg-gray-50 transition-colors block border-l-4 border-transparent hover:border-[#ed3237]"
                  >
                    {item.label}
                  </PrismicNextLink>
                </motion.div>
              ))}
            </div>

            {/* Mobile Secondary Links */}
            <div className="bg-gray-50 flex flex-col py-4 border-t border-gray-100">
              <Link href="#" className="px-6 py-3 text-[14px] font-medium text-[#034966]">Locate</Link>
              <Link href="#" className="px-6 py-3 text-[14px] font-medium text-[#034966]">Help Centre</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Nav;