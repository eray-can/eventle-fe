export interface Organization {
  id: number;
  startDate: Date;
  endDate: Date;
  name: string;
  description: string;
  locationName: string;
  fullAddress: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  category: string;
  ticketUrls: {
    biletino?: string;
    biletix?: string;
    bugece?: string;
    iksv?: string;
    eventUrl?: string;
    passo?: string;
  };
  image: string;
  city: string;
  district: string;
}

export interface OrganizationsList {
  count: number;
  next: string | null;
  previous: string | null;
  organizations: Organization[];
}

export interface OrganizationFilters {
  city?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
  category?: string;
  limit?: number;
  page?: number;
}

export interface CollectionEvent {
  id: number;
  startDate: Date;
  endDate: Date;
  name: string;
  description: string;
  locationName: string;
  fullAddress: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  category: string;
  ticketUrls: {
    biletino?: string;
    biletix?: string;
    bugece?: string;
    iksv?: string;
    eventUrl?: string;
    passo?: string;
  };
  image: string;
  venueSeUrl?: string;
  venueCode?: string;
  city: string;
  district: string;
}

export interface Collection {
  collectionName: string;
  events: CollectionEvent[];
  collectionType: string;
  collectionImage: string | null;
}

export interface CollectionsWithBanner {
  collections: Collection[];
}