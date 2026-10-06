import { useRef, useState } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import Section from "../../components/ui/Section";
import ProcessCard from "./ProcessCard";
import ProcessModal from "./ProcessModal";
import { PROCESSES } from "../../data/processes";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useI18n } from "../../i18n/useI18n";
import styles from "./Process.module.css";

export default function Process() {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const root = useRef(null);
  const [modal, setModal] = useState({ open: false, process: null });

  useGSAP(
    () => {
      if (reduced) return;
      gsap.from("[data-process-card]", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
      });
    },
    { scope: root, dependencies: [reduced] }
  );

  return (
    <Section id="process" title={t("process.title")}>
      <ul ref={root} className={styles.grid}>
        {PROCESSES.map((process) => (
          <li key={process.id} data-process-card>
            <ProcessCard
              process={process}
              onOpen={() => setModal({ open: true, process })}
            />
          </li>
        ))}
      </ul>

      <ProcessModal
        process={modal.process}
        open={modal.open}
        onOpenChange={(open) => setModal((s) => ({ ...s, open }))}
      />
    </Section>
  );
}
