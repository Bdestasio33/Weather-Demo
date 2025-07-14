import { screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import DragDropDashboard from "../../components/DragDropDashboard";
import { renderWithProviders } from "../utils";

// Mock the dashboard context with empty state
const mockDashboardActions = {
  addWidget: vi.fn(),
  removeWidget: vi.fn(),
  updateWidget: vi.fn(),
  toggleSidebar: vi.fn(),
  resetLayout: vi.fn(),
};

const emptyDashboardState = {
  currentLayout: {
    id: "test-layout",
    name: "Test Layout",
    widgets: [], // Empty widgets array
  },
  availableWidgets: [
    {
      id: "current-weather",
      type: "current-weather",
      title: "Current Weather",
      description: "Real-time weather conditions",
      size: "md",
    },
  ],
  sidebarOpen: true,
};

vi.mock("../../contexts/DashboardContext", () => ({
  useDashboard: () => ({
    state: emptyDashboardState,
    actions: mockDashboardActions,
  }),
}));

// Mock the weather hooks
vi.mock("../../hooks/api/weather", () => ({
  useCurrentWeather: () => ({
    data: {
      temperature: 22,
      temperatureF: 72,
      condition: "Sunny",
      summary: "Clear skies",
      humidity: 60,
      windSpeed: 10,
      location: "Test City, Test State",
      timestamp: new Date().toISOString(),
    },
    isLoading: false,
    isError: false,
    error: null,
  }),
}));

// Mock the user context
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
    updatePreferences: vi.fn(),
    resetPreferences: vi.fn(),
  }),
  useTemperatureUnit: () => ["celsius", vi.fn()],
}));

describe("DragDropDashboard - Empty State", () => {
  it("should show empty state when no widgets are present", () => {
    renderWithProviders(<DragDropDashboard />);

    expect(screen.getByTestId("empty-dashboard")).toBeInTheDocument();
    expect(screen.getByText("No widgets yet")).toBeInTheDocument();
  });

  it("should display appropriate empty state message", () => {
    renderWithProviders(<DragDropDashboard />);

    // Should show empty state with helpful message
    expect(screen.getByText("No widgets yet")).toBeInTheDocument();
    expect(
      screen.getByText("Drag widgets from the sidebar to get started")
    ).toBeInTheDocument();
  });

  it("should still render sidebar and dashboard structure when empty", () => {
    renderWithProviders(<DragDropDashboard />);

    // Main structure should still be present
    expect(screen.getByTestId("drag-drop-dashboard")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("dashboard-area")).toBeInTheDocument();
    expect(screen.getByTestId("dashboard-header")).toBeInTheDocument();

    // Should have widget library in sidebar
    expect(screen.getByTestId("widget-library")).toBeInTheDocument();
  });
});
