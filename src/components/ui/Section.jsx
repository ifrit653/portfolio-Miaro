// src/components/ui/Section.jsx
import Container from "./Container";
import styles from "./Section.module.css";

export default function Section({
  id,
  title,
  eyebrow,
  className = "",
  children,
}) {
  const headingId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={`${styles.section} ${className}`}
    >
      <Container>
        {title && (
          <header className={styles.header}>
            {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
            <h2 id={headingId} className={styles.title}>
              {title}
            </h2>
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
