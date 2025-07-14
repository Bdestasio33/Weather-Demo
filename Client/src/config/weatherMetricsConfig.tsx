import type { ReactNode } from "react";
import {
  WaterDrop as WaterDropIcon,
  WbSunny as WbSunnyIcon,
  TrendingUp as TrendingUpIcon,
  Visibility as VisibilityIcon,
  Explore as ExploreIcon,
  WbTwilight as WbTwilightIcon,
  Inventory as InventoryIcon,
} from "@mui/icons-material";
import { demoWeatherMetrics } from "../demo/weatherData";

export type MetricType =
  | "humidity"
  | "uv-index"
  | "air-pressure"
  | "visibility"
  | "wind-compass"
  | "sunrise-sunset";

export interface MetricConfig {
  icon: ReactNode;
  title: string;
  value: string;
  description: string;
  color: string;
}

const styles = {
  metricIcon: {
    fontSize: "1.5rem",
    mr: 2,
    color: "var(--color-primary-500)",
  },
};

export const getMetricContent = (type: MetricType): MetricConfig => {
  switch (type) {
    case "humidity":
      return {
        icon: <WaterDropIcon sx={styles.metricIcon} />,
        title: "Humidity",
        value: `${demoWeatherMetrics.humidity}%`,
        description: "Relative humidity",
        color: "var(--color-blue-500)",
      };
    case "uv-index":
      return {
        icon: <WbSunnyIcon sx={styles.metricIcon} />,
        title: "UV Index",
        value: demoWeatherMetrics.uvIndex.toString(),
        description: demoWeatherMetrics.uvLevel,
        color: "var(--color-yellow-500)",
      };
    case "air-pressure":
      return {
        icon: <TrendingUpIcon sx={styles.metricIcon} />,
        title: "Air Pressure",
        value: `${demoWeatherMetrics.airPressure}`,
        description: `${demoWeatherMetrics.airPressureTrend} trend`,
        color: "var(--color-purple-500)",
      };
    case "visibility":
      return {
        icon: <VisibilityIcon sx={styles.metricIcon} />,
        title: "Visibility",
        value: `${demoWeatherMetrics.visibility} mi`,
        description: demoWeatherMetrics.visibilityCondition,
        color: "var(--color-green-500)",
      };
    case "wind-compass":
      return {
        icon: <ExploreIcon sx={styles.metricIcon} />,
        title: "Wind",
        value: `${demoWeatherMetrics.windSpeed} mph`,
        description: demoWeatherMetrics.windDirection,
        color: "var(--color-cyan-500)",
      };
    case "sunrise-sunset":
      return {
        icon: <WbTwilightIcon sx={styles.metricIcon} />,
        title: "Sun Times",
        value: demoWeatherMetrics.sunrise,
        description: `Sunset: ${demoWeatherMetrics.sunset}`,
        color: "var(--color-orange-500)",
      };
    default:
      return {
        icon: <InventoryIcon sx={styles.metricIcon} />,
        title: "Metric",
        value: "N/A",
        description: "No data",
        color: "var(--color-gray-500)",
      };
  }
};

export const METRIC_TYPES: MetricType[] = [
  "humidity",
  "uv-index",
  "air-pressure",
  "visibility",
  "wind-compass",
  "sunrise-sunset",
];
