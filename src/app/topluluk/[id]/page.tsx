import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, MessageCircle, Calendar, MapPin, Clock, Star, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface CommunityDetailPageProps {
  params: {
    id: string;
  };
}

export default function CommunityDetailPage({ params }: CommunityDetailPageProps) {
  const t = useTranslations('CommunityDetailPage');
  const common = useTranslations('Common');

  // TODO: API'den veri çekilecek
  const communityId = params.id;

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            href="/topluluk"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('backToCommunities')}
          </Link>
        </div>

        {/* Community Content - API'den gelecek */}
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Topluluk #{communityId}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            İçerik API'den yüklenecek
          </p>
        </div>
      </div>
    </div>
  );
}
