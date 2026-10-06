// src/i18n/I18nProvider.jsx
import { useCallback, useEffect, useMemo, useState } from "react";
import { I18nContext } from "./context";
import en from "./en.json";
import fr from "./fr.json";

const dictionaries = { en, fr };

function getInitialLang() {
  try {
    const saved = localStorage.getItem("lang");
    if (saved && saved in dictionaries) return saved;
  } catch {
    /* storage unavailable */
  }
  return "en";
}

export default function I18nProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    const { title, description } = dictionaries[lang].meta;
    document.title = title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
    try {
      localStorage.setItem("lang", lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  // t("nav.about") -> dictionaries[lang].nav.about, falls back to the key
  const t = useCallback(
    (path) =>
      path.split(".").reduce((obj, key) => obj?.[key], dictionaries[lang]) ??
      path,
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
