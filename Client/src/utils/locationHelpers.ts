import type { LocationOverride } from '../types/user';

/**
 * Compare two location objects to determine if they represent the same location
 * @param locationA First location to compare
 * @param locationB Second location to compare
 * @returns true if locations are the same, false otherwise
 */
export function locationsEqual(
  locationA: LocationOverride | null | undefined,
  locationB: LocationOverride | null | undefined
): boolean {
  // If both are null/undefined, they're equal
  if (!locationA && !locationB) {
    return true;
  }
  
  // If one is null/undefined and the other isn't, they're not equal
  if (!locationA || !locationB) {
    return false;
  }
  
  // Compare all properties
  return (
    locationA.city === locationB.city &&
    locationA.state === locationB.state &&
    locationA.country === locationB.country &&
    locationA.enabled === locationB.enabled
  );
}

/**
 * Generate a human-readable location string
 * @param location Location object
 * @returns Formatted location string
 */
export function formatLocation(location: LocationOverride): string {
  if (!location.enabled) {
    return 'Default location';
  }
  
  const parts = [location.city];
  if (location.state) {
    parts.push(location.state);
  }
  if (location.country && location.country !== 'US') {
    parts.push(location.country);
  }
  
  return parts.join(', ');
} 