import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <div className="flex items-center justify-center py-20" style={{ backgroundColor: '#111828' }}>
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('subtitle')}
          </p>
        </div>
      </div>
    </div>
  );
}
