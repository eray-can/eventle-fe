'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { organizationService } from '@/services/organizations/service';

interface SearchSuggestion {
  id: number;
  name: string;
  type: 'event' | 'location' | 'category';
  category?: string;
  city?: string;
  startDate?: Date;
  image?: string;
  description?: string;
  price?: number;
}

const RECENT_SEARCHES_KEY = 'eventle_recent_searches';

export function useSearch({
  onSearch,
  showSuggestions = true,
  autoFocus = false
}: {
  onSearch?: (query: string) => void;
  showSuggestions?: boolean;
  autoFocus?: boolean;
} = {}) {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | number | undefined>(undefined);

  // Load recent searches from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (saved) {
        try {
          setRecentSearches(JSON.parse(saved));
        } catch {
          // Ignore invalid JSON
        }
      }
    }
  }, []);

  // Auto focus if requested
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Fetch suggestions when query changes
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (query.length >= 2 && showSuggestions) {
      debounceRef.current = setTimeout(async () => {
        setIsLoading(true);
        try {
          const result = await organizationService.getOrganizations({
            search: query,
            limit: 5
          });

          const newSuggestions: SearchSuggestion[] = result.organizations.map(org => ({
            id: org.id,
            name: org.name,
            type: 'event' as const,
            category: org.category,
            city: org.city,
            startDate: org.startDate,
            image: org.image,
            description: org.description,
          }));

          setSuggestions(newSuggestions);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      }, 300);
    } else {
      setSuggestions([]);
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, showSuggestions]);

  const saveRecentSearch = useCallback((searchQuery: string) => {
    const trimmed = searchQuery.trim();
    if (!trimmed) return;

    const updated = [trimmed, ...recentSearches.filter(s => s !== trimmed)].slice(0, 5);
    setRecentSearches(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    }
  }, [recentSearches]);

  const handleSearch = useCallback((searchQuery: string) => {
    const trimmed = searchQuery.trim();
    if (!trimmed) return;

    saveRecentSearch(trimmed);

    if (onSearch) {
      onSearch(trimmed);
    } else {
      router.push(`/arama?q=${encodeURIComponent(trimmed)}`);
    }

    setIsFocused(false);
    setIsExpanded(false);
    inputRef.current?.blur();
  }, [onSearch, router, saveRecentSearch]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIndex >= 0 && suggestions[selectedIndex]) {
      router.push(`/etkinlik/${suggestions[selectedIndex].id}`);
      setQuery('');
      setIsFocused(false);
      setIsExpanded(false);
      inputRef.current?.blur();
    } else {
      handleSearch(query);
    }
  }, [selectedIndex, suggestions, router, query, handleSearch]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > -1 ? prev - 1 : -1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSearch(suggestions[selectedIndex].name);
      } else {
        handleSearch(e.currentTarget.value);
      }
    } else if (e.key === 'Escape') {
      setQuery('');
      setIsFocused(false);
      setIsExpanded(false);
      setSelectedIndex(-1);
      inputRef.current?.blur();
    }
  }, [suggestions, selectedIndex, handleSearch]);

  const clearSearch = useCallback(() => {
    setQuery('');
    setIsFocused(false);
    setIsExpanded(false);
    setSelectedIndex(-1);
    setSuggestions([]);
  }, []);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    setIsExpanded(true);
  }, []);

  const handleBlur = useCallback(() => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => {
      if (!suggestionsRef.current?.contains(document.activeElement)) {
        setIsFocused(false);
        if (!query) setIsExpanded(false);
        setSelectedIndex(-1);
      }
    }, 150);
  }, [query]);

  const navigateToEvent = useCallback((eventId: number) => {
    router.push(`/etkinlik/${eventId}`);
    setQuery('');
    setIsFocused(false);
    setIsExpanded(false);
    inputRef.current?.blur();
  }, [router]);

  const showDropdown = isFocused && showSuggestions && (suggestions.length > 0 || recentSearches.length > 0 || query.length === 0);

  return {
    // State
    query,
    isExpanded,
    isFocused,
    suggestions,
    recentSearches,
    isLoading,
    selectedIndex,
    showDropdown,

    // Refs
    inputRef,
    suggestionsRef,

    // Actions
    setQuery,
    setSelectedIndex,
    handleSearch,
    handleSubmit,
    handleKeyDown,
    clearSearch,
    handleFocus,
    handleBlur,
    navigateToEvent
  };
}

export type { SearchSuggestion };