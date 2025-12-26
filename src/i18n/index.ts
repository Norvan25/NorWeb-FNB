import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en.json';
import msTranslations from './locales/ms.json';
import zhTranslations from './locales/zh.json';

// Supported languages
export const supportedLanguages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ms', name: 'Bahasa Malaysia', flag: '🇲🇾' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
] as const;

export type SupportedLanguage = typeof supportedLanguages[number]['code'];

// Language detection options
const detectionOptions = {
  // Order of language detection
  order: ['localStorage', 'navigator', 'htmlTag'],
  // Keys to use in localStorage
  lookupLocalStorage: 'norweb-language',
  // Cache user language in localStorage
  caches: ['localStorage'],
};

i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources: {
      en: { translation: enTranslations },
      ms: { translation: msTranslations },
      zh: { translation: zhTranslations },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'ms', 'zh'],
    
    // Language detection configuration
    detection: detectionOptions,
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    // Debug mode (disable in production)
    debug: false,
  });

export default i18n;

