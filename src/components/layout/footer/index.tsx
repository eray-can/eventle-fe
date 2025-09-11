import { getTranslations } from 'next-intl/server';

export async function Footer() {
  const t = await getTranslations('Common');

  return (
    <footer className="border-t" style={{ backgroundColor: '#030712' }}>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Eventle</h3>
            <p className="text-sm text-gray-300">
              {t('footerDescription')}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white">{t('quickLinks')}</h4>
            <div className="space-y-2">
              <a 
                href="#" 
                className="block text-sm text-gray-300 transition-colors"
                style={{ color: '#d1d5db' }}
              >
                {t('home')}
              </a>
              <a 
                href="#" 
                className="block text-sm text-gray-300 transition-colors"
                style={{ color: '#d1d5db' }}
              >
                {t('events')}
              </a>
              <a 
                href="#" 
                className="block text-sm text-gray-300 transition-colors"
                style={{ color: '#d1d5db' }}
              >
                {t('about')}
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white">{t('support')}</h4>
            <div className="space-y-2">
              <a 
                href="#" 
                className="block text-sm text-gray-300 transition-colors"
                style={{ color: '#d1d5db' }}
              >
                {t('help')}
              </a>
              <a 
                href="#" 
                className="block text-sm text-gray-300 transition-colors"
                style={{ color: '#d1d5db' }}
              >
                {t('contact')}
              </a>
              <a 
                href="#" 
                className="block text-sm text-gray-300 transition-colors"
                style={{ color: '#d1d5db' }}
              >
                {t('faq')}
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white">{t('legal')}</h4>
            <div className="space-y-2">
              <a 
                href="#" 
                className="block text-sm text-gray-300 transition-colors"
                style={{ color: '#d1d5db' }}
              >
                {t('privacy')}
              </a>
              <a 
                href="#" 
                className="block text-sm text-gray-300 transition-colors"
                style={{ color: '#d1d5db' }}
              >
                {t('terms')}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-gray-300">
            © 2024 Eventle. {t('allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
}
