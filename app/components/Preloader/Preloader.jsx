"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import styles from "./Preloader.module.css";

const WELCOME_LINES = ["Hey, glad", "you're here."];

export default function Preloader() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf;
    const start = performance.now();
    const duration = 2200;

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setCount(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 350);
      }
    };
    raf = requestAnimationFrame(tick);

    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className={styles.loader}
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Top label */}
          <motion.div
            className={styles.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span>Fadhli Ardiansyah</span>
            <span>©2026</span>
          </motion.div>

          {/* Center — welcome (home) or crafting (other pages) */}
          <div className={styles.center}>
            {isHome ? (
              <div className={styles.welcomeWrap}>
                {WELCOME_LINES.map((line, li) => (
                  <div key={li} className={styles.wordRow}>
                    {line.split("").map((char, i) => (
                      <motion.span
                        key={i}
                        className={styles.charWelcome}
                        initial={{ y: "105%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        transition={{
                          delay: 0.2 + li * 0.18 + i * 0.03,
                          duration: 0.75,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        {char === " " ? " " : char}
                      </motion.span>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.wordRow}>
                {"CRAFTING".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    className={styles.charPage}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{
                      delay: 0.15 + i * 0.04,
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            )}
          </div>

          {/* Big counter */}
          <div className={styles.counterWrap}>
            <span className={styles.counter}>{count}</span>
            <span className={styles.percent}>%</span>
          </div>

          {/* Progress line */}
          <div className={styles.progressTrack}>
            <motion.div
              className={styles.progressFill}
              style={{ width: `${count}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
