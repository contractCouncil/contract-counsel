"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "../ui/Button";
import RevealText, { RevealLine } from "../ui/RevealText";
import { FiArrowDown } from "react-icons/fi";

// Globe is WebGL-only and ~10kb — load client-side
const Globe = dynamic(() => import("../ui/Globe"), { ssr: false });

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const globeOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const globeScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const contentOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const arrowOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Aurora ambient base */}
      <div className="hero-aurora" aria-hidden>
        <div className="hero-aurora__blob hero-aurora__blob--1" />
        <div className="hero-aurora__blob hero-aurora__blob--2" />
        <div className="hero-aurora__blob hero-aurora__blob--3" />
      </div>

      {/* Subtle grid */}
      <motion.div className="absolute inset-0 hero-grid" style={{ y: bgY }} />

      {/* Centerpiece: dotted globe */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: globeOpacity, scale: globeScale }}
      >
        <Globe size={780} />
      </motion.div>

      {/* Vignette to keep text legible over globe */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at center, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.85) 60%, rgba(10,10,10,0.95) 100%)",
        }}
      />

      <motion.div className="absolute inset-0 hero-glow" style={{ y: glowY }} />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        style={{
          opacity: contentOpacity,
          scale: contentScale,
          y: contentY,
        }}
      >
        <p className="text-accent text-xs md:text-sm font-semibold uppercase tracking-[0.3em] mb-6">
          <RevealLine delay={0.1} duration={0.7}>
            AI-Powered Legal Technology
          </RevealLine>
        </p>

        <h1
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.05] mb-6"
          aria-label="Redefining How Legal Work Gets Done"
        >
          <RevealText as="span" className="block" delay={0.25} stagger={0.09}>
            Redefining How
          </RevealText>
          <RevealText
            as="span"
            className="block text-accent"
            delay={0.45}
            stagger={0.09}
          >
            Legal Work
          </RevealText>
          <RevealText as="span" className="block" delay={0.65} stagger={0.09}>
            Gets Done
          </RevealText>
        </h1>

        <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
          <RevealLine delay={1.0} duration={0.9}>
            Intelligent technology that empowers lawyers and legal professionals
          </RevealLine>{" "}
          <RevealLine delay={1.15} duration={0.9}>
            to operate at peak accuracy — approaching 100% — while dramatically
          </RevealLine>{" "}
          <RevealLine delay={1.3} duration={0.9}>
            cutting the time spent on routine legal tasks.
          </RevealLine>
        </p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Button href="#contact" variant="primary">
            Book a Demo
          </Button>
          <Button href="#services" variant="secondary">
            Explore Services
          </Button>
        </motion.div>
      </motion.div>

      <motion.a
        href="#services"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-text-muted hover:text-accent transition-colors z-10"
        style={{ opacity: arrowOpacity }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <FiArrowDown size={24} />
      </motion.a>
    </section>
  );
}
