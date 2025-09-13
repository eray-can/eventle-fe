import { OrganizationApiResponse, OrganizationsListApiResponse, CollectionEventApiResponse, CollectionApiResponse } from '@/types/api/organizations';
import { Organization, OrganizationsList, CollectionEvent, Collection, CollectionsWithBanner } from '@/types/domain/organizations';

export class OrganizationMapper {
  static toDomain(apiOrganization: OrganizationApiResponse): Organization {
    // Koordinatları parse et
    const [latitude, longitude] = apiOrganization.detailed_location
      .split(',')
      .map(coord => parseFloat(coord.trim()));

    // Ticket URL'lerini organize et
    const ticketUrls: Organization['ticketUrls'] = {};
    
    if (apiOrganization.url_biletino && apiOrganization.url_biletino !== 'nan') {
      ticketUrls.biletino = apiOrganization.url_biletino;
    }
    if (apiOrganization.url_biletix && apiOrganization.url_biletix !== 'nan') {
      ticketUrls.biletix = apiOrganization.url_biletix;
    }
    if (apiOrganization.url_bugece && apiOrganization.url_bugece !== 'nan') {
      ticketUrls.bugece = apiOrganization.url_bugece;
    }
    if (apiOrganization.url_iksv && apiOrganization.url_iksv !== 'nan') {
      ticketUrls.iksv = apiOrganization.url_iksv;
    }
    if (apiOrganization.event_url && apiOrganization.event_url !== 'nan') {
      ticketUrls.eventUrl = apiOrganization.event_url;
    }
    if (apiOrganization.url_passo && apiOrganization.url_passo !== 'nan') {
      ticketUrls.passo = apiOrganization.url_passo;
    }

    return {
      id: apiOrganization.id,
      startDate: new Date(apiOrganization.start_date),
      endDate: new Date(apiOrganization.end_date),
      name: apiOrganization.name,
      description: apiOrganization.description,
      locationName: apiOrganization.location_name,
      fullAddress: apiOrganization.full_address,
      coordinates: {
        latitude,
        longitude
      },
      category: apiOrganization.category,
      ticketUrls,
      image: apiOrganization.image && apiOrganization.image !== 'nan' ? apiOrganization.image : '',
      city: apiOrganization.city,
      district: apiOrganization.district
    };
  }

  static toListDomain(apiResponse: OrganizationsListApiResponse): OrganizationsList {
    return {
      count: apiResponse.count,
      next: apiResponse.next,
      previous: apiResponse.previous,
      organizations: apiResponse.results.map(org => this.toDomain(org))
    };
  }

  static toCollectionEventDomain(apiEvent: CollectionEventApiResponse): CollectionEvent {
    // Koordinatları parse et
    const [latitude, longitude] = apiEvent.detailed_location
      .split(',')
      .map(coord => parseFloat(coord.trim()));

    // Ticket URL'lerini organize et
    const ticketUrls: CollectionEvent['ticketUrls'] = {};
    
    if (apiEvent.url_biletino && apiEvent.url_biletino !== 'nan') {
      ticketUrls.biletino = apiEvent.url_biletino;
    }
    if (apiEvent.url_biletix && apiEvent.url_biletix !== 'nan') {
      ticketUrls.biletix = apiEvent.url_biletix;
    }
    if (apiEvent.url_bugece && apiEvent.url_bugece !== 'nan') {
      ticketUrls.bugece = apiEvent.url_bugece;
    }
    if (apiEvent.url_iksv && apiEvent.url_iksv !== 'nan') {
      ticketUrls.iksv = apiEvent.url_iksv;
    }
    if (apiEvent.event_url && apiEvent.event_url !== 'nan') {
      ticketUrls.eventUrl = apiEvent.event_url;
    }
    if (apiEvent.url_passo && apiEvent.url_passo !== 'nan') {
      ticketUrls.passo = apiEvent.url_passo;
    }

    return {
      id: apiEvent.id,
      startDate: new Date(apiEvent.start_date),
      endDate: new Date(apiEvent.end_date),
      name: apiEvent.name,
      description: apiEvent.description,
      locationName: apiEvent.location_name,
      fullAddress: apiEvent.full_address,
      coordinates: {
        latitude,
        longitude
      },
      category: apiEvent.category,
      ticketUrls,
      image: apiEvent.image && apiEvent.image !== 'nan' ? apiEvent.image : '',
      venueSeUrl: apiEvent.venue_seo_url !== 'nan' ? apiEvent.venue_seo_url : undefined,
      venueCode: apiEvent.venuecode !== 'nan' ? apiEvent.venuecode : undefined,
      city: apiEvent.city,
      district: apiEvent.district
    };
  }

  static toCollectionDomain(apiCollection: CollectionApiResponse): Collection {
    return {
      collectionName: apiCollection.CollectionName,
      events: apiCollection.datas.map(event => this.toCollectionEventDomain(event)),
      collectionType: apiCollection.CollectionType,
      collectionImage: apiCollection.CollectionImage
    };
  }

  static toCollectionsDomain(apiCollections: CollectionApiResponse[]): CollectionsWithBanner {
    return {
      collections: apiCollections.map(collection => this.toCollectionDomain(collection))
    };
  }
}