export interface Event {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  fullAddress: string;
  detailedLocation: string;
  category: string;
  url: string;
  image: string;
  city: string;
  district: string;
  urlBugece: string | null;
  urlIksv: string | null;
  urlBiletino: string | null;
  urlBiletix: string | null;
  isSavedByUser: boolean;
}

export interface EventsResponse {
  status: boolean;
  message: string;
  response: Event;
}