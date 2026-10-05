import { useEffect, useRef, useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import Modal from "../ui/Modal";
import { CONTACT_LINKS, SITE } from "../../data/site";
import { useI18n } from "../../i18n/useI18n";
import styles from "./ContactModal.module.css";

export default function ContactModal({ open, onOpenChange }) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable (insecure context): the address is still visible */
    }
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={t("contact.title")}
      description={t("contact.description")}
    >
      <ul className={styles.grid}>
        {CONTACT_LINKS.map(({ id, label, href }) => (
          <li key={id}>
            <a
              className={styles.tile}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{label}</span>
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>

      <div className={styles.email}>
        <span className={styles.address}>{SITE.email}</span>
        <button type="button" className={styles.copy} onClick={copyEmail}>
          {copied ? (
            <Check size={16} aria-hidden="true" />
          ) : (
            <Copy size={16} aria-hidden="true" />
          )}
          {t("contact.copyEmail")}
        </button>
      </div>
      <p className={styles.status} role="status">
        {copied ? t("contact.copied") : ""}
      </p>
    </Modal>
  );
}
