"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import ServiceCard from "../ui/ServiceCard";
import AnimatedSection from "../ui/AnimatedSection";
import FloatingElements from "../ui/FloatingElements";
import { services } from "@/lib/constants";
import { type IconType } from "react-icons";

function ScrollCard({
  index,
  icon,
  title,
  description,
}: {
  index: number;
  icon: IconType;
  title: string;
  description: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const boxShadow = useTransform(
    scrollYProgress,
    [0.4, 0.7, 1],
    [
      "0 0 0px rgba(232,184,74,0)",
      "0 0 25px rgba(232,184,74,0.12)",
      "0 0 0px rgba(232,184,74,0)",
    ]
  );

  return (
    <motion.div ref={ref} style={{ opacity, y, scale, boxShadow }} className="rounded-2xl">
      <ServiceCard
        icon={icon}
        title={title}
        description={description}
        animated={false}
      />
    </motion.div>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="relative py-24 md:py-32 bg-bg-secondary section-glow-top"
    >
      <FloatingElements count={4} seed={99} />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <SectionHeading
            title="Our Services"
            subtitle="AI-powered solutions built specifically for the legal industry"
          />
        </AnimatedSection>

        {/* Top row: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {services.slice(0, 3).map((service, i) => (
            <ScrollCard
              key={service.title}
              index={i}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>

        {/* Bottom row: 2 cards centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {services.slice(3).map((service, i) => (
            <ScrollCard
              key={service.title}
              index={i + 3}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
