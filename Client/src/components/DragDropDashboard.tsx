import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  TouchSensor,
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
  Drawer,
  useTheme,
  useMediaQuery,
  Container,
  SwipeableDrawer,
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
      <Box
        sx={{
          ...styles.widgetContainer,
          ...(isMobile && styles.widgetContainerMobile),
        }}
        data-testid={`widget-${widget.type}`}
      >
        {/* Remove button - only show in edit mode */}
        <IconButton
          className="remove-button"
          onClick={handleRemove}
          sx={{
            ...styles.removeButton,
            ...(isMobile && styles.removeButtonMobile),
          }}
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
      sx={{
        ...styles.fallbackCard,
        ...(isMobile && styles.fallbackCardMobile),
      }}
      data-testid={`fallback-widget-${widget.type}`}
    >
      {/* Remove button - only show in edit mode */}
      <IconButton
        className="remove-button"
        onClick={handleRemove}
        sx={{
          ...styles.removeButton,
          ...(isMobile && styles.removeButtonMobile),
        }}
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

// Widget grid component with drop zone using responsive Box layout
function WidgetGrid() {
  const { state } = useDashboard();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isSmallMobile = useMediaQuery("(max-width: 480px)");
  const { setNodeRef, isOver } = useDroppable({
    id: "widget-grid",
  });

  // Calculate grid columns based on widget size and screen size
  const getGridSize = (size: string) => {
    if (isSmallMobile) {
      // On very small phones, all widgets take full width
      return {
        flexBasis: "100%",
        maxWidth: "100%",
        minHeight: "180px", // Ensure minimum height for usability
      };
    } else if (isMobile) {
      // On mobile, most widgets take full width except small ones
      switch (size) {
        case "sm":
          return {
            flexBasis: "100%",
            maxWidth: "100%",
            minHeight: "150px",
          }; // Full width on mobile for better visibility
        case "md":
        case "lg":
        case "xl":
          return {
            flexBasis: "100%",
            maxWidth: "100%",
            minHeight: "200px",
          }; // Full width on mobile
        default:
          return {
            flexBasis: "100%",
            maxWidth: "100%",
            minHeight: "180px",
          };
      }
    } else if (isTablet) {
      // On tablet, adjust sizes
      switch (size) {
        case "sm":
          return { flexBasis: "33.33%", maxWidth: "33.33%" }; // Third width on tablet
        case "md":
          return { flexBasis: "50%", maxWidth: "50%" }; // Half width on tablet
        case "lg":
          return { flexBasis: "66.67%", maxWidth: "66.67%" }; // Two thirds on tablet
        case "xl":
          return { flexBasis: "100%", maxWidth: "100%" }; // Full width on tablet
        default:
          return { flexBasis: "50%", maxWidth: "50%" };
      }
    } else {
      // On desktop, use original sizes
      switch (size) {
        case "sm":
          return { flexBasis: "25%", maxWidth: "25%" }; // Quarter width on desktop
        case "md":
          return { flexBasis: "33.33%", maxWidth: "33.33%" }; // Third width on desktop
        case "lg":
          return { flexBasis: "50%", maxWidth: "50%" }; // Half width on desktop
        case "xl":
          return { flexBasis: "100%", maxWidth: "100%" }; // Full width on desktop
        default:
          return { flexBasis: "33.33%", maxWidth: "33.33%" };
      }
    }
  };

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
      <Box
        ref={setNodeRef}
        sx={{
          ...(isOver ? styles.widgetGridActive : styles.widgetGrid),
          display: "flex",
          flexWrap: "wrap",
          gap: { xs: 1, sm: 2, md: 3 },
          alignItems: "stretch",
        }}
        data-testid="widget-grid"
      >
        {state.currentLayout.widgets.map((widget) => (
          <Box
            key={widget.id}
            sx={{
              ...getGridSize(widget.size),
              p: { xs: 0.5, sm: 1 },
            }}
            data-testid={`widget-grid-item-${widget.id}`}
          >
            <WidgetRenderer widget={widget} />
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default function DragDropDashboard() {
  const { state, actions } = useDashboard();
  const [activeItem, setActiveItem] = useState<DragItem | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
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

    // Only handle dropping widget if it's specifically over the drop zone or widget grid
    if (over.id === "dashboard-drop-zone" || over.id === "widget-grid") {
      if (active.data.current?.type === "widget-config") {
        // Adding new widget from sidebar
        const widgetConfig = active.data.current.config;
        actions.addWidget(widgetConfig.type as WidgetType);

        // Close sidebar on mobile after adding widget
        if (isMobile && state.sidebarOpen) {
          actions.toggleSidebar();
        }
      }
    }
    // If not dropped over a valid drop zone, don't add the widget
  };

  const handleSidebarToggle = () => {
    actions.toggleSidebar();
  };

  // Drawer props for SwipeableDrawer
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Box sx={styles.mainContainer} data-testid="drag-drop-dashboard">
        {/* Mobile Sidebar as SwipeableDrawer */}
        {isMobile ? (
          <SwipeableDrawer
            anchor="left"
            open={state.sidebarOpen}
            onClose={handleSidebarToggle}
            onOpen={handleSidebarToggle}
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
            sx={styles.mobileDrawer}
            data-testid="mobile-sidebar"
          >
            <Box sx={styles.drawerContent}>
              <Box sx={styles.drawerHeader}>
                <Typography variant="h6" sx={styles.drawerTitle}>
                  Widget Library
                </Typography>
                <IconButton
                  onClick={handleSidebarToggle}
                  sx={styles.drawerCloseButton}
                  data-testid="close-sidebar-button"
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              <WidgetLibrary />
            </Box>
          </SwipeableDrawer>
        ) : (
          /* Desktop Sidebar as regular Drawer */
          <Drawer
            variant="persistent"
            anchor="left"
            open={state.sidebarOpen}
            sx={styles.desktopDrawer}
            data-testid="desktop-sidebar"
          >
            <Box sx={styles.drawerContent}>
              <WidgetLibrary />
            </Box>
          </Drawer>
        )}

        {/* Main Dashboard Area */}
        <Box
          sx={{
            ...styles.dashboardArea,
            ...(isMobile && styles.dashboardAreaMobile),
            ...(state.sidebarOpen &&
              !isMobile &&
              styles.dashboardAreaWithSidebar),
          }}
          data-testid="dashboard-area"
        >
          {/* Dashboard Header */}
          <Box
            sx={{
              ...styles.dashboardHeader,
              ...(isMobile && styles.dashboardHeaderMobile),
            }}
            data-testid="dashboard-header"
          >
            <Box sx={styles.headerContent}>
              <Box
                component="h1"
                sx={{
                  ...styles.headerTitle,
                  ...(isMobile && styles.headerTitleMobile),
                }}
                data-testid="dashboard-title"
              >
                <WeatherIcon sx={styles.headerIcon} /> Weather Dashboard
              </Box>
              <Box
                component="p"
                sx={{
                  ...styles.headerDescription,
                  ...(isMobile && styles.headerDescriptionMobile),
                }}
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
                  onClick={handleSidebarToggle}
                  sx={{
                    ...styles.toggleButton,
                    ...(isMobile && styles.toggleButtonMobile),
                  }}
                  data-testid="toggle-sidebar-button"
                >
                  <MenuIcon />
                </Fab>
              </Tooltip>
            </Box>
          </Box>

          {/* Dashboard Content */}
          <Box sx={styles.dashboardContent} data-testid="dashboard-content">
            {state.currentLayout.widgets.length === 0 ? (
              <DashboardDropZone>
                <Box
                  sx={{
                    ...styles.emptyState,
                    ...(isMobile && styles.emptyStateMobile),
                  }}
                  data-testid="empty-dashboard"
                >
                  <Box>
                    <BarChartIcon sx={styles.emptyStateIcon} />
                    <Typography variant="h5" sx={styles.emptyStateTitle}>
                      No widgets yet
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={styles.emptyStateDescription}
                    >
                      {state.sidebarOpen
                        ? "Drag widgets from the sidebar to get started"
                        : "Open the sidebar and drag widgets here to get started"}
                    </Typography>
                  </Box>
                </Box>
              </DashboardDropZone>
            ) : (
              <WidgetGrid />
            )}
          </Box>
        </Box>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeItem && (
            <Box
              sx={{
                ...styles.dragOverlay,
                ...(isMobile && styles.dragOverlayMobile),
              }}
              data-testid="drag-overlay"
            >
              <div
                style={{
                  fontSize: isMobile ? "1.5rem" : "2rem",
                  marginBottom: "8px",
                }}
              >
                {getWidgetIcon(activeItem.type)}
              </div>
              <div
                style={{
                  fontWeight: "var(--font-weight-semibold)",
                  fontSize: isMobile
                    ? "var(--font-size-sm)"
                    : "var(--font-size-base)",
                }}
              >
                {activeItem.title}
              </div>
              <div
                style={{
                  fontSize: isMobile
                    ? "var(--font-size-xs)"
                    : "var(--font-size-sm)",
                  opacity: 0.7,
                }}
              >
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
  dashboardContent: {
    // Main content area for dashboard widgets
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
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "transparent",
      borderRadius: "var(--radius-card)",
      transition: "var(--transition-normal)",
    },
  },
  dropZoneActive: {
    minHeight: "400px",
    background: "rgba(99, 102, 241, 0.1)",
    backdropFilter: "var(--backdrop-blur-lg)",
    border: "2px solid var(--color-primary-500)",
    borderRadius: "var(--radius-card)",
    padding: "var(--spacing-xl)",
    transition: "var(--transition-normal)",
    position: "relative",
    boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(99, 102, 241, 0.05)",
      borderRadius: "var(--radius-card)",
    },
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
    alignItems: "start",
  },
  widgetGridActive: {
    alignItems: "start",
    background: "var(--color-primary-50)",
    backdropFilter: "var(--backdrop-blur-lg)",
    border: "2px solid var(--color-primary-500)",
    borderRadius: "var(--radius-card)",
    padding: "var(--spacing-xl)",
    transition: "var(--transition-normal)",
  },
  widgetContainer: {
    position: "relative",
    "&:hover": {
      "& .remove-button": {
        opacity: 1,
      },
    },
    // Always show remove button on mobile
    "@media (max-width: 767px)": {
      "& .remove-button": {
        opacity: 1,
      },
    },
  },
  removeButton: {
    position: "absolute",
    top: 12,
    right: 12,
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
    // Always show remove button on mobile
    "@media (max-width: 767px)": {
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
  // Mobile specific styles
  mobileDrawer: {
    width: "80%",
    "& .MuiDrawer-paper": {
      width: "80%",
      boxSizing: "border-box",
      background: "var(--color-bg-glass)",
      backdropFilter: "var(--backdrop-blur-lg)",
      height: "100%",
    },
  },
  desktopDrawer: {
    width: "var(--dashboard-sidebar-width)",
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: "var(--dashboard-sidebar-width)",
      boxSizing: "border-box",
      borderRight: "1px solid var(--color-border-light)",
      background: "var(--color-bg-glass)",
      backdropFilter: "var(--backdrop-blur-lg)",
      height: "100%",
    },
  },
  drawerContent: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    p: 2,
  },
  drawerHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2,
    pb: 2,
    borderBottom: "1px solid var(--color-border-light)",
    flexShrink: 0,
  },
  drawerTitle: {
    color: "var(--color-text-primary)",
  },
  drawerCloseButton: {
    color: "var(--color-text-secondary)",
  },
  dashboardAreaMobile: {
    marginLeft: "0 !important",
    width: "100%",
    padding: "var(--spacing-lg)",
  },
  dashboardAreaWithSidebar: {
    marginLeft: "var(--dashboard-sidebar-width)",
    transition: "margin-left var(--transition-normal)",
  },
  dashboardHeaderMobile: {
    padding: "var(--spacing-lg)",
    marginBottom: "var(--spacing-2xl)",
  },
  headerTitleMobile: {
    fontSize: "var(--font-size-3xl)",
    margin: "0 0 var(--spacing-xs) 0",
  },
  headerDescriptionMobile: {
    fontSize: "var(--font-size-md)",
  },
  toggleButtonMobile: {
    boxShadow: "var(--shadow-lg)",
    transition: "var(--transition-button)",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "var(--shadow-xl)",
    },
  },
  emptyStateMobile: {
    minHeight: "200px",
    padding: "var(--spacing-lg)",
  },
  widgetContainerMobile: {
    position: "relative",
    "& .remove-button": {
      opacity: 1, // Always visible on mobile
    },
  },
  removeButtonMobile: {
    position: "absolute",
    top: 8,
    right: 8,
    opacity: 1, // Always visible on mobile
    transition: "var(--transition-fast)",
    background: "var(--color-error-500)",
    color: "var(--color-text-primary)",
    width: 24,
    height: 24,
    zIndex: 10,
    "&:hover": {
      background: "var(--color-error-600)",
      transform: "scale(1.1)",
    },
  },
  fallbackCardMobile: {
    position: "relative",
    background: "var(--color-bg-glass)",
    backdropFilter: "var(--backdrop-blur-lg)",
    border: "1px solid var(--color-border-light)",
    borderRadius: "var(--radius-card)",
    boxShadow: "var(--shadow-glass)",
    transition: "var(--transition-card)",
    "&:hover": {
      borderColor: "var(--color-border-accent)",
    },
    "& .remove-button": {
      opacity: 1, // Always visible on mobile
    },
  },
  dragOverlayMobile: {
    padding: "var(--spacing-md)",
    background: "var(--color-bg-glass)",
    backdropFilter: "var(--backdrop-blur-lg)",
    border: "1px solid var(--color-border-accent)",
    borderRadius: "var(--radius-card)",
    boxShadow: "var(--shadow-glow)",
    color: "var(--color-text-primary)",
    minWidth: "150px",
    textAlign: "center",
    transform: "rotate(0deg)",
  },
};
