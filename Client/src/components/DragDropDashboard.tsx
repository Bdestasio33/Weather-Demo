import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
  useDroppable,
} from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import {
  Box,
  Fab,
  Tooltip,
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  CloudQueue as WeatherIcon,
  BarChart as BarChartIcon,
  CalendarToday as CalendarTodayIcon,
  Warning as WarningIcon,
  WaterDrop as WaterDropIcon,
  Explore as ExploreIcon,
  WbSunny as WbSunnyIcon,
  TrendingUp as TrendingUpIcon,
  Visibility as VisibilityIcon,
  WbTwilight as WbTwilightIcon,
  Inventory as InventoryIcon,
} from "@mui/icons-material";

import { useDashboard } from "../contexts/DashboardContext";
import WidgetLibrary from "./WidgetLibrary";
import CurrentWeatherCard from "./CurrentWeatherCard";
import WeatherForecastCard from "./WeatherForecastCard";
import WeatherAlertsCard from "./WeatherAlertsCard";
import TemperatureChartCard from "./TemperatureChartCard";
import WeatherMetricsCard from "./WeatherMetricsCard";
import type { DragItem, WidgetType, DashboardWidget } from "../types/dashboard";

import "../styles/variables.css";

// Widget component renderer
function WidgetRenderer({ widget }: { widget: DashboardWidget }) {
  const { actions } = useDashboard();

  const handleRemove = () => {
    actions.removeWidget(widget.id);
  };

  // Special handling for widgets that already have their own Card wrapper
  if (
    widget.type === "current-weather" ||
    widget.type === "weather-forecast" ||
    widget.type === "weather-alerts" ||
    widget.type === "temperature-chart" ||
    widget.type === "humidity-meter" ||
    widget.type === "wind-compass" ||
    widget.type === "uv-index" ||
    widget.type === "air-pressure" ||
    widget.type === "visibility" ||
    widget.type === "sunrise-sunset"
  ) {
    return (
      <Box sx={styles.widgetContainer} data-testid={`widget-${widget.type}`}>
        {/* Remove button - only show in edit mode */}
        <IconButton
          className="remove-button"
          onClick={handleRemove}
          sx={styles.removeButton}
          data-testid={`remove-${widget.type}`}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
        {widget.type === "current-weather" && <CurrentWeatherCard />}
        {widget.type === "weather-forecast" && <WeatherForecastCard />}
        {widget.type === "weather-alerts" && <WeatherAlertsCard />}
        {widget.type === "temperature-chart" && <TemperatureChartCard />}
        {widget.type === "humidity-meter" && (
          <WeatherMetricsCard type="humidity" />
        )}
        {widget.type === "wind-compass" && (
          <WeatherMetricsCard type="wind-compass" />
        )}
        {widget.type === "uv-index" && <WeatherMetricsCard type="uv-index" />}
        {widget.type === "air-pressure" && (
          <WeatherMetricsCard type="air-pressure" />
        )}
        {widget.type === "visibility" && (
          <WeatherMetricsCard type="visibility" />
        )}
        {widget.type === "sunrise-sunset" && (
          <WeatherMetricsCard type="sunrise-sunset" />
        )}
      </Box>
    );
  }

  return (
    <Card
      sx={styles.fallbackCard}
      data-testid={`fallback-widget-${widget.type}`}
    >
      {/* Remove button - only show in edit mode */}
      <IconButton
        className="remove-button"
        onClick={handleRemove}
        sx={styles.removeButton}
        data-testid={`remove-${widget.type}`}
      >
        <CloseIcon fontSize="small" />
      </IconButton>

      <CardContent sx={styles.fallbackCardContent}>
        <Typography variant="h6" sx={styles.fallbackTitle}>
          <InventoryIcon sx={styles.fallbackIcon} /> {widget.title}
        </Typography>
        <Typography variant="body2" sx={styles.fallbackDescription}>
          Widget content coming soon...
        </Typography>
      </CardContent>
    </Card>
  );
}

