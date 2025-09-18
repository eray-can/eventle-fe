export interface PaymentData {
  sessionId: string;
  title: string;
  description?: string;
  price: number;
  discountedPrice?: number;
  discountPercentage?: number;
  currency: string;
  organizerName: string;
  sessionDate: string;
  sessionTime: string;
  location?: string;
  capacity?: number;
  availableSeats?: number;
  category: 'society' | 'workshop';
  imageUrl?: string;
}

export interface PaymentSessionRequest {
  id: string;
  category: 'society' | 'workshop';
}
