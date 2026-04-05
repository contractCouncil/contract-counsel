"use client";

import SectionHeading from "../ui/SectionHeading";
import ServiceCard from "../ui/ServiceCard";
import AnimatedSection from "../ui/AnimatedSection";
import { services } from "@/lib/constants";

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-bg-secondary section-glow-top">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <SectionHeading
            title="Our Services"
            subtitle="AI-powered solutions built specifically for the legal industry"
          />
        </AnimatedSection>

        {/* Top row: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {services.slice(0, 3).map((service, i) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={i * 0.1}
            />
          ))}
        </div>

        {/* Bottom row: 2 cards centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {services.slice(3).map((service, i) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={(i + 3) * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
