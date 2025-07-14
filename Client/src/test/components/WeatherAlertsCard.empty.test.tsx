import { screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import WeatherAlertsCard from "../../components/WeatherAlertsCard";
import { renderWithProviders } from "../utils";

// Mock the weather data module with empty alerts
vi.mock("../../demo/weatherData", () => ({
  demoAlerts: [],
}));

describe("WeatherAlertsCard - Empty State", () => {
  it("should render no alerts state", () => {
    renderWithProviders(<WeatherAlertsCard />);

    expect(screen.getByTestId("weather-alerts-card")).toBeInTheDocument();
    expect(screen.getByTestId("weather-alerts-header")).toBeInTheDocument();
    expect(screen.getByTestId("no-alerts-container")).toBeInTheDocument();
  });

  it("should display no alerts message", () => {
    renderWithProviders(<WeatherAlertsCard />);

    expect(screen.getByTestId("no-alerts-title")).toBeInTheDocument();
    expect(screen.getByTestId("no-alerts-title")).toHaveTextContent(
      "No active weather alerts"
    );

    expect(screen.getByTestId("no-alerts-description")).toBeInTheDocument();
    expect(screen.getByTestId("no-alerts-description")).toHaveTextContent(
      "Your area is currently clear of weather warnings"
    );
  });

  it("should not render alerts container when no alerts", () => {
    renderWithProviders(<WeatherAlertsCard />);

    expect(screen.queryByTestId("alerts-container")).not.toBeInTheDocument();
  });

  it("should still render header and title when no alerts", () => {
    renderWithProviders(<WeatherAlertsCard />);

    expect(screen.getByTestId("weather-alerts-header")).toBeInTheDocument();
    expect(screen.getByTestId("weather-alerts-title")).toHaveTextContent(
      "Weather Alerts"
    );
  });
});
