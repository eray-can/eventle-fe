import React from 'react';

interface EventScheduledProps {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string | {
    name: string;
    address: {
      streetAddress: string;
      addressLocality: string;
      addressRegion: string;
      postalCode: string;
      addressCountry: string;
    };
  };
  organizer: {
    name: string;
    url?: string;
  };
  image?: string;
  url: string;
  offers?: {
    price: number;
    priceCurrency: string;
    availability: 'InStock' | 'SoldOut' | 'PreOrder';
    url?: string;
  };
  eventStatus?: 'EventScheduled' | 'EventCancelled' | 'EventMovedOnline' | 'EventPostponed' | 'EventRescheduled';
  eventAttendanceMode?: 'OfflineEventAttendanceMode' | 'OnlineEventAttendanceMode' | 'MixedEventAttendanceMode';
}

export function EventScheduled({
  name,
  description,
  startDate,
  endDate,
  location,
  organizer,
  image,
  url,
  offers,
  eventStatus = 'EventScheduled',
  eventAttendanceMode = 'OfflineEventAttendanceMode'
}: EventScheduledProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name,
    description,
    startDate,
    ...(endDate && { endDate }),
    eventStatus: `https://schema.org/${eventStatus}`,
    eventAttendanceMode: `https://schema.org/${eventAttendanceMode}`,
    location: {
      '@type': 'Place',
      name: typeof location === 'string' ? location : location.name,
      ...(typeof location === 'object' && location.address && {
        address: {
          '@type': 'PostalAddress',
          streetAddress: location.address.streetAddress,
          addressLocality: location.address.addressLocality,
          addressRegion: location.address.addressRegion,
          postalCode: location.address.postalCode,
          addressCountry: location.address.addressCountry
        }
      })
    },
    organizer: {
      '@type': 'Organization',
      name: organizer.name,
      ...(organizer.url && { url: organizer.url })
    },
    ...(image && { image }),
    url,
    ...(offers && {
      offers: {
        '@type': 'Offer',
        price: offers.price,
        priceCurrency: offers.priceCurrency,
        availability: `https://schema.org/${offers.availability}`,
        url: offers.url
      }
    })
  };

  return (
    <script
      key="event-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
}

export default EventScheduled;