"use client";

import React from 'react';
import { motion } from "framer-motion";
import { CounterAnimation } from "@/utils/counter_animation";

const milestones = [
  {
    value: 100,
    suffix: "%",
    title: "Built Success",
    desc: "Our team has successfully helped provide support for sevral clients.",
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
    desc: "We believe that sucess in busness is not doen by one person alone.",
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
    /* THE GRID:
       - Using border-t and border-l to create the "Blueprint" look
       - divide-x/y ensures consistent internal borders
    */
    <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-neutral-100">
      {milestones.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: i * 0.1 }}
          viewport={{ once: true }}
          className="group relative p-8 md:p-12 border-r border-b border-neutral-100 transition-colors duration-500 hover:bg-neutral-50"
        >
          {/* Top Detail: Mono-spaced numbering */}
          <div className="flex justify-between items-start mb-12">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-300 group-hover:text-[#034966] transition-colors">
              Metric_0{i + 1}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-neutral-200 group-hover:bg-[#034966] transition-colors" />
          </div>

          {/* Large Counter */}
          <div className="text-5xl md:text-6xl font-heading font-semibold tracking-tighter text-neutral-900 mb-6">
            {motionSpeed ? (
              <span>{item.value}</span>
            ) : (
              <CounterAnimation from={0} to={item.value} suffix={item.suffix} />
            )}
          </div>

          {/* Text Content */}
          <div className="space-y-3">
            <h3 className="text-lg font-heading font-bold text-neutral-900 tracking-tight">
              {item.title}
            </h3>
            <p className="text-sm text-neutral-500 font-body leading-relaxed max-w-[240px]">
              {item.desc}
            </p>
          </div>

          {/* Bottom Accent: Appears on hover */}
          <motion.div 
            className="absolute bottom-0 left-0 h-1 bg-[#034966] w-0 group-hover:w-full transition-all duration-700 ease-out"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default MilestoneGrid;