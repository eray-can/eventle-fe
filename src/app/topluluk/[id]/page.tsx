import { MapPin } from 'lucide-react';
import Image from '@/components/ui/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { societyService } from '@/services/society/service';
import { EventCalendar } from '@/components/common/event-calendar';
import { PurchaseSection } from '@/components/common/purchase-section';
import { EventCalendarProvider } from '@/contexts/event-calendar';
import { formatDuration, capitalizeTitle, BASE_DOMAIN } from '@/lib/utils';
import { EventScheduled } from '@/components/seo/event-scheduled';
import { FAQ } from '@/components/common/faq';
import { generateSocietyFAQ } from '@/lib/faq-generator';
import { FAQPage } from '@/components/seo/faq-page';

interface CommunityDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: CommunityDetailPageProps) {
  const { id: societyId } = await params;
  
  try {
    const societyDetail = await societyService.getSocietyDetail({
      id: parseInt(societyId)
    });
    
    const eventUrl = `${BASE_DOMAIN}/topluluk/${societyId}`;
    
    return {
      title: societyDetail.name,
      description: societyDetail.description || `${societyDetail.name} biletleri Eventle'de! Tıkla, ${societyDetail.name} etkinliğine bilet satın al.`,
      openGraph: {
        title: societyDetail.name,
        description: societyDetail.description || `${societyDetail.name} biletleri Eventle'de! Tıkla, ${societyDetail.name} etkinliğine bilet satın al.`,
        url: eventUrl,
        siteName: 'Eventle',
        images: [
          {
            url: societyDetail.image,
            width: 1200,
            height: 630,
            alt: societyDetail.name,
          },
        ],
        locale: 'tr_TR',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: societyDetail.name,
        description: societyDetail.description || `${societyDetail.name} biletleri Eventle'de! Tıkla, ${societyDetail.name} etkinliğine bilet satın al.`,
        images: [societyDetail.image],
      },
      alternates: {
        canonical: eventUrl,
      },
    };
  } catch {
    return {
      title: 'Topluluk Etkinliği - Eventle',
      description: 'Eventle\'de topluluk etkinlikleri! Tıkla, etkinliğe bilet satın al.',
      alternates: {
        canonical: `${BASE_DOMAIN}/topluluk/${societyId}`,
      },
    };
  }
}


//TODO mobile ve desktop tasarımları birbirinden ayrı gidecek gibi duruyor. iyi bir ayrıştırmaya gitmek lazım
// geçici olarak boyle :D

