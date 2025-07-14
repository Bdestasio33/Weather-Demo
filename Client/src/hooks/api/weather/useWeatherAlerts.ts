import { useQuery } from '@tanstack/react-query';
import { weatherService } from '../../../services/weatherService';
import { queryKeys } from '../../../lib/queryClient';
import { useUser } from '../../../contexts/UserContext';
import type { WeatherAlert } from '../../../types/weather';

interface UseWeatherAlertsOptions {
  location?: {
    city: string;
    state?: string;
    country?: string;
  };
  enabled?: boolean;
  staleTime?: number;
}

export function useWeatherAlerts(options: UseWeatherAlertsOptions = {}) {
  const { preferences } = useUser();
  
  // Use provided location or user's location override
  const location = options.location || 
    (preferences.locationOverride?.enabled ? preferences.locationOverride : null) || 
    { city: 'New York', state: 'New York', country: 'US' };

  return useQuery({
    queryKey: queryKeys.weather.alerts(location),
    queryFn: async (): Promise<WeatherAlert[]> => {
      return await weatherService.getWeatherAlerts(location);
    },
    enabled: options.enabled !== false,
    staleTime: options.staleTime || 10 * 60 * 1000, // 10 minutes default (alerts are time-sensitive)
    gcTime: 30 * 60 * 1000, // 30 minutes cache
    refetchInterval: 10 * 60 * 1000, // Auto-refresh every 10 minutes
    refetchIntervalInBackground: false,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

// Hook for getting weather alerts for a specific location without user context
export function useWeatherAlertsForLocation(
  city: string,
  state?: string,
  country: string = 'US',
  options: { enabled?: boolean; staleTime?: number } = {}
) {
  const location = { city, state, country };
  
  return useQuery({
    queryKey: queryKeys.weather.alerts(location),
    queryFn: async (): Promise<WeatherAlert[]> => {
      return await weatherService.getWeatherAlerts(location);
    },
    enabled: options.enabled !== false && !!city,
    staleTime: options.staleTime || 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchInterval: 10 * 60 * 1000,
    refetchIntervalInBackground: false,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
} 