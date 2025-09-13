export interface OrganizationApiResponse {
  id: number;
  start_date: string;
  end_date: string;
  name: string;
  description: string;
  location_name: string;
  full_address: string;
  detailed_location: string;
  category: string;
  url_biletino: string;
  url_biletix: string;
  url_bugece: string;
  url_iksv: string;
  event_url: string;
  url_passo: string;
  image: string;
  city: string;
  district: string;
}

export interface OrganizationsListApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: OrganizationApiResponse[];
}

export interface OrganizationQueryParams {
  city?: string;
  search?: string;
  start_date?: string;
  end_date?: string;
  category?: string;
  limit?: number;
  page?: number;
}

export interface CollectionEventApiResponse {
  id: number;
  start_date: string;
  end_date: string;
  name: string;
  description: string;
  location_name: string;
  full_address: string;
  detailed_location: string;
  category: string;
  url_biletino: string;
  url_biletix: string;
  url_bugece: string;
  url_iksv: string;
  event_url: string;
  url_passo: string;
  image: string;
  venue_seo_url: string;
  venuecode: string;
  city: string;
  district: string;
}

export interface CollectionApiResponse {
  CollectionName: string;
  datas: CollectionEventApiResponse[];
  CollectionType: string;
  CollectionImage: string | null;
}

export interface CollectionsWithBannerApiResponse {
  status: boolean;
  message: string;
  response: CollectionApiResponse[];
}