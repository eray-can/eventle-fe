import { IyzicoService } from '@/services/iyzico/service';
import type { PaymentRequest, PaymentResult, PaymentProvider } from '@/types/domain/payment';
import type { CreatePaymentRequest } from '@/types/api/payment';
import { workshopService } from '@/services/workshop/service';
import { societyService } from '@/services/society/service';
import type { IyzicoResponse } from '@/types/iyzico';

class PaymentService {
  private iyzicoService: IyzicoService;
  private paymentProviders: Map<string, PaymentProvider>;

  constructor() {
    this.iyzicoService = new IyzicoService();
    this.paymentProviders = new Map<string, PaymentProvider>([
      ['workshop', workshopService],
      ['society', societyService]
    ]);
  }

  private async createBackendPayment(
    iyzicoResponse: IyzicoResponse,
    request: PaymentRequest,
    category: 'society' | 'workshop'
  ): Promise<void> {
    const provider = this.paymentProviders.get(category);

    if (!provider || !request.metadata?.seansItemId || !request.metadata?.ticketCount) {
      return;
    }

    const createPaymentRequest: CreatePaymentRequest = {
      conversation_id: iyzicoResponse.conversationId,
      token: iyzicoResponse.token,
      seans_item_id: request.metadata.seansItemId,
      ticket_count: request.metadata.ticketCount.toString(),
      guest: {
        first_name: request.customerInfo.name.trim(),
        last_name: request.customerInfo.surname.trim(),
        email: request.customerInfo.email.trim(),
        phone: request.customerInfo.phone.trim()
      }
    };

    try {
      await provider.createPayment(createPaymentRequest);
    } catch (error) {
      if (error instanceof Error && error.message.includes('Payment created successfully')) {
        return;
      }
      throw error;
    }
  }


  async initiatePayment(request: PaymentRequest): Promise<PaymentResult> {
    try {
      const provider = this.paymentProviders.get(request.metadata.category);
      if (!provider) {
        return {
          success: false,
          errorMessage: 'Geçersiz kategori'
        };
      }

      const response = await this.iyzicoService.createCheckoutForm(request, provider.getCallbackUrl());

      if (response.status !== 'success') {
        return {
          success: false,
          errorMessage: response.errorMessage || 'Ödeme başlatılamadı'
        };
      }

      await this.createBackendPayment(response, request, request.metadata.category);

      return {
        success: true,
        paymentPageUrl: response.paymentPageUrl,
        token: response.token,
        conversationId: response.conversationId
      };
    } catch (error) {
      return {
        success: false,
        errorMessage: `Ödeme başlatma sırasında bir hata oluştu: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`
      };
    }
  }

}


export const paymentService = new PaymentService();
export { PaymentService };
