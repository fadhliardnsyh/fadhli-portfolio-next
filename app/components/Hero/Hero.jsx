"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import styles from "./Hero.module.css";

const mask = {
  hidden: { y: "105%" },
  show: (i) => ({
    y: "0%",
    transition: {
      duration: 1.1,
      delay: 0.35 + i * 0.14,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const fade = {
  hidden: { opacity: 0, y: 12 },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  const onConnectClick = () => window.dispatchEvent(new CustomEvent("openContactModal"));
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const op = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section className={styles.hero} ref={ref} id="home">

      {/* Top meta, refined, not data-heavy */}
      <div className={styles.topRow}>
        <motion.div
          className={styles.availability}
          variants={fade}
          initial="hidden"
          animate="show"
          custom={0.2}
        >
          <span className={styles.availDot} />
          Available for new projects
        </motion.div>
      </div>

      {/* Title */}
      <motion.div className={styles.center} style={{ y, opacity: op }}>
        <h1 className={styles.title}>
          <span className={styles.row}>
            <motion.span
              className={styles.maskInner}
              variants={mask}
              custom={0}
              initial="hidden"
              animate="show"
            >
              <em className={styles.serif}>UI/UX</em> designer
            </motion.span>
          </span>
          <span className={styles.row}>
            <motion.span
              className={styles.maskInner}
              variants={mask}
              custom={1}
              initial="hidden"
              animate="show"
            >
              &amp; <em className={styles.serif}>vibe coder</em>
            </motion.span>
          </span>
          <span className={styles.row}>
            <motion.span
              className={styles.maskInner}
              variants={mask}
              custom={2}
              initial="hidden"
              animate="show"
            >
              based in <em className={styles.serif}>Indonesia</em>
            </motion.span>
          </span>
        </h1>
      </motion.div>

      {/* Bottom */}
      <motion.div
        className={styles.bottom}
        variants={fade}
        initial="hidden"
        animate="show"
        custom={1.3}
      >
        <p className={styles.bio}>
          I&apos;m Fadhli, a UI/UX Designer and vibe coder, crafting digital
          experiences that balance business goals with human needs.
        </p>
        <button className={styles.cta} onClick={onConnectClick}>
          <span>Get in touch</span>
          <svg
            className={styles.ctaArrow}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </button>
      </motion.div>

      {/* Subtle scroll cue */}
      <motion.div
        className={styles.scrollCue}
        variants={fade}
        initial="hidden"
        animate="show"
        custom={1.6}
      >
        <span className={styles.scrollLabel}>Scroll</span>
        <span className={styles.scrollLine}>
          <span className={styles.scrollLineDot} />
        </span>
      </motion.div>
    </section>
  );
}
