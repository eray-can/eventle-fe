export interface GetSocietyRequest {
  id: string;
}

export interface GetSocietyResponse {
  society: {
    id: string;
    name: string;
    description: string;
    memberCount: number;
  };
}

export interface GetAvailableSeansItemsRequest {
  page: number;
  page_size: number;
}

export interface WorkshopCategory {
  image: string;
  color: string;
  name: string;
}

export interface WorkshopItem {
  id: number;
  workshop_date: string;
  start_time: string;
  category: WorkshopCategory;
  end_time: string;
  workshop_name: string;
  category_name: string;
  attended: number;
  price: string;
  location: string;
  capacity: number;
  duration: string;
  workshop_image: string;
  discounted_price: string | null;
  discount_percentage: string | null;
  is_eligible_to_buy: boolean;
  going_person_count: number | null;
  additional_link: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export type GetAvailableSeansItemsResponse = PaginatedResponse<WorkshopItem>;