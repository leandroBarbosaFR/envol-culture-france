"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  className?: string;
  /** Width of the per-character reveal "wave" as a fraction of total scroll progress (0..1). */
  waveWidth?: number;
  /** Minimum opacity for not-yet-revealed characters. */
  minOpacity?: number;
};

export function ScrollRevealText({
  text,
  className,
  waveWidth = 0.18,
  minOpacity = 0.2,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const compute = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = vh * 0.25;
      const range = start - end;
      const traveled = start - rect.top;
      const p = Math.max(0, Math.min(1, traveled / range));
      setProgress(p);
    };

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  const words = text.split(" ");
  const totalChars = text.replace(/\s/g, "").length;
  let charIndex = -1;

  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} aria-hidden>
          <span className="inline-block whitespace-nowrap">
            {word.split("").map((char, ci) => {
              charIndex++;
              const charPos = totalChars > 1 ? charIndex / (totalChars - 1) : 0;
              const local = (progress - charPos + waveWidth) / waveWidth;
              const opacity = Math.max(
                minOpacity,
                Math.min(1, minOpacity + (1 - minOpacity) * local)
              );
              return (
                <span key={ci} className="inline-block" style={{ opacity }}>
                  {char}
                </span>
              );
            })}
          </span>
          {wi < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}
