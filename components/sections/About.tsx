"use client";

import SectionHeading from "../ui/SectionHeading";
import AnimatedSection from "../ui/AnimatedSection";
import StatCounter from "../ui/StatCounter";
import { stats, differentiators } from "@/lib/constants";
import { FiCpu, FiUsers, FiShield } from "react-icons/fi";

const diffIcons = [FiCpu, FiUsers, FiShield];

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Company narrative */}
        <AnimatedSection>
          <SectionHeading
            title="Where AI Meets Legal Excellence"
            subtitle="We sit at the intersection of artificial intelligence and legal services"
          />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="max-w-3xl mx-auto text-center mb-20">
            <p className="text-text-secondary text-lg leading-relaxed mb-6">
              ContractCounsel is an AI company redefining how legal work gets done.
              We&apos;ve built intelligent technology that empowers lawyers and legal
              professionals to operate at peak accuracy — approaching 100% — while
              dramatically cutting the time spent on routine legal tasks.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              We give businesses a smarter, faster, and more reliable way to manage
              their legal needs — from contract review and drafting to full-scale
              document review and eDiscovery — all powered by AI built specifically
              for the legal industry.
            </p>
          </div>
        </AnimatedSection>

        {/* Stats */}
        <AnimatedSection delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 py-12 border-y border-border-subtle">
            {stats.map((stat) => (
              <StatCounter
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                prefix={stat.prefix}
                label={stat.label}
              />
            ))}
          </div>
        </AnimatedSection>

        {/* Differentiators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {differentiators.map((diff, i) => {
            const Icon = diffIcons[i];
            return (
              <AnimatedSection key={diff.title} delay={0.1 * i}>
                <div className="text-center p-8">
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
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
