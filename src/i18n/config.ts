import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ru from "./locales/ru/ru.json";
import en from "./locales/en/en.json";
import LanguageDetector from "i18next-browser-languagedetector";

const DETECTION_OPTIONS = {
  order: ["localStorage", "navigator"],
  caches: ["localStorage"],
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translations: en,
      },
      ru: {
        translations: ru,
      },
    },
    detection: DETECTION_OPTIONS,
    ns: ["translations"],
    defaultNS: "translations",
  });

i18n.languages = ["en", "ru"];

export default i18n;
