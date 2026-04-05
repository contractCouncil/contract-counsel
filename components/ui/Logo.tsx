"use client";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#" className={`flex items-center gap-2 ${className}`}>
      <span className="font-serif text-3xl font-bold tracking-tight text-foreground">
        CC<span className="text-accent">.</span>
      </span>
    </a>
  );
}
