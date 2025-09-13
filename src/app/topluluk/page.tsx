import { societyService } from '@/services/society/service';
import type { SocietyList } from '@/types/domain';
import SocietyPageClient from '@/components/society/society-page-client';
import { capitalizeTitle } from '@/lib/utils';

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
