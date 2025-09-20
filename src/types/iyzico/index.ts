export interface IyzicoConfig {
  apiKey: string;
  secretKey: string;
  baseUrl: string;
}

export interface IyzicoRequest {
  [key: string]: unknown;
}

export interface IyzicoResponse {
  conversationId: string;
  token: string;
  status: string;
  errorMessage?: string;
  paymentPageUrl?: string;
  [key: string]: unknown;
}

export interface IyzicoCheckoutFormPayload {
  locale: string;
  conversationId: string;
  price: number;
  paymentGroup: string;
  buyer: {
    id: string;
    name: string;
    surname: string;
    identityNumber: string;
    email: string;
    registrationAddress: string;
    city: string;
    country: string;
    zipCode: string;
    ip: string;
  };
  shippingAddress: {
    address: string;
    contactName: string;
    city: string;
    country: string;
  };
  billingAddress: {
    address: string;
    contactName: string;
    city: string;
    country: string;
  };
  basketItems: Array<{
    id: string;
    price: number;
    name: string;
    category1: string;
    itemType: string;
  }>;
  callbackUrl: string;
  paidPrice: number;
  [key: string]: unknown;
}
