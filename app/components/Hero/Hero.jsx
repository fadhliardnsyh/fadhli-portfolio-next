"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import styles from "./Hero.module.css";

const mask = {
  hidden: { y: "105%" },
  show: (i) => ({
    y: "0%",
    transition: {
      duration: 1,
      delay: 0.3 + i * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const fade = {
  hidden: { opacity: 0 },
  show: (d = 0) => ({ opacity: 1, transition: { duration: 1, delay: d } }),
};

export default function Hero() {
  const onConnectClick = () => window.dispatchEvent(new CustomEvent("openContactModal"));
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const op = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section className={styles.hero} ref={ref} id="home">
      <div className={styles.glow} />
      <div className={styles.noise} />

      {/* top corners */}
      <motion.div
        className={styles.cornerTR}
        variants={fade}
        initial="hidden"
        animate="show"
        custom={0.3}
      >
        Bekasi, ID — {new Date().getFullYear()}
      </motion.div>

      {/* main */}
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
              Product
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
              &amp; <em className={styles.serif}>UI/UX</em> designer
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

      {/* bottom */}
      <motion.div
        className={styles.bottom}
        variants={fade}
        initial="hidden"
        animate="show"
        custom={1.3}
      >
        <p className={styles.bio}>
          I'm Fadhli — a Product &amp; UI/UX Designer crafting digital
          experiences that balance business goals with human needs.
        </p>
        <button className={styles.cta} onClick={onConnectClick}>
          <span>Get in touch</span>
          <span className={styles.ctaArrow}>↗</span>
        </button>
      </motion.div>
    </section>
  );
}
