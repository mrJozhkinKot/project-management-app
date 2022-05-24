import 'react-i18next';
import translations_EN from './translations/en/translations.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translations_EN';
    resources: {
      translations_EN: typeof translations_EN;
    };
  }
}
