import { httpApiClient } from '../clients/api-client';
import { ApiEvent } from '../../types/api/events';
import { EventsResponse } from '../../types/domain/events';
import { mapApiEventsResponseToEventsResponse } from '../../mappers/events';

const EVENTS_EXCEL_ENDPOINT = 'api/events/excel-data-id';

export class EventsService {
  async getExcelData(id: number): Promise<EventsResponse> {
    const url = `${EVENTS_EXCEL_ENDPOINT}/${id}/`;
    
    try {
      const response = await httpApiClient.get<ApiEvent>(url);
      return mapApiEventsResponseToEventsResponse(response);
    } catch (error) {
      console.error('Excel data alınamadı:', error);
      throw error;
    }
  }
}

export const eventsService = new EventsService();