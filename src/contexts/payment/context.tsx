'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PaymentFormData } from '@/hooks/payment';
import type { EncodedPaymentData } from '@/lib/utils';

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

  const handlePayment = (data: PaymentFormData) => {
    if (!isTermsAccepted) {
      setTermsError('Sözleşmeleri kabul etmeniz gerekmektedir.');
      return;
    }
    
    // Ödeme işlemi burada yapılacak
    console.log('Payment processing:', {
      sessionData,
      formData: data,
      decodedData,
      totalAmount
    });
    
    alert('Ödeme işlemi başlatılıyor...');
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