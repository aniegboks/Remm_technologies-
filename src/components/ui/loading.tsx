import React from "react";
import { RevealAnimation } from "@/utils/reveal_animation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Loading = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
          >
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                className="flex flex-col items-center"
              >
                <span className="font-heading text-sm tracking-[0.3em] uppercase text-neutral-400 mb-2">
                  System.Initialize
                </span>
                <span className="font-heading text-6xl font-light tabular-nums">
                  {progress}%
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Loading;
