export interface ApiEvent {
  id: number;
  'Etkinlik Adı': string;
  'Etkinlik Açıklaması': string;
  'Başlangıç Tarihi': string;
  'Bitiş tarihi': string;
  'Etkinlik Konumu': string;
  'Etkinlik Konumu tam adres': string;
  'Etkinlik detaylı konumu': string;
  'Kategorisi': string;
  'Url': string;
  'image': string;
  'İl': string;
  'İlçe': string;
  'URL_Bugece': string | null;
  'URL_Iksv': string | null;
  'URL_Biletino': string | null;
  'URL_Biletix': string | null;
  'is_saved_by_user': boolean;
}

export interface ApiEventsResponse {
  status: boolean;
  message: string;
  response: ApiEvent;
}