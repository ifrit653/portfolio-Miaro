import { Images } from "lucide-react";
import Tag from "../../components/ui/Tag";
import { useI18n } from "../../i18n/useI18n";
import styles from "./ProjectCard.module.css";

export default function ProjectCard({ project, onOpenImages }) {
  const { t, lang } = useI18n();
  const { title, type, period, description, skills, images } = project;

  return (
    <article className={styles.card}>
      <button
        type="button"
        className={styles.media}
        onClick={() => onOpenImages(0)}
        aria-label={`${t("projects.viewImages")}: ${title}`}
      >
        <img src={images[0].src} alt="" loading="lazy" draggable={false} />
        {images.length > 1 && (
          <span className={styles.count} aria-hidden="true">
            <Images size={14} /> {images.length}
          </span>
        )}
      </button>

      <div className={styles.body}>
        <p className={styles.meta}>
          {type[lang]} · {period}
        </p>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description[lang]}</p>

        <ul className={styles.tags}>
          {skills.map((key) => (
            <li key={key}>
              <Tag>{t(`about.tags.${key}`)}</Tag>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
