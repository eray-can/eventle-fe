// Community service - Topluluk sayfası istekleri
import { httpApiClient } from '../clients/api-client';
import type { Community } from '@/types/domain';
import type { GetCommunityRequest, GetCommunityResponse } from '@/types/api';

export class CommunityService {
  // Topluluk detayı getir
  async getCommunity(request: GetCommunityRequest): Promise<GetCommunityResponse> {
    return httpApiClient.get<GetCommunityResponse>(`/communities/${request.id}`);
  }

  // Tüm toplulukları getir
  async getCommunities(): Promise<{ communities: Community[] }> {
    return httpApiClient.get<{ communities: Community[] }>('/communities');
  }

  // Topluluğa katıl
  async joinCommunity(communityId: string): Promise<void> {
    return httpApiClient.post<void>(`/communities/${communityId}/join`);
  }

  // Topluluktan ayrıl
  async leaveCommunity(communityId: string): Promise<void> {
    return httpApiClient.delete<void>(`/communities/${communityId}/leave`);
  }

  // Topluluğu takip et
  async followCommunity(communityId: string): Promise<void> {
    return httpApiClient.post<void>(`/communities/${communityId}/follow`);
  }

  // Topluluk takibini bırak
  async unfollowCommunity(communityId: string): Promise<void> {
    return httpApiClient.delete<void>(`/communities/${communityId}/follow`);
  }
}

// Export instance
export const communityService = new CommunityService();
