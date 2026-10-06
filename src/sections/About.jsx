import { useRef, useState } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import Section from "../components/ui/Section";
import Tag from "../components/ui/Tag";
import { ABOUT_TAGS, SITE } from "../data/site";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useI18n } from "../i18n/useI18n";
import styles from "./About.module.css";

function Avatar({ alt }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={styles.fallback} aria-hidden="true">
        {SITE.brand}
      </div>
    );
  }

  return (
    <img
      className={styles.avatarImg}
      src="/images/avatar.webp"
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

export default function About() {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const root = useRef(null);

  useGSAP(
    () => {
      if (reduced) return;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%",
            once: true,
          },
        })
        .from("[data-about-avatar]", {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
        })
        .from(
          "[data-about-bio]",
          { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        )
        .from(
          "[data-about-tag]",
          {
            y: 16,
            opacity: 0,
            duration: 0.5,
            stagger: 0.06,
            ease: "power2.out",
          },
          "-=0.4"
        );
    },
    { scope: root, dependencies: [reduced] }
  );

  return (
    <Section id="about" title={t("about.title")} className={styles.about}>
      <div ref={root} className={styles.grid}>
        <div className={styles.avatar} data-about-avatar>
          <Avatar alt={t("about.avatarAlt")} />
        </div>

        <div>
          <p className={styles.bio} data-about-bio>
            {t("about.bio")}
          </p>

          <ul className={styles.tags}>
            {ABOUT_TAGS.map((key) => (
              <li key={key} data-about-tag>
                <Tag>{t(`about.tags.${key}`)}</Tag>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
