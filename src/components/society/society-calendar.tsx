'use client';

import { Calendar, ChevronDown } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { TimeSlotPicker } from '@/components/ui/time-slot-picker';
import { useSocietyCalendar } from '@/hooks';
import type { SocietyDetailInfo } from '@/types/domain';

interface SocietyCalendarProps {
  societyDetail: SocietyDetailInfo;
  className?: string;
}

export function SocietyCalendar({
  societyDetail,
  className
}: SocietyCalendarProps) {
  const {
    isCalendarOpen,
    selectedDate,
    selectedTimeSlot,
    availableDates,
    availableTimeSlots,
    minDate,
    maxDate,
    handleDateSelect,
    toggleCalendar,
    handleTimeSlotSelect,
  } = useSocietyCalendar(societyDetail);

  return (
    <div className={className}>
      <div className="space-y-6">
        {/* Tarih Seçici Butonu */}
        <div>
          <button
            onClick={toggleCalendar}
            className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-2 border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-purple-500" />
              <div className="text-left">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Etkinlik Tarihi
                </div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {selectedDate ? selectedDate.toLocaleDateString('tr-TR', { 
                    day: '2-digit', 
                    month: '2-digit', 
                    year: 'numeric' 
                  }) : 'Tarih Seçin'}
                </div>
              </div>
            </div>
            <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isCalendarOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Açılır Takvim */}
          {isCalendarOpen && (
            <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
              <CalendarComponent
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
                availableDates={availableDates}
                minDate={minDate}
                maxDate={maxDate}
                className="border-0 p-0"
              />
            </div>
          )}
        </div>

        {/* Seans Seçimi */}
        <div>
          {selectedDate ? (
            <TimeSlotPicker
              timeSlots={availableTimeSlots}
              selectedSlot={selectedTimeSlot}
              onSlotSelect={handleTimeSlotSelect}
            />
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                Lütfen önce bir tarih seçin
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
