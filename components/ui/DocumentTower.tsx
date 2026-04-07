"use client";

import { useReducedMotion } from "framer-motion";

const CARD_COUNT = 6;
const ROTATION_DURATION = 30; // seconds for full Y rotation
const ORBIT_RADIUS = 320;

// Pre-computed line widths so SSR + client match
const LINE_WIDTHS: number[][] = [
  [92, 78, 88, 70, 84, 66, 80],
  [86, 92, 72, 88, 76, 82, 68],
  [90, 74, 84, 80, 68, 88, 76],
  [78, 88, 82, 70, 92, 72, 84],
  [84, 76, 90, 68, 82, 88, 74],
  [88, 70, 80, 92, 74, 86, 78],
];

const CARD_TITLES = [
  "MASTER SERVICES AGREEMENT",
  "NON-DISCLOSURE AGREEMENT",
  "EMPLOYMENT CONTRACT",
  "LICENSE AGREEMENT",
  "TERMS OF SERVICE",
  "PURCHASE AGREEMENT",
];

export default function DocumentTower() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="doc-stage" aria-hidden>
      <div className={`doc-rig ${prefersReduced ? "is-static" : ""}`}>
        {Array.from({ length: CARD_COUNT }).map((_, i) => {
          const angle = (i * 360) / CARD_COUNT;
          // Each card lights up when it faces camera (delayed by its angular offset)
          const highlightDelay = (i / CARD_COUNT) * ROTATION_DURATION;

          return (
            <div
              key={i}
              className="doc-card"
              style={{
                transform: `rotateY(${angle}deg) translateZ(${ORBIT_RADIUS}px)`,
              }}
            >
              <div className="doc-card__sheet">
                <div className="doc-card__title">{CARD_TITLES[i]}</div>
                <div className="doc-card__rule" />
                <div className="doc-card__body">
                  {LINE_WIDTHS[i].map((w, li) => (
                    <div key={li} className="doc-line-wrap">
                      <div className="doc-line" style={{ width: `${w}%` }} />
                      {!prefersReduced && (
                        <div
                          className="doc-line__highlight"
                          style={{
                            width: `${w}%`,
                            animationDelay: `${highlightDelay + li * 0.05}s`,
                            animationDuration: `${ROTATION_DURATION}s`,
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="doc-card__footer">
                  <div className="doc-card__sig-label">SIGNATURE</div>
                  <div className="doc-card__sig-line">
                    <span className="doc-card__sig-x">×</span>
                  </div>
                </div>
                <div className="doc-card__corner" />
              </div>
            </div>
          );
        })}
      </div>

      {!prefersReduced && <div className="doc-scanbeam" />}
    </div>
  );
}
