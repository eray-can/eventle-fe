import { httpApiClient } from '../clients/api-client';
import type { SocietyList, SocietyDetailInfo, SessionDetail } from '@/types/domain';
import type {
  GetAvailableSeansItemsRequest,
  GetAvailableSeansItemsResponse,
  GetSocietyDetailRequest,
  GetSocietyDetailResponse,
  GetSessionDetailRequest,
  GetSessionDetailResponse
} from '@/types/api';
import { mapSocietyList, mapSocietyDetail, mapSessionDetail } from '@/mappers/society';

const AVAILABLE_SEANS_ITEMS_ENDPOINT = 'api/society/public/available-seans-items/';
const SOCIETY_DETAIL_ENDPOINT = 'api/society/public-seans-to-one/';
const SESSION_DETAIL_ENDPOINT = 'api/society/public/seans-items/';

export class SocietyService {

  async getAvailableSeansItems(request: GetAvailableSeansItemsRequest): Promise<SocietyList> {
    const { page, page_size } = request;
    const url = `${AVAILABLE_SEANS_ITEMS_ENDPOINT}?page=${page}&page_size=${page_size}`;

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
      console.log('Session Detail API Data:', JSON.stringify(sessionData, null, 2));
      console.log('Session Data type:', typeof sessionData);
      
      if (!sessionData) {
        throw new Error('Session data is null or undefined');
      }
      
      return mapSessionDetail(sessionData);
    } catch (error) {
      console.error('Session Detail API Error:', error);
      throw error;
    }
  }
}

export const societyService = new SocietyService();
