'use client';


import React from 'react';
import Image from '@/components/ui/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { formatDateTurkish, capitalizeAddress, capitalizeTitle } from '@/lib/utils';
import type { CollectionsWithBanner } from '@/types/domain/organizations';


interface CollectionsSliderProps {
  collections: CollectionsWithBanner | null;
  title?: string;
}



export default function CollectionsSlider({ collections }: CollectionsSliderProps) {


  // Sort collections to show Banner type first
  const sortedCollections = React.useMemo(() => {
    if (!collections || !collections.collections || collections.collections.length === 0) {
      return [];
    }
    return [...collections.collections].sort((a, b) => {
      if (a.collectionType === 'Banner' && b.collectionType !== 'Banner') {
        return -1;
      }
      if (a.collectionType !== 'Banner' && b.collectionType === 'Banner') {
        return 1;
      }
      return 0;
    });
  }, [collections]);

  // Create refs for each collection
  const scrollRefs = React.useMemo(() => {
    const refs = new Map();
    sortedCollections.forEach((collection) => {
      refs.set(collection.collectionName, React.createRef<HTMLDivElement>());
    });
    return refs;
  }, [sortedCollections]);

  if (!collections || !collections.collections || collections.collections.length === 0) {
    return null;
  }

  const createScrollHandlers = (collectionName: string) => {
    const scrollRef = scrollRefs.get(collectionName);
    
    const scrollLeft = () => {
      if (scrollRef?.current) {
        scrollRef.current.scrollBy({
          left: -400,
          behavior: 'smooth'
        });
      }
    };
  
    const scrollRight = () => {
      if (scrollRef?.current) {
        scrollRef.current.scrollBy({
          left: 400,
          behavior: 'smooth'
        });
      }
    };

    return { scrollLeft, scrollRight, scrollRef };
  };

  return (
    <div className="space-y-8">
      {sortedCollections.map((collection) => {
        const { scrollLeft, scrollRight, scrollRef } = createScrollHandlers(collection.collectionName);

        return (
          <div key={collection.collectionName} className="">
            {/* Collection Header */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                {collection.collectionName && collection.events && collection.events.length > 0 && (
                  <h3 className="text-xl font-bold text-white">{collection.collectionName}</h3>
                )}
                {collection.events && collection.events.length > 0 && (
                  <div className="flex items-center gap-2">
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
                )}
              </div>
              {collection.collectionImage && (
                <div className="relative h-50 w-full mb-3">
                  <Image 
                    src={collection.collectionImage} 
                    alt={collection.collectionName || 'Koleksiyon'}
                    width={800}
                    height={128}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
            
            {/* Collection Events Slider */}
            {collection.events && collection.events.length > 0 && (
              <div className="relative">
                <div ref={scrollRef} className="overflow-x-auto scrollbar-hide">
                  <div className="flex gap-3 pb-4">
                    {collection.events.map((event) => (
                      <Card key={event.id} className="flex-none w-60 overflow-hidden border-none shadow-none bg-transparent" style={{ direction: 'ltr' }}>
                        <CardHeader className="p-0">
                          <div className="relative h-57">
                            <Image 
                              src={event.image || '/placeholder-event.jpg'} 
                              alt={event.name || 'Event'}
                              width={228}
                              height={228}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </CardHeader>
                        
                        <CardContent className="text-left pl-0 pt-1">
                          {event.name && (
                            <h4 className="text-xl font-bold text-white mb-2 line-clamp-2">
                              {capitalizeTitle(event.name)}
                            </h4>
                          )}
                          
                          {event.startDate && (
                            <div className="flex items-center text-purple-400 mb-2">
                              <span className="text-sm">{formatDateTurkish(event.startDate)}</span>
                            </div>
                          )}
                          
                          {event.locationName && (
                            <div className="flex items-center text-white mb-4">
                              <span className="text-sm">{capitalizeAddress(event.locationName)}</span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}