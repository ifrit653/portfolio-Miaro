import { useRef } from "react";
import { gsap, useGSAP, SplitText } from "../lib/gsap";
import Button from "../components/ui/Button";
import { SITE } from "../data/site";
import { scrollToSection } from "../hooks/scrollToSection";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useI18n } from "../i18n/useI18n";
import styles from "./Hero.module.css";

export default function Hero() {
  const { t, lang } = useI18n();
  const reduced = useReducedMotion();

  const root = useRef(null);
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const ctaRef = useRef(null);

  // Name + CTA: play once
  useGSAP(
    () => {
      if (reduced) return;

      SplitText.create(nameRef.current, {
        type: "lines,chars", // was "chars"
        mask: "lines", // was "chars"
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.chars, {
            // still animate the chars
            yPercent: 110,
            duration: 0.9,
            stagger: 0.045,
            ease: "power4.out",
            delay: 0.15,
          }),
      });

      gsap.from(ctaRef.current, {
        y: 24,
        opacity: 0,
        duration: 0.8,
        delay: 0.9,
        ease: "power3.out",
      });
    },
    { scope: root, dependencies: [reduced] }
  );

  // Title: replays when the language changes
  useGSAP(
    () => {
      if (reduced) return;

      SplitText.create(titleRef.current, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 110,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.5,
          }),
      });
    },
    { scope: root, dependencies: [reduced, lang] }
  );

  return (
    <section
      id="hero"
      ref={root}
      className={styles.hero}
      aria-labelledby="hero-name"
    >
      <div className={styles.inner}>
        <h1 id="hero-name" ref={nameRef} className={styles.name}>
          {SITE.heroName}
        </h1>

        {/* key={lang}: React remounts the element so SplitText never fights React's text update */}
        <p key={lang} ref={titleRef} className={styles.title}>
          {t("hero.title")}
        </p>

        <div ref={ctaRef} className={styles.cta}>
          <Button
            as="a"
            variant="gold"
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("projects", { reduced });
            }}
          >
            {t("hero.cta")} ↓
          </Button>
        </div>
      </div>
    </section>
  );
}
