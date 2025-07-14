import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../lib/queryClient';
import { useUser } from '../../../contexts/UserContext';
import type { CurrentWeather, WeatherForecast, WeatherAlert } from '../../../types/weather';
import { demoForecast, demoAlerts, demoWeatherMetrics } from '../../../demo/weatherData';

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

// Mock comprehensive weather data for demo
const getMockWeatherData = (location: { city: string; state?: string; country?: string }): WeatherData => {
  return {
    current: {
      location: `${location.city}, ${location.state || 'NY'}`,
      temperature: 24, // Celsius
      temperatureF: 75, // Fahrenheit
      condition: 'Cloudy',
      summary: 'Partly cloudy with a chance of showers',
      humidity: demoWeatherMetrics.humidity,
      windSpeed: demoWeatherMetrics.windSpeed,
      timestamp: new Date().toISOString(),
    },
    forecast: demoForecast.map(day => ({
      date: day.date,
      temperatureC: Math.round((day.high - 32) * 5/9), // Convert F to C
      temperatureF: day.high,
      summary: day.condition,
      condition: day.condition,
    })),
    alerts: demoAlerts.map(alert => ({
      type: alert.title,
      message: alert.description,
      severity: alert.severity === 'moderate' ? 2 : 
                alert.severity === 'severe' ? 3 : 
                alert.severity === 'extreme' ? 4 : 1,
      expiresAt: alert.endTime,
    })),
  };
};

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
      // Simulate API delay for realistic demo experience
      await new Promise(resolve => setTimeout(resolve, 700));
      return getMockWeatherData(location);
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
      // Simulate API delay for realistic demo experience
      await new Promise(resolve => setTimeout(resolve, 700));
      return getMockWeatherData(location);
    },
    enabled: options.enabled !== false,
    staleTime: options.staleTime || 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
} 