import { useTranslations } from 'next-intl';
import { LanguageToggle } from '@/components/language-toggle';

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
          {t('title')}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          {t('subtitle')}
        </p>
      </div>
    </div>
  );
}
