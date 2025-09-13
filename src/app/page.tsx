import { societyService } from '@/services/society/service';
import { workshopService } from '@/services/workshop/service';
import WorkshopSlider from '@/components/home/workshop-society-slider';
import type { SocietyList } from '@/types/domain';

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

export default async function Home() {
  const societyList = await getSociety();
  const workshopEventsList = await getWorkshopEvents();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#111828' }}>
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Eventle
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Etkinlikleri keşfet, deneyimlerini paylaş
          </p>
        </div>

        {/* Workshop Slider */}
        <div className="mt-16">
          <WorkshopSlider societyList={societyList} title="Topluluk Eventleri" />
        </div>

        {/* Workshop Events Slider */}
        <div className="mt-16">
          <WorkshopSlider societyList={workshopEventsList} title="Workshop Eventleri" />
        </div>
      </div>
    </div>
  );
}
