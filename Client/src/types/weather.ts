export interface CurrentWeather {
  location: string;
  temperature: number;
  temperatureF: number;
  condition: string;
  summary: string;
  humidity: number;
  windSpeed: number;
  timestamp: string;
}

export interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
  condition: string;
}

export interface WeatherAlert {
  type: string;
  message: string;
  severity: number;
  expiresAt: string;
} 