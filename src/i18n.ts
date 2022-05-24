import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translations_EN from './translations/en/translations.json';
import translations_RU from './translations/ru/translations.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translations_EN,
      },
      ru: {
        translation: translations_RU,
      },
    },
    fallbackLng: 'en',
  });

export default i18n;
