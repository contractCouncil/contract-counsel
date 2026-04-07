"use client";

import SectionHeading from "../ui/SectionHeading";
import AnimatedSection from "../ui/AnimatedSection";
import StatCounter from "../ui/StatCounter";
import AnimatedChart from "../ui/AnimatedChart";

export default function Impact() {
  return (
    <section className="relative py-24 md:py-32 bg-background section-glow-top">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <SectionHeading
            title="Measured Impact"
            subtitle="Real numbers from real legal teams using ContractCounsel"
          />
        </AnimatedSection>

        <AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Chart */}
            <div className="lg:col-span-8 rounded-2xl border border-border-subtle bg-bg-secondary p-6 md:p-8">
              <div className="mb-4">
                <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground">
                  Average review time
                </h3>
                <p className="text-text-secondary text-sm mt-1">
                  Six quarters · enterprise legal teams · n = 312 contracts
                </p>
              </div>
              <AnimatedChart />
            </div>

            {/* Side stats */}
            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-6">
              <div className="rounded-2xl border border-border-subtle bg-bg-secondary p-6">
                <StatCounter value={96} suffix="%" label="Time saved" />
              </div>
              <div className="rounded-2xl border border-border-subtle bg-bg-secondary p-6">
                <StatCounter value={312} suffix="+" label="Contracts analysed" />
              </div>
              <div className="rounded-2xl border border-border-subtle bg-bg-secondary p-6">
                <StatCounter value={99} suffix="%" label="Clause accuracy" />
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
