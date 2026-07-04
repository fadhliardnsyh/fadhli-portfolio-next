"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Wraps the page in Lenis-based smooth scrolling.
 * Enabled only on devices with a fine pointer (desktop/trackpad) , 
 * touch devices keep native inertia which already feels great.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Skip on touch-primary devices: native inertia already feels smooth,
    // and Lenis on touch can interfere with pull-to-refresh / scroll-snap.
    const isFinePointer =
      window.matchMedia &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFinePointer) return;

    // Respect reduced-motion preference.
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      lerp: 0.1,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
