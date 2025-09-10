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