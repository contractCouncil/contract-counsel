"use client";

import { useRef, useState, type FormEvent } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import AnimatedSection from "../ui/AnimatedSection";
import Button from "../ui/Button";
import { siteConfig } from "@/lib/constants";
import { FiMail, FiPhone } from "react-icons/fi";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 0.6"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
              subtitle="Book a demo to see how ContractConsel can help your team work smarter"
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Left - Info */}
            <AnimatedSection delay={0.1}>
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

            {/* Right - Form */}
            <AnimatedSection delay={0.2}>
              {submitted ? (
                <div className="flex items-center justify-center h-full rounded-2xl border border-accent/30 bg-accent/5 p-8">
                  <div className="text-center">
                    <p className="font-serif text-2xl text-foreground mb-2">Thank You!</p>
                    <p className="text-text-secondary">
                      We&apos;ll be in touch shortly to schedule your demo.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    className="w-full rounded-xl border border-border-visible bg-bg-tertiary px-5 py-3 text-foreground placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    className="w-full rounded-xl border border-border-visible bg-bg-tertiary px-5 py-3 text-foreground placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    className="w-full rounded-xl border border-border-visible bg-bg-tertiary px-5 py-3 text-foreground placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
                  />
                  <textarea
                    placeholder="Tell us about your legal needs"
                    rows={4}
                    className="w-full rounded-xl border border-border-visible bg-bg-tertiary px-5 py-3 text-foreground placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors resize-none"
                  />
                  <Button type="submit" variant="primary" className="w-full">
                    Book a Demo
                  </Button>
                </form>
              )}
            </AnimatedSection>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
