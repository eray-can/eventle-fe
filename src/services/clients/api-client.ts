import { ApiClient } from '@/lib/http';

interface ApiResponse<T = unknown> {
  status: boolean;
  message: string;
  response: T;
}

const apiClient = new ApiClient({
  baseURL: 'https://eventle-test.onrender.com/',
  timeout: 10000,
});

export class HttpApiClient {
  getBaseURL(): string {
    return apiClient.getBaseURL();
  }

  private async handleResponse<T>(promise: Promise<ApiResponse<T>>): Promise<T> {
    const result = await promise;

    if (!result.status) {
      throw new Error(result.message || 'API request failed');
    }

    return result.response;
  }

  async get<T>(url: string): Promise<T> {
    return this.handleResponse(apiClient.get<ApiResponse<T>>(url));
  }

  async post<T>(url: string, data?: Record<string, unknown>): Promise<T> {
    return this.handleResponse(apiClient.post<ApiResponse<T>>(url, data));
  }

  async put<T>(url: string, data?: Record<string, unknown>): Promise<T> {
    return this.handleResponse(apiClient.put<ApiResponse<T>>(url, data));
  }

  async delete<T>(url: string): Promise<T> {
    return this.handleResponse(apiClient.delete<ApiResponse<T>>(url));
  }
}

export const httpApiClient = new HttpApiClient();
