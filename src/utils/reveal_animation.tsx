'use client'
import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface RevealAnimationProps {
  children: React.JSX.Element;
  width?: "fit-content" | "100%";
}

export const RevealAnimation = ({ children, width = "fit-content" }: RevealAnimationProps) => {
  const refAnimation = useRef(null);
  const isInView = useInView(refAnimation); 

  const mainControl = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControl.start("visible");
    } else {
      mainControl.start("hidden"); 
    }
  }, [isInView, mainControl]);

  return (
    <div 
      ref={refAnimation} 
      style={{ 
        position: "relative", 
        width: "100%", 
        overflow: "hidden", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center"       
      }}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 }
        }}
        initial="hidden"
        animate={mainControl}
        transition={{ duration: 0.5, delay: 0.25 }}
        style={{
          width,           
          maxWidth: "100%",  
          display: "inline-block",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
