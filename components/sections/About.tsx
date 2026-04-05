"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import AnimatedSection from "../ui/AnimatedSection";
import StatCounter from "../ui/StatCounter";
import { stats, differentiators } from "@/lib/constants";
import { FiCpu, FiUsers, FiShield } from "react-icons/fi";

const diffIcons = [FiCpu, FiUsers, FiShield];

function TiltCard({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [12, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  return (
    <div ref={ref} style={{ perspective: 800 }}>
      <motion.div style={{ rotateX, opacity, y, scale }}>
        {children}
      </motion.div>
    </div>
  );
}

function ScrollRevealText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [30, 0]);

  return (
    <motion.div ref={ref} style={{ opacity, y }} className={className}>
      {children}
    </motion.div>
  );
}

export default function About() {
  const statsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: statsProgress } = useScroll({
    target: statsRef,
    offset: ["start end", "center center"],
  });

  const statsX = useTransform(statsProgress, [0, 1], [200, 0]);
  const statsOpacity = useTransform(statsProgress, [0, 0.3], [0, 1]);
  const statsScale = useTransform(statsProgress, [0, 1], [0.95, 1]);

  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <SectionHeading
            title="Where AI Meets Legal Excellence"
            subtitle="We sit at the intersection of artificial intelligence and legal services"
          />
        </AnimatedSection>

        <ScrollRevealText className="max-w-3xl mx-auto text-center mb-8">
          <p className="text-text-secondary text-lg leading-relaxed">
            ContractCounsel is an AI company redefining how legal work gets done.
            We&apos;ve built intelligent technology that empowers lawyers and legal
            professionals to operate at peak accuracy — approaching 100% — while
            dramatically cutting the time spent on routine legal tasks.
          </p>
        </ScrollRevealText>

        <ScrollRevealText className="max-w-3xl mx-auto text-center mb-20">
          <p className="text-text-secondary text-lg leading-relaxed">
            We give businesses a smarter, faster, and more reliable way to manage
            their legal needs — from contract review and drafting to full-scale
            document review and eDiscovery — all powered by AI built specifically
            for the legal industry.
          </p>
        </ScrollRevealText>

        {/* Stats - horizontal slide reveal */}
        <div ref={statsRef} className="overflow-hidden mb-20">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-border-subtle"
            style={{
              x: statsX,
              opacity: statsOpacity,
              scale: statsScale,
            }}
          >
            {stats.map((stat) => (
              <StatCounter
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                prefix={stat.prefix}
                label={stat.label}
              />
            ))}
          </motion.div>
        </div>

        {/* Differentiators with 3D tilt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {differentiators.map((diff, i) => {
            const Icon = diffIcons[i];
            return (
              <TiltCard key={diff.title}>
                <div className="text-center p-8 rounded-2xl border border-border-subtle bg-bg-secondary">
                  <div className="inline-flex items-center justify-center rounded-full bg-accent/10 p-4 mb-5">
                    <Icon size={28} className="text-accent" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                    {diff.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {diff.description}
                  </p>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
