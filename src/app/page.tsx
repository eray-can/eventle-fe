import { societyService } from '@/services/society/service';
import { workshopService } from '@/services/workshop/service';
import { organizationService } from '@/services/organizations/service';
import Slider from '@/components/home/workshop-society-slider';
import CollectionsSlider from '@/components/home/collections-slider';
import type { SocietyList } from '@/types/domain';
import type { CollectionsWithBanner } from '@/types/domain/organizations';

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
