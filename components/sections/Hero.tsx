"use client";

import { motion } from "framer-motion";
import Button from "../ui/Button";
import { FiArrowDown } from "react-icons/fi";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 hero-grid" />
      <div className="absolute inset-0 hero-glow" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
      >
        <motion.p
          variants={itemVariants}
          className="text-accent text-xs md:text-sm font-semibold uppercase tracking-[0.3em] mb-6"
        >
          AI-Powered Legal Technology
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6"
        >
          Redefining How{" "}
          <span className="text-accent">Legal Work</span>{" "}
          Gets Done
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Intelligent technology that empowers lawyers and legal professionals
          to operate at peak accuracy — approaching 100% — while dramatically
          cutting the time spent on routine legal tasks.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button href="#contact" variant="primary">
            Book a Demo
          </Button>
          <Button href="#services" variant="secondary">
            Explore Services
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#services"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-text-muted hover:text-accent transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <FiArrowDown size={24} />
      </motion.a>
    </section>
  );
}
