'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './Approach.module.css';

const STEPS = [
  {
    num: '01',
    name: 'User Research',
    text: 'Everything starts with understanding people. I conduct interviews, usability tests, and competitive analysis to uncover real user needs, mental models, and pain points — before writing a single spec.',
  },
  {
    num: '02',
    name: 'Define',
    text: 'I synthesize research into clear problem statements, user personas, and journey maps. This phase transforms scattered insights into a focused design brief — the North Star for every decision that follows.',
  },
  {
    num: '03',
    name: 'Design',
    text: 'From rough sketches to high-fidelity prototypes, I craft interfaces that are intuitive, accessible, and visually coherent. I build design systems, not one-off screens — scalable, consistent, and developer-friendly.',
  },
  {
    num: '04',
    name: 'Test & Iterate',
    text: 'Design never ships perfect — it ships validated. I test prototypes with real users, gather feedback, and iterate fast. Every round brings the product closer to something people genuinely love.',
  },
];

export default function Approach() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stickyRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add(styles.visible);
      }),
      { threshold: 0.07, rootMargin: '0px 0px -40px 0px' }
    );
    if (stickyRef.current) observer.observe(stickyRef.current);
    if (rightRef.current) observer.observe(rightRef.current);
    return () => observer.disconnect();
  }, []);

  const progress = (activeIndex / (STEPS.length - 1)) * 100;

  return (
    <section className={styles.section} id="approach">
      <div className={styles.inner}>
        <div className={styles.layout}>

          {/* LEFT sticky */}
          <div className={`${styles.sticky} ${styles.reveal}`} ref={stickyRef}>
            <div className={styles.sectionLabel}><i />My Process</div>
            <h2 className={styles.sectionTitle}>How I design with purpose</h2>
            <p className={styles.sectionSub}>
              A structured approach that turns ambiguity into clarity — and clarity into products people love.
            </p>
          </div>

          {/* RIGHT: horizontal steps + panel */}
          <div className={`${styles.stepsWrap} ${styles.reveal} ${styles.revealD2}`} ref={rightRef}>

            {/* Step nav */}
            <div className={styles.stepNav}>
              <div className={styles.track}>
                <div className={styles.trackFill} style={{ width: `${progress}%` }} />
              </div>
              {STEPS.map((step, i) => (
                <button
                  key={step.num}
                  className={[
                    styles.stepBtn,
                    i === activeIndex ? styles.stepActive : '',
                    i < activeIndex ? styles.stepPast : '',
                  ].join(' ')}
                  onClick={() => setActiveIndex(i)}
                >
                  <span className={styles.dot} />
                  <span className={styles.stepNum}>{step.num}</span>
                  <span className={styles.stepLabel}>{step.name}</span>
                </button>
              ))}
            </div>

            {/* Content panel */}
            <div className={styles.panel}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  className={styles.panelInner}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className={styles.panelBg}>{STEPS[activeIndex].num}</span>
                  <h3 className={styles.panelName}>{STEPS[activeIndex].name}</h3>
                  <p className={styles.panelText}>{STEPS[activeIndex].text}</p>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
