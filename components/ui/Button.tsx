"use client";

import { type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-background hover:bg-accent-hover font-semibold",
  secondary:
    "border border-border-visible text-foreground hover:bg-bg-tertiary font-medium",
  ghost:
    "text-text-secondary hover:text-foreground font-medium",
};

export default function Button({
  variant = "primary",
  href,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full px-7 py-3 text-sm tracking-wide transition-all duration-300 cursor-pointer";
  const styles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={styles}>
        {children}
      </a>
    );
  }

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
}
