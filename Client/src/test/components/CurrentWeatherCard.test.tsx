import { screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import CurrentWeatherCard from "../../components/CurrentWeatherCard";
import { renderWithProviders } from "../utils";

// Simple mock for the weather hook that returns loading state
vi.mock("../../hooks/api/weather", () => ({
  useCurrentWeather: () => ({
    data: null,
    isLoading: true,
    isError: false,
    error: null,
  }),
}));

// Simple mock for user context
vi.mock("../../contexts/UserContext", () => ({
  useUser: () => ({
    preferences: {
      temperatureUnit: "celsius",
      locationOverride: {
        enabled: true,
        city: "Test City",
        state: "Test State",
        country: "Test Country",
      },
    },
    isLoaded: true,
  }),
  useTemperatureUnit: () => ["celsius", vi.fn()],
}));

describe("CurrentWeatherCard", () => {
  it("should render the component", () => {
    renderWithProviders(<CurrentWeatherCard />);

    // Test that the component renders without crashing
    expect(screen.getByTestId("current-weather-loading")).toBeInTheDocument();
  });

  it("should display loading state", () => {
    renderWithProviders(<CurrentWeatherCard />);

    expect(screen.getByTestId("current-weather-loading")).toBeInTheDocument();
    expect(screen.getByTestId("loading-container")).toBeInTheDocument();
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    expect(screen.getByTestId("loading-text")).toBeInTheDocument();
  });

  it("should display correct loading text", () => {
    renderWithProviders(<CurrentWeatherCard />);

    expect(screen.getByTestId("loading-text")).toHaveTextContent(
      "Loading weather data..."
    );
  });
});
