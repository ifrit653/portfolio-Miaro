import { Dialog, VisuallyHidden } from "radix-ui";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import IconButton from "./IconButton";
import { useI18n } from "../../i18n/useI18n";
import styles from "./Lightbox.module.css";

export default function Lightbox({
  images,
  index,
  onIndexChange,
  open,
  onOpenChange,
}) {
  const { t } = useI18n();
  const count = images.length;
  const image = images[index];

  if (!image) return null;

  const go = (delta) => onIndexChange((index + delta + count) % count);

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };

  // Content is a full-screen layout wrapper, so close on clicks outside the image/controls
  const onBackdropClick = (e) => {
    if (e.target === e.currentTarget) onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content
          className={styles.content}
          aria-describedby={undefined}
          onKeyDown={onKeyDown}
          onClick={onBackdropClick}
        >
          <VisuallyHidden.Root asChild>
            <Dialog.Title>{t("common.imageViewer")}</Dialog.Title>
          </VisuallyHidden.Root>

          <img
            key={image.src}
            className={styles.image}
            src={image.src}
            alt={image.alt ?? ""}
          />

          {count > 1 && (
            <>
              <IconButton
                label={t("common.previous")}
                className={styles.prev}
                onClick={() => go(-1)}
              >
                <ChevronLeft size={22} />
              </IconButton>
              <IconButton
                label={t("common.next")}
                className={styles.next}
                onClick={() => go(1)}
              >
                <ChevronRight size={22} />
              </IconButton>
            </>
          )}

          <p className={styles.counter} aria-live="polite">
            {index + 1} / {count}
          </p>

          <Dialog.Close asChild>
            <IconButton label={t("common.close")} className={styles.close}>
              <X size={20} />
            </IconButton>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
