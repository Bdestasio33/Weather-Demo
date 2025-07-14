import { screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import ProfilePage from "../../pages/ProfilePage";
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

// Mock the dashboard context
vi.mock("../../contexts/DashboardContext", () => ({
  useDashboard: () => ({
    state: {
      currentLayout: { id: "test", name: "Test Layout", widgets: [] },
      availableWidgets: [],
      sidebarOpen: false,
    },
    actions: {
      addWidget: vi.fn(),
      removeWidget: vi.fn(),
      updateWidget: vi.fn(),
      toggleSidebar: vi.fn(),
      resetLayout: vi.fn(),
    },
  }),
}));

// Mock toast
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}));

describe("ProfilePage", () => {
  it("should render the component", () => {
    renderWithProviders(<ProfilePage />);

    // Test that the component renders without crashing
    expect(screen.getByTestId("profile-page")).toBeInTheDocument();
  });

  it("should render profile page with correct test IDs", () => {
    renderWithProviders(<ProfilePage />);

    expect(screen.getByTestId("profile-page")).toBeInTheDocument();
    expect(screen.getByTestId("profile-header")).toBeInTheDocument();
    expect(screen.getByTestId("profile-settings-card")).toBeInTheDocument();
  });

  it("should display user info section", () => {
    renderWithProviders(<ProfilePage />);

    expect(screen.getByTestId("user-info-section")).toBeInTheDocument();
  });

  it("should display temperature unit section with form controls", () => {
    renderWithProviders(<ProfilePage />);

    expect(screen.getByTestId("temperature-unit-section")).toBeInTheDocument();
    expect(screen.getByTestId("temperature-unit-form")).toBeInTheDocument();
    expect(
      screen.getByTestId("temperature-unit-radio-group")
    ).toBeInTheDocument();
    expect(screen.getByTestId("celsius-radio")).toBeInTheDocument();
    expect(screen.getByTestId("fahrenheit-radio")).toBeInTheDocument();
    expect(screen.getByTestId("celsius-option")).toBeInTheDocument();
    expect(screen.getByTestId("fahrenheit-option")).toBeInTheDocument();
  });

  it("should display data management section", () => {
    renderWithProviders(<ProfilePage />);

    expect(screen.getByTestId("data-management-section")).toBeInTheDocument();
    expect(screen.getByTestId("data-management-buttons")).toBeInTheDocument();
    expect(screen.getByTestId("export-button")).toBeInTheDocument();
    expect(screen.getByTestId("import-button")).toBeInTheDocument();
    expect(screen.getByTestId("clear-data-button")).toBeInTheDocument();
  });

  it("should display reset section", () => {
    renderWithProviders(<ProfilePage />);

    expect(screen.getByTestId("reset-section")).toBeInTheDocument();
    expect(screen.getByTestId("reset-button")).toBeInTheDocument();
  });

  it("should display storage status", () => {
    renderWithProviders(<ProfilePage />);

    expect(screen.getByTestId("storage-status")).toBeInTheDocument();
  });
});
