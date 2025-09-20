'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PaymentFormData } from '@/hooks/payment';
import type { EncodedPaymentData } from '@/lib/utils';
import { processPayment } from '@/server/payment/actions';
import type { PaymentData } from '@/types/domain';

interface SessionData extends PaymentData {
  [key: string]: unknown;
}

interface DecodedData extends EncodedPaymentData {
  [key: string]: unknown;
}

interface PaymentContextType {
  isFormValid: boolean;
  setIsFormValid: (isValid: boolean) => void;
  isTermsAccepted: boolean;
  setIsTermsAccepted: (accepted: boolean) => void;
  formData: PaymentFormData | null;
  setFormData: (data: PaymentFormData) => void;
  termsError: string;
  setTermsError: (error: string) => void;
  sessionData: SessionData;
  decodedData: DecodedData;
  totalAmount: number;
  handlePayment: (data: PaymentFormData) => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

interface PaymentProviderProps {
  children: ReactNode;
  sessionData: SessionData;
  decodedData: DecodedData;
  totalAmount: number;
}

export function PaymentProvider({ children, sessionData, decodedData, totalAmount }: PaymentProviderProps) {
  const [isFormValid, setIsFormValid] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [formData, setFormData] = useState<PaymentFormData | null>(null);
  const [termsError, setTermsError] = useState('');

  const handlePayment = async (data: PaymentFormData) => {
    if (!isTermsAccepted) {
      setTermsError('Sözleşmeleri kabul etmeniz gerekmektedir.');
      return;
    }

    try {

      const result = await processPayment({
        customerInfo: {
          name: data.name,
          surname: data.surname,
          email: data.email,
          phone: data.phone
        },
        sessionData: {
          sessionId: decodedData.seans_id?.toString() || '',
          title: (sessionData.title as string) || '',
          category: decodedData.type as 'society' | 'workshop',
          price: (sessionData.price as number) || 0,
          discountedPrice: sessionData.discountedPrice as number | undefined,
          imageUrl: sessionData.imageUrl as string | undefined,
          location: (sessionData.location as string) || '',
          sessionDate: (sessionData.sessionDate as string) || '',
          sessionTime: (sessionData.sessionTime as string) || ''
        },
        totalAmount,
        ticketCount: (decodedData.ticket_count as number) || 1,
        seansItemId: (decodedData.seans_id as number) || 0,
        termsAccepted: isTermsAccepted
      });



      if (!result.success) {
        console.error(`Ödeme hatası: ${result.errorMessage}`);
      } else if (result.shouldRedirect && result.redirectUrl) {

        window.location.href = result.redirectUrl;
      }
    } catch (error) {
      console.error('Payment error:', error);
      console.error('Ödeme işlemi sırasında bir hata oluştu.');
    }
  };

  const value: PaymentContextType = {
    isFormValid,
    setIsFormValid,
    isTermsAccepted,
    setIsTermsAccepted,
    formData,
    setFormData,
    termsError,
    setTermsError,
    sessionData,
    decodedData,
    totalAmount,
    handlePayment
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
}

export function usePayment() {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
}
