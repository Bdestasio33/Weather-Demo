// Demo weather data for widgets that don't have real API integration yet

export interface ForecastDay {
  date: string;
  dayOfWeek: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  precipitationChance: number;
}

export interface WeatherAlert {
  id: string;
  title: string;
  description: string;
  severity: 'minor' | 'moderate' | 'severe' | 'extreme';
  startTime: string;
  endTime: string;
  areas: string[];
}

export interface TemperatureDataPoint {
  time: string;
  temperature: number;
  feelsLike: number;
}

// 5-day forecast demo data
export const demoForecast: ForecastDay[] = [
  {
    date: '2024-01-17',
    dayOfWeek: 'Today',
    high: 75,
    low: 58,
    condition: 'Cloudy',
    icon: '☁️',
    humidity: 65,
    windSpeed: 8,
    windDirection: 'NW',
    precipitationChance: 20,
  },
  {
    date: '2024-01-18',
    dayOfWeek: 'Thu',
    high: 72,
    low: 55,
    condition: 'Partly Cloudy',
    icon: '⛅',
    humidity: 58,
    windSpeed: 12,
    windDirection: 'W',
    precipitationChance: 10,
  },
  {
    date: '2024-01-19',
    dayOfWeek: 'Fri',
    high: 78,
    low: 62,
    condition: 'Sunny',
    icon: '☀️',
    humidity: 45,
    windSpeed: 6,
    windDirection: 'SW',
    precipitationChance: 0,
  },
  {
    date: '2024-01-20',
    dayOfWeek: 'Sat',
    high: 81,
    low: 65,
    condition: 'Sunny',
    icon: '☀️',
    humidity: 42,
    windSpeed: 4,
    windDirection: 'S',
    precipitationChance: 0,
  },
  {
    date: '2024-01-21',
    dayOfWeek: 'Sun',
    high: 68,
    low: 52,
    condition: 'Thunderstorms',
    icon: '⛈️',
    humidity: 78,
    windSpeed: 15,
    windDirection: 'N',
    precipitationChance: 85,
  },
];

// Weather alerts demo data
export const demoAlerts: WeatherAlert[] = [
  {
    id: 'alert-1',
    title: 'Severe Thunderstorm Watch',
    description: 'Severe thunderstorms possible this evening. Large hail and damaging winds are the primary threats.',
    severity: 'moderate',
    startTime: '2024-01-17T18:00:00Z',
    endTime: '2024-01-18T02:00:00Z',
    areas: ['Allegheny County', 'Westmoreland County'],
  },
];

// 24-hour temperature trend demo data
export const demoTemperatureTrend: TemperatureDataPoint[] = [
  { time: '12:00 AM', temperature: 62, feelsLike: 65 },
  { time: '1:00 AM', temperature: 61, feelsLike: 64 },
  { time: '2:00 AM', temperature: 59, feelsLike: 62 },
  { time: '3:00 AM', temperature: 58, feelsLike: 61 },
  { time: '4:00 AM', temperature: 57, feelsLike: 60 },
  { time: '5:00 AM', temperature: 56, feelsLike: 59 },
  { time: '6:00 AM', temperature: 58, feelsLike: 61 },
  { time: '7:00 AM', temperature: 62, feelsLike: 65 },
  { time: '8:00 AM', temperature: 66, feelsLike: 69 },
  { time: '9:00 AM', temperature: 69, feelsLike: 72 },
  { time: '10:00 AM', temperature: 72, feelsLike: 75 },
  { time: '11:00 AM', temperature: 74, feelsLike: 77 },
  { time: '12:00 PM', temperature: 75, feelsLike: 78 },
  { time: '1:00 PM', temperature: 76, feelsLike: 79 },
  { time: '2:00 PM', temperature: 75, feelsLike: 78 },
  { time: '3:00 PM', temperature: 74, feelsLike: 77 },
  { time: '4:00 PM', temperature: 72, feelsLike: 75 },
  { time: '5:00 PM', temperature: 70, feelsLike: 73 },
  { time: '6:00 PM', temperature: 68, feelsLike: 71 },
  { time: '7:00 PM', temperature: 66, feelsLike: 69 },
  { time: '8:00 PM', temperature: 64, feelsLike: 67 },
  { time: '9:00 PM', temperature: 63, feelsLike: 66 },
  { time: '10:00 PM', temperature: 62, feelsLike: 65 },
  { time: '11:00 PM', temperature: 61, feelsLike: 64 },
];

// Other weather metrics demo data
export const demoWeatherMetrics = {
  humidity: 65,
  windSpeed: 8,
  windDirection: 'NW',
  windDirectionDegrees: 315,
  windGust: 12,
  uvIndex: 6,
  uvLevel: 'High',
  airPressure: 30.15,
  airPressureTrend: 'steady',
  visibility: 10,
  visibilityCondition: 'Clear',
  sunrise: '7:42 AM',
  sunset: '5:48 PM',
  moonPhase: 'Waxing Gibbous',
  moonIllumination: 78,
}; 