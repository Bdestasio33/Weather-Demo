import { screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect, afterEach } from "vitest";
import LocationDialog from "../../components/LocationDialog";
import { renderWithProviders } from "../utils";

// Mock the useUser hook
vi.mock("../../contexts/UserContext", () => ({
  useUser: () => ({
    preferences: {
      temperatureUnit: "celsius",
      locationOverride: {
        enabled: false,
        city: "",
        state: "",
        country: "",
      },
    },
    isLoaded: true,
    updatePreferences: vi.fn(),
    resetPreferences: vi.fn(),
  }),
}));

describe("LocationDialog", () => {
  const mockOnClose = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render dialog with correct test IDs when open", () => {
    renderWithProviders(
      <LocationDialog open={true} onClose={mockOnClose} required={false} />
    );

    // Check main dialog elements
    expect(screen.getByTestId("location-dialog")).toBeInTheDocument();
    expect(screen.getByTestId("location-dialog-title")).toBeInTheDocument();
    expect(screen.getByTestId("location-dialog-divider")).toBeInTheDocument();
    expect(screen.getByTestId("location-dialog-content")).toBeInTheDocument();
    expect(screen.getByTestId("location-dialog-actions")).toBeInTheDocument();
  });

  it("should display location form with all input fields", () => {
    renderWithProviders(
      <LocationDialog open={true} onClose={mockOnClose} required={false} />
    );

    // Check form elements
    expect(screen.getByTestId("location-form")).toBeInTheDocument();
    expect(screen.getByTestId("city-input")).toBeInTheDocument();
    expect(screen.getByTestId("state-autocomplete")).toBeInTheDocument();
    expect(screen.getByTestId("country-input")).toBeInTheDocument();
  });

  it("should display correct dialog title and description", () => {
    renderWithProviders(
      <LocationDialog open={true} onClose={mockOnClose} required={false} />
    );

    expect(screen.getByTestId("location-dialog-title")).toHaveTextContent(
      "Set Your Location"
    );
    expect(screen.getByTestId("location-description")).toHaveTextContent(
      "Enter your location to get accurate weather data for your area"
    );
  });

  it("should have cancel and save buttons", () => {
    renderWithProviders(
      <LocationDialog open={true} onClose={mockOnClose} required={false} />
    );

    expect(screen.getByTestId("cancel-location-button")).toBeInTheDocument();
    expect(screen.getByTestId("save-location-button")).toBeInTheDocument();
  });

  it("should call onClose when cancel button is clicked", () => {
    renderWithProviders(
      <LocationDialog open={true} onClose={mockOnClose} required={false} />
    );

    fireEvent.click(screen.getByTestId("cancel-location-button"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should not render when dialog is closed", () => {
    renderWithProviders(
      <LocationDialog open={false} onClose={mockOnClose} required={false} />
    );

    expect(screen.queryByTestId("location-dialog")).not.toBeInTheDocument();
  });
});
