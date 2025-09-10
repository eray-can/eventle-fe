// Community API types
export interface GetCommunityRequest {
  id: string;
}

export interface GetCommunityResponse {
  community: {
    id: string;
    name: string;
    description: string;
    memberCount: number;
  };
}