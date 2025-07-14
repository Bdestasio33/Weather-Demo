import { screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import TemperatureChartCard from "../../components/TemperatureChartCard";
import { renderWithProviders } from "../utils";

// Mock the demo data
vi.mock("../../demo/weatherData", () => ({
  demoTemperatureTrend: [
    { temperature: 68, feelsLike: 70, time: "12:00 AM" },
    { temperature: 65, feelsLike: 67, time: "3:00 AM" },
    { temperature: 72, feelsLike: 74, time: "6:00 AM" },
    { temperature: 78, feelsLike: 80, time: "9:00 AM" },
    { temperature: 82, feelsLike: 85, time: "12:00 PM" },
    { temperature: 85, feelsLike: 88, time: "3:00 PM" },
    { temperature: 83, feelsLike: 86, time: "6:00 PM" },
    { temperature: 75, feelsLike: 77, time: "9:00 PM" },
    { temperature: 70, feelsLike: 72, time: "11:00 PM" },
  ],
}));

describe("TemperatureChartCard", () => {
  it("should render temperature chart card with correct structure", () => {
    renderWithProviders(<TemperatureChartCard />);

    expect(screen.getByTestId("temperature-chart-card")).toBeInTheDocument();
    expect(screen.getByTestId("temperature-chart-header")).toBeInTheDocument();
    expect(screen.getByTestId("temperature-chart-title")).toBeInTheDocument();
    expect(
      screen.getByTestId("temperature-chart-container")
    ).toBeInTheDocument();
  });

  it("should display correct chart title", () => {
    renderWithProviders(<TemperatureChartCard />);

    expect(screen.getByTestId("temperature-chart-title")).toHaveTextContent(
      "Temperature Trend"
    );
  });

  it("should render legend with description and items", () => {
    renderWithProviders(<TemperatureChartCard />);

    expect(screen.getByTestId("temperature-chart-legend")).toBeInTheDocument();
    expect(screen.getByTestId("chart-description")).toBeInTheDocument();
    expect(screen.getByTestId("chart-description")).toHaveTextContent(
      "24-hour temperature chart"
    );

    expect(screen.getByTestId("temperature-legend-item")).toBeInTheDocument();
    expect(screen.getByTestId("feels-like-legend-item")).toBeInTheDocument();
  });

  it("should render SVG chart with correct structure", () => {
    renderWithProviders(<TemperatureChartCard />);

    const svg = screen.getByTestId("temperature-chart-svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("width", "100%");
    expect(svg).toHaveAttribute("height", "100%");
    expect(svg).toHaveAttribute("viewBox", "0 0 600 200");
  });

  it("should render temperature and feels-like lines", () => {
    renderWithProviders(<TemperatureChartCard />);

    expect(screen.getByTestId("temperature-line")).toBeInTheDocument();
    expect(screen.getByTestId("feels-like-line")).toBeInTheDocument();
  });

  it("should render temperature data points", () => {
    renderWithProviders(<TemperatureChartCard />);

    // Should have 9 data points based on mock data
    expect(screen.getByTestId("temperature-point-0")).toBeInTheDocument();
    expect(screen.getByTestId("temperature-point-1")).toBeInTheDocument();
    expect(screen.getByTestId("temperature-point-8")).toBeInTheDocument();
  });

  it("should display temperature labels with high and low values", () => {
    renderWithProviders(<TemperatureChartCard />);

    expect(screen.getByTestId("temperature-labels")).toBeInTheDocument();
    expect(screen.getByTestId("high-temp-label")).toBeInTheDocument();
    expect(screen.getByTestId("low-temp-label")).toBeInTheDocument();

    // Based on mock data, high should be 85°F, low should be 65°F
    expect(screen.getByTestId("high-temp-label")).toHaveTextContent(
      "High: 85°F"
    );
    expect(screen.getByTestId("low-temp-label")).toHaveTextContent("Low: 65°F");
  });

  it("should render time labels", () => {
    renderWithProviders(<TemperatureChartCard />);

    expect(screen.getByTestId("time-labels")).toBeInTheDocument();
    expect(screen.getByTestId("start-time-label")).toBeInTheDocument();
    expect(screen.getByTestId("current-temp-label")).toBeInTheDocument();
    expect(screen.getByTestId("end-time-label")).toBeInTheDocument();

    expect(screen.getByTestId("start-time-label")).toHaveTextContent(
      "12:00 AM"
    );
    expect(screen.getByTestId("end-time-label")).toHaveTextContent("11:00 PM");
    expect(screen.getByTestId("current-temp-label")).toHaveTextContent(
      "Current: 70°F"
    );
  });

  it("should have proper accessibility structure", () => {
    renderWithProviders(<TemperatureChartCard />);

    const card = screen.getByTestId("temperature-chart-card");
    expect(card).toBeInTheDocument();

    const header = screen.getByTestId("temperature-chart-header");
    expect(header).toBeInTheDocument();

    const container = screen.getByTestId("temperature-chart-container");
    expect(container).toBeInTheDocument();
  });

  it("should render legend items with correct text", () => {
    renderWithProviders(<TemperatureChartCard />);

    const temperatureLegend = screen.getByTestId("temperature-legend-item");
    const feelsLikeLegend = screen.getByTestId("feels-like-legend-item");

    expect(temperatureLegend).toHaveTextContent("Temperature");
    expect(feelsLikeLegend).toHaveTextContent("Feels Like");
  });

  it("should render chart container with proper styling structure", () => {
    renderWithProviders(<TemperatureChartCard />);

    const container = screen.getByTestId("temperature-chart-container");
    expect(container).toBeInTheDocument();

    const svg = screen.getByTestId("temperature-chart-svg");
    expect(svg).toBeInTheDocument();
    expect(container).toContainElement(svg);
  });
});
