import type { Workshop, WorkshopList, WorkshopDetailInfo, WorkshopSession, WorkshopSessionGroup, WorkshopOwner } from '@/types/domain';
import type {
  GetAvailableSeansItemsResponse,
  GetWorkshopDetailResponse,
  SeansItem,
  SeansDateGroup,
  WorkshopOwner as ApiWorkshopOwner
} from '@/types/api';
import type { WorkshopItem } from '@/types/api';

export const mapWorkshopItem = (item: WorkshopItem): Workshop => ({
  id: item.id,
  name: item.workshop_name,
  date: item.workshop_date,
  startTime: item.start_time,
  endTime: item.end_time,
  duration: item.duration,
  location: item.location,
  capacity: item.capacity,
  attendedCount: item.attended,
  price: parseFloat(item.price),
  discountedPrice: item.discounted_price ? parseFloat(item.discounted_price) : undefined,
  discountPercentage: item.discount_percentage ? parseFloat(item.discount_percentage) : undefined,
  image: item.workshop_image,
  category: {
    name: item.category.name,
    image: item.category.image,
    color: item.category.color,
  },
  categoryName: item.category_name,
  isEligibleToBuy: item.is_eligible_to_buy,
  goingPersonCount: item.going_person_count || undefined,
  additionalLink: item.additional_link || undefined,
});

export const mapWorkshopList = (response: GetAvailableSeansItemsResponse, currentPage: number): WorkshopList => ({
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

export const mapWorkshopDetail = (workshop: GetWorkshopDetailResponse['response']): WorkshopDetailInfo => {
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
