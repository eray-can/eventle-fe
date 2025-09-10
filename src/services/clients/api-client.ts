// HTTP API client - Pure HTTP wrapper, no business logic
import { apiClient } from '@/lib/api';

export class HttpApiClient {
  // Generic HTTP methods - domain independent
  async get<T>(url: string): Promise<T> {
    return apiClient.get<T>(url);
  }

  async post<T>(url: string, data?: Record<string, unknown>): Promise<T> {
    return apiClient.post<T>(url, data);
  }

  async put<T>(url: string, data?: Record<string, unknown>): Promise<T> {
    return apiClient.put<T>(url, data);
  }

  async delete<T>(url: string): Promise<T> {
    return apiClient.delete<T>(url);
  }
}

// Export instance
export const httpApiClient = new HttpApiClient();
