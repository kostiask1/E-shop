import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import Backend from "i18next-http-backend"
import LanguageDetector from "i18next-browser-languagedetector"

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "ua",
        i18n: {
            defaultLocale: "ua",
            locales: ["en", "ru", "ua"],
        },
        interpolation: {
            escapeValue: false,
        },
        react: {
            wait: true,
            useSuspense: false,
        },
        debug: true,
        detection: {
            order: ["localStorage"],
        },
    })

export default i18n
