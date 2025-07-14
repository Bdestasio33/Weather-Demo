import type { WidgetConfig, WidgetType } from "../types/dashboard";

/**
 * Widget configurations defining available widgets, their properties, and constraints
 */
export const WIDGET_CONFIGS: WidgetConfig[] = [
  {
    id: "current-weather",
    type: "current-weather",
    title: "Current Weather",
    description: "Real-time weather conditions",
    icon: "current-weather",
    size: "xl",
    minSize: "md",
    maxSize: "xl",
  },
  {
    id: "weather-forecast",
    type: "weather-forecast",
    title: "5-Day Forecast",
    description: "Extended weather forecast",
    icon: "weather-forecast",
    size: "xl",
    minSize: "lg",
    maxSize: "xl",
  },
  {
    id: "weather-alerts",
    type: "weather-alerts",
    title: "Weather Alerts",
    description: "Active weather warnings",
    icon: "weather-alerts",
    size: "md",
    minSize: "sm",
    maxSize: "lg",
  },
  {
    id: "temperature-chart",
    type: "temperature-chart",
    title: "Temperature Trend",
    description: "24-hour temperature chart",
    icon: "temperature-chart",
    size: "lg",
    minSize: "md",
    maxSize: "xl",
  },
  {
    id: "humidity-meter",
    type: "humidity-meter",
    title: "Humidity",
    description: "Current humidity level",
    icon: "humidity-meter",
    size: "sm",
    minSize: "sm",
    maxSize: "md",
  },
  {
    id: "wind-compass",
    type: "wind-compass",
    title: "Wind Direction",
    description: "Wind speed and direction",
    icon: "wind-compass",
    size: "md",
    minSize: "sm",
    maxSize: "lg",
  },
  {
    id: "uv-index",
    type: "uv-index",
    title: "UV Index",
    description: "Current UV radiation level",
    icon: "uv-index",
    size: "sm",
    minSize: "sm",
    maxSize: "md",
  },
  {
    id: "air-pressure",
    type: "air-pressure",
    title: "Air Pressure",
    description: "Atmospheric pressure",
    icon: "air-pressure",
    size: "sm",
    minSize: "sm",
    maxSize: "md",
  },
  {
    id: "visibility",
    type: "visibility",
    title: "Visibility",
    description: "Current visibility distance",
    icon: "visibility",
    size: "sm",
    minSize: "sm",
    maxSize: "md",
  },
  {
    id: "sunrise-sunset",
    type: "sunrise-sunset",
    title: "Sun Times",
    description: "Sunrise and sunset times",
    icon: "sunrise-sunset",
    size: "md",
    minSize: "sm",
    maxSize: "lg",
  },
];

/**
 * Helper function to get widget configuration by type
 */
export function getWidgetConfig(type: string): WidgetConfig | undefined {
  return WIDGET_CONFIGS.find(config => config.type === type);
}

/**
 * Helper function to get all available widget types
 */
export function getAvailableWidgetTypes(): string[] {
  return WIDGET_CONFIGS.map(config => config.type);
} 