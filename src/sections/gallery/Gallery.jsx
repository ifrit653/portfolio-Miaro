import { useEffect, useMemo, useRef, useState } from "react";
import { ToggleGroup } from "radix-ui";
import { gsap, useGSAP } from "../../lib/gsap";
import Section from "../../components/ui/Section";
import Button from "../../components/ui/Button";
import Tag from "../../components/ui/Tag";
import Lightbox from "../../components/ui/Lightbox";
import { GALLERY, GALLERY_TAGS } from "../../data/gallery";
import { useColumns } from "../../hooks/useColumns";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useI18n } from "../../i18n/useI18n";
import styles from "./Gallery.module.css";

const INITIAL_ROWS = 2;
const ROWS_PER_CLICK = 4;

export default function Gallery() {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const columns = useColumns();

  const [filter, setFilter] = useState("all");
  const [rows, setRows] = useState(INITIAL_ROWS);
  const [lb, setLb] = useState({ open: false, index: 0 });

  const rootRef = useRef(null);
  const gridRef = useRef(null);
  const focusFrom = useRef(null);
  const prev = useRef({ filter, count: 0, first: true });

  const filtered = useMemo(
    () =>
      filter === "all"
        ? GALLERY
        : GALLERY.filter((item) => item.tags.includes(filter)),
    [filter]
  );
  const visible = filtered.slice(0, rows * columns);
  const hasMore = visible.length < filtered.length;

  const lightboxImages = useMemo(
    () => filtered.map((item) => ({ src: item.src, alt: item.alt })),
    [filtered]
  );

  const onFilterChange = (value) => {
    if (!value) return; // ignore deselect, one filter is always active
    setFilter(value);
    setRows(INITIAL_ROWS);
  };

  const seeMore = () => {
    focusFrom.current = visible.length;
    setRows((r) => r + ROWS_PER_CLICK);
  };

  // Move focus to the first newly revealed image
  useEffect(() => {
    if (focusFrom.current === null) return;
    gridRef.current
      ?.querySelectorAll("button")
      [focusFrom.current]?.focus({ preventScroll: true });
    focusFrom.current = null;
  }, [rows]);

  // Block entrance on scroll
  useGSAP(
    () => {
      if (reduced) return;
      gsap.from(rootRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 80%",
          once: true,
        },
      });
    },
    { scope: rootRef, dependencies: [reduced] }
  );

  // Stagger only the newly shown items (skipped on first mount)
  useGSAP(
    () => {
      const p = prev.current;
      const start = p.first
        ? visible.length
        : p.filter !== filter
        ? 0
        : p.count;
      p.first = false;
      p.filter = filter;
      p.count = visible.length;
      if (reduced) return;

      const items = gsap.utils.toArray("[data-gallery-item]").slice(start);
      if (!items.length) return;

      gsap.from(items, {
        y: 24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "power3.out",
        clearProps: "opacity,transform",
      });
    },
    { scope: gridRef, dependencies: [filter, visible.length, reduced] }
  );

  return (
    <Section id="gallery" title={t("gallery.title")}>
      <div ref={rootRef}>
        <ToggleGroup.Root
          type="single"
          value={filter}
          onValueChange={onFilterChange}
          aria-label={t("gallery.filters")}
          className={styles.filters}
        >
          <ToggleGroup.Item value="all" asChild>
            <Tag as="button" type="button">
              {t("gallery.all")}
            </Tag>
          </ToggleGroup.Item>
          {GALLERY_TAGS.map((key) => (
            <ToggleGroup.Item key={key} value={key} asChild>
              <Tag as="button" type="button">
                {t(`gallery.tags.${key}`)}
              </Tag>
            </ToggleGroup.Item>
          ))}
        </ToggleGroup.Root>

        <ul ref={gridRef} className={styles.grid}>
          {visible.map((item, i) => (
            <li key={item.id} data-gallery-item>
              <button
                type="button"
                className={styles.item}
                aria-haspopup="dialog"
                onClick={() => setLb({ open: true, index: i })}
              >
                <img
                  src={item.thumb}
                  alt={item.alt}
                  width="600"
                  height="600"
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
        </ul>

        <div className={styles.footer}>
          {hasMore && (
            <Button variant="outline" onClick={seeMore}>
              {t("gallery.seeMore")}
            </Button>
          )}
          <p className={styles.status} role="status">
            {visible.length} / {filtered.length}
          </p>
        </div>
      </div>

      <Lightbox
        images={lightboxImages}
        index={lb.index}
        open={lb.open}
        onIndexChange={(index) => setLb((s) => ({ ...s, index }))}
        onOpenChange={(open) => setLb((s) => ({ ...s, open }))}
      />
    </Section>
  );
}
