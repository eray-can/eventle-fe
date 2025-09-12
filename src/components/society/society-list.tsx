'use client';

import { usePagination } from '@/hooks';
import { societyService } from '@/services/society/service';
import type { Workshop, SocietyList } from '@/types/domain';
import type { FilterValues } from './society-filters';
import { SocietyCard } from './society-card';

interface SocietyProps {
  initialData: SocietyList;
  filters?: FilterValues;
}

export default function SocietyList({ initialData, filters }: SocietyProps) {
  const {
    data: workshops,
    isLoading,
    error,
    loadMore,
    hasNext,
    totalLoaded
  } = usePagination<Workshop>({
    pageSize: 5,
    initialData: {
      results: initialData.workshops,
      count: initialData.totalCount,
      next: initialData.hasNext ? 'next' : null,
      previous: initialData.hasPrevious ? 'prev' : null
    },
    fetchData: async (page, pageSize) => {
      const result = await societyService.getAvailableSeansItems({
        page,
        page_size: pageSize,
        ...filters
      });
      return {
        results: result.workshops,
        count: result.totalCount,
        next: result.hasNext ? 'next' : null,
        previous: result.hasPrevious ? 'prev' : null
      };
    }
  });

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Mevcut Seanslar
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {totalLoaded} seans gösteriliyor
        </span>
      </div>

      {error ? (
        <div className="text-center py-12">
          <p className="text-red-500 text-lg mb-4">
            {error}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md"
          >
            Tekrar Dene
          </button>
        </div>
      ) : workshops.length === 0 && !isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Henüz mevcut seans bulunmuyor.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-6 justify-items-start w-full overflow-hidden">
          {workshops.map((workshop) => (
            <SocietyCard key={workshop.id} workshop={workshop} />
          ))}
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>
      )}

      {/* Load More Button */}
      {hasNext && !isLoading && workshops.length > 0 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Daha Fazla Göster
          </button>
        </div>
      )}

      {/* End Message */}
      {!hasNext && workshops.length > 0 && !isLoading && (
        <div className="text-center mt-8">
          <p className="text-gray-500 dark:text-gray-400">
            Tüm seanslar gösterildi ({totalLoaded} seans)
          </p>
        </div>
      )}
    </>
  );
}
