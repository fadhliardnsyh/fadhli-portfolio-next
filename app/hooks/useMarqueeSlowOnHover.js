"use client";

import { useEffect } from "react";

/**
 * Smoothly slows down CSS marquee animations inside `wrapRef` while
 * the pointer hovers over it. Uses the Web Animations API's
 * `playbackRate` so the slowdown continues from the current frame
 * (no position jump), and eases the rate change for a soft feel.
 */
export default function useMarqueeSlowOnHover(wrapRef, options = {}) {
  const { slowRate = 0.25, easeMs = 400 } = options;

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || typeof window === "undefined") return;
    if (!("getAnimations" in wrap)) return;

    let rafId = null;
    let easeStart = 0;
    let fromRate = 1;
    let toRate = 1;

    const getMarqueeAnims = () => {
      // All CSS animations on descendants of wrap
      const anims = wrap.getAnimations({ subtree: true });
      // Filter to those whose animation-name looks like a marquee
      return anims.filter((a) => {
        const name = a.animationName || (a.effect && a.effect.getKeyframes && a.id) || "";
        // Most marquees use scroll*/slide* keyframes
        return /scroll|slide|marquee/i.test(a.animationName || "");
      });
    };

    const setRate = (rate) => {
      const anims = getMarqueeAnims();
      anims.forEach((a) => {
        try {
          a.playbackRate = rate;
        } catch {}
      });
    };

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const tick = () => {
      const now = performance.now();
      const t = Math.min((now - easeStart) / easeMs, 1);
      const eased = easeOutCubic(t);
      const rate = fromRate + (toRate - fromRate) * eased;
      setRate(rate);
      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    };

    const startEase = (target) => {
      // Capture current visual rate as starting point
      const anims = getMarqueeAnims();
      fromRate = anims[0] ? anims[0].playbackRate : 1;
      toRate = target;
      easeStart = performance.now();
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(tick);
    };

    const onEnter = () => startEase(slowRate);
    const onLeave = () => startEase(1);

    wrap.addEventListener("mouseenter", onEnter);
    wrap.addEventListener("mouseleave", onLeave);

    return () => {
      wrap.removeEventListener("mouseenter", onEnter);
      wrap.removeEventListener("mouseleave", onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [wrapRef, slowRate, easeMs]);
}
