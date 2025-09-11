import { httpApiClient } from '../clients/api-client';
import type { SocietyList, SocietyDetailInfo } from '@/types/domain';
import type {
  GetAvailableSeansItemsRequest,
  GetAvailableSeansItemsResponse,
  GetSocietyDetailRequest,
  GetSocietyDetailResponse
} from '@/types/api';
import { mapSocietyList, mapSocietyDetail } from '@/mappers/society';

const AVAILABLE_SEANS_ITEMS_ENDPOINT = 'api/society/public/available-seans-items/';
const SOCIETY_DETAIL_ENDPOINT = 'api/society/public-seans-to-one/';

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
}

export const societyService = new SocietyService();
