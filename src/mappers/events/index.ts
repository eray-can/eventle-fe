import { ApiEvent } from '../../types/api/events';
import { Event, EventsResponse } from '../../types/domain/events';

export const mapApiEventToEvent = (apiEvent: ApiEvent): Event => {
  return {
    id: apiEvent.id,
    name: apiEvent['Etkinlik Adı'],
    description: apiEvent['Etkinlik Açıklaması'],
    startDate: apiEvent['Başlangıç Tarihi'],
    endDate: apiEvent['Bitiş tarihi'],
    location: apiEvent['Etkinlik Konumu'],
    fullAddress: apiEvent['Etkinlik Konumu tam adres'],
    detailedLocation: apiEvent['Etkinlik detaylı konumu'],
    category: apiEvent['Kategorisi'],
    url: apiEvent['Url']?.trim(),
    image: apiEvent['image']?.trim(),
    city: apiEvent['İl'],
    district: apiEvent['İlçe'],
    urlBugece: apiEvent['URL_Bugece'],
    urlIksv: apiEvent['URL_Iksv'],
    urlBiletino: apiEvent['URL_Biletino'],
    urlBiletix: apiEvent['URL_Biletix'],
    isSavedByUser: apiEvent['is_saved_by_user']
  };
};

export const mapApiEventsResponseToEventsResponse = (apiEvent: ApiEvent): EventsResponse => {
  return {
    status: true,
    message: 'Başarılı işlem',
    response: mapApiEventToEvent(apiEvent)
  };
};