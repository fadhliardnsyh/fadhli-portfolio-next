"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ContactModal.module.css";

export default function ContactModal({ isOpen, onClose }) {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef(null);

  // ── ESC to close ───────────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // ── Lock body scroll ───────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ── Submit via EmailJS ─────────────────────────────────────
  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(formRef.current);
    setStatus("loading");

    try {
      // EmailJS send, pakai config yang sama dari portfolio lama
      const res = await window.emailjs.send(
        "service_jsg8yed",
        "template_c61ojyw",
        {
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company") || "-",
          project: data.get("project") || "-",
          message: data.get("message"),
        }
      );

      if (res.status === 200) {
        setStatus("idle");
        formRef.current.reset();
        onClose();
        setTimeout(() => setShowSuccess(true), 300);
      }
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  }

  return (
    <>
      {/* ── CONTACT MODAL ──────────────────────────────────── */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.open : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        aria-modal="true"
        role="dialog"
        aria-label="Contact form"
      >
        <div className={styles.box}>
          {/* Close button */}
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Header */}
          <div className={styles.header}>
            <div className={styles.label}>Get in touch</div>
            <h2 className={styles.title}>Let's work together.</h2>
            <p className={styles.sub}>
              Fill out the form below and I'll get back to you within 24 hours.
            </p>
          </div>

          {/* Form */}
          <form className={styles.form} ref={formRef} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Your Name *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Fadhli Ardiansyah"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="hello@email.com"
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Company Name</label>
                <input type="text" name="company" placeholder="Your Company" />
              </div>
              <div className={styles.formGroup}>
                <label>Project Name</label>
                <input
                  type="text"
                  name="project"
                  placeholder="My Awesome Project"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Message *</label>
              <textarea
                name="message"
                rows="4"
                placeholder="Tell me about your project..."
                required
              />
            </div>

            <button
              type="submit"
              className={`${styles.submitBtn} ${
                status === "loading" ? styles.loading : ""
              }`}
              disabled={status === "loading"}
            >
              <span>
                {status === "loading" ? "Sending..." : "Send Message"}
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            {status === "error" && (
              <p className={styles.errorMsg}>
                ✗ Something went wrong. Please try again or email me directly.
              </p>
            )}
          </form>
        </div>
      </div>

      {/* ── SUCCESS MODAL ──────────────────────────────────── */}
      <div
        className={`${styles.successOverlay} ${showSuccess ? styles.open : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setShowSuccess(false);
        }}
      >
        <div className={styles.successBox}>
          <div className={styles.successIcon}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h3 className={styles.successTitle}>Message Sent!</h3>
          <p className={styles.successDesc}>
            Thanks for reaching out! I've received your message and will get
            back to you within <strong>24 hours</strong>. Can't wait to connect!
            🙌
          </p>
          <button
            className={styles.successBtn}
            onClick={() => setShowSuccess(false)}
          >
            Got it!
          </button>
        </div>
      </div>
    </>
  );
}
