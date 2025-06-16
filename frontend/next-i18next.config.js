/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: "mn",
    locales: ["mn", "en", "ru"],
  },
  localePath: "./public/locales",
  reloadOnPrerender: process.env.NODE_ENV === "development",
  ns: ["header", "footer", "registration"],
  defaultNS: "header",
};
