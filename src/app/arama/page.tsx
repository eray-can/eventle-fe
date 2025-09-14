'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { organizationService } from '@/services/organizations/service';
import { Organization, OrganizationFilters } from '@/types/domain/organizations';
import { EventCard } from '@/components/search/event-card';
import { LoadingSpinner } from '@/components/common/loading-spinner';
import { Filter, SlidersHorizontal, Calendar, MapPin, Tag, X } from 'lucide-react';

interface FilterState {
  city: string;
  category: string;
  startDate: string;
  endDate: string;
  sortBy: 'date' | 'name' | 'relevance';
}

const CITIES = [
  'İstanbul',
  'Ankara',
  'İzmir',
  'Bursa',
  'Antalya',
  'Adana',
  'Konya',
  'Gaziantep',
  'Mersin',
  'Diyarbakır'
];

const CATEGORIES = [
  'Tiyatro & Sahne',
  'Müzik',
  'Müze',
  'Sanat',
  'Spor',
  'Diğer'
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentQuery, setCurrentQuery] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    city: '',
    category: '',
    startDate: '',
    endDate: '',
    sortBy: 'relevance'
  });

  const searchQuery = searchParams.get('q') || '';
  const cityParam = searchParams.get('city') || '';
  const categoryParam = searchParams.get('category') || '';

  useEffect(() => {
    if (searchQuery) {
      setCurrentQuery(searchQuery);
    }
    if (cityParam) {
      setFilters(prev => ({ ...prev, city: cityParam }));
    }
    if (categoryParam) {
      setFilters(prev => ({ ...prev, category: categoryParam }));
    }
  }, [searchQuery, cityParam, categoryParam]);

  const performSearch = useCallback(async (query: string, page: number = 1, reset: boolean = false) => {
    setLoading(true);
    setError(null);

    try {
      const searchFilters: OrganizationFilters = {
        limit: 20,
        page: page
      };

      if (query) searchFilters.search = query;
      if (filters.city) searchFilters.city = filters.city;
      if (filters.category) searchFilters.category = filters.category;
      if (filters.startDate) searchFilters.startDate = filters.startDate;
      if (filters.endDate) searchFilters.endDate = filters.endDate;
      
      const result = await organizationService.getOrganizations(searchFilters);
      
      if (reset) {
        setOrganizations(result.organizations);
      } else {
        setOrganizations(prev => [...prev, ...result.organizations]);
      }
      
      setTotalCount(result.count);
      setCurrentPage(page);
      setHasMore(!!result.next);
    } catch (err) {
      setError('Arama sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    if (searchQuery || cityParam || categoryParam) {
      performSearch(searchQuery, 1, true);
    }
  }, [searchQuery, cityParam, categoryParam, filters, performSearch]);

  const handleSearch = (query: string) => {
    setCurrentQuery(query);
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (filters.city) params.set('city', filters.city);
    if (filters.category) params.set('category', filters.category);
    
    router.push(`/arama?${params.toString()}`);
  };

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      city: '',
      category: '',
      startDate: '',
      endDate: '',
      sortBy: 'relevance'
    });
    const params = new URLSearchParams();
    if (currentQuery) params.set('q', currentQuery);
    router.push(`/arama?${params.toString()}`);
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      performSearch(currentQuery, currentPage + 1, false);
    }
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => value && value !== 'relevance').length;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('tr-TR');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">Arama</h1>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center">
              <SlidersHorizontal className="h-5 w-5 mr-2 text-purple-400" />
              Filtreler
              {getActiveFiltersCount() > 0 && (
                <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full ml-2">
                  {getActiveFiltersCount()}
                </span>
              )}
            </h2>
            
            {getActiveFiltersCount() > 0 && (
              <button
                onClick={clearFilters}
                className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
                <span>Filtreleri Temizle</span>
              </button>
            )}
          </div>

          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-gray-600/50 rounded-xl p-6 space-y-6 backdrop-blur-sm shadow-xl">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {/* City Filter */}
                 <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-3 flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-purple-400" />
                    Şehir
                  </label>
                  <select
                    value={filters.city}
                    onChange={(e) => handleFilterChange('city', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700/80 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400 hover:bg-gray-700 transition-all duration-200 backdrop-blur-sm"
                  >
                    <option value="">Tüm şehirler</option>
                    {CITIES.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-3 flex items-center">
                    <Tag className="h-4 w-4 mr-2 text-purple-400" />
                    Kategori
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700/80 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400 hover:bg-gray-700 transition-all duration-200 backdrop-blur-sm"
                  >
                    <option value="">Tüm kategoriler</option>
                    {CATEGORIES.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Start Date Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-3 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-purple-400" />
                    Başlangıç Tarihi
                  </label>
                  <input
                    type="date"
                    value={filters.startDate}
                    onChange={(e) => handleFilterChange('startDate', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700/80 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400 hover:bg-gray-700 transition-all duration-200 backdrop-blur-sm"
                  />
                </div>

                {/* End Date Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-3 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-purple-400" />
                    Bitiş Tarihi
                  </label>
                  <input
                    type="date"
                    value={filters.endDate}
                    onChange={(e) => handleFilterChange('endDate', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700/80 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400 hover:bg-gray-700 transition-all duration-200 backdrop-blur-sm"
                  />
                </div>


              </div>
            </div>
        </div>

        {/* Active Filters Display */}
        {getActiveFiltersCount() > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center">
              <Filter className="h-4 w-4 mr-2 text-purple-400" />
              Aktif Filtreler
            </h3>
            <div className="flex flex-wrap gap-3">
              {filters.city && (
                <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm rounded-full shadow-lg border border-purple-500/30 hover:from-purple-700 hover:to-purple-800 transition-all duration-200">
                  <MapPin className="h-3 w-3 mr-2" />
                  {filters.city}
                  <button
                    onClick={() => handleFilterChange('city', '')}
                    className="ml-2 hover:text-gray-300 hover:bg-white/20 rounded-full p-0.5 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {filters.category && (
                <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm rounded-full shadow-lg border border-purple-500/30 hover:from-purple-700 hover:to-purple-800 transition-all duration-200">
                  <Tag className="h-3 w-3 mr-2" />
                  {filters.category}
                  <button
                    onClick={() => handleFilterChange('category', '')}
                    className="ml-2 hover:text-gray-300 hover:bg-white/20 rounded-full p-0.5 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {filters.startDate && (
                <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm rounded-full shadow-lg border border-purple-500/30 hover:from-purple-700 hover:to-purple-800 transition-all duration-200">
                  <Calendar className="h-3 w-3 mr-2" />
                  {formatDate(filters.startDate)} sonrası
                  <button
                    onClick={() => handleFilterChange('startDate', '')}
                    className="ml-2 hover:text-gray-300 hover:bg-white/20 rounded-full p-0.5 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {filters.endDate && (
                <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm rounded-full shadow-lg border border-purple-500/30 hover:from-purple-700 hover:to-purple-800 transition-all duration-200">
                  <Calendar className="h-3 w-3 mr-2" />
                  {formatDate(filters.endDate)} öncesi
                  <button
                    onClick={() => handleFilterChange('endDate', '')}
                    className="ml-2 hover:text-gray-300 hover:bg-white/20 rounded-full p-0.5 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
          </div>
        )}

        {/* Search Results Header */}
        {(currentQuery || getActiveFiltersCount() > 0) && (
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {currentQuery ? (
                  <>
                    &quot;{currentQuery}&quot; için {totalCount} sonuç bulundu
                    {getActiveFiltersCount() > 0 && (
                      <span className="text-gray-400 text-base ml-2">
                        (filtreli)
                      </span>
                    )}
                  </>
                ) : (
                  `Filtrelere uygun ${totalCount} sonuç bulundu`
                )}
              </h2>
              
              {/* Sort Options */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Sırala:</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="px-3 py-1 bg-gray-800 border border-gray-700 rounded text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="relevance">İlgili</option>
                  <option value="date">Tarihe göre</option>
                  <option value="name">İsme göre</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && organizations.length === 0 && (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 mb-6">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Results Grid */}
        {!loading && !error && organizations.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {organizations.map((organization) => (
                <EventCard
                  key={organization.id}
                  event={organization}
                  href={`/etkinlik/${organization.id}`}
                />
              ))}
            </div>
            
            {/* Load More Button */}
            {hasMore && (
              <div className="text-center">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white rounded-lg transition-colors flex items-center space-x-2 mx-auto"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <span>Yükleniyor...</span>
                    </>
                  ) : (
                    <span>Daha Fazla Göster</span>
                  )}
                </button>
              </div>
            )}
          </>
        )}

        {/* No Results */}
        {!loading && !error && (currentQuery || getActiveFiltersCount() > 0) && organizations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-300 mb-2">
              Sonuç bulunamadı
            </h3>
            <p className="text-gray-400 mb-4">
              {currentQuery ? (
                `&quot;${currentQuery}&quot; için herhangi bir etkinlik bulunamadı.`
              ) : (
                'Seçilen filtrelere uygun etkinlik bulunamadı.'
              )}
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>Öneriler:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Farklı anahtar kelimeler deneyin</li>
                <li>Filtreleri gevşetin veya kaldırın</li>
                <li>Yazım hatalarını kontrol edin</li>
              </ul>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!currentQuery && getActiveFiltersCount() === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-300 mb-2">
              Arama yapmaya başlayın
            </h3>
            <p className="text-gray-400 mb-6">
              Etkinlik, topluluk veya workshop aramak için yukarıdaki arama kutusunu kullanın.
            </p>
            
            {/* Quick Search Suggestions */}
            <div className="max-w-md mx-auto">
              <p className="text-sm text-gray-500 mb-3">Popüler aramalar:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {['Tiyatro & Sahne', 'Müzik', 'Müze', 'Sanat', 'Spor', 'Diğer'].map((term) => (
                  <button
                    key={term}
                    onClick={() => handleSearch(term)}
                    className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-full transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}