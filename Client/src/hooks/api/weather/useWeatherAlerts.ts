import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../lib/queryClient';
import { useUser } from '../../../contexts/UserContext';
import type { WeatherAlert } from '../../../types/weather';
import { demoAlerts } from '../../../demo/weatherData';

interface UseWeatherAlertsOptions {
  location?: {
    city: string;
    state?: string;
    country?: string;
  };
  enabled?: boolean;
  staleTime?: number;
}

// Convert demo alerts to match the API type structure
const getMockWeatherAlerts = (): WeatherAlert[] => {
  return demoAlerts.map(alert => ({
    type: alert.title,
    message: alert.description,
    severity: alert.severity === 'moderate' ? 2 : 
              alert.severity === 'severe' ? 3 : 
              alert.severity === 'extreme' ? 4 : 1,
    expiresAt: alert.endTime,
  }));
};

export function useWeatherAlerts(options: UseWeatherAlertsOptions = {}) {
  const { preferences } = useUser();
  
  // Use provided location or user's location override
  const location = options.location || 
    (preferences.locationOverride?.enabled ? preferences.locationOverride : null) || 
    { city: 'New York', state: 'New York', country: 'US' };

  return useQuery({
    queryKey: queryKeys.weather.alerts(location),
    queryFn: async (): Promise<WeatherAlert[]> => {
      // Simulate API delay for realistic demo experience
      await new Promise(resolve => setTimeout(resolve, 400));
      return getMockWeatherAlerts();
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
      // Simulate API delay for realistic demo experience
      await new Promise(resolve => setTimeout(resolve, 400));
      return getMockWeatherAlerts();
    },
    enabled: options.enabled !== false,
    staleTime: options.staleTime || 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
} 