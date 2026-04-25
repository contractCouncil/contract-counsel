"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import AnimatedSection from "../ui/AnimatedSection";
import CalendlyEmbed from "../ui/CalendlyEmbed";
import { siteConfig } from "@/lib/constants";
import { FiMail, FiPhone } from "react-icons/fi";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 0.6"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 md:py-32 bg-bg-secondary section-glow-top"
    >
      <motion.div style={{ scale, opacity }}>
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <SectionHeading
              title="Ready to Transform Your Legal Operations?"
              subtitle="Pick a 30-minute slot to see how ContractConsel can help your team work smarter"
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto items-start">
            {/* Left - Info */}
            <AnimatedSection delay={0.1} className="lg:col-span-4">
              <div>
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  Get in Touch
                </h3>
                <p className="text-text-secondary leading-relaxed mb-8">
                  Whether you&apos;re a law firm looking to enhance accuracy, or a business
                  seeking smarter contract management, we&apos;d love to show you what
                  ContractConsel can do.
                </p>
                <div className="space-y-4">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-center gap-3 text-text-secondary hover:text-accent transition-colors"
                  >
                    <FiMail size={18} />
                    <span>{siteConfig.email}</span>
                  </a>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="flex items-center gap-3 text-text-secondary hover:text-accent transition-colors"
                  >
                    <FiPhone size={18} />
                    <span>{siteConfig.phone}</span>
                  </a>
                </div>
              </div>
            </AnimatedSection>

            {/* Right - Calendly */}
            <AnimatedSection delay={0.2} className="lg:col-span-8">
              <CalendlyEmbed url={siteConfig.calendlyUrl} />
            </AnimatedSection>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
