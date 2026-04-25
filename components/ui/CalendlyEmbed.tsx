"use client";

import Script from "next/script";

export default function CalendlyEmbed({
  url,
  height = 720,
}: {
  url: string;
  height?: number;
}) {
  const params = new URLSearchParams({
    background_color: "110f14",
    text_color: "fafaf7",
    primary_color: "e8b84a",
    hide_gdpr_banner: "1",
  });
  const themedUrl = `${url}?${params.toString()}`;

  return (
    <>
      <div
        className="calendly-inline-widget rounded-2xl overflow-hidden border border-border-subtle"
        data-url={themedUrl}
        style={{ minWidth: "320px", height: `${height}px` }}
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </>
  );
}
