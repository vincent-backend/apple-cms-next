import { createContext, useEffect, useState } from "react";

export const defaultLocale = "zh-CN";
export const locales = ["en", "zh-CN", "zh"];
export const LanguageContext = createContext([]);

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState("zh-CN");
  const [browserLang, setBrowserLang] = useState(null);

  useEffect(() => {
    if (!window) {
      return;
    }

    if (browserLang === null) {
      setBrowserLang(navigator.language);
    }

    // set language
    if (browserLang === "zh-CN") setLocale("zh-CN");
    else if (browserLang === "zh") setLocale("zh");
    else setLocale("zh-CN");

  }, [browserLang]);

  return (
    <LanguageContext.Provider value={[locale, setLocale]}>
      {children}
    </LanguageContext.Provider>
  );
}
