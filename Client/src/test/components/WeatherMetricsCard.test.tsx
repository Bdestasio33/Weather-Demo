import { screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import WeatherMetricsCard from "../../components/WeatherMetricsCard";
import { renderWithProviders } from "../utils";

// Mock the weather metrics config
vi.mock("../../config/weatherMetricsConfig", () => ({
  getMetricContent: (type: string) => {
    const configs: Record<string, any> = {
      "wind-compass": {
        title: "Wind",
        icon: <div data-testid="wind-icon">Wind Icon</div>,
        value: "12 mph",
        description: "Northwest",
        color: "var(--color-primary-500)",
      },
      "sunrise-sunset": {
        title: "Sun & Moon",
        icon: <div data-testid="sun-icon">Sun Icon</div>,
        value: "6:42 AM",
        description: "Sunrise",
        color: "var(--color-warning-500)",
      },
      humidity: {
        title: "Humidity",
        icon: <div data-testid="humidity-icon">Humidity Icon</div>,
        value: "65%",
        description: "Comfortable",
        color: "var(--color-info-500)",
      },
    };
    return configs[type] || configs.humidity;
  },
}));

// Mock the demo weather data
vi.mock("../../demo/weatherData", () => ({
  demoWeatherMetrics: {
    windDirectionDegrees: 315,
    moonPhase: "Waxing Crescent",
    moonIllumination: 25,
  },
}));

describe("WeatherMetricsCard", () => {
  it("should render metrics card with correct structure", () => {
    renderWithProviders(<WeatherMetricsCard type="humidity" />);

    expect(
      screen.getByTestId("weather-metrics-card-humidity")
    ).toBeInTheDocument();
    expect(screen.getByTestId("metrics-header-humidity")).toBeInTheDocument();
    expect(screen.getByTestId("metrics-title-humidity")).toBeInTheDocument();
    expect(screen.getByTestId("metrics-value-humidity")).toBeInTheDocument();
  });

  it("should display metric title and value", () => {
    renderWithProviders(<WeatherMetricsCard type="humidity" />);

    expect(screen.getByTestId("metrics-title-humidity")).toHaveTextContent(
      "Humidity"
    );
    expect(screen.getByTestId("metrics-value-text-humidity")).toHaveTextContent(
      "65%"
    );
    expect(
      screen.getByTestId("metrics-description-humidity")
    ).toHaveTextContent("Comfortable");
  });

  it("should render metric icon", () => {
    renderWithProviders(<WeatherMetricsCard type="humidity" />);

    expect(screen.getByTestId("humidity-icon")).toBeInTheDocument();
  });

  describe("Wind Compass Type", () => {
    it("should render wind compass with additional elements", () => {
      renderWithProviders(<WeatherMetricsCard type="wind-compass" />);

      expect(
        screen.getByTestId("weather-metrics-card-wind-compass")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("metrics-title-wind-compass")
      ).toHaveTextContent("Wind");
      expect(
        screen.getByTestId("metrics-value-text-wind-compass")
      ).toHaveTextContent("12 mph");
      expect(
        screen.getByTestId("metrics-description-wind-compass")
      ).toHaveTextContent("Northwest");
    });

    it("should display wind compass indicator", () => {
      renderWithProviders(<WeatherMetricsCard type="wind-compass" />);

      expect(screen.getByTestId("wind-compass-indicator")).toBeInTheDocument();
      expect(screen.getByTestId("wind-direction-arrow")).toBeInTheDocument();
    });

    it("should apply correct rotation to wind direction arrow", () => {
      renderWithProviders(<WeatherMetricsCard type="wind-compass" />);

      const arrow = screen.getByTestId("wind-direction-arrow");
      expect(arrow).toHaveStyle({ transform: "rotate(315deg)" });
    });
  });

  describe("Sunrise/Sunset Type", () => {
    it("should render sunrise/sunset with additional details", () => {
      renderWithProviders(<WeatherMetricsCard type="sunrise-sunset" />);

      expect(
        screen.getByTestId("weather-metrics-card-sunrise-sunset")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("metrics-title-sunrise-sunset")
      ).toHaveTextContent("Sun & Moon");
      expect(
        screen.getByTestId("metrics-value-text-sunrise-sunset")
      ).toHaveTextContent("6:42 AM");
      expect(
        screen.getByTestId("metrics-description-sunrise-sunset")
      ).toHaveTextContent("Sunrise");
    });

    it("should display sun details with moon phase and illumination", () => {
      renderWithProviders(<WeatherMetricsCard type="sunrise-sunset" />);

      expect(screen.getByTestId("sun-details")).toBeInTheDocument();
      expect(screen.getByTestId("moon-phase-section")).toBeInTheDocument();
      expect(
        screen.getByTestId("moon-illumination-section")
      ).toBeInTheDocument();
    });

    it("should show correct moon phase and illumination values", () => {
      renderWithProviders(<WeatherMetricsCard type="sunrise-sunset" />);

      expect(screen.getByTestId("moon-phase-value")).toHaveTextContent(
        "Waxing Crescent"
      );
      expect(screen.getByTestId("moon-illumination-value")).toHaveTextContent(
        "25%"
      );
    });
  });

  describe("Generic Metric Type", () => {
    it("should render basic metric without additional elements", () => {
      renderWithProviders(<WeatherMetricsCard type="humidity" />);

      expect(
        screen.getByTestId("weather-metrics-card-humidity")
      ).toBeInTheDocument();
      expect(
        screen.queryByTestId("wind-compass-indicator")
      ).not.toBeInTheDocument();
      expect(screen.queryByTestId("sun-details")).not.toBeInTheDocument();
    });
  });

  it("should have proper accessibility structure", () => {
    renderWithProviders(<WeatherMetricsCard type="humidity" />);

    const card = screen.getByTestId("weather-metrics-card-humidity");
    expect(card).toBeInTheDocument();

    const header = screen.getByTestId("metrics-header-humidity");
    expect(header).toBeInTheDocument();

    const value = screen.getByTestId("metrics-value-humidity");
    expect(value).toBeInTheDocument();
  });

  it("should render different metric types with correct test IDs", () => {
    const { rerender } = renderWithProviders(
      <WeatherMetricsCard type="wind-compass" />
    );
    expect(
      screen.getByTestId("weather-metrics-card-wind-compass")
    ).toBeInTheDocument();

    rerender(<WeatherMetricsCard type="sunrise-sunset" />);
    expect(
      screen.getByTestId("weather-metrics-card-sunrise-sunset")
    ).toBeInTheDocument();

    rerender(<WeatherMetricsCard type="humidity" />);
    expect(
      screen.getByTestId("weather-metrics-card-humidity")
    ).toBeInTheDocument();
  });

  it("should display metric value with correct styling", () => {
    renderWithProviders(<WeatherMetricsCard type="humidity" />);

    const valueText = screen.getByTestId("metrics-value-text-humidity");
    expect(valueText).toBeInTheDocument();
    expect(valueText).toHaveTextContent("65%");
  });
});
