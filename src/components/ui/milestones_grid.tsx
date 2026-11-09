"use client";

import React from "react";
import { motion } from "framer-motion";
import { CounterAnimation } from "@/utils/counter_animation";

const milestones = [
  {
    value: 100,
    suffix: "%",
    title: "Built Success",
    desc: "Our team has successfully helped provide support for several clients.",
  },
  {
    value: 100,
    suffix: "%",
    title: "Client Satisfaction",
    desc: "At the heart of our approach is a focus on the customer experience.",
  },
  {
    value: 20,
    suffix: "+",
    title: "Partner & Collaborations",
    desc: "We believe that success in business is not done by one person alone.",
  },
  {
    value: 20,
    suffix: "+",
    title: "Projects Completed",
    desc: "Our team brings a diverse set of skills and experiences to every project.",
  },
];

const MilestoneGrid = () => {
  const motionSpeed = false;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-neutral-100">
      {milestones.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: i * 0.1 }}
          viewport={{ once: true }}
          className="group relative p-8 md:p-12 border-r border-b border-neutral-100 bg-white transition-all duration-300 ease-out hover:scale-[1.02] hover:z-10 hover:shadow-xl"
        >
          <div className="text-5xl md:text-6xl font-heading font-semibold tracking-tighter text-neutral-900 mb-6">
            {motionSpeed ? (
              <span>{item.value}</span>
            ) : (
              <CounterAnimation from={0} to={item.value} suffix={item.suffix} />
            )}
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-heading font-bold text-neutral-900 tracking-tight">
              {item.title}
            </h3>
            <p className="text-sm text-neutral-500 font-body leading-relaxed max-w-[240px]">
              {item.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MilestoneGrid;