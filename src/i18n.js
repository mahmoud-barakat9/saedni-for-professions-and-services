import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(Backend)

  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          description: {
            part1: "Saedni",
            part2: "orders",
            part3: "logout",
            part4: "ADD TO INTERESTE",
            part5: "VIEW",
            part6: "Developed by mahmoud & obada",
            part7: "GALLERY SHOW",
            part8: "CHAT",
            part9: "Service Info",
          },
        },
      },
      ar: {
        translation: {
          description: {
            part1: "ساعدني",
            part2: "طلبات",
            part3: "تسجيل الخروج",
            part4: "مهتم",
            part5: "مشاهدة",
            part6: "برمجة وتصميم محمود وعبادة",
            part7: "معرض الصور",
            part8: "محادثة",
            part9: "معلومات العامل",
          },
        },
      },
    },
  });

export default i18n;
