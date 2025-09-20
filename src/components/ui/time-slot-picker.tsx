'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import type { TimeSlot } from '@/hooks/common/use-event-calendar';


export interface TimeSlotPickerProps {
  timeSlots: TimeSlot[];
  selectedSlot?: TimeSlot;
  onSlotSelect?: (slot: TimeSlot) => void;
  className?: string;
}

export function TimeSlotPicker({
  timeSlots,
  selectedSlot,
  onSlotSelect,
  className,
  ...props
}: TimeSlotPickerProps) {
  const handleSlotClick = (slot: TimeSlot) => {
    if (slot.isAvailable && slot.isValid && onSlotSelect) {
      onSlotSelect(slot);
    }
  };

  const formatTime = (time: string) => {
    return time.slice(0, 5);
  };

  const formatPrice = (price: number) => {
    return price === 0 ? 'Ücretsiz' : `${price.toLocaleString()} ₺`;
  };

  if (timeSlots.length === 0) {
    return null;
  }



  return (
    <div className={cn('space-y-2', className)} {...props}>      
      {timeSlots.map((slot) => {
        const isSelected = selectedSlot?.id === slot.id;
        const isDisabled = !slot.isAvailable || !slot.isValid;

        return (
          <button
            key={slot.id}
            onClick={() => handleSlotClick(slot)}
            disabled={isDisabled}
            className={cn(
              'w-full p-4 rounded-xl border-2 transition-all duration-200 text-left',
              'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
              {
                'border-purple-500 bg-purple-50 dark:bg-purple-900/20': isSelected,
                'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-purple-300': !isSelected && !isDisabled,
                'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 opacity-60 cursor-not-allowed': isDisabled,
              }
            )}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {formatTime(slot.startTime)}
                </div>
                {slot.discountedPrice ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                      {formatPrice(slot.price)}
                    </span>
                    <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                      {formatPrice(slot.discountedPrice)}
                    </span>
                  </div>
                ) : (
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {formatPrice(slot.price)}
                  </div>
                )}
              </div>

              <div className="text-right">
                {isSelected && (
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
                {!slot.isAvailable && (
                  <div className="text-sm text-red-500 font-medium">
                    Tükendi
                  </div>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
