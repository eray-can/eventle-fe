'use client';

import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('Common');

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Eventle</h3>
            <p className="text-sm text-muted-foreground">
              {t('footerDescription')}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">{t('quickLinks')}</h4>
            <div className="space-y-2">
              <a 
                href="#" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t('home')}
              </a>
              <a 
                href="#" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t('events')}
              </a>
              <a 
                href="#" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t('about')}
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">{t('support')}</h4>
            <div className="space-y-2">
              <a 
                href="#" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t('help')}
              </a>
              <a 
                href="#" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t('contact')}
              </a>
              <a 
                href="#" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t('faq')}
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">{t('legal')}</h4>
            <div className="space-y-2">
              <a 
                href="#" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t('privacy')}
              </a>
              <a 
                href="#" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t('terms')}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Eventle. {t('allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
}
