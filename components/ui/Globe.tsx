"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

interface GlobeProps {
  className?: string;
  size?: number;
}

export default function Globe({ className = "", size = 800 }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const widthRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onResize = () => {
      widthRef.current = canvas.offsetWidth;
    };
    onResize();
    window.addEventListener("resize", onResize);

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      phi: 0,
      theta: 0.25,
      dark: 1,
      diffuse: 1.4,
      mapSamples: 16000,
      mapBrightness: 7,
      baseColor: [0.12, 0.12, 0.14],
      markerColor: [0.78, 0.66, 0.38], // brand gold
      glowColor: [0.78, 0.66, 0.38],
      opacity: 0.95,
      markers: [
        { location: [40.7128, -74.006], size: 0.08 },
        { location: [51.5074, -0.1278], size: 0.08 },
        { location: [1.3521, 103.8198], size: 0.06 },
        { location: [35.6762, 139.6503], size: 0.07 },
        { location: [-33.8688, 151.2093], size: 0.06 },
        { location: [25.2048, 55.2708], size: 0.06 },
        { location: [19.076, 72.8777], size: 0.07 },
        { location: [37.7749, -122.4194], size: 0.07 },
      ],
    });

    let phi = 0;
    let raf = 0;
    const tick = () => {
      phi += 0.003;
      globe.update({
        phi,
        width: widthRef.current * 2,
        height: widthRef.current * 2,
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    canvas.style.opacity = "0";
    requestAnimationFrame(() => {
      canvas.style.transition = "opacity 1.6s ease";
      canvas.style.opacity = "1";
    });

    return () => {
      cancelAnimationFrame(raf);
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center pointer-events-none ${className}`}
      aria-hidden
    >
      <canvas
        ref={canvasRef}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          maxWidth: "100vw",
          aspectRatio: "1",
        }}
      />
    </div>
  );
}
