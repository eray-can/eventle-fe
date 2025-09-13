'use client';

import Image from 'next/image';

interface TicketProvidersProps {
  urlBugece?: string | null;
  urlIksv?: string | null;
  urlBiletino?: string | null;
  urlBiletix?: string | null;
  mainUrl?: string | null;
}

const addUtmSource = (url: string) => {
  if (!url) return url;
  
  const urlObj = new URL(url);
  urlObj.searchParams.set('utm_source', 'eventle');
  return urlObj.toString();
};

const getProviderFromUrl = (url: string) => {
  if (!url) return null;
  
  const domain = url.toLowerCase();
  
  if (domain.includes('bugece')) {
    return {
      name: 'Bugece',
      className: 'bg-orange-600 hover:bg-orange-700',
      image: '/static/media/provider/bugece.png'
    };
  }
  
  if (domain.includes('iksv')) {
    return {
      name: 'İKSV',
      className: 'bg-red-600 hover:bg-red-700',
      image: '/static/media/provider/iksv.png'
    };
  }
  
  if (domain.includes('biletino')) {
    return {
      name: 'Biletino',
      className: 'bg-blue-600 hover:bg-blue-700',
      image: '/static/media/provider/biletino.png'
    };
  }
  
  if (domain.includes('biletix')) {
    return {
      name: 'Biletix',
      className: 'bg-green-600 hover:bg-green-700',
      image: '/static/media/provider/biletix.png'
    };
  }
  
  if (domain.includes('passo')) {
    return {
      name: 'Passo',
      className: 'bg-indigo-600 hover:bg-indigo-700',
      image: '/static/media/provider/passo.png'
    };
  }
  
  // Ana site için default config
  return {
    name: 'Ana Site',
    className: 'bg-purple-600 hover:bg-purple-700',
    image: null
  };
};

export function TicketProviders({
  urlBugece,
  urlIksv,
  urlBiletino,
  urlBiletix,
  mainUrl
}: TicketProvidersProps) {
  const allUrls = [
    urlBugece,
    urlIksv,
    urlBiletino,
    urlBiletix,
    mainUrl
  ].filter(url => url && url !== 'nan' && url.trim() !== '');
  
  const providers = allUrls.map((url, index) => {
    if (!url) return null;
    const config = getProviderFromUrl(url);
    if (!config) return null;
    
    return {
      key: `provider-${index}`,
      url: addUtmSource(url),
      config
    };
  }).filter(Boolean) as Array<{
    key: string;
    url: string;
    config: {
      name: string;
      className: string;
      image: string | null;
    };
  }>;

  if (providers.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="text-white text-xl font-semibold mb-4">Etkinlik Biletini Almak İçin</h3>
      <div className="space-y-3">
        {providers.map((provider) => (
          <a
            key={provider.key}
            href={provider.url!}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors flex items-center justify-between text-base py-2"
           >
             <div className="flex items-center gap-4">
               {provider.config.image && (
                 <Image
                   src={provider.config.image}
                   alt={provider.config.name}
                   width={48}
                   height={48}
                   className="object-contain"
                 />
               )}
               <span>{provider.config.name} için tıklayınız</span>
             </div>
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
             </svg>
          </a>
        ))}
      </div>
    </div>
  );
}

export default TicketProviders;