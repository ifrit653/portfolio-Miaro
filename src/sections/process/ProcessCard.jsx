import { useI18n } from "../../i18n/useI18n";
import styles from "./ProcessCard.module.css";

export default function ProcessCard({ process, onOpen }) {
  const { t, lang } = useI18n();
  const Icon = process.icon;

  return (
    <button
      type="button"
      className={styles.card}
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-label={`${t("process.open")}: ${process.title[lang]}`}
    >
      <span className={styles.icon} aria-hidden="true">
        <Icon size={48} strokeWidth={1.5} />
      </span>
      <span className={styles.label}>{process.title[lang]}</span>
    </button>
  );
}
