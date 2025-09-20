export interface ApiConfig {
  baseURL: string;
  timeout: number;
}

export interface ApiRequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  data?: Record<string, unknown>;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
}

class ApiClient {
  private readonly baseURL: string;
  private readonly timeout: number;

  constructor(config: ApiConfig) {
    this.baseURL = config.baseURL;
    this.timeout = config.timeout;
  }

  async request<T>(options: ApiRequestOptions): Promise<T> {
    const { method, url, data, headers: customHeaders } = options;

    // Simple fetch wrapper - domain independent
    const fullUrl = `${this.baseURL}${url}`;


    const headers = {
      'Content-Type': 'application/json',
      ...customHeaders
    };

    try {
      const response = await fetch(fullUrl, {
        method,
        headers,
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

  getBaseURL(): string {
    return this.baseURL;
  }
}

export { ApiClient };
