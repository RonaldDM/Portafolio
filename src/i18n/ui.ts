// i18n utility functions
import esTranslations from './locales/es.json';
import enTranslations from './locales/en.json';

export const languages = {
  es: 'Español',
  en: 'English',
};

export const defaultLang = 'es';

export type Lang = keyof typeof languages;

type TranslationValue = string | string[] | { [key: string]: TranslationValue };

const translations: Record<Lang, TranslationValue> = {
  es: esTranslations as TranslationValue,
  en: enTranslations as TranslationValue,
};

function getNestedValue(obj: TranslationValue, keys: string[]): TranslationValue | undefined {
  let current: TranslationValue = obj;
  for (const k of keys) {
    if (
      current !== null &&
      typeof current === 'object' &&
      !Array.isArray(current) &&
      k in current
    ) {
      current = (current as Record<string, TranslationValue>)[k];
    } else {
      return undefined;
    }
  }
  return current;
}

/**
 * Get translation by key path (e.g., "hero.greeting")
 */
export function t(lang: Lang, key: string): string {
  const keys = key.split('.');
  const value = getNestedValue(translations[lang], keys) ?? getNestedValue(translations.es, keys);
  return typeof value === 'string' ? value : key;
}

/**
 * Get array translation (e.g., typing words)
 */
export function tArray(lang: Lang, key: string): string[] {
  const keys = key.split('.');
  const value = getNestedValue(translations[lang], keys);
  return Array.isArray(value) ? (value as string[]) : [];
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
