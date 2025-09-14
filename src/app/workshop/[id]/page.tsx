import { MapPin } from 'lucide-react';
import Image from '@/components/ui/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { workshopService } from '@/services/workshop/service';
import { EventCalendar } from '@/components/common/event-calendar';
import { capitalizeTitle } from '@/lib/utils';
import { FAQ } from '@/components/common/faq';
import { generateWorkshopFAQ } from '@/lib/faq-generator';
import { FAQPage } from '@/components/seo/faq-page';

interface WorkshopDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}


//TODO mobile ve desktop tasarımları birbirinden ayrı gidecek gibi duruyor. iyi bir ayrıştırmaya gitmek lazım
// geçici olarak boyle :D

export default async function WorkshopDetailPage({ params }: WorkshopDetailPageProps) {
  const { id: workshopId } = await params;

  let workshopDetail;
  try {
    workshopDetail = await workshopService.getWorkshopDetail({
      id: parseInt(workshopId)
    });
  } catch (error) {
    console.error('Workshop detayları yüklenemedi:', error);
    return (
      <div className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Hata Oluştu
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Workshop detayları yüklenemedi
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <FAQPage
        faqs={generateWorkshopFAQ(workshopDetail)}
        pageTitle={`${workshopDetail.name} - Sık Sorulan Sorular`}
        pageDescription={`${workshopDetail.name} workshop etkinliği hakkında sık sorulan sorular ve cevapları.`}
      />
      {/* Mobile Header with Hero Image - Hidden on Desktop */}
      <div className="lg:hidden">
        {/* Hero Image */}
        <div className="relative h-80 md:h-96">
          <Image
            src={workshopDetail.image}
            alt={capitalizeTitle(workshopDetail.name)}
            width={800}
            height={600}
            className="w-full h-full object-cover"
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
            {capitalizeTitle(workshopDetail.name)}
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
                  src={workshopDetail.owner.profileImage}
                  alt={workshopDetail.owner.fullName}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-white font-medium">{workshopDetail.owner.fullName}</h4>
                <p className="text-gray-400 text-sm">{workshopDetail.owner.username}</p>
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
            {workshopDetail.description}
          </p>
        </div>

        {/* Event Details */}
        <div className="space-y-4">
          <h3 className="text-white font-medium text-lg">Etkinlik Detayları</h3>

          {/* Duration */}
          <div>
            <h4 className="text-gray-400 text-sm">Etkinlik Süresi</h4>
            <p className="text-white">{workshopDetail.duration}</p>
          </div>

          {/* Location */}
          <div>
            <h4 className="text-gray-400 text-sm">Konum</h4>
            <p className="text-white">{workshopDetail.location}</p>
            <button className="text-purple-400 text-sm mt-1 flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              Haritada Gör
            </button>
          </div>


          {/* Requirements */}
          {workshopDetail.requirements && (
            <div>
              <h4 className="text-gray-400 text-sm">Gereksinimler</h4>
              <p className="text-white">{workshopDetail.requirements}</p>
            </div>
          )}

          {/* What's Included */}
          {workshopDetail.whatIsInPrice && (
            <div>
              <h4 className="text-gray-400 text-sm">Ücrете Dahil</h4>
              <p className="text-white">{workshopDetail.whatIsInPrice}</p>
            </div>
          )}
        </div>

        {/* Mobile Calendar Section */}
        <div>
          <h3 className="text-white font-medium text-lg mb-4">Tarih ve Saat Seçin</h3>
          <EventCalendar eventDetail={workshopDetail} useWorkshopService={true} />
        </div>

        {/* FAQ Section - Mobile */}
        <FAQ
          faqs={generateWorkshopFAQ(workshopDetail)}
          title="Sık Sorulan Sorular"
          className=""
        />
      </div>

      {/* Fixed Bottom Purchase Section - Mobile Only */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-4 z-50">
        <div className="flex items-center justify-between mb-3">
          <div>
            {workshopDetail.sessionGroups[0]?.sessions[0]?.discountedPrice ? (
              <div>
                <div className="text-2xl font-bold text-white">
                  {workshopDetail.sessionGroups[0].sessions[0].discountedPrice.toLocaleString()} ₺
                </div>
                <div className="line-through text-gray-500 text-sm">
                  {workshopDetail.sessionGroups[0].sessions[0].price.toLocaleString()} ₺
                </div>
              </div>
            ) : (
              <div className="text-2xl font-bold text-white">
                {workshopDetail.sessionGroups[0]?.sessions[0]?.price.toLocaleString()} ₺
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-gray-600 rounded-lg">
              <button className="w-10 h-10 flex items-center justify-center text-white hover:bg-gray-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <div className="w-12 h-10 flex items-center justify-center text-white font-medium border-x border-gray-600">
                1
              </div>
              <button className="w-10 h-10 flex items-center justify-center text-white hover:bg-gray-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors">
          Satın Al
        </button>
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
                  src={workshopDetail.image}
                  alt={capitalizeTitle(workshopDetail.name)}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
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
                          src={workshopDetail.owner.profileImage}
                          alt={workshopDetail.owner.fullName}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-lg">{workshopDetail.owner.fullName}</h4>
                        <p className="text-gray-400">{workshopDetail.owner.username}</p>
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
                  {capitalizeTitle(workshopDetail.name)}
                </h1>
                <div className="prose prose-lg prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {workshopDetail.description}
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
                      <p className="text-white font-medium">{workshopDetail.duration}</p>
                    </div>

                    {/* Location */}
                    <div className="col-span-2">
                      <h4 className="text-gray-400 text-sm mb-1">Konum</h4>
                      <div className="flex items-center justify-between">
                        <p className="text-white font-medium">{workshopDetail.location}</p>
                        <button className="text-purple-400 text-sm flex items-center gap-1 hover:text-purple-300 transition-colors">
                          <MapPin className="h-4 w-4" />
                          Haritada Gör
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Requirements */}
                  {workshopDetail.requirements && (
                    <div>
                      <h4 className="text-gray-400 text-sm mb-2">Gereksinimler</h4>
                      <p className="text-white">{workshopDetail.requirements}</p>
                    </div>
                  )}

                  {/* What's Included */}
                  {workshopDetail.whatIsInPrice && (
                    <div>
                      <h4 className="text-gray-400 text-sm mb-2">Ücrете Dahil</h4>
                      <p className="text-white">{workshopDetail.whatIsInPrice}</p>
                    </div>
                  )}
                </CardContent>
              </Card>


              {/* Desktop Calendar Section */}
              <EventCalendar eventDetail={workshopDetail} useWorkshopService={true} />

              {/* Desktop Purchase Section */}
              <Card className="bg-gray-900/50 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      {workshopDetail.sessionGroups[0]?.sessions[0]?.discountedPrice ? (
                        <div>
                          <div className="text-3xl font-bold text-white">
                            {workshopDetail.sessionGroups[0].sessions[0].discountedPrice.toLocaleString()} ₺
                          </div>
                          <div className="line-through text-gray-500">
                            {workshopDetail.sessionGroups[0].sessions[0].price.toLocaleString()} ₺
                          </div>
                        </div>
                      ) : (
                        <div className="text-3xl font-bold text-white">
                          {workshopDetail.sessionGroups[0]?.sessions[0]?.price.toLocaleString()} ₺
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-600 rounded-lg">
                        <button className="w-12 h-12 flex items-center justify-center text-white hover:bg-gray-700 rounded-l-lg">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <div className="w-16 h-12 flex items-center justify-center text-white font-medium border-x border-gray-600">
                          1
                        </div>
                        <button className="w-12 h-12 flex items-center justify-center text-white hover:bg-gray-700 rounded-r-lg">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg font-semibold">
                        Satın Al
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section - Desktop Full Width */}
          <div className="mt-12">
            <FAQ
              faqs={generateWorkshopFAQ(workshopDetail)}
              title="Sık Sorulan Sorular"
              className="md:bg-gray-900/50 md:border-gray-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
