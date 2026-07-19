"use client";

import { useEffect, useState } from "react";

const lines = ["The best Paris", "Experiences you'll ", "never forget!"] as const;

export function HeroAnimatedLines() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setStarted(true);
      return;
    }

    // Match WOW.js init after DOMContentLoaded: wait two frames so the
    // opacity:0 state paints first, then trigger fadeInUp.
    let innerId = 0;
    const outerId = window.requestAnimationFrame(() => {
      innerId = window.requestAnimationFrame(() => {
        setStarted(true);
      });
    });

    return () => {
      window.cancelAnimationFrame(outerId);
      window.cancelAnimationFrame(innerId);
    };
  }, []);

  return (
    <p className="mb-4">
      {lines.map((line) => (
        <span
          key={line}
          className={`block wow fadeInUp${started ? " animated started-animation" : ""}`}
        >
          {line}
        </span>
      ))}
    </p>
  );
}
