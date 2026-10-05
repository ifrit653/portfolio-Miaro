import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Button from "../ui/Button";
import LanguageToggle from "./LanguageToggle";
import { NAV_ITEMS } from "../../data/site";
import { useI18n } from "../../i18n/useI18n";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import styles from "./MobileMenu.module.css";

export default function MobileMenu({ active, onNavigate, onContact }) {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const ref = useRef(null);

  useGSAP(
    () => {
      if (reduced) return;
      gsap.from("[data-stagger]", {
        y: 28,
        opacity: 0,
        duration: 0.6,
        stagger: 0.07,
        ease: "power3.out",
        delay: 0.1,
      });
    },
    { scope: ref, dependencies: [reduced] }
  );

  return (
    <div ref={ref} className={styles.menu}>
      <nav aria-label={t("nav.primary")}>
        <ul className={styles.list}>
          {NAV_ITEMS.map(({ id, labelKey }) => (
            <li key={id} data-stagger>
              <a
                href={`#${id}`}
                className={styles.link}
                aria-current={active === id ? "true" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(id);
                }}
              >
                {t(labelKey)}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.actions} data-stagger>
        <Button variant="red" onClick={onContact}>
          {t("nav.contact")}
        </Button>
        <LanguageToggle />
      </div>
    </div>
  );
}
