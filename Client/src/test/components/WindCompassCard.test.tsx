import { screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import WindCompassCard from "../../components/WindCompassCard";
import { renderWithProviders } from "../utils";

// Mock the demo weather data
vi.mock("../../demo/weatherData", () => ({
  demoWeatherMetrics: {
    windSpeed: 12,
    windDirection: "Northwest",
    windDirectionDegrees: 315,
    windGust: 18,
  },
}));

describe("WindCompassCard", () => {
  it("should render wind compass card with correct structure", () => {
    renderWithProviders(<WindCompassCard />);

    expect(screen.getByTestId("wind-compass-card")).toBeInTheDocument();
    expect(screen.getByTestId("wind-compass-header")).toBeInTheDocument();
    expect(screen.getByTestId("wind-compass-title")).toBeInTheDocument();
    expect(screen.getByTestId("compass-container")).toBeInTheDocument();
  });

  it("should display correct wind compass title", () => {
    renderWithProviders(<WindCompassCard />);

    expect(screen.getByTestId("wind-compass-title")).toHaveTextContent(
      "Wind Compass"
    );
  });

  it("should render wind compass with cardinal directions", () => {
    renderWithProviders(<WindCompassCard />);

    expect(screen.getByTestId("wind-compass")).toBeInTheDocument();
    expect(screen.getByTestId("cardinal-north")).toBeInTheDocument();
    expect(screen.getByTestId("cardinal-east")).toBeInTheDocument();
    expect(screen.getByTestId("cardinal-south")).toBeInTheDocument();
    expect(screen.getByTestId("cardinal-west")).toBeInTheDocument();
  });

  it("should display correct cardinal direction labels", () => {
    renderWithProviders(<WindCompassCard />);

    expect(screen.getByTestId("cardinal-north")).toHaveTextContent("N");
    expect(screen.getByTestId("cardinal-east")).toHaveTextContent("E");
    expect(screen.getByTestId("cardinal-south")).toHaveTextContent("S");
    expect(screen.getByTestId("cardinal-west")).toHaveTextContent("W");
  });

  it("should render wind direction arrow with correct rotation", () => {
    renderWithProviders(<WindCompassCard />);

    const arrow = screen.getByTestId("wind-direction-arrow");
    expect(arrow).toBeInTheDocument();
    expect(arrow).toHaveStyle({ transform: "rotate(315deg)" });
  });

  it("should display compass center dot", () => {
    renderWithProviders(<WindCompassCard />);

    expect(screen.getByTestId("compass-center")).toBeInTheDocument();
  });

  it("should display wind speed value and unit", () => {
    renderWithProviders(<WindCompassCard />);

    expect(screen.getByTestId("wind-speed-container")).toBeInTheDocument();
    expect(screen.getByTestId("wind-speed-value")).toBeInTheDocument();
    expect(screen.getByTestId("wind-speed-unit")).toBeInTheDocument();

    expect(screen.getByTestId("wind-speed-value")).toHaveTextContent("12");
    expect(screen.getByTestId("wind-speed-unit")).toHaveTextContent("mph");
  });

  it("should display wind direction text", () => {
    renderWithProviders(<WindCompassCard />);

    expect(screen.getByTestId("wind-direction-text")).toBeInTheDocument();
    expect(screen.getByTestId("wind-direction-text")).toHaveTextContent(
      "Northwest"
    );
  });

  describe("With details enabled (default)", () => {
    it("should show wind details section", () => {
      renderWithProviders(<WindCompassCard />);

      expect(screen.getByTestId("wind-details")).toBeInTheDocument();
      expect(screen.getByTestId("wind-gust-section")).toBeInTheDocument();
      expect(screen.getByTestId("wind-speed-section")).toBeInTheDocument();
    });

    it("should display wind gust information", () => {
      renderWithProviders(<WindCompassCard />);

      expect(screen.getByTestId("wind-gust-label")).toHaveTextContent("Gusts");
      expect(screen.getByTestId("wind-gust-value")).toHaveTextContent("18 mph");
    });

    it("should display wind speed information", () => {
      renderWithProviders(<WindCompassCard />);

      expect(screen.getByTestId("wind-speed-label")).toHaveTextContent("Speed");
      expect(screen.getByTestId("wind-speed-detail")).toHaveTextContent(
        "12 mph"
      );
    });
  });

  describe("With details disabled", () => {
    it("should not show wind details section", () => {
      renderWithProviders(<WindCompassCard showDetails={false} />);

      expect(screen.queryByTestId("wind-details")).not.toBeInTheDocument();
      expect(screen.queryByTestId("wind-gust-section")).not.toBeInTheDocument();
      expect(
        screen.queryByTestId("wind-speed-section")
      ).not.toBeInTheDocument();
    });
  });

  describe("Different sizes", () => {
    it("should render with small size", () => {
      renderWithProviders(<WindCompassCard size="small" />);

      expect(screen.getByTestId("wind-compass")).toBeInTheDocument();
      // Size is applied via CSS, so we can't easily test the actual size
      // but we can verify the component renders without error
    });

    it("should render with medium size (default)", () => {
      renderWithProviders(<WindCompassCard size="medium" />);

      expect(screen.getByTestId("wind-compass")).toBeInTheDocument();
    });

    it("should render with large size", () => {
      renderWithProviders(<WindCompassCard size="large" />);

      expect(screen.getByTestId("wind-compass")).toBeInTheDocument();
    });
  });

  it("should have proper accessibility structure", () => {
    renderWithProviders(<WindCompassCard />);

    const card = screen.getByTestId("wind-compass-card");
    expect(card).toBeInTheDocument();

    const header = screen.getByTestId("wind-compass-header");
    expect(header).toBeInTheDocument();

    const container = screen.getByTestId("compass-container");
    expect(container).toBeInTheDocument();
  });

  it("should render all compass elements together", () => {
    renderWithProviders(<WindCompassCard />);

    // All main elements should be present
    expect(screen.getByTestId("wind-compass")).toBeInTheDocument();
    expect(screen.getByTestId("wind-direction-arrow")).toBeInTheDocument();
    expect(screen.getByTestId("compass-center")).toBeInTheDocument();
    expect(screen.getByTestId("wind-speed-container")).toBeInTheDocument();
    expect(screen.getByTestId("wind-direction-text")).toBeInTheDocument();
  });

  it("should display wind metrics with correct values", () => {
    renderWithProviders(<WindCompassCard />);

    // Wind speed should be displayed correctly
    expect(screen.getByTestId("wind-speed-value")).toHaveTextContent("12");
    expect(screen.getByTestId("wind-speed-unit")).toHaveTextContent("mph");

    // Direction should be shown
    expect(screen.getByTestId("wind-direction-text")).toHaveTextContent(
      "Northwest"
    );

    // Details should show gust and speed
    expect(screen.getByTestId("wind-gust-value")).toHaveTextContent("18 mph");
    expect(screen.getByTestId("wind-speed-detail")).toHaveTextContent("12 mph");
  });

  it("should render with default props when no props provided", () => {
    renderWithProviders(<WindCompassCard />);

    // Should show details by default
    expect(screen.getByTestId("wind-details")).toBeInTheDocument();

    // Should render compass with default size
    expect(screen.getByTestId("wind-compass")).toBeInTheDocument();
  });
});
