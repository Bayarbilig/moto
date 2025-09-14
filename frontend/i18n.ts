// i18n.ts
"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "mn", // default language
  fallbackLng: "en",
  resources: {
    en: {
      common: require("./public/locales/en/common.json"),
    },
    mn: {
      common: require("./public/locales/mn/common.json"),
    },
    ru: {
      common: require("./public/locales/ru/common.json"),
    },
    ko: {
      common: require("./public/locales/ko/common.json"),
    },
    ja: {
      common: require("./public/locales/ja/common.json"),
    },
  },
});

export default i18n;