export default async function CommunityDetailPage({ params }: CommunityDetailPageProps) {
  const { id: societyId } = await params;

  let societyDetail;
  try {
    societyDetail = await societyService.getSocietyDetail({
      id: parseInt(societyId)
    });
  } catch (error) {
    console.error('Society detayları yüklenemedi:', error);
    return (
      <div className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Hata Oluştu
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Society detayları yüklenemedi
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <EventCalendarProvider eventDetail={societyDetail}>
      <div className="min-h-screen bg-gray-900">
      <EventScheduled
        name={societyDetail.name}
        description={societyDetail.description}
        startDate={societyDetail.sessionGroups[0]?.sessions[0]?.date}
        endDate={societyDetail.sessionGroups[0]?.sessions[0]?.date}
        location={societyDetail.location}
        eventStatus="EventScheduled"
        eventAttendanceMode="OfflineEventAttendanceMode"
        offers={{
          price: societyDetail.sessionGroups[0]?.sessions[0]?.price || 0,
          priceCurrency: "TRY",
          availability: "InStock"
        }}
        organizer={{
          name: societyDetail.owner.fullName,
          url: `${BASE_DOMAIN}/topluluk/${societyDetail.id}`
        }}
        url={`${BASE_DOMAIN}/topluluk/${societyDetail.id}`}
      />
      <FAQPage
        faqs={generateSocietyFAQ(societyDetail)}
        pageTitle={`${societyDetail.name} - Sık Sorulan Sorular`}
        pageDescription={`${societyDetail.name} topluluk etkinliği hakkında sık sorulan sorular ve cevapları.`}
      />
      {/* Mobile Header with Hero Image - Hidden on Desktop */}
      <div className="lg:hidden">
        {/* Hero Image */}
        <div className="relative h-80 md:h-96">
          <Image
            src={societyDetail.image}
            alt={societyDetail.name}
            width={800}
            height={600}
            className="object-cover w-full h-full absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Category Badge - Sol Alt */}
          <div className="absolute bottom-4 left-4">
            <div className="px-3 py-1 bg-purple-600 rounded-full text-white text-sm font-medium">
              Workshop & Eğitim
            </div>
          </div>
        </div>

        {/* Title - Resmin Altında */}
        <div className="px-4 py-4">
          <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">
            {capitalizeTitle(societyDetail.name)}
          </h1>
        </div>
      </div>

      {/* Mobile Content */}
      <div className="px-4 py-6 space-y-6 lg:hidden pb-32">
        {/* Event Owner */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-medium text-lg">Etkinlik Sahibi</h3>
            <div className="flex items-center gap-3 mt-2">
              <div className="relative h-12 w-12 rounded-full overflow-hidden">
                <Image
                  src={societyDetail.owner.profileImage}
                  alt={societyDetail.owner.fullName}
                  width={48}
                  height={48}
                  className="object-cover w-full h-full absolute inset-0"
                />
              </div>
              <div>
                <h4 className="text-white font-medium">{societyDetail.owner.fullName}</h4>
                <p className="text-gray-400 text-sm">{societyDetail.owner.username}</p>
              </div>
            </div>
          </div>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium">
            Mesaj
          </button>
        </div>

        {/* Event Description */}
        <div>
          <h3 className="text-white font-medium text-lg mb-3">Etkinlik Açıklaması</h3>
          <p className="text-gray-300 leading-relaxed">
            {societyDetail.description}
          </p>
        </div>

        {/* Event Details */}
        <div className="space-y-4">
          <h3 className="text-white font-medium text-lg">Etkinlik Detayları</h3>

          {/* Duration */}
          <div>
            <h4 className="text-gray-400 text-sm">Etkinlik Süresi</h4>
            <p className="text-white">{formatDuration(societyDetail.duration)}</p>
          </div>

          {/* Location */}
          <div>
            <h4 className="text-gray-400 text-sm">Konum</h4>
            <p className="text-white">{societyDetail.location}</p>
            <button className="text-purple-400 text-sm mt-1 flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              Haritada Gör
            </button>
          </div>


          {/* Requirements */}
          {societyDetail.requirements && (
            <div>
              <h4 className="text-gray-400 text-sm">Gereksinimler</h4>
              <p className="text-white">{societyDetail.requirements}</p>
            </div>
          )}

          {/* What's Included */}
          {societyDetail.whatIsInPrice && (
            <div>
              <h4 className="text-gray-400 text-sm">Ücrете Dahil</h4>
              <p className="text-white">{societyDetail.whatIsInPrice}</p>
            </div>
          )}
        </div>

        {/* Mobile Calendar Section */}
        <div>
          <h3 className="text-white font-medium text-lg mb-4">Tarih ve Saat Seçin</h3>
          <EventCalendar />
        </div>

        {/* FAQ Section - Mobile */}
        <FAQ
          faqs={generateSocietyFAQ(societyDetail)}
          title="Sık Sorulan Sorular"
          className=""
        />
      </div>

      {/* Fixed Bottom Purchase Section - Mobile Only */}
      <div className="lg:hidden">
        <PurchaseSection variant="mobile" />
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
                  src={societyDetail.image}
                  alt={societyDetail.name}
                  width={800}
                  height={600}
                  className="object-cover w-full h-full absolute inset-0"
                />
                {/* Category Badge - Sol Alt */}
                <div className="absolute bottom-4 left-4">
                  <div className="px-4 py-2 bg-purple-600 rounded-full text-white text-sm font-medium">
                    Workshop & Eğitim
                  </div>
                </div>
              </div>

              {/* Event Owner */}
              <Card className="bg-gray-900/50 border-gray-700">
                <CardContent className="p-6">
                  <h3 className="text-white font-medium text-lg mb-4">Etkinlik Sahibi</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 rounded-full overflow-hidden">
                        <Image
                          src={societyDetail.owner.profileImage}
                          alt={societyDetail.owner.fullName}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full absolute inset-0"
                        />
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-lg">{societyDetail.owner.fullName}</h4>
                        <p className="text-gray-400">{societyDetail.owner.username}</p>
                      </div>
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                      Mesaj
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Side - Content */}
            <div className="space-y-6">
              {/* Title and Description */}
              <div>
                <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
                  {capitalizeTitle(societyDetail.name)}
                </h1>
                <div className="prose prose-lg prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {societyDetail.description}
                  </p>
                </div>
              </div>

              {/* Event Details */}
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-xl">Etkinlik Detayları</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Duration */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <h4 className="text-gray-400 text-sm mb-1">Etkinlik Süresi</h4>
                      <p className="text-white font-medium">{formatDuration(societyDetail.duration)}</p>
                    </div>

                    {/* Location */}
                    <div className="col-span-2">
                      <h4 className="text-gray-400 text-sm mb-1">Konum</h4>
                      <div className="flex items-center justify-between">
                        <p className="text-white font-medium">{societyDetail.location}</p>
                        <button className="text-purple-400 text-sm flex items-center gap-1 hover:text-purple-300 transition-colors">
                          <MapPin className="h-4 w-4" />
                          Haritada Gör
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Requirements */}
                  {societyDetail.requirements && (
                    <div>
                      <h4 className="text-gray-400 text-sm mb-2">Gereksinimler</h4>
                      <p className="text-white">{societyDetail.requirements}</p>
                    </div>
                  )}

                  {/* What's Included */}
                  {societyDetail.whatIsInPrice && (
                    <div>
                      <h4 className="text-gray-400 text-sm mb-2">Ücrете Dahil</h4>
                      <p className="text-white">{societyDetail.whatIsInPrice}</p>
                    </div>
                  )}
                </CardContent>
              </Card>


              {/* Desktop Calendar Section */}
              <EventCalendar />

              {/* Desktop Purchase Section */}
              <PurchaseSection variant="desktop" />
            </div>
          </div>

          {/* FAQ Section - Desktop Full Width */}
          <div className="mt-12">
            <FAQ
              faqs={generateSocietyFAQ(societyDetail)}
              title="Sık Sorulan Sorular"
              className="md:bg-gray-900/50 md:border-gray-700"
            />
          </div>
        </div>
      </div>
    </div>
    </EventCalendarProvider>
  );
}
