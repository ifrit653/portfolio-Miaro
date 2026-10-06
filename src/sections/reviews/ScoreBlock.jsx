import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import Stars from "./Stars";
import { SCORE } from "../../data/reviews";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useI18n } from "../../i18n/useI18n";
import styles from "./ScoreBlock.module.css";

export default function ScoreBlock() {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const ref = useRef(null);

  useGSAP(
    () => {
      if (reduced) return;
      const els = gsap.utils.toArray("[data-count]");

      els.forEach((el) => {
        const target = Number(el.dataset.count);
        const decimals = Number(el.dataset.decimals ?? 0);
        const state = { v: 0 };
        el.textContent = (0).toFixed(decimals);

        gsap.to(state, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => {
            el.textContent = state.v.toFixed(decimals);
          },
        });
      });

      return () =>
        els.forEach((el) => {
          el.textContent = Number(el.dataset.count).toFixed(
            Number(el.dataset.decimals ?? 0)
          );
        });
    },
    { scope: ref, dependencies: [reduced] }
  );

  return (
    <div ref={ref} className={styles.score}>
      <p className={styles.rating}>
        <span data-count={SCORE.rating} data-decimals="1">
          {SCORE.rating.toFixed(1)}
        </span>
        <span className={styles.outOf}>/ 5</span>
      </p>
      <Stars rating={SCORE.rating} size={28} />
      <p className={styles.caption}>
        <span data-count={SCORE.projects}>{SCORE.projects}</span>{" "}
        {t("reviews.projectsCompleted")}
      </p>
    </div>
  );
}
