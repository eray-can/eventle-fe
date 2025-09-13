import { httpApiClient } from '@/services/clients/api-client';
import { OrganizationsListApiResponse, CollectionApiResponse } from '@/types/api/organizations';
import { OrganizationsList, OrganizationFilters, CollectionsWithBanner } from '@/types/domain/organizations';
import { OrganizationMapper } from '@/mappers/organizations';

class OrganizationService {
  private readonly ORGANIZATIONS_ENDPOINT = 'api/organizations/public/two/alls/';
  private readonly COLLECTIONS_ENDPOINT = 'api/organizations/collections-with-banner-public/';

  private normalizeCityParam(city: string): string {
    const cities = city.split(',').map(c => c.trim());
    const normalizedCities = cities.map(cityName => {
      switch (cityName) {
        case 'İstanbul Tümü':
          return 'Avrupa,Anadolu';
        case 'İstanbul Avrupa':
          return 'Avrupa';
        case 'İstanbul Anadolu':
          return 'Anadolu';
        default:
          return cityName;
      }
    });
    return normalizedCities.join(',');
  }

  private normalizeCategoryParam(category: string): string {
    const categories = category.split(',').map(c => c.trim());
    const normalizedCategories = categories.map(cat => {
      switch (cat.toLowerCase()) {
        case 'muzik':
          return 'Müzik';
        default:
          return cat;
      }
    });
    return normalizedCategories.join(',');
  }

  async getOrganizations(filters: OrganizationFilters = {}): Promise<OrganizationsList> {
    try {
      const queryParams = new URLSearchParams();

      // City parametresi normalizasyonu
      if (filters.city) {
        const normalizedCity = this.normalizeCityParam(filters.city);
        queryParams.append('city', normalizedCity);
      }

      // Search parametresi
      if (filters.search) {
        queryParams.append('search', filters.search);
      }

      // Tarih parametreleri
      if (filters.startDate) {
        queryParams.append('start_date', filters.startDate);
      }

      if (filters.endDate) {
        queryParams.append('end_date', filters.endDate);
      }

      // Category parametresi normalizasyonu
      if (filters.category) {
        const normalizedCategory = this.normalizeCategoryParam(filters.category);
        queryParams.append('category', normalizedCategory);
      }

      // Pagination parametreleri
      if (filters.limit) {
        queryParams.append('limit', filters.limit.toString());
      }

      if (filters.page) {
        queryParams.append('page', filters.page.toString());
      }

      const url = `${this.ORGANIZATIONS_ENDPOINT}?${queryParams.toString()}`;
      const apiResponse = await httpApiClient.get<OrganizationsListApiResponse>(url);
      return OrganizationMapper.toListDomain(apiResponse);
    } catch (error) {
      console.error('Error fetching organizations:', error);
      throw error;
    }
  }

  async getCollectionsWithBanner(): Promise<CollectionsWithBanner> {
    try {
      const apiResponse = await httpApiClient.get<CollectionApiResponse[]>(this.COLLECTIONS_ENDPOINT);
      return OrganizationMapper.toCollectionsDomain(apiResponse);
    } catch (error) {
      console.error('Error fetching collections with banner:', error);
      throw error;
    }
  }
}

export const organizationService = new OrganizationService();
export type { OrganizationFilters, OrganizationsList, CollectionsWithBanner };