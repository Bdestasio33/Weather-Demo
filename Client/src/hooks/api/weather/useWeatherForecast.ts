import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../lib/queryClient';
import { useUser } from '../../../contexts/UserContext';
import type { WeatherForecast } from '../../../types/weather';
import { demoForecast } from '../../../demo/weatherData';

interface UseWeatherForecastOptions {
  location?: {
    city: string;
    state?: string;
    country?: string;
  };
  enabled?: boolean;
  staleTime?: number;
}

// Convert demo forecast to match the API type structure
const getMockWeatherForecast = (): WeatherForecast[] => {
  return demoForecast.map(day => ({
    date: day.date,
    temperatureC: Math.round((day.high - 32) * 5/9), // Convert F to C
    temperatureF: day.high,
    summary: day.condition,
    condition: day.condition,
  }));
};

export function useWeatherForecast(options: UseWeatherForecastOptions = {}) {
  const { preferences } = useUser();
  
  // Use provided location or user's location override
  const location = options.location || 
    (preferences.locationOverride?.enabled ? preferences.locationOverride : null) || 
    { city: 'New York', state: 'New York', country: 'US' };

  return useQuery({
    queryKey: queryKeys.weather.forecast(location),
    queryFn: async (): Promise<WeatherForecast[]> => {
      // Simulate API delay for realistic demo experience
      await new Promise(resolve => setTimeout(resolve, 600));
      return getMockWeatherForecast();
    },
    enabled: options.enabled !== false,
    staleTime: options.staleTime || 30 * 60 * 1000, // 30 minutes default (forecast changes less frequently)
    gcTime: 60 * 60 * 1000, // 1 hour cache
    refetchInterval: 30 * 60 * 1000, // Auto-refresh every 30 minutes
    refetchIntervalInBackground: false,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

// Hook for getting weather forecast for a specific location without user context
export function useWeatherForecastForLocation(
  city: string,
  state?: string,
  country: string = 'US',
  options: { enabled?: boolean; staleTime?: number } = {}
) {
  const location = { city, state, country };
  
  return useQuery({
    queryKey: queryKeys.weather.forecast(location),
    queryFn: async (): Promise<WeatherForecast[]> => {
      // Simulate API delay for realistic demo experience
      await new Promise(resolve => setTimeout(resolve, 600));
      return getMockWeatherForecast();
    },
    enabled: options.enabled !== false,
    staleTime: options.staleTime || 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
} 