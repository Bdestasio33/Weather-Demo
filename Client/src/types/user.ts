export type TemperatureUnit = 'celsius' | 'fahrenheit';

export interface LocationOverride {
  enabled: boolean;
  city: string;
  state: string;
  country: string;
  coordinates?: {
    lat: number;
    lon: number;
  };
}

export interface UserPreferences {
  temperatureUnit: TemperatureUnit;
  locationOverride: LocationOverride;
}

export interface UserContextType {
  preferences: UserPreferences;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  resetPreferences: () => void;
  // Extended localStorage functionality
  isLoaded: boolean;
  lastSaved: Date | null;
  clearStoredData: () => void;
  exportPreferences: () => string;
  importPreferences: (jsonData: string) => boolean;
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  temperatureUnit: 'fahrenheit',
  locationOverride: {
    enabled: true,
    city: 'Pittsburgh',
    state: 'Pennsylvania',
    country: 'US',
  },
}; 