import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { toast } from "react-toastify";
import type { ReactNode } from "react";
import type {
  DashboardState,
  DashboardLayout,
  DashboardWidget,
  WidgetConfig,
  WidgetType,
  WidgetSize,
} from "../types/dashboard";

// Import configurations from dedicated config files
import {
  WIDGET_CONFIGS,
  getWidgetConfig as getWidgetConfigHelper,
} from "../config/widgetConfigs";
import { DEFAULT_LAYOUT } from "../config/defaultLayout";

interface DashboardContextType {
  state: DashboardState;
  actions: {
    toggleSidebar: () => void;
    addWidget: (type: WidgetType, position?: { x: number; y: number }) => void;
    removeWidget: (widgetId: string) => void;
    updateWidget: (widgetId: string, updates: Partial<DashboardWidget>) => void;
    moveWidget: (widgetId: string, position: { x: number; y: number }) => void;
    resizeWidget: (
      widgetId: string,
      dimensions: { width: number; height: number }
    ) => void;
    saveLayout: (name?: string) => void;
    loadLayout: (layoutId: string) => void;
    resetLayout: () => void;
    exportLayout: () => string;
    importLayout: (layoutData: string) => boolean;
  };
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

const STORAGE_KEY = "weather-dashboard-layout";
const LAYOUTS_STORAGE_KEY = "weather-dashboard-layouts";

interface DashboardProviderProps {
  children: ReactNode;
}

export function DashboardProvider({ children }: DashboardProviderProps) {
  const [state, setState] = useState<DashboardState>({
    currentLayout: DEFAULT_LAYOUT,
    availableWidgets: WIDGET_CONFIGS,
    savedLayouts: [DEFAULT_LAYOUT],
    sidebarOpen: true,
  });

  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);

