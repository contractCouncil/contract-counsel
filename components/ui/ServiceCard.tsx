"use client";

import { type IconType } from "react-icons";
import AnimatedSection from "./AnimatedSection";

interface ServiceCardProps {
  icon: IconType;
  title: string;
  description: string;
  delay?: number;
  animated?: boolean;
}

export default function ServiceCard({
  icon: Icon,
  title,
  description,
  delay = 0,
  animated = true,
}: ServiceCardProps) {
  const card = (
    <div className="group relative h-full rounded-2xl border border-border-subtle bg-bg-secondary p-8 transition-all duration-300 hover:border-accent/30 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(200,168,98,0.06)]">
        <div className="mb-5 inline-flex items-center justify-center rounded-xl bg-bg-tertiary p-3 text-accent transition-colors duration-300 group-hover:bg-accent/10">
          <Icon size={24} />
        </div>
        <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
          {title}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed">
          {description}
        </p>
      </div>
  );

  if (!animated) return card;

  return <AnimatedSection delay={delay}>{card}</AnimatedSection>;
}
