'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  const t = useTranslations('Common');

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur" style={{ backgroundColor: '#030712' }}>
      <div className="container mx-auto px-4 flex h-20 items-center justify-center relative">
        <div className="absolute left-4 flex items-center space-x-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/static/media/eventle-uzun-logo.png"
              alt="Eventle"
              width={200}
              height={65}
              className="h-14 w-auto"
              priority
            />
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="text-sm font-medium text-white transition-colors"
            onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#6535f3'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'white'}
          >
            {t('home')}
          </Link>
          <Link
            href="/topluluk"
            className="text-sm font-medium text-white transition-colors"
            onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#6535f3'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'white'}
          >
            {t('community')}
          </Link>
          <Link
            href="/workshop"
            className="text-sm font-medium text-white transition-colors"
            onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#6535f3'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'white'}
          >
            Workshop
          </Link>
          <Link
            href="/hakkimizda"
            className="text-sm font-medium text-white transition-colors"
            onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#6535f3'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'white'}
          >
            {t('about')}
          </Link>
          <Link
            href="/iletisim"
            className="text-sm font-medium text-white transition-colors"
            onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#6535f3'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'white'}
          >
            {t('contact')}
          </Link>
        </nav>
      </div>
    </header>
  );
}
