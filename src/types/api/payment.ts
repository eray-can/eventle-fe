export interface CreatePaymentRequest {
  conversation_id: string;
  token: string;
  seans_item_id: number;
  ticket_count: string;
  guest: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
  [key: string]: unknown;
}

export interface CreatePaymentResponse {
  success: boolean;
  message?: string;
  payment_id?: string;
  order_id?: string;
  status?: string;
}