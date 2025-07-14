import { Box, Typography, Card, CardContent, Chip } from "@mui/material";
import {
  CloudQueue as WeatherIcon,
  CalendarToday as CalendarTodayIcon,
  Warning as WarningIcon,
  BarChart as BarChartIcon,
  WaterDrop as WaterDropIcon,
  Explore as ExploreIcon,
  WbSunny as WbSunnyIcon,
  TrendingUp as TrendingUpIcon,
  Visibility as VisibilityIcon,
  WbTwilight as WbTwilightIcon,
  Widgets as DefaultWidgetsIcon,
} from "@mui/icons-material";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useDashboard } from "../contexts/DashboardContext";
import type { WidgetConfig, WidgetType } from "../types/dashboard";

interface DraggableWidgetProps {
  config: WidgetConfig;
}

// Helper function to get the appropriate MUI icon component for a widget type
function getWidgetIcon(type: WidgetType) {
  const iconMap: Record<WidgetType, React.ComponentType> = {
    "current-weather": WeatherIcon,
    "weather-forecast": CalendarTodayIcon,
    "weather-alerts": WarningIcon,
    "temperature-chart": BarChartIcon,
    "humidity-meter": WaterDropIcon,
    "wind-compass": ExploreIcon,
    "uv-index": WbSunnyIcon,
    "air-pressure": TrendingUpIcon,
    visibility: VisibilityIcon,
    "sunrise-sunset": WbTwilightIcon,
  };

  const IconComponent = iconMap[type] || DefaultWidgetsIcon;
  return <IconComponent />;
}

function DraggableWidget({ config }: DraggableWidgetProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: config.id,
      data: {
        type: "widget-config",
        config,
      },
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      sx={styles.widgetCard}
      data-testid={`draggable-widget-${config.id}`}
    >
      <CardContent sx={styles.widgetCardContent}>
        <Box
          sx={styles.widgetContainer}
          data-testid={`widget-container-${config.id}`}
        >
          <Box
            sx={styles.widgetIconContainer}
            data-testid={`widget-icon-${config.id}`}
          >
            <Box sx={styles.widgetIcon}>{getWidgetIcon(config.type)}</Box>
          </Box>
          <Typography
            variant="h6"
            sx={styles.widgetTitle}
            data-testid={`widget-title-${config.id}`}
          >
            {config.title}
          </Typography>
          <Typography
            variant="body2"
            sx={styles.widgetDescription}
            data-testid={`widget-description-${config.id}`}
          >
            {config.description}
          </Typography>
          <Chip
            label={config.size.toUpperCase()}
            size="small"
            sx={styles.widgetSizeChip}
            data-testid={`widget-size-${config.id}`}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export default function WidgetLibrary() {
  const { state } = useDashboard();

  return (
    <Box sx={styles.container} data-testid="widget-library">
      <Typography
        variant="h4"
        sx={styles.title}
        data-testid="widget-library-title"
      >
        Widget Library
      </Typography>
      <Typography
        variant="body2"
        sx={styles.subtitle}
        data-testid="widget-library-subtitle"
      >
        Drag widgets to the dashboard to customize your layout
      </Typography>

      <Box sx={styles.widgetGrid} data-testid="widget-grid">
        {state.availableWidgets.map((config) => (
          <DraggableWidget key={config.id} config={config} />
        ))}
      </Box>
    </Box>
  );
}

const styles = {
  container: {
    p: "var(--spacing-lg)",
  },
  title: {
    color: "var(--color-text-primary)",
    fontSize: "var(--font-size-xl)",
    fontWeight: "var(--font-weight-bold)",
    mb: "var(--spacing-sm)",
  },
  subtitle: {
    color: "var(--color-text-secondary)",
    fontSize: "var(--font-size-sm)",
    mb: "var(--spacing-xl)",
  },
  widgetGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "var(--spacing-md)",
    maxHeight: "calc(100vh - 200px)",
    overflowY: "auto",
    pr: "var(--spacing-sm)",
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-track": {
      background: "var(--color-bg-tertiary)",
      borderRadius: "3px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "var(--color-primary-500)",
      borderRadius: "3px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "var(--color-primary-600)",
    },
  },
  widgetCard: {
    cursor: "grab",
    background: "var(--color-bg-glass)",
    backdropFilter: "var(--backdrop-blur-lg)",
    border: "1px solid var(--color-border-light)",
    borderRadius: "var(--radius-lg)",
    transition: "var(--transition-card)",
    "&:hover": {
      borderColor: "var(--color-border-accent)",
      transform: "translateY(-2px)",
      boxShadow: "var(--shadow-lg)",
    },
    "&:active": {
      cursor: "grabbing",
    },
  },
  widgetCardContent: {
    p: "var(--spacing-lg)",
  },
  widgetContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "var(--spacing-sm)",
  },
  widgetIconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    mb: "var(--spacing-xs)",
  },
  widgetIcon: {
    fontSize: "2rem",
    color: "var(--color-primary-500)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& svg": {
      fontSize: "2rem",
    },
  },
  widgetTitle: {
    color: "var(--color-text-primary)",
    fontSize: "var(--font-size-sm)",
    fontWeight: "var(--font-weight-semibold)",
    textAlign: "center",
    mb: "var(--spacing-xs)",
  },
  widgetDescription: {
    color: "var(--color-text-secondary)",
    fontSize: "var(--font-size-xs)",
    textAlign: "center",
    mb: "var(--spacing-sm)",
  },
  widgetSizeChip: {
    background: "var(--color-primary-500)",
    color: "var(--color-text-primary)",
    fontSize: "var(--font-size-xs)",
    fontWeight: "var(--font-weight-medium)",
  },
};
