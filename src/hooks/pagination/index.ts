'use client';

import { useState, useEffect, useCallback } from 'react';

interface PaginationOptions<T> {
  initialPage?: number;
  pageSize?: number;
  initialData?: {
    results: T[];
    count: number;
    next: string | null;
    previous: string | null;
  };
  fetchData: (page: number, pageSize: number) => Promise<{
    results: T[];
    count: number;
    next: string | null;
    previous: string | null;
  }>;
}

interface PaginationReturn<T> {
  data: T[];
  totalCount: number;
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
  isLoading: boolean;
  error: string | null;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  totalLoaded: number;
}

export function usePagination<T>({
  initialPage = 1,
  pageSize = 20,
  initialData,
  fetchData
}: PaginationOptions<T>): PaginationReturn<T> {
  const [data, setData] = useState<T[]>(initialData?.results || []);
  const [totalCount, setTotalCount] = useState(initialData?.count || 0);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [hasNext, setHasNext] = useState(initialData ? initialData.next !== null : false);
  const [hasPrevious, setHasPrevious] = useState(initialData ? initialData.previous !== null : false);
  const [isLoading, setIsLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async (page: number, append: boolean = false) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await fetchData(page, pageSize);
      
      if (append) {
        setData(prev => [...prev, ...result.results]);
      } else {
        setData(result.results);
      }
      
      setTotalCount(result.count);
      setCurrentPage(page);
      setHasNext(result.next !== null);
      setHasPrevious(result.previous !== null);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
      console.error('Veri yüklenemedi:', err);
    } finally {
      setIsLoading(false);
    }
  }, [fetchData, pageSize]);

  const loadMore = useCallback(async () => {
    if (!hasNext || isLoading) return;
    await loadData(currentPage + 1, true);
  }, [currentPage, hasNext, isLoading, loadData]);

  const refresh = useCallback(async () => {
    setData([]);
    setCurrentPage(initialPage);
    await loadData(initialPage, false);
  }, [initialPage, loadData]);

  useEffect(() => {
    if (!initialData) {
      // Sadece SSR data yoksa client-side yükleme yap
      const initialLoad = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
          const result = await fetchData(initialPage, pageSize);
          setData(result.results);
          setTotalCount(result.count);
          setCurrentPage(initialPage);
          setHasNext(result.next !== null);
          setHasPrevious(result.previous !== null);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Bir hata oluştu');
          console.error('Veri yüklenemedi:', err);
        } finally {
          setIsLoading(false);
        }
      };

      initialLoad();
    } else {
      // SSR data varsa loading'i kapat
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data,
    totalCount,
    currentPage,
    hasNext,
    hasPrevious,
    isLoading,
    error,
    loadMore,
    refresh,
    totalLoaded: data.length
  };
}
