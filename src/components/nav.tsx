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

interface SettingsProps {
  settings: SettingsDocument; 
}

const menuVariants: Variants = {
  open: {
    clipPath: "inset(0% 0% 0% 0% round 20px)",
    transition: { type: "spring", bounce: 0, duration: 0.8, staggerChildren: 0.05, delayChildren: 0.2 },
  },
  closed: {
    clipPath: "inset(0% 0% 100% 0% round 20px)",
    transition: { type: "spring", bounce: 0, duration: 0.6 },
  },
};

const itemVariants: Variants = {
  open: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  closed: { opacity: 0, y: 10 },
};

const Nav = ({ settings }: SettingsProps) => {
  const [isToggle, setIsToggle] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 100) {
      setHidden(true);
      setIsToggle(false);
    } else {
      setHidden(false);
    }
  });

  const navigation = (settings.data.navigation || []) as SettingsDocumentDataNavigationItem[];
  const cta = (settings.data.cta || []) as SettingsDocumentDataCtaItem[];
  const allLinks = [
    ...navigation.map(n => ({ label: n.label, link: n.link })), 
    ...cta.map(c => ({ label: c.cta_label, link: c.cta_link }))
  ];

  return (
    <motion.nav
      variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: -25, opacity: 0 } }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      className="fixed top-8 left-0 right-0 z-[100] px-6"
    >
      <div className="mx-auto max-w-fit backdrop-blur-xl bg-white/40 border border-white/20 shadow-[0_10px_40px_rgba(0,0,0,0.04)] rounded-full px-2 py-2 flex items-center gap-2">
        
        {/* LOGO */}
        <Link href="/" className="pl-4 pr-2 py-2">
          <Image 
            src="/images/img-1.png" 
            alt="logo" 
            width={60} 
            height={60} 
            className="hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* DESKTOP NAV */}
        <ul className="hidden md:flex items-center gap-1">
          {allLinks.map((item, i) => (
            <li key={i}>
              <PrismicNextLink
                field={item.link}
                className="px-4 py-2 text-[13px] lowercase tracking-tight text-neutral-500 hover:text-black hover:bg-white/80 rounded-full transition-all duration-300 flex items-center gap-2 group"
              >
                <span className="w-1 h-1 bg-black/0 group-hover:bg-black rounded-full transition-all duration-300" />
                {item.label}
              </PrismicNextLink>
            </li>
          ))}
        </ul>

        {/* MOBILE TRIGGER */}
        <button 
          onClick={() => setIsToggle(!isToggle)}
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 px-3"
        >
          <motion.span animate={{ rotate: isToggle ? 45 : 0, y: isToggle ? 4 : 0 }} className="w-5 h-[1.2px] bg-black" />
          <motion.span animate={{ rotate: isToggle ? -45 : 0, y: isToggle ? -4 : 0 }} className="w-5 h-[1.2px] bg-black" />
        </button>
      </div>

      {/* MOBILE MENU overlay */}
      <AnimatePresence>
        {isToggle && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="absolute top-16 left-6 right-6 bg-white/90 backdrop-blur-2xl border border-neutral-100 shadow-2xl rounded-[1.5rem] p-4 md:hidden flex flex-col gap-1"
          >
            {allLinks.map((item, i) => (
              <motion.div key={i} variants={itemVariants}>
                <PrismicNextLink
                  field={item.link}
                  onClick={() => setIsToggle(false)}
                  className="px-4 py-3 text-[13px] lowercase tracking-tight text-neutral-500 hover:text-black hover:bg-neutral-50 rounded-xl transition-all duration-300 flex items-center gap-3"
                >
                  <span className="w-1 h-1 bg-black rounded-full" />
                  {item.label}
                </PrismicNextLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Nav;