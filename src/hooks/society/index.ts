import * as React from 'react';
import type { SocietyDetailInfo, SessionDetail } from '@/types/domain';
import { societyService } from '@/services/society/service';

export interface TimeSlot {
  id: number;
  startTime: string;
  endTime: string;
  price: number;
  discountedPrice?: number;
  capacity: number;
  attendedCount: number;
  isAvailable: boolean;
  isValid: boolean;
}

export function useSocietyCalendar(societyDetail: SocietyDetailInfo) {
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();
  const [selectedTimeSlot, setSelectedTimeSlot] = React.useState<TimeSlot | undefined>();
  const [sessionDetail, setSessionDetail] = React.useState<SessionDetail | undefined>();
  const [isLoadingSessionDetail, setIsLoadingSessionDetail] = React.useState(false);

  // Tarih formatını düzelt (DD-MM-YYYY -> YYYY-MM-DD)
  const parseApiDate = React.useCallback((dateString: string): Date => {
    const parts = dateString.split('-');
    if (parts.length === 3) {
      // DD-MM-YYYY formatından YYYY-MM-DD formatına çevir
      const [day, month, year] = parts;
      // Date constructor'ı için month 0-based olduğundan -1 yapıyoruz
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }
    // Eğer zaten ISO formatındaysa direkt kullan
    return new Date(dateString);
  }, []);

  // İlk müsait tarihi default olarak seç
  const firstAvailableDate = React.useMemo(() => {
    if (societyDetail.sessionGroups.length === 0) return undefined;
    try {
      return parseApiDate(societyDetail.sessionGroups[0].date);
    } catch (error) {
      console.error('Tarih parse hatası:', error, societyDetail.sessionGroups[0].date);
      return undefined;
    }
  }, [societyDetail.sessionGroups, parseApiDate]);

  // İlk tarihi seç
  React.useEffect(() => {
    if (firstAvailableDate && !selectedDate) {
      setSelectedDate(firstAvailableDate);
    }
  }, [firstAvailableDate, selectedDate]);

  // Müsait tarihleri hesapla
  const availableDates = React.useMemo(() => {
    const dates = societyDetail.sessionGroups.map(group => {
      try {
        // API formatını ISO formatına çevir
        const date = parseApiDate(group.date);
        return date.toISOString().split('T')[0];
      } catch (error) {
        console.error('Tarih dönüştürme hatası:', error, group.date);
        return group.date;
      }
    });
    return dates;
  }, [societyDetail.sessionGroups, parseApiDate]);

  // Seçili tarihe ait seansları hesapla
  const availableTimeSlots = React.useMemo(() => {
    if (!selectedDate) return [];
    
    try {
      const selectedDateString = selectedDate.toISOString().split('T')[0];
      
      // API formatındaki tarihi bulabilmek için hem ISO hem de API formatını kontrol et
      const sessionGroup = societyDetail.sessionGroups.find(group => {
        try {
          const groupDate = parseApiDate(group.date);
          const groupDateString = groupDate.toISOString().split('T')[0];
          return groupDateString === selectedDateString;
        } catch {
          return group.date === selectedDateString;
        }
      });
      
      if (!sessionGroup) return [];
      
      return sessionGroup.sessions.map(session => ({
        id: session.id,
        startTime: session.startTime,
        endTime: session.endTime,
        price: session.price,
        discountedPrice: session.discountedPrice,
        capacity: session.capacity,
        attendedCount: session.attendedCount,
        isAvailable: session.isAvailable,
        isValid: session.isValid,
      }));
    } catch (error) {
      console.error('Seans yükleme hatası:', error);
      return [];
    }
  }, [selectedDate, societyDetail.sessionGroups, parseApiDate]);

  // İlk seansı seç
  React.useEffect(() => {
    if (availableTimeSlots.length > 0 && !selectedTimeSlot) {
      setSelectedTimeSlot(availableTimeSlots[0]);
    }
  }, [availableTimeSlots, selectedTimeSlot]);

  // Refs to prevent duplicate calls
  const loadingRef = React.useRef<number | null>(null);
  const loadedSessionIdRef = React.useRef<number | null>(null);

  // Seçili time slot değiştiğinde session detail'i getir
  React.useEffect(() => {
    if (!selectedTimeSlot) {
      setSessionDetail(undefined);
      loadingRef.current = null;
      loadedSessionIdRef.current = null;
      return;
    }

    // Aynı ID için zaten yükleme yapılıyorsa, tekrar yapma
    if (loadingRef.current === selectedTimeSlot.id) {
      return;
    }

    // Zaten aynı session detail yüklenmişse, tekrar yükleme
    if (loadedSessionIdRef.current === selectedTimeSlot.id) {
      return;
    }

    const loadSessionDetail = async () => {
      loadingRef.current = selectedTimeSlot.id;
      setIsLoadingSessionDetail(true);
      
      try {
        const detail = await societyService.getSessionDetail({ id: selectedTimeSlot.id });
        setSessionDetail(detail);
        loadedSessionIdRef.current = selectedTimeSlot.id; // Mark as loaded
      } catch (error) {
        console.error('Session detail yüklenemedi:', error);
        setSessionDetail(undefined);
        loadedSessionIdRef.current = null;
      } finally {
        setIsLoadingSessionDetail(false);
        loadingRef.current = null;
      }
    };

    loadSessionDetail();
  }, [selectedTimeSlot]); // sessionDetail dependency'sini kaldırdık

  // Tarih seçim handler'ı
  const handleDateSelect = React.useCallback((date: Date) => {
    setSelectedDate(prevDate => {
      const isSameDate = prevDate && 
        date.getDate() === prevDate.getDate() &&
        date.getMonth() === prevDate.getMonth() &&
        date.getFullYear() === prevDate.getFullYear();
      
      // Sadece farklı bir tarih seçilirse seans seçimini sıfırla
      if (!isSameDate) {
        setSelectedTimeSlot(undefined);
        setSessionDetail(undefined);
        loadedSessionIdRef.current = null; // Reset loaded session cache
      }
      
      return date;
    });
    
    setIsCalendarOpen(false); // Tarih seçilince takvimi kapat
  }, []);

  // Takvim aç/kapat handler'ı
  const toggleCalendar = React.useCallback(() => {
    setIsCalendarOpen(prev => !prev);
  }, []);

  // Seans seçim handler'ı
  const handleTimeSlotSelect = React.useCallback((timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot);
  }, []);

  // Min/Max tarihler
  const minDate = React.useMemo(() => new Date(), []);
  const maxDate = React.useMemo(() => {
    if (availableDates.length === 0) return undefined;
    
    const maxDateString = availableDates.reduce((max, current) => 
      current > max ? current : max
    );
    
    return new Date(maxDateString);
  }, [availableDates]);

  // Tarih formatlama yardımcı fonksiyonu
  const formatSelectedDate = React.useCallback((date: Date) => {
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long'
    });
  }, []);

  return {
    // State
    isCalendarOpen,
    selectedDate,
    selectedTimeSlot,
    sessionDetail,
    isLoadingSessionDetail,
    availableDates,
    availableTimeSlots,
    minDate,
    maxDate,
    
    // Handlers
    handleDateSelect,
    toggleCalendar,
    handleTimeSlotSelect,
    
    // Utilities
    formatSelectedDate,
  };
}
