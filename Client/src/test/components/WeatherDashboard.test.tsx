import { screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import WeatherDashboard from "../../components/WeatherDashboard";
import { renderWithProviders } from "../utils";

// Mock the child components
vi.mock("../../components/CurrentWeatherCard", () => ({
  default: () => <div data-testid="current-weather-card">Current Weather</div>,
}));

vi.mock("../../components/WeatherForecastCard", () => ({
  default: () => (
    <div data-testid="weather-forecast-card">Weather Forecast</div>
  ),
}));

vi.mock("../../components/WeatherAlertsCard", () => ({
  default: () => <div data-testid="weather-alerts-card">Weather Alerts</div>,
}));

describe("WeatherDashboard", () => {
  it("should render main dashboard container", () => {
    renderWithProviders(<WeatherDashboard />);

    expect(screen.getByTestId("weather-dashboard")).toBeInTheDocument();
  });

  it("should render dashboard header with correct content", () => {
    renderWithProviders(<WeatherDashboard />);

    expect(screen.getByTestId("weather-dashboard-header")).toBeInTheDocument();
    expect(screen.getByTestId("dashboard-title")).toBeInTheDocument();
    expect(screen.getByTestId("dashboard-subtitle")).toBeInTheDocument();
  });

  it("should display correct dashboard title", () => {
    renderWithProviders(<WeatherDashboard />);

    expect(screen.getByTestId("dashboard-title")).toHaveTextContent(
      "Weather Dashboard"
    );
  });

  it("should display correct dashboard subtitle", () => {
    renderWithProviders(<WeatherDashboard />);

    expect(screen.getByTestId("dashboard-subtitle")).toHaveTextContent(
      "Real-time weather information and forecasts"
    );
  });

  it("should render dashboard grid container", () => {
    renderWithProviders(<WeatherDashboard />);

    expect(screen.getByTestId("dashboard-grid")).toBeInTheDocument();
  });

  it("should render all dashboard sections", () => {
    renderWithProviders(<WeatherDashboard />);

    expect(screen.getByTestId("current-weather-section")).toBeInTheDocument();
    expect(screen.getByTestId("forecast-section")).toBeInTheDocument();
    expect(screen.getByTestId("alerts-section")).toBeInTheDocument();
  });

  it("should render current weather card component", () => {
    renderWithProviders(<WeatherDashboard />);

    expect(screen.getByTestId("current-weather-card")).toBeInTheDocument();
    expect(screen.getByTestId("current-weather-card")).toHaveTextContent(
      "Current Weather"
    );
  });

  it("should render weather forecast card component", () => {
    renderWithProviders(<WeatherDashboard />);

    expect(screen.getByTestId("weather-forecast-card")).toBeInTheDocument();
    expect(screen.getByTestId("weather-forecast-card")).toHaveTextContent(
      "Weather Forecast"
    );
  });

  it("should render weather alerts card component", () => {
    renderWithProviders(<WeatherDashboard />);

    expect(screen.getByTestId("weather-alerts-card")).toBeInTheDocument();
    expect(screen.getByTestId("weather-alerts-card")).toHaveTextContent(
      "Weather Alerts"
    );
  });

  it("should have proper dashboard structure hierarchy", () => {
    renderWithProviders(<WeatherDashboard />);

    const dashboard = screen.getByTestId("weather-dashboard");
    const header = screen.getByTestId("weather-dashboard-header");
    const grid = screen.getByTestId("dashboard-grid");

    expect(dashboard).toBeInTheDocument();
    expect(dashboard).toContainElement(header);
    expect(dashboard).toContainElement(grid);
  });

  it("should render all weather cards within their sections", () => {
    renderWithProviders(<WeatherDashboard />);

    const currentSection = screen.getByTestId("current-weather-section");
    const forecastSection = screen.getByTestId("forecast-section");
    const alertsSection = screen.getByTestId("alerts-section");

    expect(currentSection).toContainElement(
      screen.getByTestId("current-weather-card")
    );
    expect(forecastSection).toContainElement(
      screen.getByTestId("weather-forecast-card")
    );
    expect(alertsSection).toContainElement(
      screen.getByTestId("weather-alerts-card")
    );
  });

  it("should have proper accessibility structure", () => {
    renderWithProviders(<WeatherDashboard />);

    const dashboard = screen.getByTestId("weather-dashboard");
    expect(dashboard).toBeInTheDocument();

    const title = screen.getByTestId("dashboard-title");
    expect(title).toBeInTheDocument();

    const subtitle = screen.getByTestId("dashboard-subtitle");
    expect(subtitle).toBeInTheDocument();
  });
});
