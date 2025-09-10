import { getTranslations } from 'next-intl/server';
import { LanguageToggle } from '@/components/language-toggle';
import Link from 'next/link';

export async function Header() {
  const t = await getTranslations('Common');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">
            Eventle
          </h1>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            href="/" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t('home')}
          </Link>
          <Link 
            href="/topluluk" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t('community')}
          </Link>
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
