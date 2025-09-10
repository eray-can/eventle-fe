// API client - Domain independent axios wrapper

export interface ApiConfig {
  baseURL: string;
  timeout: number;
}

export interface ApiRequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  data?: Record<string, unknown>;
  params?: Record<string, unknown>;
}

class ApiClient {
  private readonly baseURL: string;
  private readonly timeout: number;

  constructor(config: ApiConfig) {
    this.baseURL = config.baseURL;
    this.timeout = config.timeout;
  }

  async request<T>(options: ApiRequestOptions): Promise<T> {
    const { method, url, data } = options;

    // Simple fetch wrapper - domain independent
    const fullUrl = `${this.baseURL}${url}`;

    try {
      const response = await fetch(fullUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : undefined,
        signal: AbortSignal.timeout(this.timeout),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Convenience methods
  get<T>(url: string): Promise<T> {
    return this.request<T>({ method: 'GET', url });
  }

  post<T>(url: string, data?: Record<string, unknown>): Promise<T> {
    return this.request<T>({ method: 'POST', url, data });
  }

  put<T>(url: string, data?: Record<string, unknown>): Promise<T> {
    return this.request<T>({ method: 'PUT', url, data });
  }

  delete<T>(url: string): Promise<T> {
    return this.request<T>({ method: 'DELETE', url });
  }
}

// Default API client instance
export const apiClient = new ApiClient({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api',
  timeout: 10000,
});

export { ApiClient };
