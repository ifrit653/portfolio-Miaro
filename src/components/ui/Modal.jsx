import { Dialog, VisuallyHidden } from "radix-ui";
import { X } from "lucide-react";
import IconButton from "./IconButton";
import { useI18n } from "../../i18n/useI18n";
import styles from "./Modal.module.css";

export default function Modal({
  open,
  onOpenChange,
  title,
  description,
  hideTitle = false,
  variant = "center", // "center" | "fullscreen"
  className = "",
  children,
}) {
  const { t } = useI18n();

  const titleEl = <Dialog.Title className={styles.title}>{title}</Dialog.Title>;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content
          className={`${styles.content} ${styles[variant]} ${className}`}
          {...(!description && { "aria-describedby": undefined })}
        >
          {hideTitle ? (
            <VisuallyHidden.Root asChild>{titleEl}</VisuallyHidden.Root>
          ) : (
            titleEl
          )}
          {description && (
            <Dialog.Description className={styles.description}>
              {description}
            </Dialog.Description>
          )}

          {children}

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
