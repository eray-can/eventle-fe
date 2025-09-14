import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

export async function Footer() {
  const t = await getTranslations('Common');

  return (
    <footer className="border-t" style={{ backgroundColor: '#030712' }}>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
          <div className="space-y-3 sm:col-span-2 md:col-span-1">
            <div className="flex justify-center sm:justify-start">
              <Image 
                src="/static/media/eventle-uzun-logo.png" 
                alt="Eventle" 
                width={200}
                height={48}
                className="h-12 w-auto"
              />
            </div>
            <p className="text-sm text-gray-300 text-center sm:text-left">
              Şehrindeki tüm etkinlikleri tek uygulamadan<br />
              görüntüle, kendi etkinliğini oluştur<br />
              ve EventBuddy&apos;ni bul!
            </p>
            <div className="flex space-x-3 pt-2 justify-center sm:justify-start">
              <a 
                href="https://www.instagram.com/eventle.co/" 
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-opacity hover:opacity-80"
              >
                <Image 
                  src="/static/media/instagram-logo.webp" 
                  alt="Instagram" 
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
              </a>
              <a 
                href="https://www.tiktok.com/@eventle.co" 
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-opacity hover:opacity-80"
              >
                <Image 
                  src="/static/media/tiktok-logo.webp" 
                  alt="TikTok" 
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
              </a>
            </div>
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
              <Link 
                href="/topluluk" 
                className="block text-sm text-gray-300 transition-colors"
                style={{ color: '#d1d5db' }}
              >
                Topluluk
              </Link>
              <Link 
                href="/hakkimizda" 
                className="block text-sm text-gray-300 transition-colors"
                style={{ color: '#d1d5db' }}
              >
                Hakkımızda
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white">{t('support')}</h4>
            <div className="space-y-2">
              <Link 
                href="/yardim" 
                className="block text-sm text-gray-300 transition-colors"
                style={{ color: '#d1d5db' }}
              >
                Yardım
              </Link>
              <Link 
                href="/iletisim" 
                className="block text-sm text-gray-300 transition-colors"
                style={{ color: '#d1d5db' }}
              >
                İletişim
              </Link>
              <Link 
                href="/sss" 
                className="block text-sm text-gray-300 transition-colors"
                style={{ color: '#d1d5db' }}
              >
                SSS
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white">Yasal</h4>
            <div className="space-y-2">
              <Link 
                href="/aydinlatma-metni" 
                className="block text-sm text-gray-300 transition-colors"
                style={{ color: '#d1d5db' }}
              >
                Aydınlatma Metni
              </Link>
              <Link 
                href="/gizlilik-politikasi" 
                className="block text-sm text-gray-300 transition-colors"
                style={{ color: '#d1d5db' }}
              >
                Gizlilik Politikası
              </Link>
              <Link 
                href="/kullanim-kosullari" 
                className="block text-sm text-gray-300 transition-colors"
                style={{ color: '#d1d5db' }}
              >
                Kullanım Koşulları
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white">Uygulamayı İndir</h4>
            <div className="flex space-x-3">
              <a 
                href="https://apps.apple.com/tr/app/eventle/id6474272088?l=tr" 
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-opacity hover:opacity-80"
              >
                <Image 
                  src="/static/media/footer-app-store.webp" 
                  alt="App Store'dan İndir" 
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </a>
              <a 
                href="https://play.google.com/store/apps/details?id=com.eventle.eventle&pcampaignid=web_share&pli=1" 
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-opacity hover:opacity-80"
              >
                <Image 
                  src="/static/media/footer-google-play.webp" 
                  alt="Google Play'den İndir" 
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </a>
            </div>
          </div>

        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-gray-300">
            © {new Date().getFullYear()} Eventle. {t('allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
}
