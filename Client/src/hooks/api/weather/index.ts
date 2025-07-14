// Weather API hooks
export { useCurrentWeather, useCurrentWeatherForLocation } from './useCurrentWeather';
export { useWeatherForecast, useWeatherForecastForLocation } from './useWeatherForecast';
export { useWeatherAlerts, useWeatherAlertsForLocation } from './useWeatherAlerts';
export { useWeatherData, useWeatherDataForLocation } from './useWeatherData';

// Re-export types for convenience
export type { CurrentWeather, WeatherForecast, WeatherAlert } from '../../../types/weather'; 