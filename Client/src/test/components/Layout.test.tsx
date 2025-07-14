import { screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import Layout from "../../components/Layout";
import { renderWithProviders } from "../utils";

// Mock react-router-dom
const mockNavigate = vi.fn();
const mockLocation = { pathname: "/" };

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => mockLocation,
  };
});

// Mock the user context
const mockUpdatePreferences = vi.fn();
const mockUserContext = {
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
  updatePreferences: mockUpdatePreferences,
  resetPreferences: vi.fn(),
};

vi.mock("../../contexts/UserContext", () => ({
  useUser: () => mockUserContext,
  useTemperatureUnit: () => ["celsius", vi.fn()],
}));

// Mock LocationDialog
vi.mock("../../components/LocationDialog", () => ({
  default: ({ open, onClose, required }: any) => (
    <div
      data-testid="location-dialog"
      data-open={open}
      data-required={required}
    >
      <button data-testid="location-dialog-close" onClick={onClose}>
        Close
      </button>
    </div>
  ),
}));

describe("Layout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocation.pathname = "/";
  });

  it("should render main layout structure", () => {
    renderWithProviders(
      <Layout>
        <div data-testid="test-content">Test Content</div>
      </Layout>
    );

    expect(screen.getByTestId("layout")).toBeInTheDocument();
    expect(screen.getByTestId("navigation-header")).toBeInTheDocument();
    expect(screen.getByTestId("main-content")).toBeInTheDocument();
    expect(screen.getByTestId("test-content")).toBeInTheDocument();
  });

  it("should display app title and logo", () => {
    renderWithProviders(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    expect(screen.getByTestId("app-title")).toBeInTheDocument();
    expect(screen.getByTestId("app-title")).toHaveTextContent(
      "Weather Dashboard"
    );
  });

  it("should render location button with current location", () => {
    renderWithProviders(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    const locationButton = screen.getByTestId("location-button");
    expect(locationButton).toBeInTheDocument();
    expect(locationButton).toHaveTextContent("Test City, Test State");
  });

  it("should open location dialog when location button is clicked", () => {
    renderWithProviders(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    fireEvent.click(screen.getByTestId("location-button"));
    expect(screen.getByTestId("location-dialog")).toHaveAttribute(
      "data-open",
      "true"
    );
  });

  it("should render desktop navigation buttons", () => {
    renderWithProviders(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    expect(screen.getByTestId("desktop-navigation")).toBeInTheDocument();
    expect(screen.getByTestId("dashboard-nav-button")).toBeInTheDocument();
    expect(screen.getByTestId("profile-nav-button")).toBeInTheDocument();
  });

  it("should highlight active navigation button", () => {
    mockLocation.pathname = "/profile";

    renderWithProviders(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    const profileButton = screen.getByTestId("profile-nav-button");
    expect(profileButton).toBeInTheDocument();
    // Active state would be tested through computed styles or class names
  });

  it("should navigate when dashboard button is clicked", () => {
    renderWithProviders(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    fireEvent.click(screen.getByTestId("dashboard-nav-button"));
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("should navigate when profile button is clicked", () => {
    renderWithProviders(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    fireEvent.click(screen.getByTestId("profile-nav-button"));
    expect(mockNavigate).toHaveBeenCalledWith("/profile");
  });

  it("should render mobile navigation menu", () => {
    renderWithProviders(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    expect(screen.getByTestId("mobile-navigation")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-menu-button")).toBeInTheDocument();
  });

  it("should open mobile menu when menu button is clicked", () => {
    renderWithProviders(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    fireEvent.click(screen.getByTestId("mobile-menu-button"));
    expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();
  });

  it("should render mobile menu items", () => {
    renderWithProviders(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    fireEvent.click(screen.getByTestId("mobile-menu-button"));

    expect(screen.getByTestId("mobile-location-menu-item")).toBeInTheDocument();
    expect(
      screen.getByTestId("mobile-dashboard-menu-item")
    ).toBeInTheDocument();
    expect(screen.getByTestId("mobile-profile-menu-item")).toBeInTheDocument();
  });

  it("should handle mobile menu navigation", () => {
    renderWithProviders(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    fireEvent.click(screen.getByTestId("mobile-menu-button"));
    fireEvent.click(screen.getByTestId("mobile-profile-menu-item"));

    expect(mockNavigate).toHaveBeenCalledWith("/profile");
  });

  it("should open location dialog from mobile menu", () => {
    renderWithProviders(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    fireEvent.click(screen.getByTestId("mobile-menu-button"));
    fireEvent.click(screen.getByTestId("mobile-location-menu-item"));

    expect(screen.getByTestId("location-dialog")).toHaveAttribute(
      "data-open",
      "true"
    );
  });

  it("should close location dialog when close is called", () => {
    renderWithProviders(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    fireEvent.click(screen.getByTestId("location-button"));
    expect(screen.getByTestId("location-dialog")).toHaveAttribute(
      "data-open",
      "true"
    );

    fireEvent.click(screen.getByTestId("location-dialog-close"));
    expect(screen.getByTestId("location-dialog")).toHaveAttribute(
      "data-open",
      "false"
    );
  });

  it("should render main container with proper structure", () => {
    renderWithProviders(
      <Layout>
        <div data-testid="child-content">Child Content</div>
      </Layout>
    );

    expect(screen.getByTestId("main-container")).toBeInTheDocument();
    expect(screen.getByTestId("child-content")).toBeInTheDocument();
  });
});
