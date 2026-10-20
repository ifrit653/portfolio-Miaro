import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, ScrollTrigger } from "../../lib/gsap";
import Section from "../../components/ui/Section";
import ProcessCard from "./ProcessCard";
import ProcessModal from "./ProcessModal";
import ProcessPinned from "./ProcessPinned";
import { PROCESSES } from "../../data/processes";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useI18n } from "../../i18n/useI18n";
import styles from "./Process.module.css";

// Pin only when there is enough room; phones and short screens get the cards
const PIN_QUERY = "(min-width: 1024px) and (min-height: 560px)";

export default function Process() {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const pinned = useMediaQuery(PIN_QUERY) && !reduced;

  const root = useRef(null);
  const [modal, setModal] = useState({ open: false, process: null });
  const open = (process) => setModal({ open: true, process });

  // Pinning adds/removes scroll distance: re-measure every trigger
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [pinned]);

  // Card reveal (grid layout only)
  useGSAP(
    () => {
      if (pinned || reduced) return;
      gsap.from("[data-process-card]", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
      });
    },
    { scope: root, dependencies: [pinned, reduced] }
  );

  return (
    <>
      <div id="process">
        {pinned ? (
          <ProcessPinned onOpen={open} />
        ) : (
          <Section id="process-grid" title={t("process.title")}>
            <ul ref={root} className={styles.grid}>
              {PROCESSES.map((process) => (
                <li key={process.id} data-process-card>
                  <ProcessCard process={process} onOpen={() => open(process)} />
                </li>
              ))}
            </ul>
          </Section>
        )}
      </div>

      <ProcessModal
        process={modal.process}
        open={modal.open}
        onOpenChange={(isOpen) => setModal((s) => ({ ...s, open: isOpen }))}
      />
    </>
  );
}
