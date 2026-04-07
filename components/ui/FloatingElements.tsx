"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface FloatingElementsProps {
  count?: number;
  seed?: number;
  className?: string;
}

// Seeded PRNG to avoid hydration mismatch
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

type ShapeType = "circle" | "diamond" | "line";

interface Shape {
  type: ShapeType;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

export default function FloatingElements({
  count = 5,
  seed = 1,
  className = "",
}: FloatingElementsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const rand = seededRandom(seed);

  const shapes: Shape[] = Array.from({ length: count }, () => {
    const types: ShapeType[] = ["circle", "diamond", "line"];
    return {
      type: types[Math.floor(rand() * 3)],
      x: rand() * 100,
      y: rand() * 100,
      size: 20 + rand() * 60,
      speed: 0.3 + rand() * 0.7,
      opacity: 0.03 + rand() * 0.04,
    };
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  if (prefersReduced) return null;

  return (
    <div
      ref={ref}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {shapes.map((shape, i) => (
        <FloatingShape
          key={i}
          shape={shape}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
}

function FloatingShape({
  shape,
  scrollYProgress,
}: {
  shape: Shape;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -shape.speed * 200]
  );

  const shapeStyle = (() => {
    switch (shape.type) {
      case "circle":
        return {
          width: shape.size,
          height: shape.size,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(232,184,74,${shape.opacity}), transparent)`,
        };
      case "diamond":
        return {
          width: shape.size * 0.7,
          height: shape.size * 0.7,
          border: `1px solid rgba(232,184,74,${shape.opacity})`,
          rotate: "45deg",
        };
      case "line":
        return {
          width: 1,
          height: shape.size,
          background: `linear-gradient(to bottom, transparent, rgba(232,184,74,${shape.opacity + 0.02}), transparent)`,
        };
    }
  })();

  return (
    <motion.div
      className="absolute will-change-transform"
      style={{
        left: `${shape.x}%`,
        top: `${shape.y}%`,
        y,
        ...shapeStyle,
      }}
    />
  );
}
