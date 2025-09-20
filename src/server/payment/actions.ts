'use server';

import { paymentService } from '@/services/payment/service';
import type { PaymentRequest, PaymentResult, ProcessPaymentData } from '@/types/domain/payment';

export async function processPayment(data: ProcessPaymentData): Promise<PaymentResult> {
  try {
    const paymentRequest: PaymentRequest = {
      amount: data.totalAmount,
      currency: 'TRY',
      description: `${data.sessionData.title} - ${data.sessionData.sessionDate}`,
      customerInfo: data.customerInfo,
      callbackUrl: '',
      metadata: {
        seansItemId: data.seansItemId,
        ticketCount: data.ticketCount,
        category: data.sessionData.category,
        sessionTitle: data.sessionData.title,
        sessionLocation: data.sessionData.location,
        sessionDate: data.sessionData.sessionDate,
        sessionTime: data.sessionData.sessionTime
      }
    };

    const result = await paymentService.initiatePayment(paymentRequest);

    if (result.success && result.paymentPageUrl) {
      return {
        ...result,
        shouldRedirect: true,
        redirectUrl: result.paymentPageUrl
      };
    } else {
      return result;
    }
  } catch (error) {
    return {
      success: false,
      errorMessage: `Ödeme işlemi sırasında beklenmeyen bir hata oluştu: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`
    };
  }
}
