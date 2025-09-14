import { societyService } from '@/services/society/service';
import { workshopService } from '@/services/workshop/service';
import { organizationService } from '@/services/organizations/service';
import Slider from '@/components/home/workshop-society-slider';
import CollectionsSlider from '@/components/home/collections-slider';
import type { SocietyList } from '@/types/domain';
import type { CollectionsWithBanner } from '@/types/domain/organizations';
import { BASE_DOMAIN } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Eventle - Etkinlik ve Bilet Platformu',
  description: 'Türkiye\'nin en büyük etkinlik ve bilet platformu. Konser, tiyatro, workshop ve topluluk etkinliklerini keşfedin.',
  keywords: 'etkinlik, bilet, konser, tiyatro, workshop, topluluk, eventle',
  openGraph: {
    title: 'Eventle - Etkinlik ve Bilet Platformu',
    description: 'Türkiye\'nin en büyük etkinlik ve bilet platformu. Konser, tiyatro, workshop ve topluluk etkinliklerini keşfedin.',
    url: BASE_DOMAIN,
    siteName: 'Eventle',
    images: [
      {
        url: `${BASE_DOMAIN}/static/media/eventle-og.jpg`,
        width: 1200,
        height: 630,
        alt: 'Eventle - Etkinlik ve Bilet Platformu'
      }
    ],
    locale: 'tr_TR',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eventle - Etkinlik ve Bilet Platformu',
    description: 'Türkiye\'nin en büyük etkinlik ve bilet platformu. Konser, tiyatro, workshop ve topluluk etkinliklerini keşfedin.',
    images: [`${BASE_DOMAIN}/static/media/eventle-og.jpg`]
  },
  alternates: {
    canonical: BASE_DOMAIN
  }
};

async function getSociety(): Promise<SocietyList | null> {
  try {
    const data = await societyService.getAvailableSeansItems({
      page: 1,
      page_size: 10
    });
    return data;
  } catch (error) {
    console.error('Error fetching society:', error);
    return null;
  }
}

async function getWorkshopEvents(): Promise<SocietyList | null> {
  try {
    const data = await workshopService.getAvailableSeansItems({
      page: 1,
      page_size: 10
    });
    return data;
  } catch (error) {
    console.error('Error fetching workshop events:', error);
    return null;
  }
}

async function getCollections(): Promise<CollectionsWithBanner | null> {
  try {
    const data = await organizationService.getCollectionsWithBanner();
    return data;
  } catch (error) {
    console.error('Error fetching collections:', error);
    return null;
  }
}



export default async function Home() {
  const societyList = await getSociety();
  const workshopEventsList = await getWorkshopEvents();
  const collections = await getCollections();

  console.log('Collections data:', collections);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#111828' }}>
      <div className="container mx-auto px-4 py-20">
        {/* Collections Slider */}
        <div className="mt-16">
          <CollectionsSlider collections={collections} title="Öne Çıkan Koleksiyonlar" />
        </div>

        {/* Workshop Slider */}
        <div className="mt-16">
          <Slider societyList={societyList} title="Topluluk Eventleri" dataType="society" />
        </div>

        {/* Workshop Events Slider */}
        <div className="mt-16">
          <Slider societyList={workshopEventsList} title="Workshop Eventleri" dataType="workshop" />
        </div>

      </div>
    </div>
  );
}
