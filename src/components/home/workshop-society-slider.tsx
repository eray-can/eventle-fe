'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { formatDateTurkish } from '@/lib/utils';
import type { SocietyList } from '@/types/domain';

interface WorkshopSocietySliderProps {
  societyList: SocietyList | null;
  title?: string;
}

export default function WorkshopSocietySlider({ societyList, title = "Popüler Etkinlikler" }: WorkshopSocietySliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    console.log('Scroll left clicked');
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -400,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    console.log('Scroll right clicked');
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 400,
        behavior: 'smooth'
      });
    }
  };

  if (!societyList) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 text-lg">Etkinlikler yüklenirken bir hata oluştu</p>
      </div>
    );
  }

  if (societyList.workshops.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">Henüz etkinlik bulunmuyor.</p>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          {title}
        </h2>
        
        <div className="flex items-center gap-2">
          <span className="text-white text-sm">TÜMÜ</span>
          <button onClick={scrollLeft} className="p-2 text-white hover:bg-gray-700 rounded-full transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button onClick={scrollRight} className="p-2 text-white hover:bg-gray-700 rounded-full transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="relative">
        <div ref={scrollRef} className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-3 pb-4">
          {societyList.workshops.map((workshop) => (
            <Card key={workshop.id} className="flex-none w-60 overflow-hidden border-none shadow-none bg-transparent" style={{ direction: 'ltr' }}>
              <CardHeader className="p-0">
                <div className="relative h-57">
                  <Image 
                    src={workshop.image || '/static/media/default-workshop.jpg'} 
                    alt={workshop.name}
                    width={228}
                    height={228}
                    className="w-full h-full object-cover"
                  />
                  {workshop.discountedPrice && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                      İndirim
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="text-left pl-0 pt-1">
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                  {workshop.name}
                </h3>
                
                <div className="flex items-center text-purple-400 mb-2">
                  <span className="text-sm">{formatDateTurkish(workshop.date)}</span>
                </div>
                
                <div className="flex items-center text-white mb-4">
                  <span className="text-sm">{workshop.location}</span>
                </div>
                

              </CardContent>
             </Card>
           ))}
         </div>
       </div>
     </div>


    </div>
  );
}