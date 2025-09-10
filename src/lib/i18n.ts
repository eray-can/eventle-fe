import { cookies, headers } from 'next/headers';
import {getRequestConfig} from 'next-intl/server';

export const locales = ['tr', 'en'] as const;
export type Locale = typeof locales[number];
export const defaultLocale: Locale = 'tr';

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const headersList = await headers();
  
  const localeCookie = cookieStore.get('locale')?.value as Locale;
  if (localeCookie && locales.includes(localeCookie)) {
    return localeCookie;
  }

  const acceptLanguage = headersList.get('accept-language');
  if (acceptLanguage) {
    const browserLocale = acceptLanguage.split(',')[0].split('-')[0] as Locale;
    if (locales.includes(browserLocale)) {
      return browserLocale;
    }
  }

  return defaultLocale;
}

export async function getMessages(locale: Locale) {
  try {
    return (await import(`../../locales/${locale}.json`)).default;
  } catch {
    return (await import(`../../locales/${defaultLocale}.json`)).default;
  }
}
 
export default getRequestConfig(async () => {
  const locale = await getLocale();
  const messages = await getMessages(locale);
 
  return {
    locale,
    messages,
    timeZone: 'Europe/Istanbul'
  };
});
