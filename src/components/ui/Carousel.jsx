// src/components/ui/Carousel.jsx
import { Children, useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import IconButton from "./IconButton";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useI18n } from "../../i18n/useI18n";
import styles from "./Carousel.module.css";

export default function Carousel({
  children,
  autoplay = 5000,
  label,
  paused: forcePaused = false,
  slideBasis,
}) {
  const { t } = useI18n();
  const reduced = useReducedMotion();

  const slides = Children.toArray(children);
  const count = slides.length;

  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const paused = forcePaused || hovered;

  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const slideRefs = useRef([]);
  const mounted = useRef(false);
  const drag = useRef({ startX: 0, moved: false });

  const goTo = useCallback(
    (i) => setIndex(((i % count) + count) % count),
    [count]
  );

  // Slide the track so the active slide is centered in the viewport
  const position = useCallback(
    (animate) => {
      const viewport = viewportRef.current;
      const slide = slideRefs.current[index];
      if (!viewport || !slide) return;

      const x =
        (viewport.clientWidth - slide.offsetWidth) / 2 - slide.offsetLeft;
      gsap.to(trackRef.current, {
        x,
        duration: animate && !reduced ? 0.7 : 0,
        ease: "power3.out",
        overwrite: true,
      });
    },
    [index, reduced]
  );

  useEffect(() => {
    position(mounted.current); // no animation on first render
    mounted.current = true;
    const track = trackRef.current;
    return () => gsap.killTweensOf(track);
  }, [position]);

  useEffect(() => {
    const onResize = () => position(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [position]);

  // Autoplay — the timer restarts after every slide change, including manual ones
  useEffect(() => {
    if (!autoplay || paused || reduced || count < 2) return;
    const id = setTimeout(() => goTo(index + 1), autoplay);
    return () => clearTimeout(id);
  }, [autoplay, paused, reduced, index, count, goTo]);

  // Swipe / drag
  const onPointerDown = (e) => {
    drag.current = { startX: e.clientX, moved: false };
  };
  const onPointerUp = (e) => {
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 10) drag.current.moved = true;
    if (Math.abs(dx) > 50) goTo(index + (dx < 0 ? 1 : -1));
  };
  // A swipe must not count as a click (it would open the lightbox)
  const onClickCapture = (e) => {
    if (drag.current.moved) {
      e.stopPropagation();
      e.preventDefault();
      drag.current.moved = false;
    }
  };

  return (
    <div
      className={styles.carousel}
      style={slideBasis ? { "--slide-basis": slideBasis } : undefined}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div
        ref={viewportRef}
        className={styles.viewport}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onClickCapture={onClickCapture}
      >
        <div ref={trackRef} className={styles.track}>
          {slides.map((slide, i) => (
            <div
              key={i}
              ref={(el) => (slideRefs.current[i] = el)}
              className={styles.slide}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${count}`}
              data-active={i === index}
              onClick={() => i !== index && goTo(i)}
            >
              <div inert={i !== index}>{slide}</div>
            </div>
          ))}
        </div>
      </div>

      {count > 1 && (
        <>
          <IconButton
            label={t("common.previous")}
            className={`${styles.arrow} ${styles.prev}`}
            onClick={() => goTo(index - 1)}
          >
            <ChevronLeft size={22} />
          </IconButton>
          <IconButton
            label={t("common.next")}
            className={`${styles.arrow} ${styles.next}`}
            onClick={() => goTo(index + 1)}
          >
            <ChevronRight size={22} />
          </IconButton>

          <div className={styles.dots}>
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                className={styles.dot}
                aria-label={`${t("common.goToSlide")} ${i + 1}`}
                aria-current={i === index}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
