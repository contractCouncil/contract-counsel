"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface RevealTextProps {
  children: string;
  as?: "h1" | "h2" | "p" | "span";
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
}

/**
 * Bold masked word-reveal: each word sits inside an overflow-hidden mask
 * and rises from below, like elevate.law / Awwwards-style hero copy.
 */
export default function RevealText({
  children,
  as = "h1",
  className = "",
  wordClassName = "",
  delay = 0,
  stagger = 0.08,
  duration = 0.9,
}: RevealTextProps) {
  const prefersReduced = useReducedMotion();
  const words = children.split(" ");

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReduced ? 0 : stagger,
        delayChildren: delay,
      },
    },
  };

  const word: Variants = {
    hidden: { y: "110%" },
    visible: {
      y: "0%",
      transition: {
        duration: prefersReduced ? 0 : duration,
        ease: [0.22, 1, 0.36, 1], // expo-out
      },
    },
  };

  const Tag = motion[as] as typeof motion.h1;

  return (
    <Tag
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
      aria-label={children}
    >
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}
        >
          <motion.span
            variants={word}
            className={`inline-block ${wordClassName}`}
          >
            {w}
            {i < words.length - 1 && "\u00A0"}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

interface RevealLineProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

/** Single-line mask reveal for non-split content (eyebrow, paragraph, buttons). */
export function RevealLine({
  children,
  className = "",
  delay = 0,
  duration = 0.9,
}: RevealLineProps) {
  const prefersReduced = useReducedMotion();
  return (
    <span
      className={`inline-block overflow-hidden align-bottom ${className}`}
      style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}
    >
      <motion.span
        className="inline-block"
        initial={{ y: prefersReduced ? 0 : "110%" }}
        animate={{ y: "0%" }}
        transition={{
          duration: prefersReduced ? 0 : duration,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}
