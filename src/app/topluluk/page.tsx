import { societyService } from '@/services/society/service';
import type { SocietyList } from '@/types/domain';
import SocietyListComponent from '@/components/society/society-list';

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
    <div className="min-h-screen py-12" style={{ backgroundColor: '#111828' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Topluluk
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Mevcut society ve seansları keşfedin
          </p>
        </div>

        <div className="mb-8">
          <SocietyListComponent initialData={initialData} />
        </div>
      </div>
    </div>
  );
}
