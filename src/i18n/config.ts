import i18n, { use } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import ru from "./locales/ru/ru.json";
import en from "./locales/en/en.json";

const DETECTION_OPTIONS = {
  order: ["localStorage", "navigator"],
  caches: ["localStorage"],
};

use(initReactI18next)
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
    returnNull: false,
  });

i18n.languages = ["en", "ru"];

export default i18n;
