import { screen } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import WeatherAlertsCard from "../../components/WeatherAlertsCard";
import { renderWithProviders } from "../utils";

// Mock the weather data module with inline data to avoid hoisting issues
vi.mock("../../demo/weatherData", () => ({
  demoAlerts: [
    {
      id: "alert-1",
      title: "Heat Advisory",
      description:
        "Dangerous heat conditions expected. Heat index values up to 105°F possible.",
      severity: "moderate",
      startTime: "2024-01-15T14:00:00Z",
      endTime: "2024-01-15T20:00:00Z",
      areas: ["Downtown", "Suburbs"],
    },
    {
      id: "alert-2",
      title: "Severe Thunderstorm Warning",
      description:
        "Damaging winds and large hail possible. Seek shelter immediately.",
      severity: "severe",
      startTime: "2024-01-15T16:00:00Z",
      endTime: "2024-01-15T18:00:00Z",
      areas: ["North County", "East Side"],
    },
  ],
}));

describe("WeatherAlertsCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render alerts card with correct structure", () => {
    renderWithProviders(<WeatherAlertsCard />);

    expect(screen.getByTestId("weather-alerts-card")).toBeInTheDocument();
    expect(screen.getByTestId("weather-alerts-header")).toBeInTheDocument();
    expect(screen.getByTestId("weather-alerts-title")).toBeInTheDocument();
    expect(screen.getByTestId("alerts-container")).toBeInTheDocument();
  });

  it("should display correct alerts title", () => {
    renderWithProviders(<WeatherAlertsCard />);

    expect(screen.getByTestId("weather-alerts-title")).toHaveTextContent(
      "Weather Alerts"
    );
  });

  it("should render individual alert items", () => {
    renderWithProviders(<WeatherAlertsCard />);

    expect(screen.getByTestId("weather-alert-alert-1")).toBeInTheDocument();
    expect(screen.getByTestId("weather-alert-alert-2")).toBeInTheDocument();
  });

  it("should display alert titles and descriptions", () => {
    renderWithProviders(<WeatherAlertsCard />);

    expect(screen.getByTestId("alert-title-alert-1")).toHaveTextContent(
      "Heat Advisory"
    );
    expect(screen.getByTestId("alert-description-alert-1")).toHaveTextContent(
      "Dangerous heat conditions expected. Heat index values up to 105°F possible."
    );

    expect(screen.getByTestId("alert-title-alert-2")).toHaveTextContent(
      "Severe Thunderstorm Warning"
    );
    expect(screen.getByTestId("alert-description-alert-2")).toHaveTextContent(
      "Damaging winds and large hail possible. Seek shelter immediately."
    );
  });

  it("should display alert severity chips", () => {
    renderWithProviders(<WeatherAlertsCard />);

    expect(screen.getByTestId("alert-severity-alert-1")).toBeInTheDocument();
    expect(screen.getByTestId("alert-severity-alert-1")).toHaveTextContent(
      "MODERATE"
    );

    expect(screen.getByTestId("alert-severity-alert-2")).toBeInTheDocument();
    expect(screen.getByTestId("alert-severity-alert-2")).toHaveTextContent(
      "SEVERE"
    );
  });

  it("should display alert metadata with time and location", () => {
    renderWithProviders(<WeatherAlertsCard />);

    expect(screen.getByTestId("alert-metadata-alert-1")).toBeInTheDocument();
    expect(screen.getByTestId("alert-time-alert-1")).toBeInTheDocument();
    expect(screen.getByTestId("alert-location-alert-1")).toBeInTheDocument();
    expect(screen.getByTestId("alert-location-alert-1")).toHaveTextContent(
      "Downtown, Suburbs"
    );

    expect(screen.getByTestId("alert-metadata-alert-2")).toBeInTheDocument();
    expect(screen.getByTestId("alert-time-alert-2")).toBeInTheDocument();
    expect(screen.getByTestId("alert-location-alert-2")).toBeInTheDocument();
    expect(screen.getByTestId("alert-location-alert-2")).toHaveTextContent(
      "North County, East Side"
    );
  });

  it("should render alert headers with titles and severity", () => {
    renderWithProviders(<WeatherAlertsCard />);

    expect(screen.getByTestId("alert-header-alert-1")).toBeInTheDocument();
    expect(screen.getByTestId("alert-header-alert-2")).toBeInTheDocument();
  });

  it("should have proper accessibility structure", () => {
    renderWithProviders(<WeatherAlertsCard />);

    const card = screen.getByTestId("weather-alerts-card");
    expect(card).toBeInTheDocument();

    const header = screen.getByTestId("weather-alerts-header");
    expect(header).toBeInTheDocument();

    const title = screen.getByTestId("weather-alerts-title");
    expect(title).toBeInTheDocument();
  });

  it("should render alerts container when alerts are present", () => {
    renderWithProviders(<WeatherAlertsCard />);

    expect(screen.getByTestId("alerts-container")).toBeInTheDocument();
    expect(screen.queryByTestId("no-alerts-container")).not.toBeInTheDocument();
  });
});
