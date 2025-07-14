import { screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import DashboardPage from "../../pages/DashboardPage";
import { renderWithProviders } from "../utils";

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
}));

// Mock the DragDropDashboard component
vi.mock("../../components/DragDropDashboard", () => ({
  default: () => <div data-testid="drag-drop-dashboard">DragDropDashboard</div>,
}));

// Mock the LocationDialog component
vi.mock("../../components/LocationDialog", () => ({
  default: ({ open, onClose, required }: any) => (
    <div
      data-testid="location-dialog"
      data-open={open}
      data-required={required}
    >
      <button data-testid="close-dialog" onClick={onClose}>
        Close
      </button>
    </div>
  ),
}));

// Mock toast
vi.mock("react-toastify", () => ({
  toast: {
    info: vi.fn(),
  },
}));

describe("DashboardPage", () => {
  it("should render the component", () => {
    renderWithProviders(<DashboardPage />);

    // Test that the component renders without crashing
    expect(screen.getByTestId("dashboard-page")).toBeInTheDocument();
  });

  it("should render DragDropDashboard component", () => {
    renderWithProviders(<DashboardPage />);

    expect(screen.getByTestId("drag-drop-dashboard")).toBeInTheDocument();
  });

  it("should render LocationDialog component", () => {
    renderWithProviders(<DashboardPage />);

    expect(screen.getByTestId("location-dialog")).toBeInTheDocument();
  });

  it("should have LocationDialog closed by default when location is set", () => {
    renderWithProviders(<DashboardPage />);

    const locationDialog = screen.getByTestId("location-dialog");
    expect(locationDialog).toHaveAttribute("data-open", "false");
  });
});
