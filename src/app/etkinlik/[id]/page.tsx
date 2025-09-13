import { MapPin } from 'lucide-react';
import Image from '@/components/ui/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { eventsService } from '@/services/events/service';
import TicketProviders from '@/components/common/ticket-providers';
import { capitalizeTitle, capitalizeAddress } from '@/lib/utils';

interface EventDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id: eventId } = await params;

  let eventDetail;
  try {
    eventDetail = await eventsService.getExcelData(parseInt(eventId));
  } catch (error) {
    console.error('Etkinlik detayları yüklenemedi:', error);
    return (
      <div className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Hata Oluştu
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Etkinlik detayları yüklenemedi
            </p>
          </div>
        </div>
      </div>
    );
  }

  const event = eventDetail.response;

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Mobile Header with Hero Image - Hidden on Desktop */}
      <div className="lg:hidden">
        {/* Hero Image */}
        <div className="relative h-80 md:h-96">
          <Image
            src={event.image}
            alt={event.name}
            width={800}
            height={400}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Category Badge - Sol Alt */}
          <div className="absolute bottom-4 left-4">
            <div className="px-3 py-1 bg-purple-600 rounded-full text-white text-sm font-medium">
              {event.category}
            </div>
          </div>
        </div>

        {/* Title - Resmin Altında */}
        <div className="px-4 py-4">
          <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">
            {capitalizeTitle(event.name)}
          </h1>
        </div>
      </div>

      {/* Mobile Content */}
      <div className="px-4 py-6 space-y-6 lg:hidden pb-32">
        {/* Event Description */}
        <div>
          <h3 className="text-white font-medium text-lg mb-3">Etkinlik Açıklaması</h3>
          <p className="text-gray-300 leading-relaxed">
            {event.description || "Etkinlik açıklaması bulunamadı"}
          </p>
        </div>

        {/* Event Details */}
        <div className="space-y-4">
          {/* Date and Time */}
          <div>
            <h4 className="text-gray-400 text-sm">Başlangıç Tarihi</h4>
            <div className="flex items-center gap-6">
              <p className="text-white">{new Date(event.startDate).toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</p>
              <p className="text-white">{new Date(event.startDate).toLocaleTimeString('tr-TR', {
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
            </div>
          </div>

          {/* End Date */}
          <div>
            <h4 className="text-gray-400 text-sm">Bitiş Tarihi</h4>
            <div className="flex items-center gap-6">
              <p className="text-white">{new Date(event.endDate).toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</p>
              <p className="text-white">{new Date(event.endDate).toLocaleTimeString('tr-TR', {
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
            </div>
          </div>

          {/* Location */}
          <div>
            <h4 className="text-gray-400 text-sm">Konum</h4>
            <p className="text-white">{capitalizeAddress(event.location)}</p>
            <p className="text-gray-400 text-sm mt-1">{capitalizeAddress(event.fullAddress)}</p>
            <button className="text-purple-400 text-sm mt-1 flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              Haritada Gör
            </button>
          </div>

          {/* City & District */}
          <div>
            <h4 className="text-gray-400 text-sm">Şehir / İlçe</h4>
            <p className="text-white">{event.city} / {event.district}</p>
          </div>
        </div>

        {/* Ticket Providers */}
        <TicketProviders
          mainUrl={event.url}
          urlBugece={event.urlBugece}
          urlIksv={event.urlIksv}
          urlBiletino={event.urlBiletino}
          urlBiletix={event.urlBiletix}
        />
      </div>



      {/* Desktop Layout - Hidden on Mobile */}
      <div className="hidden lg:block">
        <div className="container mx-auto px-4 py-8">
          {/* Desktop Main Content - Side by Side Layout */}
          <div className="grid grid-cols-2 gap-12 mb-8">
            {/* Left Side - Image */}
            <div className="space-y-6">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.name}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
                {/* Category Badge - Sol Alt */}
                <div className="absolute bottom-4 left-4">
                  <div className="px-4 py-2 bg-purple-600 rounded-full text-white text-sm font-medium">
                    {event.category}
                  </div>
                </div>
              </div>


            </div>

            {/* Right Side - Content */}
            <div className="space-y-6">
              {/* Title and Description */}
              <div>
                <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
                  {capitalizeTitle(event.name)}
                </h1>
                <div className="prose prose-lg prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {event.description || "Etkinlik açıklaması bulunamadı"}
                  </p>
                </div>
              </div>

              {/* Event Details */}
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-xl">Etkinlik Detayları</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-gray-400 text-sm mb-1">Başlangıç Tarihi</h4>
                      <div className="flex items-center gap-6">
                         <p className="text-white font-medium">{new Date(event.startDate).toLocaleDateString('tr-TR', {
                           year: 'numeric',
                           month: 'long',
                           day: 'numeric'
                         })}</p>
                         <span className="text-white font-medium">{new Date(event.startDate).toLocaleTimeString('tr-TR', {
                           hour: '2-digit',
                           minute: '2-digit'
                         })}</span>
                       </div>
                    </div>
                    <div>
                      <h4 className="text-gray-400 text-sm mb-1">Bitiş Tarihi</h4>
                      <div className="flex items-center gap-6">
                         <p className="text-white font-medium">{new Date(event.endDate).toLocaleDateString('tr-TR', {
                           year: 'numeric',
                           month: 'long',
                           day: 'numeric'
                         })}</p>
                         <span className="text-white font-medium">{new Date(event.endDate).toLocaleTimeString('tr-TR', {
                           hour: '2-digit',
                           minute: '2-digit'
                         })}</span>
                       </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <h4 className="text-gray-400 text-sm mb-1">Konum</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">{capitalizeAddress(event.location)}</p>
                        <p className="text-gray-400 text-sm">{capitalizeAddress(event.fullAddress)}</p>
                      </div>
                      <button className="text-purple-400 text-sm flex items-center gap-1 hover:text-purple-300 transition-colors">
                        <MapPin className="h-4 w-4" />
                        Haritada Gör
                      </button>
                    </div>
                  </div>

                  {/* City & District */}
                  <div>
                    <h4 className="text-gray-400 text-sm mb-1">Şehir / İlçe</h4>
                    <p className="text-white font-medium">{event.city} / {event.district}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Ticket Providers */}
              <TicketProviders
                mainUrl={event.url}
                urlBugece={event.urlBugece}
                urlIksv={event.urlIksv}
                urlBiletino={event.urlBiletino}
                urlBiletix={event.urlBiletix}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}