// Droppable dashboard area
function DashboardDropZone({ children }: { children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({
    id: "dashboard-drop-zone",
  });

  return (
    <Box
      ref={setNodeRef}
      sx={isOver ? styles.dropZoneActive : styles.dropZone}
      data-testid="dashboard-drop-zone"
    >
      {children}
    </Box>
  );
}

export default function DragDropDashboard() {
  const { state, actions } = useDashboard();
  const [activeItem, setActiveItem] = useState<DragItem | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    if (active.data.current?.type === "widget-config") {
      // Dragging from sidebar
      const widgetConfig = active.data.current.config;
      setActiveItem({
        id: widgetConfig.id,
        type: widgetConfig.type,
        title: widgetConfig.title,
        size: widgetConfig.size,
        isNew: true,
      });
    } else if (active.data.current?.type === "dashboard-widget") {
      // Dragging existing widget
      const widget = active.data.current.widget;
      setActiveItem({
        id: widget.id,
        type: widget.type,
        title: widget.title,
        size: widget.size,
        isNew: false,
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveItem(null);

    if (!over) return;

    // Handle dropping widget to dashboard
    if (over.id === "dashboard-drop-zone") {
      if (active.data.current?.type === "widget-config") {
        // Adding new widget from sidebar
        const widgetConfig = active.data.current.config;
        actions.addWidget(widgetConfig.type as WidgetType);
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Box sx={styles.mainContainer} data-testid="drag-drop-dashboard">
        {/* Sidebar */}
        <Box
          sx={{
            ...styles.sidebar,
            width: state.sidebarOpen ? "var(--dashboard-sidebar-width)" : "0",
          }}
          data-testid="sidebar"
        >
          {state.sidebarOpen && <WidgetLibrary />}
        </Box>

        {/* Main Dashboard Area */}
        <Box sx={styles.dashboardArea} data-testid="dashboard-area">
          {/* Dashboard Header */}
          <Box sx={styles.dashboardHeader} data-testid="dashboard-header">
            <Box sx={styles.headerContent}>
              <Box
                component="h1"
                sx={styles.headerTitle}
                data-testid="dashboard-title"
              >
                <WeatherIcon sx={styles.headerIcon} /> Weather Dashboard
              </Box>
              <Box
                component="p"
                sx={styles.headerDescription}
                data-testid="dashboard-description"
              >
                {state.sidebarOpen
                  ? "Drag widgets from the sidebar to customize your dashboard"
                  : "Click the menu button to open the widget library"}
              </Box>
            </Box>

            <Box sx={styles.headerActions}>
              <Tooltip title="Toggle Sidebar">
                <Fab
                  color="primary"
                  onClick={actions.toggleSidebar}
                  sx={styles.toggleButton}
                  data-testid="toggle-sidebar-button"
                >
                  <MenuIcon />
                </Fab>
              </Tooltip>
            </Box>
          </Box>

          {/* Dashboard Content */}
          <DashboardDropZone>
            {state.currentLayout.widgets.length === 0 ? (
              <Box sx={styles.emptyState} data-testid="empty-dashboard">
                <Box>
                  <BarChartIcon sx={styles.emptyStateIcon} />
                  <Typography variant="h5" sx={styles.emptyStateTitle}>
                    No widgets yet
                  </Typography>
                  <Typography variant="body1" sx={styles.emptyStateDescription}>
                    {state.sidebarOpen
                      ? "Drag widgets from the sidebar to get started"
                      : "Open the sidebar and drag widgets here to get started"}
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Box sx={styles.widgetGrid} data-testid="widget-grid">
                {state.currentLayout.widgets.map((widget) => {
                  // Calculate grid span based on widget size
                  const getGridSpan = (size: string) => {
                    switch (size) {
                      case "sm":
                        return { gridColumn: "span 1", gridRow: "span 1" };
                      case "md":
                        return { gridColumn: "span 2", gridRow: "span 1" };
                      case "lg":
                        return { gridColumn: "span 2", gridRow: "span 2" };
                      case "xl":
                        return { gridColumn: "1 / -1", gridRow: "span 2" };
                      default:
                        return { gridColumn: "span 2", gridRow: "span 1" };
                    }
                  };

                  return (
                    <Box
                      key={widget.id}
                      sx={{
                        ...getGridSpan(widget.size),
                        minHeight: "150px",
                      }}
                      data-testid={`widget-grid-item-${widget.id}`}
                    >
                      <WidgetRenderer widget={widget} />
                    </Box>
                  );
                })}
              </Box>
            )}
          </DashboardDropZone>
        </Box>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeItem && (
            <Box sx={styles.dragOverlay} data-testid="drag-overlay">
              <div style={{ fontSize: "2rem", marginBottom: "8px" }}>
                {getWidgetIcon(activeItem.type)}
              </div>
              <div style={{ fontWeight: "var(--font-weight-semibold)" }}>
                {activeItem.title}
              </div>
              <div style={{ fontSize: "var(--font-size-sm)", opacity: 0.7 }}>
                {activeItem.isNew ? "Adding new widget" : "Moving widget"}
              </div>
            </Box>
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  );
}

// Helper function to get widget icon
function getWidgetIcon(type: WidgetType): React.ReactNode {
  const iconMap: Record<WidgetType, React.ReactNode> = {
    "current-weather": <WeatherIcon />,
    "weather-forecast": <CalendarTodayIcon />,
    "weather-alerts": <WarningIcon />,
    "temperature-chart": <BarChartIcon />,
    "humidity-meter": <WaterDropIcon />,
    "wind-compass": <ExploreIcon />,
    "uv-index": <WbSunnyIcon />,
    "air-pressure": <TrendingUpIcon />,
    visibility: <VisibilityIcon />,
    "sunrise-sunset": <WbTwilightIcon />,
  };
  return iconMap[type] || <InventoryIcon />;
}

const styles = {
  mainContainer: {
    display: "flex",
    minHeight: "calc(100vh - 64px)",
    background: "var(--gradient-background)",
    position: "relative",
  },
  sidebar: {
    transition: "width var(--transition-normal)",
    overflow: "hidden",
    background: "var(--color-bg-glass)",
    backdropFilter: "var(--backdrop-blur-lg)",
    borderRight: "1px solid var(--color-border-light)",
  },
  dashboardArea: {
    flex: 1,
    padding: "var(--dashboard-content-padding)",
  },
  dashboardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "var(--spacing-4xl)",
    padding: "var(--spacing-2xl)",
    background: "var(--color-bg-glass)",
    backdropFilter: "var(--backdrop-blur-lg)",
    border: "1px solid var(--color-border-light)",
    borderRadius: "var(--radius-card)",
    boxShadow: "var(--shadow-glass)",
  },
  headerContent: {
    color: "var(--color-text-primary)",
  },
  headerTitle: {
    fontSize: "var(--font-size-4xl)",
    fontWeight: "var(--font-weight-bold)",
    margin: "0 0 var(--spacing-sm) 0",
    background: "var(--gradient-primary)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-md)",
  },
  headerIcon: {
    fontSize: "2.5rem",
    color: "var(--color-primary-500)",
  },
  headerDescription: {
    fontSize: "var(--font-size-lg)",
    color: "var(--color-text-secondary)",
    margin: 0,
  },
  headerActions: {
    display: "flex",
    gap: "var(--spacing-lg)",
  },
  toggleButton: {
    boxShadow: "var(--shadow-lg)",
    transition: "var(--transition-button)",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "var(--shadow-xl)",
    },
  },
  dropZone: {
    minHeight: "400px",
    background: "var(--color-bg-glass)",
    backdropFilter: "var(--backdrop-blur-lg)",
    border: "2px dashed var(--color-border-light)",
    borderRadius: "var(--radius-card)",
    padding: "var(--spacing-xl)",
    transition: "var(--transition-normal)",
  },
  dropZoneActive: {
    minHeight: "400px",
    background: "var(--color-primary-50)",
    backdropFilter: "var(--backdrop-blur-lg)",
    border: "2px solid var(--color-primary-500)",
    borderRadius: "var(--radius-card)",
    padding: "var(--spacing-xl)",
    transition: "var(--transition-normal)",
  },
  emptyState: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "300px",
    textAlign: "center",
    color: "var(--color-text-secondary)",
    fontSize: "var(--font-size-lg)",
  },
  emptyStateIcon: {
    fontSize: "3rem",
    color: "var(--color-text-secondary)",
    mb: 2,
  },
  emptyStateTitle: {
    color: "var(--color-text-primary)",
    mb: 1,
  },
  emptyStateDescription: {
    color: "var(--color-text-secondary)",
  },
  widgetGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gridAutoRows: "minmax(150px, auto)",
    gap: "var(--spacing-xl)",
    alignItems: "start",
  },
  widgetContainer: {
    position: "relative",
    "&:hover": {
      "& .remove-button": {
        opacity: 1,
      },
    },
  },
  removeButton: {
    position: "absolute",
    top: 8,
    right: 8,
    opacity: 0,
    transition: "var(--transition-fast)",
    background: "var(--color-error-500)",
    color: "var(--color-text-primary)",
    width: 28,
    height: 28,
    zIndex: 10,
    "&:hover": {
      background: "var(--color-error-600)",
      transform: "scale(1.1)",
    },
  },
  fallbackCard: {
    position: "relative",
    background: "var(--color-bg-glass)",
    backdropFilter: "var(--backdrop-blur-lg)",
    border: "1px solid var(--color-border-light)",
    borderRadius: "var(--radius-card)",
    boxShadow: "var(--shadow-glass)",
    transition: "var(--transition-card)",
    "&:hover": {
      borderColor: "var(--color-border-accent)",
      "& .remove-button": {
        opacity: 1,
      },
    },
  },
  fallbackCardContent: {
    p: 3,
    textAlign: "center",
  },
  fallbackTitle: {
    color: "var(--color-text-primary)",
    mb: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
  },
  fallbackIcon: {
    fontSize: "1.25rem",
    color: "var(--color-primary-500)",
  },
  fallbackDescription: {
    color: "var(--color-text-secondary)",
  },
  dragOverlay: {
    padding: "var(--spacing-lg)",
    background: "var(--color-bg-glass)",
    backdropFilter: "var(--backdrop-blur-lg)",
    border: "1px solid var(--color-border-accent)",
    borderRadius: "var(--radius-card)",
    boxShadow: "var(--shadow-glow)",
    color: "var(--color-text-primary)",
    minWidth: "200px",
    textAlign: "center",
    transform: "rotate(5deg)",
  },
};
