import { useRef, useState } from "react";
import { gsap, useGSAP, ScrollTrigger } from "../../lib/gsap";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import { NAVBAR_OFFSET } from "../../hooks/scrollToSection";
import { useI18n } from "../../i18n/useI18n";
import styles from "./ProcessPanel.module.css";

const STEP_DISTANCE = 0.8; // viewport heights of scroll per image
const HOLD = 0.5; // pause (in steps) on the last image before moving on
const pad = (n) => String(n).padStart(2, "0");

export default function ProcessPanel({ process, index, total, onOpen }) {
  const { t, lang } = useI18n();
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  const steps = process.steps;
  const length = steps.length - 1 + HOLD; // scroll timeline length, in steps

  useGSAP(
    () => {
      const track = trackRef.current;
      const images = gsap.utils.toArray("[data-process-image]", track);

      // Vertical distance that puts image i at the center of the column.
      // Functions are re-evaluated on refresh (invalidateOnRefresh), so resizing stays correct.
      const center = (i) => images[i].offsetTop + images[i].offsetHeight / 2;

      const tl = gsap.timeline({ defaults: { ease: "none" } });

      if (images.length > 1) {
        images.slice(1).forEach((_, k) => {
          const to = { y: () => -center(k + 1), duration: 1 };
          if (k === 0) tl.fromTo(track, { y: () => -center(0) }, to, 0);
          else tl.to(track, to, k);
        });
      } else {
        gsap.set(track, { y: () => -center(0) });
      }
      tl.to({}, { duration: HOLD }, steps.length - 1); // hold on the last image

      ScrollTrigger.create({
        id: index === 0 ? "process" : `process-${index}`,
        trigger: rootRef.current,
        start: `top top+=${NAVBAR_OFFSET}`,
        end: () => `+=${length * STEP_DISTANCE * window.innerHeight}`,
        pin: true,
        scrub: true,
        animation: tl,
        invalidateOnRefresh: true,
        onUpdate: (self) =>
          setActive(
            Math.min(steps.length - 1, Math.round(self.animation.time()))
          ),
      });
    },
    { scope: rootRef }
  );

  const step = steps[active];

  return (
    <article
      ref={rootRef}
      className={styles.panel}
      aria-labelledby={`${process.id}-title`}
    >
      <Container className={styles.inner}>
        <div className={styles.media}>
          <div ref={trackRef} className={styles.track}>
            {steps.map((s, i) => (
              <img
                key={s.id}
                data-process-image
                data-active={i === active}
                className={styles.image}
                src={s.image}
                alt={`${process.title[lang]}: ${s.label[lang]}`}
                loading="lazy"
                draggable={false}
              />
            ))}
          </div>
        </div>

        <div className={styles.content}>
          <p className={styles.eyebrow} aria-hidden="true">
            {t("process.title")} · {pad(index + 1)} / {pad(total)}
          </p>
          <h3 id={`${process.id}-title`} className={styles.title}>
            {process.title[lang]}
          </h3>
          <p className={styles.summary}>{process.summary[lang]}</p>

          {/* key: remounts on each step so the text rises in again */}
          <div key={step.id} className={styles.step}>
            <p className={styles.stepNum}>
              {active + 1} / {steps.length}
            </p>
            <h4 className={styles.stepLabel}>{step.label[lang]}</h4>
            <p className={styles.stepText}>{step.text[lang]}</p>
          </div>

          <Button variant="gold" onClick={() => onOpen(process)}>
            {t("process.open")}
          </Button>
        </div>
      </Container>
    </article>
  );
}
