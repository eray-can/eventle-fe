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

export interface GetSocietyDetailRequest {
  id: number;
}

export interface SeansItem {
  id: number;
  workshop_date: string;
  start_time: string;
  end_time: string;
  price: string;
  discount_percentage: string | null;
  discounted_price: string | null;
  capacity: number;
  attended_count: number;
  is_restricted: boolean;
  is_available: boolean;
  is_valid: boolean;
}

export interface SeansDateGroup {
  tarih: string;
  seans_item_list: SeansItem[];
}

export interface WorkshopOwner {
  id: string;
  profile_image: string;
  full_name: string;
  phone_number: string;
  email: string;
  username: string;
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

export interface GetSocietyDetailResponse {
  status: boolean;
  message: string;
  response: WorkshopDetail;
}

export interface GetSessionDetailRequest {
  id: number;
}

export interface SessionDetailData {
  id: number;
  workshop_date: string;
  start_time: string;
  end_time: string;
  workshop_name: string;
  category_name: string;
  related_category: string;
  attended: number;
  price: string;
  location: string;
  location_lat: number;
  location_lng: number;
  capacity: number;
  duration: string;
  workshop_image: string;
  discounted_price: string | null;
  discount_percentage: string | null;
  what_is_in_price: string | null;
  requirements: string | null;
  workshop_description: string;
  user: WorkshopOwner;
  is_one_time_ticket: boolean;
  is_eligible_to_buy: boolean;
  additional_link: string;
}

export interface GetSessionDetailResponse {
  status: boolean;
  message: string;
  response: SessionDetailData;
}