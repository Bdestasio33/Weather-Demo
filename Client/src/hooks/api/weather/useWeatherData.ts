import { useQuery } from '@tanstack/react-query';
import { weatherService } from '../../../services/weatherService';
import { queryKeys } from '../../../lib/queryClient';
import { useUser } from '../../../contexts/UserContext';
import type { CurrentWeather, WeatherForecast, WeatherAlert } from '../../../types/weather';

interface WeatherData {
  current: CurrentWeather;
  forecast: WeatherForecast[];
  alerts: WeatherAlert[];
}

interface UseWeatherDataOptions {
  location?: {
    city: string;
    state?: string;
    country?: string;
  };
  enabled?: boolean;
  staleTime?: number;
}

export function useWeatherData(options: UseWeatherDataOptions = {}) {
  const { preferences } = useUser();
  
  // Use provided location or user's location override
  const location = options.location || 
    (preferences.locationOverride?.enabled ? preferences.locationOverride : null) || 
    { city: 'New York', state: 'New York', country: 'US' };

  const queryKey = [...queryKeys.weather.all, 'comprehensive', location] as const;

  return useQuery({
    queryKey,
    queryFn: async (): Promise<WeatherData> => {
      // Use the existing getWeatherForLocation method that fetches all data efficiently
      return await weatherService.getWeatherForLocation(
        location.city, 
        location.state, 
        location.country || 'US'
      );
    },
    enabled: options.enabled !== false,
    staleTime: options.staleTime || 5 * 60 * 1000, // 5 minutes default
    gcTime: 30 * 60 * 1000, // 30 minutes cache
    refetchInterval: 5 * 60 * 1000, // Auto-refresh every 5 minutes
    refetchIntervalInBackground: false,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

// Hook for getting comprehensive weather data for a specific location without user context
export function useWeatherDataForLocation(
  city: string,
  state?: string,
  country: string = 'US',
  options: { enabled?: boolean; staleTime?: number } = {}
) {
  const location = { city, state, country };
  const queryKey = [...queryKeys.weather.all, 'comprehensive', location] as const;
  
  return useQuery({
    queryKey,
    queryFn: async (): Promise<WeatherData> => {
      return await weatherService.getWeatherForLocation(city, state, country);
    },
    enabled: options.enabled !== false && !!city,
    staleTime: options.staleTime || 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
    refetchIntervalInBackground: false,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
} 