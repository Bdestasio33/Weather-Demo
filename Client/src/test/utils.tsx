import type { ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi, expect } from "vitest";

import theme from "../theme/theme";
import { UserProvider } from "../contexts/UserContext";
import { DashboardProvider } from "../contexts/DashboardContext";

// Create a new QueryClient for each test
const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
        gcTime: 0,
      },
    },
  });
};

// Mock user context data
export const mockUserPreferences = {
  temperatureUnit: "celsius" as const,
  locationOverride: {
    enabled: true,
    city: "Test City",
    state: "Test State",
    country: "Test Country",
  },
};

// Mock dashboard context data
export const mockDashboardState = {
  currentLayout: {
    id: "test-layout",
    name: "Test Layout",
    widgets: [],
  },
  availableWidgets: [
    {
      id: "current-weather",
      type: "current-weather",
      title: "Current Weather",
      description: "Real-time weather conditions",
      size: "md",
    },
    {
      id: "weather-forecast",
      type: "weather-forecast",
      title: "5-Day Forecast",
      description: "Weekly weather outlook",
      size: "lg",
    },
  ],
  sidebarOpen: false,
};

// Mock weather data
export const mockWeatherData = {
  temperature: 22,
  temperatureF: 72,
  condition: "Sunny",
  summary: "Clear skies",
  humidity: 60,
  windSpeed: 10,
  location: "Test City, Test State",
  timestamp: new Date().toISOString(),
};

// Mock forecast data
export const mockForecastData = [
  {
    dayOfWeek: "Monday",
    condition: "Sunny",
    high: 25,
    low: 15,
    precipitationChance: 10,
    windSpeed: 8,
    icon: "☀️",
  },
  {
    dayOfWeek: "Tuesday",
    condition: "Cloudy",
    high: 23,
    low: 13,
    precipitationChance: 30,
    windSpeed: 12,
    icon: "☁️",
  },
];

// Test wrapper component
interface TestWrapperProps {
  children: React.ReactNode;
  withRouter?: boolean;
  withUserContext?: boolean;
  withDashboardContext?: boolean;
  userPreferences?: any;
  dashboardState?: any;
}

const TestWrapper: React.FC<TestWrapperProps> = ({
  children,
  withRouter = true,
  withUserContext = true,
  withDashboardContext = true,
  userPreferences = mockUserPreferences,
  dashboardState = mockDashboardState,
}) => {
  const queryClient = createTestQueryClient();

  let component = (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );

  if (withDashboardContext) {
    // Mock dashboard context - wrap in a way that works with the context provider
    vi.mock("../contexts/DashboardContext", () => ({
      useDashboard: () => ({
        state: dashboardState,
        actions: {
          addWidget: vi.fn(),
          removeWidget: vi.fn(),
          updateWidget: vi.fn(),
          toggleSidebar: vi.fn(),
          resetLayout: vi.fn(),
        },
      }),
      DashboardProvider: ({ children }: { children: React.ReactNode }) =>
        children,
    }));

    component = <DashboardProvider>{component}</DashboardProvider>;
  }

  if (withUserContext) {
    // Mock user context - wrap in a way that works with the context provider
    vi.mock("../contexts/UserContext", () => ({
      useUser: () => ({
        preferences: userPreferences,
        isLoaded: true,
        updatePreferences: vi.fn(),
        resetPreferences: vi.fn(),
      }),
      UserProvider: ({ children }: { children: React.ReactNode }) => children,
    }));

    component = <UserProvider>{component}</UserProvider>;
  }

  if (withRouter) {
    component = <BrowserRouter>{component}</BrowserRouter>;
  }

  return component;
};

// Custom render function
export const renderWithProviders = (
  ui: ReactElement,
  options?: RenderOptions & TestWrapperProps
) => {
  const {
    withRouter = true,
    withUserContext = true,
    withDashboardContext = true,
    userPreferences = mockUserPreferences,
    dashboardState = mockDashboardState,
    ...renderOptions
  } = options || {};

  return render(ui, {
    wrapper: (props) => (
      <TestWrapper
        withRouter={withRouter}
        withUserContext={withUserContext}
        withDashboardContext={withDashboardContext}
        userPreferences={userPreferences}
        dashboardState={dashboardState}
        {...props}
      />
    ),
    ...renderOptions,
  });
};

// Mock React Query hooks
export const mockUseCurrentWeather = {
  data: mockWeatherData,
  isLoading: false,
  isError: false,
  error: null,
};

// Helper function to wait for async operations
export const waitForAsyncOperations = () => {
  return new Promise((resolve) => setTimeout(resolve, 0));
};

// Test ID helpers
export const getByTestId = (testId: string) => `[data-testid="${testId}"]`;

// Common test assertions
export const expectElementToBeVisible = (element: HTMLElement) => {
  expect(element).toBeInTheDocument();
  expect(element).toBeVisible();
};

export const expectElementToHaveText = (element: HTMLElement, text: string) => {
  expect(element).toHaveTextContent(text);
};

export const expectElementToHaveAttribute = (
  element: HTMLElement,
  attribute: string,
  value?: string
) => {
  if (value) {
    expect(element).toHaveAttribute(attribute, value);
  } else {
    expect(element).toHaveAttribute(attribute);
  }
};
