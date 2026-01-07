// i18n utility functions
import esTranslations from './locales/es.json';
import enTranslations from './locales/en.json';

export const languages = {
  es: 'Español',
  en: 'English',
};

export const defaultLang = 'es';

export type Lang = keyof typeof languages;

const translations = {
  es: esTranslations,
  en: enTranslations,
} as const;

/**
 * Get translation by key path (e.g., "hero.greeting")
 */
export function t(lang: Lang, key: string): string {
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fallback to Spanish if key not found
      value = translations.es;
      for (const k2 of keys) {
        if (value && typeof value === 'object' && k2 in value) {
          value = value[k2];
        } else {
          return key; // Return key if not found
        }
      }
      break;
    }
  }
  
  return typeof value === 'string' ? value : key;
}

/**
 * Get array translation (e.g., typing words)
 */
export function tArray(lang: Lang, key: string): string[] {
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return [];
    }
  }
  
  return Array.isArray(value) ? value : [];
}

/**
 * Get all translations for a language
 */
export function getTranslations(lang: Lang) {
  return translations[lang];
}

/**
 * Get localized path
 */
export function getLocalizedPath(lang: Lang, path: string = ''): string {
  if (lang === defaultLang) {
    return path.startsWith('/') ? path : `/${path}`;
  }
  return `/${lang}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Get language from URL
 */
export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) {
    return lang as Lang;
  }
  return defaultLang;
}

/**
 * Get alternate language
 */
export function getAlternateLang(currentLang: Lang): Lang {
  return currentLang === 'es' ? 'en' : 'es';
}
