import Link from 'next/link';
import { MapPin, Calendar } from 'lucide-react';
import type { Organization } from '@/types/domain/organizations';
import { capitalizeTitle, capitalizeAddress } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from '@/components/ui/image';

interface EventCardProps {
  event: Organization;
  href: string;
  className?: string;
}

export function EventCard({ event, href, className = '' }: EventCardProps) {
  const formatDate = (dateString: Date | string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatDateRange = () => {
    const startDate = formatDate(event.startDate);
    const endDate = formatDate(event.endDate);
    
    if (startDate === endDate) {
      return startDate;
    }
    
    return `${startDate} - ${endDate}`;
  };

  return (
    <Link href={href} className={`block group ${className}`}>
      <Card className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 overflow-hidden">
        {/* Event Image */}
        <CardHeader className="p-0">
          <div className="relative h-64 overflow-hidden">
            <Image
              src={event.image || '/placeholder-event.jpg'}
              alt={event.name || 'Event'}
              width={400}
              height={256}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Category Badge */}
            {event.category && (
              <div className="absolute top-3 left-3">
                <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                  {event.category}
                </span>
              </div>
            )}
          </div>
        </CardHeader>

        {/* Event Content */}
        <CardContent className="p-4">
          {/* Event Title */}
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
            {capitalizeTitle(event.name)}
          </h3>

          {/* Event Details */}
          <div className="space-y-2">
            {/* Date */}
            <div className="flex items-center text-purple-400 text-sm">
              <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{formatDateRange()}</span>
            </div>

            {/* Location */}
            {event.locationName && (
              <div className="flex items-center text-gray-300 text-sm">
                <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="line-clamp-1">
                  {capitalizeAddress(event.locationName)}
                  {event.city && `, ${event.city}`}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}