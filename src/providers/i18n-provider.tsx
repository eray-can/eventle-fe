'use client';

import { NextIntlClientProvider } from 'next-intl';
import { Locale } from '@/lib/i18n';

interface I18nProviderProps {
  children: React.ReactNode;
  locale: Locale;
  messages: any;
}

export function I18nProvider({ children, locale, messages }: I18nProviderProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
