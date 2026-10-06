import { useRef } from "react";
import { Tabs } from "radix-ui";
import { gsap, useGSAP } from "../../lib/gsap";
import Modal from "../../components/ui/Modal";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useI18n } from "../../i18n/useI18n";
import styles from "./ProcessModal.module.css";

function StepPanel({ step, alt }) {
  const { lang } = useI18n();
  const reduced = useReducedMotion();
  const ref = useRef(null);

  useGSAP(
    () => {
      if (reduced) return;
      gsap.from(ref.current.children, {
        y: 16,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
      });
    },
    { scope: ref, dependencies: [reduced] }
  );

  return (
    <div ref={ref}>
      <img className={styles.image} src={step.image} alt={alt} loading="lazy" />
      <p className={styles.text}>{step.text[lang]}</p>
    </div>
  );
}

export default function ProcessModal({ process, open, onOpenChange }) {
  const { t, lang } = useI18n();

  if (!process) return null;

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={process.title[lang]}
      description={process.summary[lang]}
    >
      {/* key: switching process always starts back at step 1 */}
      <Tabs.Root key={process.id} defaultValue={process.steps[0].id}>
        <Tabs.List className={styles.list} aria-label={t("process.steps")}>
          {process.steps.map((step, i) => (
            <Tabs.Trigger
              key={step.id}
              value={step.id}
              className={styles.trigger}
            >
              <span className={styles.num}>{i + 1}</span>
              {step.label[lang]}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {process.steps.map((step) => (
          <Tabs.Content key={step.id} value={step.id} className={styles.panel}>
            <StepPanel
              step={step}
              alt={`${process.title[lang]}: ${step.label[lang]}`}
            />
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </Modal>
  );
}
