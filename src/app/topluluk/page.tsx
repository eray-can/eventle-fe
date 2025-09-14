import { societyService } from '@/services/society/service';
import type { SocietyList } from '@/types/domain';
import SocietyPageClient from '@/components/society/society-page-client';
import { capitalizeTitle, BASE_DOMAIN } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Topluluk Etkinlikleri - Eventle',
  description: 'Mevcut society ve seansları keşfedin. Eventle\'de en kaliteli topluluk etkinliklerine katılın.',
  keywords: 'topluluk, society, etkinlik, sosyal, buluşma, eventle',
  openGraph: {
    title: 'Topluluk Etkinlikleri - Eventle',
    description: 'Mevcut society ve seansları keşfedin. Eventle\'de en kaliteli topluluk etkinliklerine katılın.',
    url: `${BASE_DOMAIN}/topluluk`,
    siteName: 'Eventle',
    images: [
      {
        url: `${BASE_DOMAIN}/static/media/topluluk-og.jpg`,
        width: 1200,
        height: 630,
        alt: 'Topluluk Etkinlikleri - Eventle'
      }
    ],
    locale: 'tr_TR',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Topluluk Etkinlikleri - Eventle',
    description: 'Mevcut society ve seansları keşfedin. Eventle\'de en kaliteli topluluk etkinliklerine katılın.',
    images: [`${BASE_DOMAIN}/static/media/topluluk-og.jpg`]
  },
  alternates: {
    canonical: `${BASE_DOMAIN}/topluluk`
  }
};

async function getInitialSocieties(): Promise<SocietyList> {
  try {
    return await societyService.getAvailableSeansItems({
      page: 1,
      page_size: 100
    });
  } catch (error) {
    console.error('Initial society listesi alınamadı:', error);
    return {
      workshops: [],
      totalCount: 0,
      hasNext: false,
      hasPrevious: false,
      currentPage: 1
    };
  }
}

export default async function CommunityPage() {
  const initialData = await getInitialSocieties();

  return (
    <div className="min-h-screen py-12 overflow-x-hidden" style={{ backgroundColor: '#111828' }}>
      <div className="w-full mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {capitalizeTitle('Topluluk')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {capitalizeTitle('Mevcut society ve seansları keşfedin')}
          </p>
        </div>

        <SocietyPageClient initialData={initialData} />
      </div>
    </div>
  );
}
