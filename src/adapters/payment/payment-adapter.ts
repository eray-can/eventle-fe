import { societyService } from '../../services/society/service';
import { workshopService } from '../../services/workshop/service';
import type { PaymentData, PaymentSessionRequest } from '@/types/domain';
import type { SessionDetail } from '@/types/domain';
import { mapSessionDetailToPaymentData } from '@/mappers/payment';

export class PaymentAdapter {
  async getPaymentSessionDetail(request: PaymentSessionRequest): Promise<PaymentData> {
    const { id, category } = request;
    
    try {
      let sessionDetail: SessionDetail;
      
      if (category === 'society') {
        sessionDetail = await societyService.getSessionDetail({ id: parseInt(id) });
      } else if (category === 'workshop') {
        sessionDetail = await workshopService.getSessionDetail({ id: parseInt(id) });
      } else {
        throw new Error(`Unsupported payment category: ${category}`);
      }
      
      // SessionDetail'i PaymentData'ya dönüştür
      return mapSessionDetailToPaymentData(sessionDetail, category);
    } catch (error) {
      console.error(`Payment Session Detail API Error for ${category}:`, error);
      throw error;
    }
  }

}

export const paymentAdapter = new PaymentAdapter();