"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { MICRO_DURATION, MOTION_EASE, STAGGER_DELAY } from "@/lib/motion";

type DataAttrs = {
  [key: `data-${string}`]: string | undefined;
};

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  "aria-label"?: string;
} & DataAttrs;

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
} & DataAttrs;

const hidden = { opacity: 0, y: 12 };
const visible = { opacity: 1, y: 0 };
const still = { opacity: 1, y: 0 };

export function StaggerGroup({
  children,
  className,
  stagger = STAGGER_DELAY,
  "aria-label": ariaLabel,
  ...dataAttrs
}: StaggerGroupProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      aria-label={ariaLabel}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={{
        hidden: still,
        visible: {
          ...still,
          transition: {
            staggerChildren: reduce ? 0 : stagger,
            delayChildren: reduce ? 0 : 0.04,
          },
        },
      }}
      {...dataAttrs}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  ...dataAttrs
}: StaggerItemProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduce ? still : hidden,
        visible: {
          ...visible,
          transition: {
            duration: reduce ? 0 : MICRO_DURATION,
            ease: MOTION_EASE,
          },
        },
      }}
      {...dataAttrs}
    >
      {children}
    </motion.div>
  );
}
