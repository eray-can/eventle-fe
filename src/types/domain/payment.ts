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
  [key: string]: unknown;
}

export interface PaymentSessionRequest {
  id: string;
  category: 'society' | 'workshop';
}
export interface PaymentRequest {
  amount: number;
  currency?: string;
  description?: string;
  customerInfo: {
    name: string;
    surname: string;
    email: string;
    phone: string;
  };
  callbackUrl: string;
  metadata: {
    seansItemId: number;
    ticketCount: number;
    category: 'society' | 'workshop';
    sessionTitle: string;
    sessionLocation?: string;
    sessionDate: string;
    sessionTime: string;
    [key: string]: unknown;
  };
}

export interface PaymentResult {
  success: boolean;
  paymentPageUrl?: string;
  token?: string;
  errorMessage?: string;
  conversationId?: string;
  shouldRedirect?: boolean;
  redirectUrl?: string;
}

export interface ProcessPaymentData {
  customerInfo: {
    name: string;
    surname: string;
    email: string;
    phone: string;
  };
  sessionData: {
    sessionId: string;
    title: string;
    category: 'society' | 'workshop';
    price: number;
    discountedPrice?: number;
    imageUrl?: string;
    location?: string;
    sessionDate: string;
    sessionTime: string;
    [key: string]: unknown;
  };
  totalAmount: number;
  ticketCount: number;
  seansItemId: number;
  termsAccepted: boolean;
}

export interface PaymentProvider {
  createPayment(request: import('@/types/api/payment').CreatePaymentRequest): Promise<import('@/types/api/payment').CreatePaymentResponse>;
  getCallbackUrl(): string;
}
