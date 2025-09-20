'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useEventCalendar } from '@/hooks/common/use-event-calendar';
import type { SocietyDetailInfo, SessionDetail } from '@/types/domain';
import type { TimeSlot } from '@/hooks/common/use-event-calendar';

export interface EventCalendarContextType {
  // State
  isCalendarOpen: boolean;
  selectedDate: Date | undefined;
  selectedTimeSlot: TimeSlot | undefined;
  sessionDetail: SessionDetail | undefined;
  isLoadingSessionDetail: boolean;
  availableDates: string[];
  availableTimeSlots: TimeSlot[];
  minDate: Date;
  maxDate: Date | undefined;
  
  // Handlers
  handleDateSelect: (date: Date) => void;
  toggleCalendar: () => void;
  handleTimeSlotSelect: (timeSlot: TimeSlot) => void;
  
  // Utilities
  formatSelectedDate: (date: Date) => string;
  
  // Purchase related
  quantity: number;
  setQuantity: (quantity: number) => void;
  isOutOfStock: boolean;
  availableStock: number;
  totalPrice: number;
  originalPrice: number;
  category: 'workshop' | 'society';
}

const EventCalendarContext = createContext<EventCalendarContextType | undefined>(undefined);

interface EventCalendarProviderProps {
  children: ReactNode;
  eventDetail: SocietyDetailInfo | undefined;
  useWorkshopService?: boolean;
}

export function EventCalendarProvider({ 
  children, 
  eventDetail, 
  useWorkshopService 
}: EventCalendarProviderProps) {
  const eventCalendarData = useEventCalendar(eventDetail, useWorkshopService);
  
  const category: 'workshop' | 'society' = useWorkshopService ? 'workshop' : 'society';
  const [quantity, setQuantityState] = React.useState(1);

  // Güvenli setQuantity fonksiyonu - maksimum bilet sayısını kontrol eder
  const setQuantity = React.useCallback((newQuantity: number) => {
    if (!eventCalendarData.selectedTimeSlot) return;
    
    const { capacity, attendedCount } = eventCalendarData.selectedTimeSlot;
    const validCapacity = typeof capacity === 'number' && capacity >= 0 ? capacity : 0;
    const validAttendedCount = typeof attendedCount === 'number' && attendedCount >= 0 ? attendedCount : 0;
    const maxAvailable = Math.max(0, validCapacity - validAttendedCount);
    
    // Minimum 1, maksimum availableStock ile sınırla
    const safeQuantity = Math.max(1, Math.min(newQuantity, maxAvailable));
    setQuantityState(safeQuantity);
  }, [eventCalendarData.selectedTimeSlot]);

  // Mevcut stok miktarını hesapla
  const availableStock = React.useMemo(() => {
    if (!eventCalendarData.selectedTimeSlot) return 0;
    const { capacity, attendedCount } = eventCalendarData.selectedTimeSlot;
    const validCapacity = typeof capacity === 'number' && capacity >= 0 ? capacity : 0;
    const validAttendedCount = typeof attendedCount === 'number' && attendedCount >= 0 ? attendedCount : 0;
    return Math.max(0, validCapacity - validAttendedCount);
  }, [eventCalendarData.selectedTimeSlot]);

  // Stok durumunu kontrol et
  const isOutOfStock = React.useMemo(() => {
    if (!eventCalendarData.selectedTimeSlot) return false;
    // Hem slot'un isAvailable durumunu hem de stok miktarını kontrol et
    return !eventCalendarData.selectedTimeSlot.isAvailable || availableStock <= 0;
  }, [eventCalendarData.selectedTimeSlot, availableStock]);

  // Toplam fiyatı hesapla
  const totalPrice = React.useMemo(() => {
    if (!eventCalendarData.selectedTimeSlot) return 0;
    const price = eventCalendarData.selectedTimeSlot.discountedPrice || eventCalendarData.selectedTimeSlot.price;
    return price * quantity;
  }, [eventCalendarData.selectedTimeSlot, quantity]);

  // Orijinal fiyatı hesapla
  const originalPrice = React.useMemo(() => {
    if (!eventCalendarData.selectedTimeSlot) return 0;
    return eventCalendarData.selectedTimeSlot.price * quantity;
  }, [eventCalendarData.selectedTimeSlot, quantity]);

  // Miktar değiştiğinde stok kontrolü yap
  React.useEffect(() => {
    // Eğer stok tükendiyse miktarı 0'a ayarla, yoksa mevcut stokla sınırla
    if (availableStock <= 0) {
      setQuantityState(0);
    } else if (quantity > availableStock) {
      setQuantityState(availableStock);
    } else if (quantity <= 0 && availableStock > 0) {
      setQuantityState(1);
    }
  }, [availableStock, quantity]);

  const contextValue: EventCalendarContextType = {
    ...eventCalendarData,
    quantity,
    setQuantity,
    isOutOfStock,
    availableStock,
    totalPrice,
    originalPrice,
    category,
  };

  return (
    <EventCalendarContext.Provider value={contextValue}>
      {children}
    </EventCalendarContext.Provider>
  );
}

export function useEventCalendarContext() {
  const context = useContext(EventCalendarContext);
  if (context === undefined) {
    throw new Error('useEventCalendarContext must be used within an EventCalendarProvider');
  }
  return context;
}