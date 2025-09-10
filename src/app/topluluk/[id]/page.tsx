import { getTranslations } from 'next-intl/server';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface CommunityDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CommunityDetailPage({ params }: CommunityDetailPageProps) {
  const t = await getTranslations('CommunityDetailPage');

  // TODO: API'den veri çekilecek
  const { id: communityId } = await params;

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
             İçerik API&apos;den yüklenecek
           </p>
        </div>
      </div>
    </div>
  );
}
