// src/components/layout/Footer.jsx
import { ArrowUp } from "lucide-react";
import Container from "../ui/Container";
import { CONTACT_LINKS, SITE } from "../../data/site";
import { scrollToSection } from "../../hooks/scrollToSection";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useI18n } from "../../i18n/useI18n";
import styles from "./Footer.module.css";

export default function Footer() {
  const { t } = useI18n();
  const reduced = useReducedMotion();

  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <p className={styles.copy}>
          © {new Date().getFullYear()} {SITE.fullName}. {t("footer.rights")}
        </p>

        <nav aria-label={t("footer.social")}>
          <ul className={styles.social}>
            {CONTACT_LINKS.map(({ id, label, href }) => (
              <li key={id}>
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#hero"
          className={styles.top}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("hero", { reduced });
          }}
        >
          {t("footer.backToTop")} <ArrowUp size={16} aria-hidden="true" />
        </a>
      </Container>
    </footer>
  );
}
