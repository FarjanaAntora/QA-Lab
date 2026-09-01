"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { MOTION_EASE, REVEAL_DURATION } from "@/lib/motion";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
};

export default function ScrollReveal({
  children,
  className,
}: ScrollRevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reduce ? 0 : REVEAL_DURATION,
        ease: MOTION_EASE,
      }}
    >
      {children}
    </motion.div>
  );
}
