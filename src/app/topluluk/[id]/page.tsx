import { ArrowLeft, MapPin, Calendar } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { societyService } from '@/services/society/service';

interface CommunityDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}


//TODO mobile ve desktop tasarımları birbirinden ayrı gidecek gibi duruyor. iyi bir ayrıştırmaya gitmek lazım
// geçici olarak boyle :D

export default async function CommunityDetailPage({ params }: CommunityDetailPageProps) {
  const { id: communityId } = await params;

  let societyDetail;
  try {
    societyDetail = await societyService.getSocietyDetail({
      id: parseInt(communityId)
    });
  } catch (error) {
    console.error('Society detayları yüklenemedi:', error);
    return (
      <div className="py-12" style={{ backgroundColor: '#111828' }}>
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
    <div className="min-h-screen bg-gray-900">
      {/* Mobile Header with Hero Image - Hidden on Desktop */}
      <div className="relative lg:hidden">
        {/* Hero Image */}
        <div className="relative h-80 md:h-96">
          <Image
            src={societyDetail.image}
            alt={societyDetail.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Navigation Buttons */}
          <div className="absolute top-6 left-4 right-4 flex justify-between items-center">
          <Link
            href="/topluluk"
              className="w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
          >
              <ArrowLeft className="h-5 w-5" />
          </Link>
            <button className="w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </button>
          </div>

          {/* Category Badge */}
          <div className="absolute top-20 left-4">
            <div className="px-3 py-1 bg-purple-600 rounded-full text-white text-sm font-medium">
              Workshop & Eğitim
            </div>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
              {societyDetail.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Mobile Content */}
      <div className="px-4 py-6 space-y-6 lg:hidden">
        {/* Event Owner */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-medium text-lg">Etkinlik Sahibi</h3>
            <div className="flex items-center gap-3 mt-2">
              <div className="relative h-12 w-12 rounded-full overflow-hidden">
                <Image
                  src={societyDetail.owner.profileImage}
                  alt={societyDetail.owner.fullName}
                  fill
                  className="object-cover"
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
            <p className="text-white">{societyDetail.duration}</p>
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

          {/* Event Time */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h4 className="text-white font-medium mb-3">Etkinlik Zamanı</h4>
            <div className="space-y-3">
              {societyDetail.sessionGroups.map((group) =>
                group.sessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="text-white font-medium">Etkinlik Tarihi</div>
                        <div className="text-gray-400 text-sm">
                          {group.date.split('-').reverse().join('.')}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">{session.startTime.slice(0, 5)}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
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
      </div>

      {/* Fixed Bottom Purchase Section - Mobile Only */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-4 z-50">
        <div className="flex items-center justify-between mb-3">
          <div>
            {societyDetail.sessionGroups[0]?.sessions[0]?.discountedPrice ? (
              <div>
                <div className="text-2xl font-bold text-white">
                  {societyDetail.sessionGroups[0].sessions[0].discountedPrice.toLocaleString()} ₺
                </div>
                <div className="line-through text-gray-500 text-sm">
                  {societyDetail.sessionGroups[0].sessions[0].price.toLocaleString()} ₺
                </div>
              </div>
            ) : (
              <div className="text-2xl font-bold text-white">
                {societyDetail.sessionGroups[0]?.sessions[0]?.price.toLocaleString()} ₺
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
          {/* Desktop Navigation */}
          <div className="mb-8">
            <Link
              href="/topluluk"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Topluluk
            </Link>
          </div>

          {/* Desktop Main Content - Side by Side Layout */}
          <div className="grid grid-cols-2 gap-12 mb-8">
            {/* Left Side - Image */}
            <div className="space-y-6">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src={societyDetail.image}
                  alt={societyDetail.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute top-4 left-4">
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
                          fill
                          className="object-cover"
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
                  {societyDetail.name}
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
                      <p className="text-white font-medium">{societyDetail.duration}</p>
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

              {/* Event Time */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white font-medium">Etkinlik Zamanı</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {societyDetail.sessionGroups.map((group) =>
                    group.sessions.map((session) => (
                      <div key={session.id} className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-3">
                          <Calendar className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="text-white font-medium">Etkinlik Tarihi</div>
                            <div className="text-gray-400 text-sm">
                              {group.date.split('-').reverse().join('.')}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-medium">{session.startTime.slice(0, 5)}</div>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>

              {/* Desktop Tickets Section */}
              <Card className="bg-white/5 border border-gray-700/50 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-white text-xl font-bold">Biletler</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {societyDetail.sessionGroups.map((group) =>
                    group.sessions.map((session) => (
                      <div
                        key={session.id}
                        className="border border-gray-600/50 rounded-lg p-4 hover:border-gray-500/50 transition-colors"
                      >
                        {/* Date and Time */}
                        <div className="flex items-center gap-3 mb-3">
                          <div className="text-white font-medium">
                            {group.date.split('-').reverse().join('.')}
                          </div>
                          <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                          <div className="text-white font-medium">
                            {session.startTime.slice(0, 5)}
                          </div>
                        </div>

                        {/* Price and Status */}
                        <div className="flex items-center justify-between">
                          {session.isAvailable && session.isValid ? (
                            <>
                              <div>
                                {session.discountedPrice ? (
                                  <div>
                                    <div className="text-xl font-bold text-white">
                                      {session.discountedPrice.toLocaleString()} ₺
                                    </div>
                                    <div className="line-through text-gray-500 text-sm">
                                      {session.price.toLocaleString()} ₺
                                    </div>
                                  </div>
                                ) : (
                                  <div className="text-xl font-bold text-white">
                                    {session.price.toLocaleString()} ₺
                                  </div>
                                )}
                              </div>
                              <Button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-semibold">
                                SATIN AL
                              </Button>
                            </>
                          ) : (
                            <div className="w-full text-center">
                              <div className="text-red-400 font-bold mb-2">Tükendi</div>
                              <Button disabled className="w-full bg-gray-700 text-gray-400 cursor-not-allowed">
                                Tükendi
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
