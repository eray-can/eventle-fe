export interface Society {
  id: string;
  name: string;
  description: string;
  memberCount: number;
}

export interface Category {
  name: string;
  image: string;
  color: string;
}

export interface Workshop {
  id: number;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: string;
  location: string;
  capacity: number;
  attendedCount: number;
  price: number;
  discountedPrice?: number;
  discountPercentage?: number;
  image: string;
  category: Category;
  categoryName: string;
  isEligibleToBuy: boolean;
  goingPersonCount?: number;
  additionalLink?: string;
}

export interface WorkshopList {
  workshops: Workshop[];
  totalCount: number;
  hasNext: boolean;
  hasPrevious: boolean;
  currentPage: number;
}

export interface WorkshopSession {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  price: number;
  discountPercentage?: number;
  discountedPrice?: number;
  capacity: number;
  attendedCount: number;
  isRestricted: boolean;
  isAvailable: boolean;
  isValid: boolean;
}

export interface WorkshopSessionGroup {
  date: string;
  sessions: WorkshopSession[];
}

export interface WorkshopOwner {
  id: string;
  profileImage: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  username: string;
}

export interface WorkshopDetailInfo {
  id: number;
  categoryId: number;
  name: string;
  description: string;
  price?: number;
  discountPercentage?: number;
  discountedPrice?: number;
  location: string;
  image: string;
  capacity?: number;
  whatIsInPrice?: string;
  requirements?: string;
  duration: string;
  ownerId: number;
  locationLat: number;
  locationLng: number;
  isOneTimeTicket: boolean;
  isRepeated: boolean;
  startDate: string;
  endDate: string;
  whichDays: string;
  sessionGroups: WorkshopSessionGroup[];
  owner: WorkshopOwner;
}