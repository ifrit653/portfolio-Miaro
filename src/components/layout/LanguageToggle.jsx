import { ToggleGroup } from "radix-ui";
import { useI18n } from "../../i18n/useI18n";
import styles from "./LanguageToggle.module.css";

export default function LanguageToggle({ className = "" }) {
  const { lang, setLang, t } = useI18n();

  return (
    <ToggleGroup.Root
      type="single"
      value={lang}
      onValueChange={(value) => value && setLang(value)} // ignore deselect
      aria-label={t("nav.language")}
      className={`${styles.group} ${className}`}
    >
      <ToggleGroup.Item value="en" className={styles.item}>
        EN
      </ToggleGroup.Item>
      <ToggleGroup.Item value="fr" className={styles.item}>
        FR
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
}
