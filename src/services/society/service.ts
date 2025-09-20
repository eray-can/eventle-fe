import { httpApiClient } from '../clients/api-client';
import type { SocietyList, SocietyDetailInfo, SessionDetail } from '@/types/domain';
import type {
  GetSocietyDetailRequest,
  GetSocietyDetailResponse,
  GetSessionDetailRequest,
  GetSessionDetailResponse
} from '@/types/api/society';
import type {
  GetAvailableSeansItemsRequest,
  GetAvailableSeansItemsResponse
} from '@/types/api/workshop';
import { CreatePaymentRequest, CreatePaymentResponse } from '@/types/api/payment';
import type { PaymentProvider } from '@/types/domain/payment';
import { mapSocietyList, mapSocietyDetail, mapSessionDetail } from '@/mappers/society';

const AVAILABLE_SEANS_ITEMS_ENDPOINT = 'api/society/public-seans-to-one/';
const SOCIETY_DETAIL_ENDPOINT = 'api/society/public-seans-to-one/';
const SESSION_DETAIL_ENDPOINT = 'api/society/public/seans-items/';
const CREATE_PAYMENT_ENDPOINT = 'api/society/payment/create-public/';
const CALLBACK_ENDPOINT = 'api/society/payment/callback-public/';

export class SocietyService implements PaymentProvider {

  async getAvailableSeansItems(request: GetAvailableSeansItemsRequest): Promise<SocietyList> {
    const { page, page_size, max_price, start_date, end_date } = request;

    const queryParams = new URLSearchParams({
      page: page.toString(),
      page_limit: page_size.toString()
    });

    queryParams.append('min_price', "0");

    if (max_price !== undefined) {
      queryParams.append('max_price', max_price.toString());
    }
    if (start_date) {
      queryParams.append('start_date', start_date);
    }
    if (end_date) {
      queryParams.append('end_date', end_date);
    }

    const url = `${AVAILABLE_SEANS_ITEMS_ENDPOINT}?${queryParams.toString()}`;

    const response = await httpApiClient.get<GetAvailableSeansItemsResponse>(url);
    return mapSocietyList(response, page);
  }

  async getSocietyDetail(request: GetSocietyDetailRequest): Promise<SocietyDetailInfo> {
    const { id } = request;
    const url = `${SOCIETY_DETAIL_ENDPOINT}${id}/`;

    const societyData = await httpApiClient.get<GetSocietyDetailResponse['response']>(url);
    return mapSocietyDetail(societyData);
  }

  async getSessionDetail(request: GetSessionDetailRequest): Promise<SessionDetail> {
    const { id } = request;
    const url = `${SESSION_DETAIL_ENDPOINT}${id}/`;

    try {
      // httpApiClient.get() zaten response.response'u döndürür
      const sessionData = await httpApiClient.get<GetSessionDetailResponse['response']>(url);
      

      if (!sessionData) {
        throw new Error('Session data is null or undefined');
      }

      return mapSessionDetail(sessionData);
    } catch (error) {
      console.error('Session Detail API Error:', error);
      throw error;
    }
  }

  async createPayment(request: CreatePaymentRequest): Promise<CreatePaymentResponse> {
    try {
     return await httpApiClient.post<CreatePaymentResponse>(CREATE_PAYMENT_ENDPOINT, request);
    } catch (error) {
      console.error('Society Payment Creation Error:', error);
      throw error;
    }
  }

  getCallbackUrl(): string {
    return `${httpApiClient.getBaseURL()}${CALLBACK_ENDPOINT}`;
  }
}

export const societyService = new SocietyService();
