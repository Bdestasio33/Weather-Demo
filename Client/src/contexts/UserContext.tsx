import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import type { ReactNode } from "react";
import type {
  UserPreferences,
  UserContextType,
  TemperatureUnit,
} from "../types/user";
import { DEFAULT_PREFERENCES } from "../types/user";
import { queryClient, queryKeys } from "../lib/queryClient";
import { toast } from "react-toastify";
import { locationsEqual, formatLocation } from "../utils/locationHelpers";

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

const STORAGE_KEY = "weather-app-preferences";
const STORAGE_VERSION = "1.0"; // For future migration purposes

interface UserProviderProps {
  children: ReactNode;
}

interface StoredData {
  version: string;
  preferences: UserPreferences;
  timestamp: number;
}

export function UserProvider({ children }: UserProviderProps) {
  const [preferences, setPreferences] =
    useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [isLoaded, setIsLoaded] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Validate preferences structure
  const validatePreferences = (prefs: any): prefs is UserPreferences => {
    return (
      typeof prefs === "object" &&
      prefs !== null &&
      typeof prefs.temperatureUnit === "string" &&
      (prefs.temperatureUnit === "celsius" ||
        prefs.temperatureUnit === "fahrenheit")
    );
  };

  // Load preferences from localStorage on mount
  useEffect(() => {
    const loadPreferences = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsedData = JSON.parse(stored) as StoredData;

          // Validate the loaded data
          if (
            parsedData.preferences &&
            validatePreferences(parsedData.preferences)
          ) {
            setPreferences(parsedData.preferences);
            setLastSaved(new Date(parsedData.timestamp));
            console.log(
              "✅ User preferences loaded from localStorage:",
              parsedData.preferences
            );
          } else {
            console.warn(
              "⚠️ Invalid preferences in localStorage, using defaults"
            );
            setPreferences(DEFAULT_PREFERENCES);
          }
        } else {
          console.log("ℹ️ No saved preferences found, using defaults");
          setPreferences(DEFAULT_PREFERENCES);
        }
      } catch (error) {
        console.error(
          "❌ Failed to load user preferences from localStorage:",
          error
        );
        setPreferences(DEFAULT_PREFERENCES);
      } finally {
        setIsLoaded(true);
      }
    };

    loadPreferences();
  }, []);

  // Save preferences to localStorage (only after initial load)
  const savePreferences = useCallback(
    (prefs: UserPreferences) => {
      if (!isLoaded) return; // Don't save during initial load

      try {
        const dataToStore: StoredData = {
          version: STORAGE_VERSION,
          preferences: prefs,
          timestamp: Date.now(),
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
        setLastSaved(new Date());
        console.log("💾 User preferences saved to localStorage:", prefs);
      } catch (error) {
        console.error(
          "❌ Failed to save user preferences to localStorage:",
          error
        );
      }
    },
    [isLoaded]
  );

  // Save preferences whenever they change (after initial load)
  useEffect(() => {
    if (isLoaded) {
      savePreferences(preferences);

      // Sync location override with weather service
      const syncLocationOverride = async () => {
        try {
          const { weatherService } = await import("../services/weatherService");

          if (preferences.locationOverride?.enabled) {
            weatherService.setLocationOverride(preferences.locationOverride);
          } else {
            weatherService.clearLocationOverride();
          }
        } catch (error) {
          console.error("Failed to sync location override:", error);
        }
      };

      syncLocationOverride();
    }
  }, [preferences, isLoaded, savePreferences]);

  const updatePreferences = useCallback((updates: Partial<UserPreferences>) => {
    setPreferences((prev) => {
      const newPreferences = { ...prev, ...updates };
      console.log("🔄 Updating preferences:", updates);

      // Check if location override has changed
      if (updates.locationOverride) {
        const oldLocation = prev.locationOverride;
        const newLocation = updates.locationOverride;

        // Check if location actually changed using utility function
        const locationChanged = !locationsEqual(oldLocation, newLocation);

        if (locationChanged) {
          console.log("📍 Location changed, invalidating weather queries");

          // Invalidate all weather queries to force refetch for the new location
          queryClient.invalidateQueries({
            queryKey: queryKeys.weather.all,
          });

          // Show appropriate toast notification
          const locationStr = formatLocation(newLocation);
          toast.info(`Updating weather data for ${locationStr}...`, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

          // Optionally, you can also remove old location queries from cache
          // This prevents stale data for the old location
          if (oldLocation && oldLocation.enabled) {
            queryClient.removeQueries({
              queryKey: queryKeys.weather.current(oldLocation),
            });
            queryClient.removeQueries({
              queryKey: queryKeys.weather.forecast(oldLocation),
            });
            queryClient.removeQueries({
              queryKey: queryKeys.weather.alerts(oldLocation),
            });
          }
        }
      }

      return newPreferences;
    });
  }, []);

  const resetPreferences = useCallback(() => {
    console.log("🔄 Resetting preferences to defaults");
    setPreferences(DEFAULT_PREFERENCES);
  }, []);

  // Clear all stored data
  const clearStoredData = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setLastSaved(null);
      console.log("🗑️ Cleared stored preferences");
    } catch (error) {
      console.error("❌ Failed to clear stored preferences:", error);
    }
  }, []);

  // Export preferences to JSON (for backup)
  const exportPreferences = useCallback(() => {
    const exportData = {
      preferences,
      exportedAt: new Date().toISOString(),
      version: STORAGE_VERSION,
    };
    return JSON.stringify(exportData, null, 2);
  }, [preferences]);

  // Import preferences from JSON
  const importPreferences = useCallback((jsonData: string) => {
    try {
      const importedData = JSON.parse(jsonData);
      if (validatePreferences(importedData.preferences)) {
        setPreferences(importedData.preferences);
        console.log("📥 Imported preferences:", importedData.preferences);
        return true;
      } else {
        console.error("❌ Invalid preferences format in import data");
        return false;
      }
    } catch (error) {
      console.error("❌ Failed to import preferences:", error);
      return false;
    }
  }, []);

  const value: UserContextType = {
    preferences,
    updatePreferences,
    resetPreferences,
    // Extended functionality
    isLoaded,
    lastSaved,
    clearStoredData,
    exportPreferences,
    importPreferences,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

// Helper hook for temperature unit
export function useTemperatureUnit(): [
  TemperatureUnit,
  (unit: TemperatureUnit) => void
] {
  const { preferences, updatePreferences } = useUser();

  const setTemperatureUnit = useCallback(
    (unit: TemperatureUnit) => {
      updatePreferences({ temperatureUnit: unit });
    },
    [updatePreferences]
  );

  return [preferences.temperatureUnit, setTemperatureUnit];
}
