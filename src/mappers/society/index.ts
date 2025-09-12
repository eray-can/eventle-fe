import type { Workshop, SocietyList, SocietyDetailInfo, WorkshopSession, WorkshopSessionGroup, WorkshopOwner, SessionDetail, Category } from '@/types/domain';
import type {
  GetAvailableSeansItemsResponse,
  GetSocietyDetailResponse,
  SeansItem,
  SeansDateGroup,
  WorkshopOwner as ApiWorkshopOwner,
  SessionDetailData
} from '@/types/api';
import type { WorkshopItem } from '@/types/api';

export const mapWorkshopItem = (item: WorkshopItem): Workshop => ({
  id: item.id,
  name: item.workshop_name,
  date: item.min_date,
  location: item.workshop_location,
  price: item.min_price,
  discountedPrice: item.discounted_price || undefined,
  image: item.workshop_image,
  category: {
    color: '#6B7280',
  } as Category,
  isEligibleToBuy: true,
  maxPrice: item.max_price,
  minDate: item.min_date,
  maxDate: item.max_date,
  seansItemCount: item.seans_item_count,
  priceRangeText: item.price_range_text || undefined,
});

export const mapSocietyList = (response: GetAvailableSeansItemsResponse, currentPage: number): SocietyList => ({
  workshops: response.results.map(mapWorkshopItem),
  totalCount: response.count,
  hasNext: response.next !== null,
  hasPrevious: response.previous !== null,
  currentPage,
});

const mapWorkshopSession = (item: SeansItem): WorkshopSession => ({
  id: item.id,
  date: item.workshop_date,
  startTime: item.start_time,
  endTime: item.end_time,
  price: parseFloat(item.price),
  discountPercentage: item.discount_percentage ? parseFloat(item.discount_percentage) : undefined,
  discountedPrice: item.discounted_price ? parseFloat(item.discounted_price) : undefined,
  capacity: item.capacity,
  attendedCount: item.attended_count,
  isRestricted: item.is_restricted,
  isAvailable: item.is_available,
  isValid: item.is_valid,
});

const mapWorkshopSessionGroup = (group: SeansDateGroup): WorkshopSessionGroup => ({
  date: group.tarih,
  sessions: group.seans_item_list.map(mapWorkshopSession),
});

const mapWorkshopOwner = (owner: ApiWorkshopOwner): WorkshopOwner => ({
  id: owner.id,
  profileImage: owner.profile_image,
  fullName: owner.full_name,
  phoneNumber: owner.phone_number,
  email: owner.email,
  username: owner.username,
});

export const mapSocietyDetail = (workshop: GetSocietyDetailResponse['response']): SocietyDetailInfo => {
  console.log('Workshop Data:', JSON.stringify(workshop, null, 2));
  
  if (!workshop.id) {
    console.error('Workshop ID bulunamadı:', workshop);
    throw new Error('Workshop ID bulunamadı');
  }
  
  return {
    id: workshop.id,
    categoryId: workshop.category,
    name: workshop.workshop_name,
    description: workshop.workshop_description,
    price: workshop.price ? parseFloat(workshop.price) : undefined,
    discountPercentage: workshop.discount_percentage ? parseFloat(workshop.discount_percentage) : undefined,
    discountedPrice: workshop.discounted_price ? parseFloat(workshop.discounted_price) : undefined,
    location: workshop.workshop_location,
    image: workshop.workshop_image,
    capacity: workshop.capacity || undefined,
    whatIsInPrice: workshop.what_is_in_price || undefined,
    requirements: workshop.requirements || undefined,
    duration: workshop.duration,
    ownerId: workshop.owner_of_workshop,
    locationLat: workshop.location_lat,
    locationLng: workshop.location_lng,
    isOneTimeTicket: workshop.is_one_time_ticket,
    isRepeated: workshop.is_repeated,
    startDate: workshop.start_date,
    endDate: workshop.end_date,
    whichDays: workshop.which_days,
    sessionGroups: workshop.seans_items ? workshop.seans_items.map(mapWorkshopSessionGroup) : [],
    owner: workshop.owner_user ? mapWorkshopOwner(workshop.owner_user) : {
      id: '',
      profileImage: '',
      fullName: 'Bilinmeyen',
      phoneNumber: '',
      email: '',
      username: 'unknown'
    },
  };
};

export const mapSessionDetail = (session: SessionDetailData): SessionDetail => {
  console.log('Mapping session detail:', JSON.stringify(session, null, 2));
  
  if (!session) {
    throw new Error('Session data is undefined');
  }
  
  if (!session.id) {
    console.error('Session ID bulunamadı:', session);
    throw new Error('Session ID bulunamadı');
  }

  return {
    id: session.id,
    date: session.workshop_date || '',
    startTime: session.start_time || '',
    endTime: session.end_time || '',
    name: session.workshop_name || '',
    categoryName: session.category_name || '',
    relatedCategory: session.related_category || '',
    attendedCount: session.attended || 0,
    price: session.price ? parseFloat(session.price) : 0,
    location: session.location || '',
    locationLat: session.location_lat || 0,
    locationLng: session.location_lng || 0,
    capacity: session.capacity || 0,
    duration: session.duration || '',
    image: session.workshop_image || '',
    discountedPrice: session.discounted_price ? parseFloat(session.discounted_price) : undefined,
    discountPercentage: session.discount_percentage ? parseFloat(session.discount_percentage) : undefined,
    whatIsInPrice: session.what_is_in_price || undefined,
    requirements: session.requirements || undefined,
    description: session.workshop_description || '',
    owner: session.user ? mapWorkshopOwner(session.user) : {
      id: '',
      profileImage: '',
      fullName: 'Bilinmeyen',
      phoneNumber: '',
      email: '',
      username: 'unknown'
    },
    isOneTimeTicket: session.is_one_time_ticket || false,
    isEligibleToBuy: session.is_eligible_to_buy || false,
    additionalLink: session.additional_link || undefined,
  };
};
