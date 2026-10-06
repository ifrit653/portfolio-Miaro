import { ExternalLink } from "lucide-react";
import Stars from "./Stars";
import { useI18n } from "../../i18n/useI18n";
import styles from "./ReviewCard.module.css";

export default function ReviewCard({ review }) {
  const { t, lang } = useI18n();
  const { name, platform, rating, text, date, href } = review;

  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const formatted = new Intl.DateTimeFormat(lang, {
    year: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(new Date(date));

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <span className={styles.avatar} aria-hidden="true">
          {initials}
        </span>
        <div>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.platform}>{platform}</p>
        </div>
        <a
          className={styles.verify}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t("reviews.verifyOn")} ${platform}`}
        >
          <ExternalLink size={16} aria-hidden="true" />
        </a>
      </header>

      <Stars rating={rating} />
      <p className={styles.text}>{text}</p>
      <p className={styles.date}>
        <time dateTime={date}>{formatted}</time>
      </p>
    </article>
  );
}
