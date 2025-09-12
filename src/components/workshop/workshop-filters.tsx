'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export interface FilterValues {
  min_price?: number;
  max_price?: number;
  start_date?: string;
  end_date?: string;
}

interface WorkshopFiltersProps {
  onFiltersChange: (filters: FilterValues) => void;
  isLoading?: boolean;
}

export default function WorkshopFilters({ onFiltersChange, isLoading = false }: WorkshopFiltersProps) {
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>('');

  const handleApplyFilters = () => {
    const filters: FilterValues = {};
    
    if (maxPrice < 5000) {
      filters.max_price = maxPrice;
    }

    if (selectedDateFilter) {
      const today = new Date();
      let startDate: Date;
      let endDate: Date;

      switch (selectedDateFilter) {
        case 'today':
          startDate = new Date(today);
          endDate = new Date(today);
          break;
        case 'tomorrow':
          startDate = new Date(today);
          startDate.setDate(today.getDate() + 1);
          endDate = new Date(startDate);
          break;
        case 'thisWeek':
          startDate = new Date(today);
          endDate = new Date(today);
          endDate.setDate(today.getDate() + 7);
          break;
        default:
          startDate = today;
          endDate = today;
      }

      filters.start_date = startDate.toISOString().split('T')[0];
      filters.end_date = endDate.toISOString().split('T')[0];
    }

    onFiltersChange(filters);
  };

  const handleClearFilters = () => {
    setMaxPrice(5000);
    setSelectedDateFilter('');
    onFiltersChange({});
  };

  const handleDateFilterChange = (filter: string) => {
    setSelectedDateFilter(filter === selectedDateFilter ? '' : filter);
  };

  return (
    <div className="w-full">
      <Card className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
              Filtreler
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Tarih
              </h4>
              <div className="space-y-2">
                {[
                  { key: 'today', label: 'Bugün' },
                  { key: 'tomorrow', label: 'Yarın' },
                  { key: 'thisWeek', label: 'Bu Hafta' }
                ].map((option) => (
                  <button
                    key={option.key}
                    onClick={() => handleDateFilterChange(option.key)}
                    className={`w-full px-3 py-2 text-sm text-left rounded-md transition-colors ${
                      selectedDateFilter === option.key
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Fiyat Aralığı
              </h4>
              <div className="px-2">
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="50"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>0 ₺</span>
                    <span>{maxPrice} ₺</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-4 border-t border-gray-200 dark:border-gray-600">
            <Button
              onClick={handleApplyFilters}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Filtreleniyor...' : 'Filtreleri Uygula'}
            </Button>
            <Button
              onClick={handleClearFilters}
              variant="outline"
              disabled={isLoading}
              className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 
                         hover:bg-gray-50 dark:hover:bg-gray-700 py-2 px-4 rounded-md text-sm font-medium"
            >
              Filtreleri Temizle
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
