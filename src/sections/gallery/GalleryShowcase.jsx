import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP, ScrollTrigger } from "../../lib/gsap";
import Container from "../../components/ui/Container";
import Lightbox from "../../components/ui/Lightbox";
import { FEATURED } from "../../data/gallery";
import { PIN_QUERY } from "../../lib/media";
import { NAVBAR_OFFSET, scrollToY } from "../../hooks/scrollToSection";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useI18n } from "../../i18n/useI18n";
import styles from "./GalleryShowcase.module.css";

const LIGHTBOX_IMAGES = FEATURED.map(({ src, alt }) => ({ src, alt }));

export default function GalleryShowcase() {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const pinned = useMediaQuery(PIN_QUERY) && !reduced;

  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const triggerRef = useRef(null);
  const [lb, setLb] = useState({ open: false, index: 0 });

  // Pinning adds/removes scroll distance: re-measure every trigger
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [pinned]);

  // Vertical scroll drives the row sideways
  useGSAP(
    () => {
      if (!pinned) return;
      const track = trackRef.current;
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, { x: () => -distance(), ease: "none" });
      triggerRef.current = ScrollTrigger.create({
        id: "gallery",
        trigger: rootRef.current,
        start: `top top+=${NAVBAR_OFFSET}`,
        end: () => `+=${distance()}`,
        pin: true,
        scrub: true,
        animation: tween,
        invalidateOnRefresh: true,
      });
    },
    { scope: rootRef, dependencies: [pinned] }
  );

  // Keyboard users tabbing to an off-screen card: scroll the page so it comes into view
  const revealSlide = (e, i) => {
    if (!pinned || !e.currentTarget.matches(":focus-visible")) return;
    const st = triggerRef.current;
    const track = trackRef.current;
    const slide = track?.children[i];
    if (!st || !slide) return;

    const max = Math.max(1, track.scrollWidth - window.innerWidth);
    const wanted =
      slide.offsetLeft + slide.offsetWidth / 2 - window.innerWidth / 2;
    const progress = Math.min(1, Math.max(0, wanted / max));
    scrollToY(st.start + progress * (st.end - st.start));
  };

  return (
    <section
      id="gallery"
      ref={rootRef}
      className={styles.root}
      data-mode={pinned ? "pinned" : "scroll"}
      aria-labelledby="gallery-title"
    >
      <Container>
        <h2 id="gallery-title" className={styles.title}>
          {t("gallery.title")}
        </h2>
      </Container>

      <div className={styles.viewport}>
        <ul ref={trackRef} className={styles.track}>
          {FEATURED.map((item, i) => (
            <li key={item.id} className={styles.slide}>
              <button
                type="button"
                className={styles.card}
                aria-haspopup="dialog"
                onClick={() => setLb({ open: true, index: i })}
                onFocus={(e) => revealSlide(e, i)}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
                <span className={styles.overlay}>
                  {item.tags.map((key) => t(`gallery.tags.${key}`)).join(" · ")}
                </span>
              </button>
            </li>
          ))}

          {/* Last slot: link to the full gallery page */}
          <li className={styles.slide}>
            <Link
              to="/gallery"
              className={styles.more}
              onFocus={(e) => revealSlide(e, FEATURED.length)}
            >
              <span className={styles.moreLabel}>{t("gallery.viewAll")}</span>
              <ArrowUpRight size={56} strokeWidth={1.25} aria-hidden="true" />
            </Link>
          </li>
        </ul>
      </div>

      <Lightbox
        images={LIGHTBOX_IMAGES}
        index={lb.index}
        open={lb.open}
        onIndexChange={(index) => setLb((s) => ({ ...s, index }))}
        onOpenChange={(open) => setLb((s) => ({ ...s, open }))}
      />
    </section>
  );
}