  // Save layout changes
  const saveLayoutToStorage = useCallback((layout: DashboardLayout) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
      console.log("💾 Dashboard layout saved to localStorage:", layout);
    } catch (error) {
      console.error("Failed to save dashboard layout:", error);
    }
  }, []);

  // Load saved layout on mount
  useEffect(() => {
    try {
      const savedLayout = localStorage.getItem(STORAGE_KEY);
      const savedLayouts = localStorage.getItem(LAYOUTS_STORAGE_KEY);

      if (savedLayout) {
        const layout: DashboardLayout = JSON.parse(savedLayout);

        // If the saved layout is empty (existing users), add the default current weather widget
        if (layout.widgets.length === 0) {
          const updatedLayout = {
            ...layout,
            widgets: [
              {
                id: "default-current-weather",
                type: "current-weather" as WidgetType,
                title: "Current Weather",
                size: "xl" as WidgetSize,
                position: { x: 0, y: 0 },
                dimensions: { width: 600, height: 400 },
                props: {},
                isVisible: true,
                lastUpdated: new Date().toISOString(),
              },
            ],
            updatedAt: new Date().toISOString(),
          };

          setState((prev) => ({
            ...prev,
            currentLayout: updatedLayout,
          }));

          // Save the updated layout back to localStorage
          saveLayoutToStorage(updatedLayout);
          console.log(
            "📋 Added default current weather widget to existing empty dashboard"
          );
        } else {
          setState((prev) => ({
            ...prev,
            currentLayout: layout,
          }));
          console.log("📋 Dashboard layout loaded from localStorage:", layout);
        }
      } else {
        // If no saved layout, use default and save it
        setState((prev) => ({
          ...prev,
          currentLayout: DEFAULT_LAYOUT,
        }));
        saveLayoutToStorage(DEFAULT_LAYOUT);
        console.log("📋 Using default dashboard layout");
      }

      if (savedLayouts) {
        const layouts: DashboardLayout[] = JSON.parse(savedLayouts);
        setState((prev) => ({
          ...prev,
          savedLayouts: layouts,
        }));
      }
      setIsInitialLoadComplete(true);
    } catch (error) {
      console.error("Failed to load dashboard layout:", error);
      // Reset to default layout on error
      setState((prev) => ({
        ...prev,
        currentLayout: DEFAULT_LAYOUT,
      }));
      saveLayoutToStorage(DEFAULT_LAYOUT);
      setIsInitialLoadComplete(true);
    }
  }, [saveLayoutToStorage]);

  // Save layout changes whenever current layout changes
  useEffect(() => {
    // Only save if initial load is complete
    if (isInitialLoadComplete) {
      saveLayoutToStorage(state.currentLayout);
    }
  }, [state.currentLayout, saveLayoutToStorage, isInitialLoadComplete]);

  const generateWidgetId = (type: WidgetType): string => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 5);
    return `${type}-${timestamp}-${random}`;
  };

  const getWidgetConfig = (type: WidgetType): WidgetConfig | undefined => {
    return getWidgetConfigHelper(type);
  };

  const actions: DashboardContextType["actions"] = {
    toggleSidebar: () => {
      setState((prev) => ({
        ...prev,
        sidebarOpen: !prev.sidebarOpen,
      }));
    },

    addWidget: (type: WidgetType, position = { x: 0, y: 0 }) => {
      const config = getWidgetConfig(type);
      if (!config) {
        console.error(`Widget config not found for type: ${type}`);
        return;
      }

      const newWidget: DashboardWidget = {
        id: generateWidgetId(type),
        type,
        title: config.title,
        size: config.size,
        position,
        dimensions: {
          width: getWidgetDimensions(config.size).width,
          height: getWidgetDimensions(config.size).height,
        },
        props: config.defaultProps || {},
        isVisible: true,
        lastUpdated: new Date().toISOString(),
      };

      setState((prev) => {
        const updatedLayout = {
          ...prev.currentLayout,
          widgets: [...prev.currentLayout.widgets, newWidget],
          updatedAt: new Date().toISOString(),
        };

        console.log("➕ Adding widget to dashboard:", newWidget);
        console.log("📊 Updated layout:", updatedLayout);

        return {
          ...prev,
          currentLayout: updatedLayout,
        };
      });

      toast.success(`${config.title} widget added to dashboard`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },

    removeWidget: (widgetId: string) => {
      // Find the widget first before state update
      const widget = state.currentLayout.widgets.find((w) => w.id === widgetId);
      const widgetTitle = widget?.title || "Widget";

      setState((prev) => {
        const updatedLayout = {
          ...prev.currentLayout,
          widgets: prev.currentLayout.widgets.filter((w) => w.id !== widgetId),
          updatedAt: new Date().toISOString(),
        };

        console.log("➖ Removing widget from dashboard:", widgetId);
        console.log("📊 Updated layout:", updatedLayout);

        return {
          ...prev,
          currentLayout: updatedLayout,
        };
      });

      // Show toast notification outside of setState to prevent duplicates
      toast.info(`${widgetTitle} removed from dashboard`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },

    updateWidget: (widgetId: string, updates: Partial<DashboardWidget>) => {
      setState((prev) => {
        const updatedLayout = {
          ...prev.currentLayout,
          widgets: prev.currentLayout.widgets.map((widget) =>
            widget.id === widgetId
              ? { ...widget, ...updates, lastUpdated: new Date().toISOString() }
              : widget
          ),
          updatedAt: new Date().toISOString(),
        };

        return {
          ...prev,
          currentLayout: updatedLayout,
        };
      });
    },

    moveWidget: (widgetId: string, position: { x: number; y: number }) => {
      actions.updateWidget(widgetId, { position });
    },

    resizeWidget: (
      widgetId: string,
      dimensions: { width: number; height: number }
    ) => {
      actions.updateWidget(widgetId, { dimensions });
    },

    saveLayout: (name?: string) => {
      const layoutName = name || `Layout ${new Date().toLocaleDateString()}`;
      const newLayout: DashboardLayout = {
        ...state.currentLayout,
        id: `layout-${Date.now()}`,
        name: layoutName,
        isDefault: false,
        updatedAt: new Date().toISOString(),
      };

      setState((prev) => {
        const updatedLayouts = [...prev.savedLayouts, newLayout];

        try {
          localStorage.setItem(
            LAYOUTS_STORAGE_KEY,
            JSON.stringify(updatedLayouts)
          );
        } catch (error) {
          console.error("Failed to save layouts:", error);
        }

        return {
          ...prev,
          savedLayouts: updatedLayouts,
        };
      });

      toast.success(`Layout "${layoutName}" saved successfully`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },

    loadLayout: (layoutId: string) => {
      const layout = state.savedLayouts.find((l) => l.id === layoutId);
      if (layout) {
        setState((prev) => ({
          ...prev,
          currentLayout: layout,
        }));

        toast.success(`Layout "${layout.name}" loaded successfully`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    },

    resetLayout: () => {
      const resetLayout = {
        ...DEFAULT_LAYOUT,
        updatedAt: new Date().toISOString(),
      };

      setState((prev) => ({
        ...prev,
        currentLayout: resetLayout,
      }));

      toast.info("Dashboard reset to default layout", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },

    exportLayout: () => {
      return JSON.stringify(state.currentLayout, null, 2);
    },

    importLayout: (layoutData: string) => {
      try {
        const layout: DashboardLayout = JSON.parse(layoutData);

        // Validate layout structure
        if (!layout.id || !layout.widgets || !Array.isArray(layout.widgets)) {
          throw new Error("Invalid layout format");
        }

        setState((prev) => ({
          ...prev,
          currentLayout: layout,
        }));

        toast.success("Layout imported successfully", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        return true;
      } catch (error) {
        console.error("Failed to import layout:", error);

        toast.error("Failed to import layout. Please check the format.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        return false;
      }
    },
  };

  const value: DashboardContextType = {
    state,
    actions,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard(): DashboardContextType {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}

// Helper function to get widget dimensions based on size
function getWidgetDimensions(size: WidgetSize): {
  width: number;
  height: number;
} {
  switch (size) {
    case "sm":
      return { width: 200, height: 150 };
    case "md":
      return { width: 300, height: 200 };
    case "lg":
      return { width: 400, height: 300 };
    case "xl":
      return { width: 600, height: 400 };
    default:
      return { width: 300, height: 200 };
  }
}
