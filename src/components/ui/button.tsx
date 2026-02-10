"use client";

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, HTMLMotionProps } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

// Define the button styles
const buttonClasses = cva(
  'inline-flex items-center justify-center transition-all duration-300 select-none disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        // Your specific "Get Started" style
        primary: 
          'bg-neutral-900 text-white rounded-full text-sm font-medium shadow-xl shadow-neutral-200 hover:bg-black',
        
        // Your specific "Learn More" style
        secondary: 
          'group flex items-center gap-2 text-sm font-semibold text-neutral-900 bg-transparent px-0 shadow-none',
        
        // Ghost/Outline alternative
        outline:
          'border border-neutral-200 rounded-full text-sm font-medium text-neutral-900 hover:bg-neutral-50',
      },
      size: {
        default: 'px-8 py-3',
        sm: 'px-5 py-2 text-xs',
        link: 'p-0', // For the Learn More style
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

// Combine Framer Motion props with standard Button props
interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "ref">,
    VariantProps<typeof buttonClasses> {
  children: React.ReactNode;
  showArrow?: boolean; // Helper for the arrow animation
}

const Button: React.FC<ButtonProps> = ({ 
  variant, 
  size, 
  className, 
  children, 
  showArrow, 
  ...props 
}) => {
  return (
    <motion.button
      // Those specific animations you liked
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      // Merge all classes
      className={twMerge(buttonClasses({ variant, size }), className)}
      {...props}
    >
      {children}
      
      {/* If it's a secondary/link button with an arrow, add it here */}
      {showArrow && (
        <span className="group-hover:translate-x-1 transition-transform duration-300">
          →
        </span>
      )}
    </motion.button>
  );
};

export default Button;