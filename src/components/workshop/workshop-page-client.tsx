'use client';

import { useState } from 'react';
import { workshopService } from '@/services/workshop/service';
import type { SocietyList } from '@/types/domain';
import type { FilterValues } from './workshop-filters';
import WorkshopFilters from './workshop-filters';
import { WorkshopCard } from './workshop-card';

interface WorkshopPageClientProps {
  initialData: SocietyList;
}

export default function WorkshopPageClient({ initialData }: WorkshopPageClientProps) {
  const [workshopData, setWorkshopData] = useState<SocietyList>(initialData);
  const [, setFilters] = useState<FilterValues>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const loadWorkshops = async (newFilters: FilterValues = {}) => {
    try {
      setIsLoading(true);
      const data = await workshopService.getAvailableSeansItems({
        page: 1,
        page_size: 100,
        ...newFilters
      });
      setWorkshopData(data);
    } catch (error) {
      console.error('Workshop listesi alınamadı:', error);
      setWorkshopData({
        workshops: [],
        totalCount: 0,
        hasNext: false,
        hasPrevious: false,
        currentPage: 1
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFiltersChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
    loadWorkshops(newFilters);
    setShowMobileFilters(false);
  };

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
          </svg>
          Filtre
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 w-full overflow-hidden">
        {/* Desktop Filters */}
        <div className="hidden lg:block lg:flex-shrink-0 lg:w-60 lg:mt-13">
          <WorkshopFilters 
            onFiltersChange={handleFiltersChange}
            isLoading={isLoading}
          />
        </div>
        
        <div className="flex-1 min-w-0 w-full overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Mevcut Seanslar
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {workshopData.totalCount} seans gösteriliyor
            </span>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
          ) : workshopData.workshops.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Henüz mevcut seans bulunmuyor.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-6 justify-items-start w-full overflow-hidden">
              {workshopData.workshops.map((workshop) => (
                <WorkshopCard key={workshop.id} workshop={workshop} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Sheet */}
      {showMobileFilters && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-end">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="relative w-full bg-white dark:bg-gray-800 rounded-t-2xl max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Filtreler
                </h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-4">
              <WorkshopFilters 
                onFiltersChange={handleFiltersChange}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
