import type { PaymentData } from '@/types/domain';
import type { SessionDetail } from '@/types/domain';

// Saat formatını 12:30:00'dan 12:30'a çeviren yardımcı fonksiyon
const formatTime = (time: string) => {
  return time.slice(0, 5);
};

export const mapSessionDetailToPaymentData = (
  sessionDetail: SessionDetail, 
  category: 'society' | 'workshop'
): PaymentData => {
  return {
    sessionId: sessionDetail.id.toString(),
    title: sessionDetail.name,
    description: sessionDetail.description,
    price: sessionDetail.price,
    discountedPrice: sessionDetail.discountedPrice,
    discountPercentage: sessionDetail.discountPercentage,
    currency: 'TRY',
    organizerName: sessionDetail.owner.fullName,
    sessionDate: sessionDetail.date,
    sessionTime: formatTime(sessionDetail.startTime),
    location: sessionDetail.location,
    capacity: sessionDetail.capacity,
    category: category,
    imageUrl: sessionDetail.image
  };
};