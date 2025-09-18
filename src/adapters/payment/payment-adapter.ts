import { societyService } from '../../services/society/service';
import { workshopService } from '../../services/workshop/service';
import type { PaymentData, PaymentSessionRequest } from '@/types/domain';
import type { SessionDetail } from '@/types/domain';

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
      return this.mapSessionDetailToPaymentData(sessionDetail, category);
    } catch (error) {
      console.error(`Payment Session Detail API Error for ${category}:`, error);
      throw error;
    }
  }
  
  private mapSessionDetailToPaymentData(sessionDetail: SessionDetail, category: 'society' | 'workshop'): PaymentData {
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
      sessionTime: sessionDetail.startTime,
      location: sessionDetail.location,
      capacity: sessionDetail.capacity,
      category: category,
      imageUrl: sessionDetail.image
    };
  }
}

export const paymentAdapter = new PaymentAdapter();