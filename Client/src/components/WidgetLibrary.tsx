import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery("(max-width: 480px)");
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
      sx={{
        ...styles.widgetCard,
        ...(isMobile && styles.widgetCardMobile),
        ...(isSmallMobile && styles.widgetCardSmallMobile),
      }}
      data-testid={`draggable-widget-${config.id}`}
    >
      <CardContent
        sx={{
          ...styles.widgetCardContent,
          ...(isMobile && styles.widgetCardContentMobile),
          ...(isSmallMobile && styles.widgetCardContentSmallMobile),
        }}
      >
        <Box
          sx={{
            ...styles.widgetContainer,
            ...(isMobile && styles.widgetContainerMobile),
            ...(isSmallMobile && styles.widgetContainerSmallMobile),
          }}
          data-testid={`widget-container-${config.id}`}
        >
          <Box
            sx={{
              ...styles.widgetIconContainer,
              ...(isMobile && styles.widgetIconContainerMobile),
              ...(isSmallMobile && styles.widgetIconContainerSmallMobile),
            }}
            data-testid={`widget-icon-${config.id}`}
          >
            <Box
              sx={{
                ...styles.widgetIcon,
                ...(isMobile && styles.widgetIconMobile),
                ...(isSmallMobile && styles.widgetIconSmallMobile),
              }}
            >
              {getWidgetIcon(config.type)}
            </Box>
          </Box>
          <Typography
            variant={isSmallMobile ? "body2" : isMobile ? "subtitle1" : "h6"}
            sx={{
              ...styles.widgetTitle,
              ...(isMobile && styles.widgetTitleMobile),
              ...(isSmallMobile && styles.widgetTitleSmallMobile),
            }}
            data-testid={`widget-title-${config.id}`}
          >
            {config.title}
          </Typography>
          <Typography
            variant={isSmallMobile ? "caption" : isMobile ? "caption" : "body2"}
            sx={{
              ...styles.widgetDescription,
              ...(isMobile && styles.widgetDescriptionMobile),
              ...(isSmallMobile && styles.widgetDescriptionSmallMobile),
            }}
            data-testid={`widget-description-${config.id}`}
          >
            {config.description}
          </Typography>
          <Chip
            label={config.size.toUpperCase()}
            size="small"
            sx={{
              ...styles.widgetSizeChip,
              ...(isMobile && styles.widgetSizeChipMobile),
              ...(isSmallMobile && styles.widgetSizeChipSmallMobile),
            }}
            data-testid={`widget-size-${config.id}`}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export default function WidgetLibrary() {
  const { state } = useDashboard();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery("(max-width: 480px)");

  return (
    <Box
      sx={{
        ...styles.container,
        ...(isMobile && styles.containerMobile),
        ...(isSmallMobile && styles.containerSmallMobile),
      }}
      data-testid="widget-library"
    >
      <Typography
        variant={isMobile ? "h5" : "h4"}
        sx={{
          ...styles.title,
          ...(isMobile && styles.titleMobile),
          ...(isSmallMobile && styles.titleSmallMobile),
        }}
        data-testid="widget-library-title"
      >
        Widget Library
      </Typography>
      <Typography
        variant={isMobile ? "caption" : "body2"}
        sx={{
          ...styles.subtitle,
          ...(isMobile && styles.subtitleMobile),
          ...(isSmallMobile && styles.subtitleSmallMobile),
        }}
        data-testid="widget-library-subtitle"
      >
        {isMobile
          ? "Tap and drag widgets to add them to your dashboard"
          : "Drag widgets to the dashboard to customize your layout"}
      </Typography>

      <Box
        sx={{
          ...styles.widgetGrid,
          ...(isMobile && styles.widgetGridMobile),
          ...(isSmallMobile && styles.widgetGridSmallMobile),
        }}
        data-testid="widget-grid"
      >
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
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  containerMobile: {
    p: "var(--spacing-md)",
    height: "100%",
  },
  containerSmallMobile: {
    p: "var(--spacing-sm)",
    height: "100%",
  },
  title: {
    color: "var(--color-text-primary)",
    fontSize: "var(--font-size-xl)",
    fontWeight: "var(--font-weight-bold)",
    mb: "var(--spacing-sm)",
  },
  titleMobile: {
    fontSize: "var(--font-size-lg)",
    mb: "var(--spacing-xs)",
  },
  titleSmallMobile: {
    fontSize: "var(--font-size-md)",
    mb: "var(--spacing-xs)",
  },
  subtitle: {
    color: "var(--color-text-secondary)",
    fontSize: "var(--font-size-sm)",
    mb: "var(--spacing-xl)",
  },
  subtitleMobile: {
    fontSize: "var(--font-size-xs)",
    mb: "var(--spacing-lg)",
  },
  subtitleSmallMobile: {
    fontSize: "var(--font-size-xs)",
    mb: "var(--spacing-lg)",
  },
  widgetGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "var(--spacing-md)",
    flex: 1,
    overflowY: "auto",
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
  widgetGridMobile: {
    gap: "var(--spacing-sm)",
    "&::-webkit-scrollbar": {
      width: "4px",
    },
  },
  widgetGridSmallMobile: {
    gap: "var(--spacing-xs)",
    "&::-webkit-scrollbar": {
      width: "3px",
    },
  },
  widgetCard: {
    cursor: "grab",
    background: "var(--color-bg-glass)",
    backdropFilter: "var(--backdrop-blur-lg)",
    border: "1px solid var(--color-border-light)",
    borderRadius: "var(--radius-lg)",
    transition: "var(--transition-card)",
    minHeight: "120px", // Ensure minimum height for desktop
    "&:hover": {
      borderColor: "var(--color-border-accent)",
      transform: "translateY(-2px)",
      boxShadow: "var(--shadow-lg)",
    },
    "&:active": {
      cursor: "grabbing",
    },
  },
  widgetCardMobile: {
    minHeight: "140px", // Larger minimum height for mobile
    "&:hover": {
      transform: "none", // Disable hover transform on mobile
    },
    "&:active": {
      transform: "scale(0.98)",
      boxShadow: "var(--shadow-md)",
    },
  },
  widgetCardContent: {
    p: "var(--spacing-lg)",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  widgetCardContentMobile: {
    p: "var(--spacing-md)",
    minHeight: "120px", // Ensure content has minimum height
  },
  widgetContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "var(--spacing-sm)",
    height: "100%",
    justifyContent: "center",
  },
  widgetContainerMobile: {
    gap: "var(--spacing-xs)",
    minHeight: "100px", // Ensure container has minimum height
  },
  widgetIconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    mb: "var(--spacing-xs)",
  },
  widgetIconContainerMobile: {
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
  widgetIconMobile: {
    fontSize: "1.8rem", // Slightly larger icon for mobile
    "& svg": {
      fontSize: "1.8rem",
    },
  },
  widgetTitle: {
    color: "var(--color-text-primary)",
    fontSize: "var(--font-size-sm)",
    fontWeight: "var(--font-weight-semibold)",
    textAlign: "center",
    mb: "var(--spacing-xs)",
  },
  widgetTitleMobile: {
    fontSize: "var(--font-size-sm)", // Slightly larger for mobile
    mb: "var(--spacing-xs)",
  },
  widgetDescription: {
    color: "var(--color-text-secondary)",
    fontSize: "var(--font-size-xs)",
    textAlign: "center",
    mb: "var(--spacing-sm)",
  },
  widgetDescriptionMobile: {
    fontSize: "var(--font-size-xs)",
    mb: "var(--spacing-xs)",
    lineHeight: "1.3", // Better line height for readability
  },
  widgetSizeChip: {
    background: "var(--color-primary-500)",
    color: "var(--color-text-primary)",
    fontSize: "var(--font-size-xs)",
    fontWeight: "var(--font-weight-medium)",
  },
  widgetSizeChipMobile: {
    fontSize: "var(--font-size-xs)",
    height: "22px", // Slightly taller for mobile
    "& .MuiChip-label": {
      fontSize: "var(--font-size-xs)",
      padding: "0 8px", // More padding for mobile
    },
  },
  widgetCardSmallMobile: {
    minHeight: "160px", // Even larger minimum height for very small screens
    "&:hover": {
      transform: "none",
    },
    "&:active": {
      transform: "scale(0.98)",
      boxShadow: "var(--shadow-md)",
    },
  },
  widgetCardContentSmallMobile: {
    p: "var(--spacing-sm)",
    minHeight: "140px", // Ensure content has good minimum height
  },
  widgetContainerSmallMobile: {
    gap: "var(--spacing-xs)",
    minHeight: "120px", // Ensure container has good minimum height
  },
  widgetIconContainerSmallMobile: {
    mb: "var(--spacing-xs)",
  },
  widgetIconSmallMobile: {
    fontSize: "2rem", // Larger icon for small mobile
    "& svg": {
      fontSize: "2rem",
    },
  },
  widgetTitleSmallMobile: {
    fontSize: "var(--font-size-base)", // Readable font size for small mobile
    mb: "var(--spacing-xs)",
    lineHeight: "1.2",
  },
  widgetDescriptionSmallMobile: {
    fontSize: "var(--font-size-xs)",
    mb: "var(--spacing-xs)",
    lineHeight: "1.3",
  },
  widgetSizeChipSmallMobile: {
    fontSize: "var(--font-size-xs)",
    height: "24px", // Taller for small mobile
    "& .MuiChip-label": {
      fontSize: "var(--font-size-xs)",
      padding: "0 10px", // More padding for small mobile
    },
  },
};
