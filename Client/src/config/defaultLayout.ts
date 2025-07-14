import type { DashboardLayout } from "../types/dashboard";

/**
 * Default dashboard layout with current weather widget
 */
export const DEFAULT_LAYOUT: DashboardLayout = {
  id: "default",
  name: "Default Dashboard",
  widgets: [
    {
      id: "default-current-weather",
      type: "current-weather",
      title: "Current Weather",
      size: "xl",
      position: { x: 0, y: 0 },
      dimensions: { width: 600, height: 400 },
      props: {},
      isVisible: true,
      lastUpdated: new Date().toISOString(),
    },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  isDefault: true,
}; 