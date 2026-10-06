import { useRef } from "react";
import { gsap, useGSAP, SplitText } from "../lib/gsap";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import { useContact } from "../hooks/useContact";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useI18n } from "../i18n/useI18n";
import styles from "./FinalCta.module.css";

export default function FinalCta() {
  const { t, lang } = useI18n();
  const { openContact } = useContact();
  const reduced = useReducedMotion();
  const root = useRef(null);
  const titleRef = useRef(null);

  useGSAP(
    () => {
      if (reduced) return;
      gsap.from("[data-cta-fade]", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
      });
    },
    { scope: root, dependencies: [reduced] }
  );

  // Headline reveal, line by line (replays on language change)
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
            duration: 0.9,
            stagger: 0.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 85%",
              once: true,
            },
          }),
      });
    },
    { scope: root, dependencies: [reduced, lang] }
  );

  return (
    <section ref={root} className={styles.cta} aria-labelledby="cta-title">
      <Container>
        {/* key={lang}: remount so SplitText never fights React's text update */}
        <h2 key={lang} id="cta-title" ref={titleRef} className={styles.title}>
          {t("cta.title")}
        </h2>
        <p className={styles.text} data-cta-fade>
          {t("cta.text")}
        </p>
        <div data-cta-fade>
          <Button
            variant="gold"
            className={styles.button}
            onClick={openContact}
          >
            {t("cta.button")}
          </Button>
        </div>
      </Container>
    </section>
  );
}
