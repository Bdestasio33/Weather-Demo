import type { CurrentWeather, WeatherForecast, WeatherAlert } from '../types/weather';
import type { LocationOverride } from '../types/user';

// Use the correct API base URL for the updated server
const API_BASE_URL = 'http://localhost:5283/api';

class WeatherService {
  private locationOverride: LocationOverride | null = null;
  private defaultLocation: { city: string; state?: string; country: string } = { city: 'New York', state: 'New York', country: 'US' };

  private async makeRequest<T>(endpoint: string, location?: { city: string; state?: string; country?: string }): Promise<T> {
    try {
      // Build URL with location parameters
      const url = new URL(`${API_BASE_URL}${endpoint}`);
      
      // Use provided location or location override or default
      const actualLocation = location || 
        (this.locationOverride?.enabled ? this.locationOverride : null) || 
        this.defaultLocation;

      // Add location parameters to URL
      url.searchParams.append('city', actualLocation.city);
      if (actualLocation.state) {
        url.searchParams.append('state', actualLocation.state);
      }
      if (actualLocation.country) {
        url.searchParams.append('country', actualLocation.country);
      }

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText || response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error(`Failed to fetch ${endpoint}:`, error);
      throw error;
    }
  }

  async getCurrentWeather(location?: { city: string; state?: string; country?: string }): Promise<CurrentWeather> {
    return this.makeRequest<CurrentWeather>('/weather/current', location);
  }

  async getWeatherForecast(location?: { city: string; state?: string; country?: string }): Promise<WeatherForecast[]> {
    return this.makeRequest<WeatherForecast[]>('/weather/forecast', location);
  }

  async getWeatherAlerts(location?: { city: string; state?: string; country?: string }): Promise<WeatherAlert[]> {
    return this.makeRequest<WeatherAlert[]>('/weather/alerts', location);
  }

  // Helper method to test API connectivity
  async testConnection(): Promise<boolean> {
    try {
      await this.getCurrentWeather();
      return true;
    } catch (error) {
      console.error('API connection test failed:', error);
      return false;
    }
  }

  // Helper method to test API configuration
  async testApiConfiguration(): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/weather/test`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('API configuration test failed:', error);
      throw error;
    }
  }

  // Method to set location override
  setLocationOverride(locationOverride: LocationOverride): void {
    this.locationOverride = locationOverride;
    console.log('Location override set:', locationOverride);
  }

  // Method to clear location override
  clearLocationOverride(): void {
    this.locationOverride = null;
    console.log('Location override cleared');
  }

  // Method to get current location override
  getLocationOverride(): LocationOverride | null {
    return this.locationOverride;
  }

  // Method to set default location
  setDefaultLocation(city: string, state?: string, country: string = 'US'): void {
    this.defaultLocation = { city, state, country };
    console.log('Default location set:', this.defaultLocation);
  }

  // Method to get current default location
  getDefaultLocation(): { city: string; state?: string; country: string } {
    return this.defaultLocation;
  }

  // Method to get weather for a specific location without changing settings
  async getWeatherForLocation(city: string, state?: string, country: string = 'US'): Promise<{
    current: CurrentWeather;
    forecast: WeatherForecast[];
    alerts: WeatherAlert[];
  }> {
    const location = { city, state, country };
    
    const [current, forecast, alerts] = await Promise.all([
      this.getCurrentWeather(location),
      this.getWeatherForecast(location),
      this.getWeatherAlerts(location)
    ]);

    return { current, forecast, alerts };
  }

  // Method to validate a location by testing if it returns valid data
  async validateLocation(city: string, state?: string, country: string = 'US'): Promise<{
    valid: boolean;
    location?: string;
    error?: string;
  }> {
    try {
      const weather = await this.getCurrentWeather({ city, state, country });
      return {
        valid: true,
        location: weather.location
      };
    } catch (error) {
      return {
        valid: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

export const weatherService = new WeatherService(); 