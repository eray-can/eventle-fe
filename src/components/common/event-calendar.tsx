'use client';

import { Calendar, ChevronDown } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { TimeSlotPicker } from '@/components/ui/time-slot-picker';
import { useEventCalendarContext } from '@/contexts/event-calendar';

interface EventCalendarProps {
  className?: string;
}

export function EventCalendar({
  className
}: EventCalendarProps) {
  const {
    isCalendarOpen,
    selectedDate,
    selectedTimeSlot,
    sessionDetail,

    availableDates,
    availableTimeSlots,
    minDate,
    maxDate,
    handleDateSelect,
    toggleCalendar,
    handleTimeSlotSelect,
  } = useEventCalendarContext();

  return (
    <div className={className}>
      <div className="space-y-6 max-w-5xl mx-auto">
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
          <TimeSlotPicker
            timeSlots={availableTimeSlots}
            selectedSlot={selectedTimeSlot}
            onSlotSelect={handleTimeSlotSelect}
          />
          {availableTimeSlots.length === 0 && (
            <div className="py-8">
              {/* Boş alan - sayfa kaymasını önlemek için */}
            </div>
          )}
        </div>

        {/* Session Detail Bilgileri */}
        {selectedTimeSlot && (
          <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            {sessionDetail ? (
              <div className="space-y-4">
                {/* Requirements */}
                {sessionDetail.requirements && (
                  <div>
                    <h4 className="text-gray-400 text-sm mb-2">Gereksinimler</h4>
                    <p className="text-white text-sm leading-relaxed">
                      {sessionDetail.requirements}
                    </p>
                  </div>
                )}

                {/* What's Included */}
                {sessionDetail.whatIsInPrice && (
                  <div>
                    <h4 className="text-gray-400 text-sm mb-2">Ücrete Dahil</h4>
                    <p className="text-white text-sm leading-relaxed">
                      {sessionDetail.whatIsInPrice}
                    </p>
                  </div>
                )}

                {/* Additional Link */}
                {sessionDetail.additionalLink && (
                  <div>
                    <h4 className="text-gray-400 text-sm mb-2">Grup Linki</h4>
                    <a
                      href={sessionDetail.additionalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 text-sm underline"
                    >
                      Gruba Katıl
                    </a>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        )}
      </div>

    </div>
  );
}
