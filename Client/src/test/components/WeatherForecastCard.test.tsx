import { screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import WeatherForecastCard from "../../components/WeatherForecastCard";
import { renderWithProviders } from "../utils";

describe("WeatherForecastCard", () => {
  it("should render forecast card with correct test IDs", () => {
    renderWithProviders(<WeatherForecastCard />);

    // Check main card
    expect(screen.getByTestId("weather-forecast-card")).toBeInTheDocument();
    expect(screen.getByTestId("forecast-header")).toBeInTheDocument();
    expect(screen.getByTestId("forecast-title")).toBeInTheDocument();
    expect(screen.getByTestId("forecast-grid")).toBeInTheDocument();
  });

  it("should display forecast title", () => {
    renderWithProviders(<WeatherForecastCard />);

    expect(screen.getByTestId("forecast-title")).toHaveTextContent(
      "5-Day Forecast"
    );
  });

  it("should render all forecast days with correct test IDs", () => {
    renderWithProviders(<WeatherForecastCard />);

    // Check that forecast days are rendered (assuming 5 days)
    for (let i = 0; i < 5; i++) {
      expect(screen.getByTestId(`forecast-day-${i}`)).toBeInTheDocument();
      expect(screen.getByTestId(`day-name-${i}`)).toBeInTheDocument();
      expect(screen.getByTestId(`weather-icon-${i}`)).toBeInTheDocument();
      expect(screen.getByTestId(`condition-${i}`)).toBeInTheDocument();
      expect(screen.getByTestId(`temperature-${i}`)).toBeInTheDocument();
      expect(screen.getByTestId(`additional-info-${i}`)).toBeInTheDocument();
      expect(screen.getByTestId(`precipitation-${i}`)).toBeInTheDocument();
      expect(screen.getByTestId(`wind-speed-${i}`)).toBeInTheDocument();
    }
  });

  it("should display weather information for each day", () => {
    renderWithProviders(<WeatherForecastCard />);

    // Check first day has content
    expect(screen.getByTestId("day-name-0")).toBeInTheDocument();
    expect(screen.getByTestId("condition-0")).toBeInTheDocument();
    expect(screen.getByTestId("temperature-0")).toBeInTheDocument();
  });
});
