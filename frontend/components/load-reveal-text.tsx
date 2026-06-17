"use client";

import { useEffect, useState } from "react";

type Props = {
  text: string;
  className?: string;
  /** Delay before the first character begins (ms). */
  startDelay?: number;
  /** Per-character stagger (ms). */
  staggerMs?: number;
  /** Transition duration per character (ms). */
  duration?: number;
};

export function LoadRevealText({
  text,
  className,
  startDelay = 0,
  staggerMs = 30,
  duration = 600,
}: Props) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const words = text.split(" ");
  let charIndex = -1;

  return (
    <span className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} aria-hidden>
          <span className="inline-block whitespace-nowrap">
            {word.split("").map((char, ci) => {
              charIndex++;
              const delay = startDelay + charIndex * staggerMs;
              return (
                <span
                  key={ci}
                  className="inline-block"
                  style={{
                    opacity: loaded ? 1 : 0,
                    transform: loaded ? "translateY(0)" : "translateY(8px)",
                    transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
                    transitionDelay: `${delay}ms`,
                  }}
                >
                  {char}
                </span>
              );
            })}
          </span>
          {wi < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}
