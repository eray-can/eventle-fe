// Society service - Topluluk sayfası istekleri
import { httpApiClient } from '../clients/api-client';
import type { Workshop, WorkshopList } from '@/types/domain';
import type {
  GetAvailableSeansItemsRequest,
  GetAvailableSeansItemsResponse
} from '@/types/api';
import type { WorkshopItem } from '@/types/api';

const mapWorkshopItem = (item: WorkshopItem): Workshop => ({
  id: item.id,
  name: item.workshop_name,
  date: item.workshop_date,
  startTime: item.start_time,
  endTime: item.end_time,
  duration: item.duration,
  location: item.location,
  capacity: item.capacity,
  attendedCount: item.attended,
  price: parseFloat(item.price),
  discountedPrice: item.discounted_price ? parseFloat(item.discounted_price) : undefined,
  discountPercentage: item.discount_percentage ? parseFloat(item.discount_percentage) : undefined,
  image: item.workshop_image,
  category: {
    name: item.category.name,
    image: item.category.image,
    color: item.category.color,
  },
  categoryName: item.category_name,
  isEligibleToBuy: item.is_eligible_to_buy,
  goingPersonCount: item.going_person_count || undefined,
  additionalLink: item.additional_link || undefined,
});

const mapWorkshopList = (response: GetAvailableSeansItemsResponse, currentPage: number): WorkshopList => ({
  workshops: response.results.map(mapWorkshopItem),
  totalCount: response.count,
  hasNext: response.next !== null,
  hasPrevious: response.previous !== null,
  currentPage,
});

export class SocietyService {

  async getAvailableSeansItems(request: GetAvailableSeansItemsRequest = {}): Promise<WorkshopList> {
    const { page = 1, page_size = 100 } = request;
    const url = `api/society/public/available-seans-items/?page=${page}&page_size=${page_size}`;

    const response = await httpApiClient.get<GetAvailableSeansItemsResponse>(url);
    return mapWorkshopList(response, page);
  }
}

// Export instance
export const societyService = new SocietyService();
