import { getTranslations } from 'next-intl/server';
import { ArrowLeft, MapPin, Clock, Users, Calendar } from 'lucide-react';
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

export default async function CommunityDetailPage({ params }: CommunityDetailPageProps) {
  const t = await getTranslations('CommunityDetailPage');
  const { id: communityId } = await params;

  let workshopDetail;
  try {
    workshopDetail = await societyService.getWorkshopDetail({ 
      id: parseInt(communityId) 
    });
  } catch (error) {
    console.error('Workshop detayları yüklenemedi:', error);
    return (
      <div className="py-12" style={{ backgroundColor: '#111828' }}>
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
    <div className="py-12" style={{ backgroundColor: '#111828' }}>
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link 
            href="/topluluk"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('backToCommunities')}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <div className="relative h-64 md:h-80">
                  <Image
                    src={workshopDetail.image}
                    alt={workshopDetail.name}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {workshopDetail.name}
                  </h1>
                  
                  <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {workshopDetail.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {workshopDetail.duration}
                    </div>
                    {workshopDetail.capacity && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Kapasite: {workshopDetail.capacity}
                      </div>
                    )}
                  </div>

                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {workshopDetail.description}
                    </p>
                  </div>

                  {workshopDetail.requirements && (
                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                        Gereksinimler
                      </h3>
                      <p className="text-blue-800 dark:text-blue-200 text-sm">
                        {workshopDetail.requirements}
                      </p>
                    </div>
                  )}

                  {workshopDetail.whatIsInPrice && (
                    <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                        Fiyata Dahil Olanlar
                      </h3>
                      <p className="text-green-800 dark:text-green-200 text-sm">
                        {workshopDetail.whatIsInPrice}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Seanslar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {workshopDetail.sessionGroups.map((group) => (
                  <div key={group.date} className="border rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      {group.date}
                    </h4>
                    <div className="space-y-2">
                      {group.sessions.map((session) => (
                        <div 
                          key={session.id}
                          className={`p-3 rounded border ${
                            session.isAvailable && session.isValid
                              ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
                              : 'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">
                              {session.startTime} - {session.endTime}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded ${
                              session.isAvailable && session.isValid
                                ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                            }`}>
                              {session.isAvailable && session.isValid ? 'Müsait' : 'Dolu'}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300">
                            <span>
                              {session.attendedCount}/{session.capacity} kişi
                            </span>
                            <div className="text-right">
                              {session.discountedPrice ? (
                                <div>
                                  <span className="line-through text-gray-400">
                                    ₺{session.price.toLocaleString()}
                                  </span>
                                  <span className="ml-2 font-semibold text-green-600">
                                    ₺{session.discountedPrice.toLocaleString()}
                                  </span>
                                </div>
                              ) : (
                                <span className="font-semibold">
                                  ₺{session.price.toLocaleString()}
                                </span>
                              )}
                            </div>
                          </div>
                          {session.isAvailable && session.isValid && (
                            <Button size="sm" className="w-full mt-2">
                              Rezervasyon Yap
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Workshop Sahibi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image
                      src={workshopDetail.owner.profileImage}
                      alt={workshopDetail.owner.fullName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {workshopDetail.owner.fullName}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      @{workshopDetail.owner.username}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
