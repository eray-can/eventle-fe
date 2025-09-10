'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { useState } from 'react';

export function LanguageToggle() {
  const t = useTranslations('Common');
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (locale: string) => {
    document.cookie = `locale=${locale}; path=/; max-age=31536000`;
    window.location.reload();
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <Globe className="h-4 w-4" />
        {t('language')}
      </Button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10">
          <button
            onClick={() => changeLanguage('tr')}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
          >
            {t('turkish')}
          </button>
          <button
            onClick={() => changeLanguage('en')}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
          >
            {t('english')}
          </button>
        </div>
      )}
    </div>
  );
}
