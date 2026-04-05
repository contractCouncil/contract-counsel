"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import AnimatedSection from "../ui/AnimatedSection";
import FloatingElements from "../ui/FloatingElements";
import {
  FiZap,
  FiTarget,
  FiLock,
  FiTrendingUp,
  FiGlobe,
  FiAward,
} from "react-icons/fi";

const features = [
  {
    icon: FiZap,
    title: "10x Faster",
    description: "Review contracts in minutes instead of hours with AI-powered analysis.",
  },
  {
    icon: FiTarget,
    title: "~100% Accuracy",
    description: "Our AI catches what humans miss — every clause, every risk, every time.",
  },
  {
    icon: FiLock,
    title: "Bank-Grade Security",
    description: "SOC 2 Type II compliant with end-to-end encryption and zero data retention.",
  },
  {
    icon: FiTrendingUp,
    title: "Cost Reduction",
    description: "Cut legal review costs by up to 80% without sacrificing quality or thoroughness.",
  },
  {
    icon: FiGlobe,
    title: "Multi-Jurisdiction",
    description: "AI trained on legal frameworks across 50+ jurisdictions worldwide.",
  },
  {
    icon: FiAward,
    title: "Built by Lawyers",
    description: "Developed in collaboration with Am Law 100 attorneys who understand your needs.",
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  return (
    <motion.div ref={ref} style={{ opacity, y, scale }}>
      <div className="group relative rounded-2xl border border-border-subtle bg-background p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-[0_0_30px_rgba(200,168,98,0.06)] h-full">
        <div className="flex items-start gap-4">
          <div className="shrink-0 rounded-xl bg-accent/10 p-3 transition-colors duration-300 group-hover:bg-accent/20">
            <feature.icon size={22} className="text-accent" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
              {feature.title}
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="relative py-24 md:py-32 bg-bg-secondary section-glow-top">
      <FloatingElements count={5} seed={77} />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <SectionHeading
            title="Why ContractCounsel"
            subtitle="The competitive edge your legal team has been looking for"
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
