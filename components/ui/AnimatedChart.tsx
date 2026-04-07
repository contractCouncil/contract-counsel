"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// Hours per contract review across 6 quarters
const QUARTERS = ["Q1 '24", "Q2 '24", "Q3 '24", "Q4 '24", "Q1 '25", "Q2 '25"];
const MANUAL = [4.0, 4.1, 3.9, 4.0, 4.2, 4.0];
const AI = [1.4, 0.95, 0.62, 0.38, 0.22, 0.15];

// SVG geometry
const W = 720;
const H = 360;
const PAD_L = 56;
const PAD_R = 24;
const PAD_T = 30;
const PAD_B = 44;
const Y_MAX = 5;
const PLOT_W = W - PAD_L - PAD_R;
const PLOT_H = H - PAD_T - PAD_B;

const xAt = (i: number) => PAD_L + (i / (QUARTERS.length - 1)) * PLOT_W;
const yAt = (v: number) => PAD_T + PLOT_H - (v / Y_MAX) * PLOT_H;

const linePath = (data: number[]) =>
  data
    .map((v, i) => `${i === 0 ? "M" : "L"} ${xAt(i)} ${yAt(v)}`)
    .join(" ");

const areaPath = (data: number[]) =>
  `${linePath(data)} L ${xAt(data.length - 1)} ${PAD_T + PLOT_H} L ${xAt(0)} ${
    PAD_T + PLOT_H
  } Z`;

const Y_TICKS = [0, 1, 2, 3, 4, 5];

export default function AnimatedChart() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="relative w-full">
      <svg
        ref={ref}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        role="img"
        aria-label="Average contract review hours: manual vs ContractCounsel"
      >
        <defs>
          <linearGradient id="aiArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e8b84a" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#e8b84a" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="manualArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fafaf7" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#fafaf7" stopOpacity="0" />
          </linearGradient>
          <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Y grid + ticks */}
        {Y_TICKS.map((t) => (
          <g key={t}>
            <motion.line
              x1={PAD_L}
              x2={W - PAD_R}
              y1={yAt(t)}
              y2={yAt(t)}
              stroke="#332d3c"
              strokeWidth={1}
              strokeDasharray="2 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + t * 0.05 }}
            />
            <motion.text
              x={PAD_L - 12}
              y={yAt(t) + 4}
              textAnchor="end"
              fill="#807a70"
              fontSize="11"
              fontFamily="var(--font-sans)"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + t * 0.05 }}
            >
              {t}h
            </motion.text>
          </g>
        ))}

        {/* X labels */}
        {QUARTERS.map((q, i) => (
          <motion.text
            key={q}
            x={xAt(i)}
            y={H - PAD_B + 22}
            textAnchor="middle"
            fill="#807a70"
            fontSize="11"
            fontFamily="var(--font-sans)"
            initial={{ opacity: 0, y: H - PAD_B + 30 }}
            animate={inView ? { opacity: 1, y: H - PAD_B + 22 } : {}}
            transition={{ duration: 0.5, delay: 0.4 + i * 0.06 }}
          >
            {q}
          </motion.text>
        ))}

        {/* Manual area (faint) */}
        <motion.path
          d={areaPath(MANUAL)}
          fill="url(#manualArea)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
        />
        {/* Manual line (dashed) */}
        <motion.path
          d={linePath(MANUAL)}
          fill="none"
          stroke="#fafaf7"
          strokeOpacity={0.55}
          strokeWidth={2}
          strokeDasharray="6 5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* AI area */}
        <motion.path
          d={areaPath(AI)}
          fill="url(#aiArea)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.6 }}
        />
        {/* AI line (gold, glowing) */}
        <motion.path
          d={linePath(AI)}
          fill="none"
          stroke="#e8b84a"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#dotGlow)"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.6, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Manual data points */}
        {MANUAL.map((v, i) => (
          <motion.circle
            key={`m-${i}`}
            cx={xAt(i)}
            cy={yAt(v)}
            r={4}
            fill="#08070a"
            stroke="#fafaf7"
            strokeOpacity={0.6}
            strokeWidth={2}
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 2.2 + i * 0.08, type: "spring", stiffness: 200 }}
          />
        ))}

        {/* AI data points + interactive hit area */}
        {AI.map((v, i) => (
          <g key={`a-${i}`}>
            <motion.circle
              cx={xAt(i)}
              cy={yAt(v)}
              r={5.5}
              fill="#e8b84a"
              stroke="#08070a"
              strokeWidth={2}
              filter="url(#dotGlow)"
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: 2.4 + i * 0.1,
                type: "spring",
                stiffness: 220,
              }}
            />
            {/* Pulse ring on the latest point */}
            {i === AI.length - 1 && inView && (
              <motion.circle
                cx={xAt(i)}
                cy={yAt(v)}
                r={5.5}
                fill="none"
                stroke="#e8b84a"
                strokeWidth={2}
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: [1, 2.6, 1], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: 3.4 }}
              />
            )}
            {/* Hit area for tooltip */}
            <rect
              x={xAt(i) - 22}
              y={PAD_T}
              width={44}
              height={PLOT_H}
              fill="transparent"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              style={{ cursor: "pointer" }}
            />
            {hover === i && (
              <g pointerEvents="none">
                <line
                  x1={xAt(i)}
                  x2={xAt(i)}
                  y1={PAD_T}
                  y2={PAD_T + PLOT_H}
                  stroke="#e8b84a"
                  strokeOpacity={0.4}
                  strokeWidth={1}
                  strokeDasharray="2 3"
                />
                <g transform={`translate(${xAt(i) + 10}, ${yAt(v) - 38})`}>
                  <rect
                    width={108}
                    height={48}
                    rx={4}
                    fill="#110f14"
                    stroke="#332d3c"
                    strokeWidth={1}
                  />
                  <text x={10} y={18} fill="#c4bfb5" fontSize="10" fontFamily="var(--font-sans)">
                    {QUARTERS[i]}
                  </text>
                  <text x={10} y={32} fill="#e8b84a" fontSize="11" fontWeight="600" fontFamily="var(--font-sans)">
                    AI: {AI[i].toFixed(2)}h
                  </text>
                  <text x={10} y={44} fill="#fafaf7" fontSize="10" fontFamily="var(--font-sans)">
                    Manual: {MANUAL[i].toFixed(1)}h
                  </text>
                </g>
              </g>
            )}
          </g>
        ))}

        {/* Y-axis label */}
        <motion.text
          x={PAD_L}
          y={PAD_T - 12}
          fill="#c4bfb5"
          fontSize="11"
          fontFamily="var(--font-sans)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          Hours per contract review
        </motion.text>
      </svg>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-6 h-[2px] rounded-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, #fafaf7 0 6px, transparent 6px 11px)",
            }}
          />
          <span className="text-text-secondary">Manual review</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-6 h-[3px] rounded-full bg-accent shadow-[0_0_10px_rgba(232,184,74,0.6)]" />
          <span className="text-text-secondary">ContractCounsel AI</span>
        </div>
      </div>
    </div>
  );
}
