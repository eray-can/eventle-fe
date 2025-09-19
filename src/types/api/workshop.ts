export interface WorkshopCategory {
  image: string;
  color: string;
  name: string;
}

export interface WorkshopItem {
  id: number;
  workshop_name: string;
  category: number;
  workshop_location: string;
  workshop_image: string;
  discounted_price: number | null;
  min_price: number;
  max_price: number;
  min_date: string;
  max_date: string;
  seans_item_count: number;
  price_range_text: string | null;
}

export interface WorkshopDetail {
  id: number;
  category: number;
  workshop_name: string;
  workshop_description: string;
  price: string | null;
  discount_percentage: string | null;
  discounted_price: string | null;
  workshop_location: string;
  workshop_image: string;
  capacity: number | null;
  what_is_in_price: string | null;
  requirements: string | null;
  duration: string;
  owner_of_workshop: number;
  location_lat: number;
  location_lng: number;
  is_one_time_ticket: boolean;
  is_repeated: boolean;
  start_date: string;
  end_date: string;
  which_days: string;
  seans_items: SeansDateGroup[];
  owner_user: WorkshopOwner;
}

export interface GetWorkshopDetailResponse {
  status: boolean;
  message: string;
  response: WorkshopDetail;
}

export interface GetAvailableSeansItemsRequest {
  page: number;
  page_size: number;
  min_price?: number;
  max_price?: number;
  start_date?: string;
  end_date?: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export type GetAvailableSeansItemsResponse = PaginatedResponse<WorkshopItem>;

// Import seans-related types from society.ts
import type { SeansDateGroup, WorkshopOwner } from './society';