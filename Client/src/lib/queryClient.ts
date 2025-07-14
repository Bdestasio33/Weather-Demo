import { QueryClient } from '@tanstack/react-query';

// Create a query client with optimized defaults
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache weather data for 5 minutes by default
      staleTime: 5 * 60 * 1000, // 5 minutes
      // Keep data in cache for 30 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes (formerly cacheTime)
      // Retry failed requests up to 3 times
      retry: 3,
      // Retry with exponential backoff
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Don't refetch on window focus for weather data
      refetchOnWindowFocus: false,
      // Refetch on reconnect
      refetchOnReconnect: true,
      // Don't refetch on mount if data is fresh
      refetchOnMount: 'always',
    },
    mutations: {
      // Retry mutations once
      retry: 1,
    },
  },
});

// Query keys for consistent caching
export const queryKeys = {
  weather: {
    all: ['weather'] as const,
    current: (location: { city: string; state?: string; country?: string }) => 
      [...queryKeys.weather.all, 'current', location] as const,
    forecast: (location: { city: string; state?: string; country?: string }) => 
      [...queryKeys.weather.all, 'forecast', location] as const,
    alerts: (location: { city: string; state?: string; country?: string }) => 
      [...queryKeys.weather.all, 'alerts', location] as const,
  },
} as const; 