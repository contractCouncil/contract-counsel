"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import AnimatedSection from "../ui/AnimatedSection";
import { FiUploadCloud, FiCpu, FiCheckCircle, FiSend } from "react-icons/fi";

const steps = [
  {
    icon: FiUploadCloud,
    number: "01",
    title: "Upload Your Documents",
    description:
      "Securely upload contracts, legal documents, or entire document sets to our encrypted platform.",
  },
  {
    icon: FiCpu,
    number: "02",
    title: "AI Analysis",
    description:
      "Our legal AI engine analyzes every clause, identifies risks, flags inconsistencies, and extracts key terms in seconds.",
  },
  {
    icon: FiCheckCircle,
    number: "03",
    title: "Expert Review",
    description:
      "AI-generated insights are reviewed and refined by legal professionals to ensure accuracy and context.",
  },
  {
    icon: FiSend,
    number: "04",
    title: "Actionable Results",
    description:
      "Receive comprehensive reports, redlined documents, and clear recommendations ready for decision-making.",
  },
];

function StepCard({
  step,
  index,
}: {
  step: (typeof steps)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [index % 2 === 0 ? -80 : 80, 0]
  );
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  // The connecting line grows as you scroll
  const lineScaleY = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  return (
    <div ref={ref} className="relative">
      <motion.div
        style={{ opacity, x, scale }}
        className="flex items-start gap-6 md:gap-8"
      >
        {/* Number + line */}
        <div className="flex flex-col items-center shrink-0">
          <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
            <step.icon size={24} className="text-accent" />
          </div>
          {index < steps.length - 1 && (
            <motion.div
              className="w-[1px] h-20 bg-accent/20 mt-4 origin-top"
              style={{ scaleY: lineScaleY }}
            />
          )}
        </div>

        {/* Content */}
        <div className="pt-2 pb-8">
          <span className="text-accent text-xs font-semibold tracking-[0.3em] uppercase">
            Step {step.number}
          </span>
          <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground mt-2 mb-3">
            {step.title}
          </h3>
          <p className="text-text-secondary leading-relaxed max-w-md">
            {step.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <SectionHeading
            title="How It Works"
            subtitle="From upload to actionable insights in four simple steps"
          />
        </AnimatedSection>

        <div className="max-w-2xl mx-auto">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
