import { httpApiClient } from '../clients/api-client';
import type { WorkshopList, WorkshopDetailInfo } from '@/types/domain';
import type {
  GetAvailableSeansItemsRequest,
  GetAvailableSeansItemsResponse,
  GetWorkshopDetailRequest,
  GetWorkshopDetailResponse
} from '@/types/api';
import { mapWorkshopList, mapWorkshopDetail } from '@/mappers/society';

const AVAILABLE_SEANS_ITEMS_ENDPOINT = 'api/society/public/available-seans-items/';
const WORKSHOP_DETAIL_ENDPOINT = 'api/society/public-seans-to-one/';

export class SocietyService {

  async getAvailableSeansItems(request: GetAvailableSeansItemsRequest): Promise<WorkshopList> {
    const { page, page_size } = request;
    const url = `${AVAILABLE_SEANS_ITEMS_ENDPOINT}?page=${page}&page_size=${page_size}`;

    const response = await httpApiClient.get<GetAvailableSeansItemsResponse>(url);
    return mapWorkshopList(response, page);
  }

  async getWorkshopDetail(request: GetWorkshopDetailRequest): Promise<WorkshopDetailInfo> {
    const { id } = request;
    const url = `${WORKSHOP_DETAIL_ENDPOINT}${id}/`;

    const workshopData = await httpApiClient.get<GetWorkshopDetailResponse['response']>(url);
    return mapWorkshopDetail(workshopData);
  }
}

export const societyService = new SocietyService();
