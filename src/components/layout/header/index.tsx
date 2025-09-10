'use client';

import { useTranslations } from 'next-intl';
import { LanguageToggle } from '@/components/language-toggle';

export function Header() {
  const t = useTranslations('Common');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">
            Eventle
          </h1>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <a 
            href="/" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t('home')}
          </a>
          <a 
            href="/topluluk" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t('community')}
          </a>
          <a 
            href="#" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t('events')}
          </a>
          <a 
            href="#" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t('about')}
          </a>
          <a 
            href="#" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t('contact')}
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
