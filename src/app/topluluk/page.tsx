import { societyService } from '@/services/society/service';
import type { WorkshopList } from '@/types/domain';
import Image from 'next/image';

interface CommunityPageProps {
  searchParams: Promise<{ page?: string }>;
}

async function getWorkshops(page: number = 1): Promise<WorkshopList> {
  try {
    return await societyService.getAvailableSeansItems({
      page,
      page_size: 100
    });
  } catch (error) {
    console.error('Workshop listesi alınamadı:', error);
    return {
      workshops: [],
      totalCount: 0,
      hasNext: false,
      hasPrevious: false,
      currentPage: 1
    };
  }
}

export default async function CommunityPage({ searchParams }: CommunityPageProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = parseInt(resolvedSearchParams.page || '1');
  const workshopList = await getWorkshops(currentPage);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Topluluk
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Mevcut workshop ve seansları keşfedin
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Mevcut Seanslar
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Toplam {workshopList.totalCount} seans
            </span>
          </div>

          {workshopList.workshops.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Henüz mevcut seans bulunmuyor.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {workshopList.workshops.map((workshop) => (
                <div
                  key={workshop.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100 dark:border-gray-700 cursor-pointer group"
                >
                  <div className="relative h-40">
                    <Image
                      src={workshop.image}
                      alt={workshop.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div 
                      className="absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium text-white text-center shadow-sm"
                      style={{ backgroundColor: workshop.category.color }}
                    >
                      {workshop.category.name}
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight line-clamp-2 mb-1">
                        {workshop.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {workshop.location}
                      </p>
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center text-xs text-gray-600 dark:text-gray-300 mb-1">
                        <span className="font-medium">📅</span>
                        <span className="ml-1">{new Date(workshop.date).toLocaleDateString('tr-TR', { 
                          day: 'numeric', 
                          month: 'short'
                        })}</span>
                        <span className="mx-2">•</span>
                        <span>{workshop.startTime.slice(0, 5)}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <span>👥 {workshop.attendedCount}/{workshop.capacity}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        {workshop.discountedPrice ? (
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-400 line-through">
                              {workshop.price}₺
                            </span>
                            <span className="text-sm font-bold text-orange-600">
                              {workshop.discountedPrice.toFixed(0)}₺
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm font-bold text-gray-900 dark:text-white">
                            {workshop.price === 0 ? 'Ücretsiz' : `${workshop.price.toFixed(0)}₺`}
                          </span>
                        )}
                      </div>

                      <button 
                        className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                          workshop.isEligibleToBuy 
                            ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={!workshop.isEligibleToBuy}
                      >
                        {workshop.isEligibleToBuy ? 'Bilet Al' : 'Tükendi'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {(workshopList.hasPrevious || workshopList.hasNext) && (
            <div className="flex justify-center items-center space-x-4 mt-8">
              {workshopList.hasPrevious && (
                <a
                  href={`/topluluk?page=${currentPage - 1}`}
                  className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  ← Önceki
                </a>
              )}
              
              <span className="text-gray-600 dark:text-gray-400">
                Sayfa {currentPage}
              </span>
              
              {workshopList.hasNext && (
                <a
                  href={`/topluluk?page=${currentPage + 1}`}
                  className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Sonraki →
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
