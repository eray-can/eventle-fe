import Image from 'next/image';
import Link from 'next/link';
import type { Workshop } from '@/types/domain';
import { capitalizeTitle } from '@/lib/utils';

interface SocietyCardProps {
  workshop: Workshop;
}

export function SocietyCard({ workshop }: SocietyCardProps) {
  const formatDateRange = () => {
    if (workshop.minDate === workshop.maxDate) {
      return new Date(workshop.minDate!).toLocaleDateString('tr-TR', { 
        day: 'numeric', 
        month: 'short'
      });
    } else {
      const startDate = new Date(workshop.minDate!).toLocaleDateString('tr-TR', { 
        day: 'numeric', 
        month: 'short'
      });
      const endDate = new Date(workshop.maxDate!).toLocaleDateString('tr-TR', { 
        day: 'numeric', 
        month: 'short'
      });
      return `${startDate} - ${endDate}`;
    }
  };

  const getPriceDisplay = () => {
    if (workshop.price === 0 && workshop.maxPrice === 0) {
      return (
        <div className="text-sm sm:text-lg font-bold text-green-600">
          Ücretsiz
        </div>
      );
    }
    
    if (workshop.discountedPrice) {
      return (
        <div className="flex items-center gap-2">
          <div className="text-sm sm:text-lg font-bold text-green-600">
            {workshop.discountedPrice.toFixed(0)}₺
          </div>
          <div className="text-xs sm:text-sm text-gray-500 line-through">
            {workshop.price.toFixed(0)}₺
          </div>
        </div>
      );
    }
    
    if (workshop.price === workshop.maxPrice) {
      return (
        <div className="text-sm sm:text-lg font-bold text-green-600">
          {workshop.price.toFixed(0)}₺
        </div>
      );
    }
    
    if (workshop.priceRangeText) {
      return (
        <div className="text-sm sm:text-lg font-bold text-green-600">
          {workshop.price.toFixed(0)}₺ {workshop.priceRangeText}
        </div>
      );
    }
    
    return (
      <div className="text-sm sm:text-lg font-bold text-green-600">
        {workshop.price.toFixed(0)}₺ - {workshop.maxPrice?.toFixed(0)}₺
      </div>
    );
  };

  return (
    <Link href={`/topluluk/${workshop.id}`}>
      <div className="cursor-pointer group transition-all duration-300 w-[150px] sm:w-[280px]">
        <div className="relative mb-2">
          <div className="relative w-[150px] h-[90px] sm:w-[280px] sm:h-[200px] overflow-hidden rounded-lg">
            <Image
              src={workshop.image}
              alt={workshop.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {workshop.category.name && (
              <div 
                className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium text-white shadow-lg"
                style={{ backgroundColor: workshop.category.color }}
              >
                {workshop.category.name}
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-2 w-[150px] sm:w-[280px] min-h-[100px] sm:min-h-[120px]">
          <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-lg line-clamp-2 group-hover:text-orange-600 transition-colors leading-tight">
            {capitalizeTitle(workshop.name)}
          </h3>
          
          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span>{formatDateRange()}</span>
              {workshop.seansItemCount && workshop.seansItemCount > 1 && (
                <span className="ml-2 text-orange-600 dark:text-orange-400 text-xs font-medium">
                  • {workshop.seansItemCount} seans
                </span>
              )}
            </div>
            
            <div className="flex items-center flex-shrink-0">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="truncate">{workshop.location}</span>
            </div>
          </div>

          <div className="pt-1">
            {getPriceDisplay()}
          </div>
        </div>
      </div>
    </Link>
  );
}
