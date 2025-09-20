'use client';

import { Search as SearchIcon, X, Clock, TrendingUp, MapPin, Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { capitalizeTitle, formatDateTurkish } from '@/lib/utils';
import Image from '@/components/ui/image';
import { useSearch } from '@/hooks/search';

interface SearchProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
  showSuggestions?: boolean;
  autoFocus?: boolean;
}



const POPULAR_SEARCHES = [
  'Tiyatro & Sahne',
  'Müzik',
  'Müze',
  'Sanat',
  'Spor',
  'Diğer'
];

export function Search({ 
  placeholder, 
  onSearch, 
  className = '', 
  showSuggestions = true,
  autoFocus = false 
}: SearchProps) {
  const t = useTranslations('Common');
  
  const {
    query,
    suggestions,
    recentSearches,
    isLoading,
    selectedIndex,
    showDropdown,
    inputRef,
    suggestionsRef,
    setQuery,
    setSelectedIndex,
    handleSearch,
    handleSubmit,
    handleKeyDown,
    clearSearch,
    handleFocus,
    handleBlur,
    navigateToEvent
  } = useSearch({ onSearch, showSuggestions, autoFocus });

  const formatDate = (date: Date | string) => {
    return formatDateTurkish(date);
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <SearchIcon 
            className="absolute left-3 h-4 w-4 text-gray-400 cursor-pointer z-10" 
            onClick={() => inputRef.current?.focus()}
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(-1);
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder || t('search') || 'Etkinlik, topluluk, workshop ara...'}
            className={`
              w-full pl-10 pr-10 py-3 text-sm
              bg-gray-800 border border-gray-700 rounded-lg
              text-white placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
              transition-all duration-200
              ${showDropdown ? 'rounded-b-none border-b-0' : ''}
            `}
            suppressHydrationWarning
          />
          {query && (
            <X 
              className="absolute right-3 h-4 w-4 text-gray-400 cursor-pointer hover:text-white transition-colors" 
              onClick={clearSearch}
            />
          )}
          {isLoading && (
            <div className="absolute right-8 h-4 w-4">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-500 border-t-transparent"></div>
            </div>
          )}
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {showDropdown && (
        <div 
          ref={suggestionsRef}
          className={`
            absolute top-full left-0 right-0 z-50
            bg-gray-800 border border-gray-700 border-t-0 rounded-b-lg
            max-h-96 overflow-y-auto shadow-xl
            w-full min-w-0 sm:min-w-96
          `}
        >
          {/* Search Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-2">
              <div className="text-xs text-gray-400 px-2 py-1 font-medium">Önerilen Etkinlikler</div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={suggestion.id}
                  onClick={() => navigateToEvent(suggestion.id)}
                  className={`
                    w-full text-left p-2 sm:p-3 rounded-md transition-all duration-200
                    flex items-start space-x-2 sm:space-x-3 group
                    ${selectedIndex === index ? 'bg-purple-600' : 'hover:bg-gray-700/30 hover:border-purple-500/20'}
                  `}
                >
                  {/* Event Image */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center overflow-hidden border border-gray-600/50 group-hover:border-purple-500/30 transition-all duration-200">
                       {suggestion.image ? (
                         <Image 
                           src={suggestion.image} 
                           alt={suggestion.name}
                           width={80}
                           height={80}
                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                         />
                       ) : (
                         <Calendar className="h-8 w-8 text-gray-400 group-hover:text-purple-400 transition-colors duration-200" />
                       )}
                     </div>
                  </div>
                  
                  {/* Event Details */}
                   <div className="flex-1 min-w-0 relative">
                     {/* Category Badge - Top Right */}
                      {suggestion.category && (
                        <div className="absolute top-0 right-0">
                          <span className="px-2 py-1 sm:px-3 sm:py-1.5 bg-purple-600/30 border border-purple-500/40 rounded-full text-xs sm:text-sm text-purple-200 font-semibold shadow-lg">
                            {capitalizeTitle(suggestion.category)}
                          </span>
                        </div>
                      )}
                     
                     <div className="text-sm sm:text-base font-semibold text-white mb-2 sm:mb-3 line-clamp-2 leading-tight pr-16 sm:pr-20">
                       {capitalizeTitle(suggestion.name)}
                     </div>
                     
                     {/* Event Info */}
                     <div className="space-y-1 sm:space-y-2">
                       {suggestion.startDate && (
                         <div className="text-xs sm:text-sm text-purple-400 flex items-center space-x-1 font-medium">
                           <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                           <span>{formatDate(suggestion.startDate)}</span>
                         </div>
                       )}
                       
                       {suggestion.city && (
                         <div className="text-xs sm:text-sm text-gray-300 flex items-center space-x-1">
                           <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                           <span>{capitalizeTitle(suggestion.city)}</span>
                         </div>
                       )}

                     </div>
                   </div>
                  
                  {/* Price or Status */}
                  {suggestion.price && (
                    <div className="flex-shrink-0 text-right min-w-[80px]">
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2">
                        <div className="text-sm font-bold text-green-400">
                          {suggestion.price === 0 ? 'Ücretsiz' : `₺${suggestion.price}`}
                        </div>
                        <div className="text-xs text-green-300/70">Başlangıç</div>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Recent Searches */}
          {query.length === 0 && recentSearches.length > 0 && (
            <div className="p-2 border-t border-gray-700">
              <div className="text-xs text-gray-400 px-2 py-1 font-medium flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>Son Aramalar</span>
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(search)}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-white">{search}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Popular Searches */}
          {query.length === 0 && (
            <div className="p-2 border-t border-gray-700">
              <div className="text-xs text-gray-400 px-2 py-1 font-medium flex items-center space-x-1">
                <TrendingUp className="h-3 w-3" />
                <span>Popüler Aramalar</span>
              </div>
              <div className="flex flex-wrap gap-1 px-2 py-1">
                {POPULAR_SEARCHES.map((search) => (
                  <button
                    key={search}
                    onClick={() => handleSearch(search)}
                    className="px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-full transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {query.length >= 2 && suggestions.length === 0 && !isLoading && (
            <div className="p-4 text-center text-gray-400">
              <div className="text-sm">Sonuç bulunamadı</div>
              <div className="text-xs mt-1">Farklı anahtar kelimeler deneyin</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;