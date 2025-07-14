import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../lib/queryClient';
import { useUser } from '../../../contexts/UserContext';
import type { CurrentWeather } from '../../../types/weather';
import { demoWeatherMetrics } from '../../../demo/weatherData';

interface UseCurrentWeatherOptions {
  location?: {
    city: string;
    state?: string;
    country?: string;
  };
  enabled?: boolean;
  staleTime?: number;
}

// Mock current weather data for demo
const getMockCurrentWeather = (location: { city: string; state?: string; country?: string }): CurrentWeather => {
  return {
    location: `${location.city}, ${location.state || 'NY'}`,
    temperature: 24, // Celsius
    temperatureF: 75, // Fahrenheit
    condition: 'Cloudy',
    summary: 'Partly cloudy with a chance of showers',
    humidity: demoWeatherMetrics.humidity,
    windSpeed: demoWeatherMetrics.windSpeed,
    timestamp: new Date().toISOString(),
  };
};

export function useCurrentWeather(options: UseCurrentWeatherOptions = {}) {
  const { preferences } = useUser();
  
  // Use provided location or user's location override
  const location = options.location || 
    (preferences.locationOverride?.enabled ? preferences.locationOverride : null) || 
    { city: 'New York', state: 'New York', country: 'US' };

  return useQuery({
    queryKey: queryKeys.weather.current(location),
    queryFn: async (): Promise<CurrentWeather> => {
      // Simulate API delay for realistic demo experience
      await new Promise(resolve => setTimeout(resolve, 500));
      return getMockCurrentWeather(location);
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

// Hook for getting current weather for a specific location without user context
export function useCurrentWeatherForLocation(
  city: string,
  state?: string,
  country: string = 'US',
  options: { enabled?: boolean; staleTime?: number } = {}
) {
  const location = { city, state, country };
  
  return useQuery({
    queryKey: queryKeys.weather.current(location),
    queryFn: async (): Promise<CurrentWeather> => {
      // Simulate API delay for realistic demo experience
      await new Promise(resolve => setTimeout(resolve, 500));
      return getMockCurrentWeather(location);
    },
    enabled: options.enabled !== false,
    staleTime: options.staleTime || 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
} 