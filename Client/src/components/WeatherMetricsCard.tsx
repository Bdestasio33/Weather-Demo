import { Box, Card, CardContent, Typography } from "@mui/material";
import { North as NorthIcon } from "@mui/icons-material";
import {
  getMetricContent,
  type MetricType,
} from "../config/weatherMetricsConfig";
import { demoWeatherMetrics } from "../demo/weatherData";
import "../styles/variables.css";

interface WeatherMetricsCardProps {
  type: MetricType;
}

export default function WeatherMetricsCard({ type }: WeatherMetricsCardProps) {
  const metric = getMetricContent(type);

  return (
    <Card sx={styles.card} data-testid={`weather-metrics-card-${type}`}>
      <CardContent sx={styles.cardContent}>
        <Box sx={styles.header} data-testid={`metrics-header-${type}`}>
          {metric.icon}
          <Typography
            variant="h6"
            sx={styles.headerTitle}
            data-testid={`metrics-title-${type}`}
          >
            {metric.title}
          </Typography>
        </Box>

        <Box sx={styles.valueContainer} data-testid={`metrics-value-${type}`}>
          <Typography
            variant="h2"
            sx={{ ...styles.value, color: metric.color }}
            data-testid={`metrics-value-text-${type}`}
          >
            {metric.value}
          </Typography>

          <Typography
            variant="body2"
            sx={styles.description}
            data-testid={`metrics-description-${type}`}
          >
            {metric.description}
          </Typography>
        </Box>

        {/* Additional details for specific metrics */}
        {type === "wind-compass" && (
          <Box
            sx={styles.windCompassContainer}
            data-testid="wind-compass-indicator"
          >
            <Box sx={styles.windCompass}>
              {/* Simple wind direction indicator */}
              <Box
                sx={{
                  ...styles.windDirection,
                  transform: `rotate(${demoWeatherMetrics.windDirectionDegrees}deg)`,
                }}
                data-testid="wind-direction-arrow"
              >
                <NorthIcon sx={styles.windDirectionIcon} />
              </Box>
            </Box>
          </Box>
        )}

        {type === "sunrise-sunset" && (
          <Box sx={styles.sunDetailsContainer} data-testid="sun-details">
            <Box sx={styles.sunDetail} data-testid="moon-phase-section">
              <Typography variant="caption" sx={styles.sunDetailLabel}>
                Moon Phase
              </Typography>
              <Typography
                variant="body2"
                sx={styles.sunDetailValue}
                data-testid="moon-phase-value"
              >
                {demoWeatherMetrics.moonPhase}
              </Typography>
            </Box>
            <Box sx={styles.sunDetail} data-testid="moon-illumination-section">
              <Typography variant="caption" sx={styles.sunDetailLabel}>
                Illumination
              </Typography>
              <Typography
                variant="body2"
                sx={styles.sunDetailValue}
                data-testid="moon-illumination-value"
              >
                {demoWeatherMetrics.moonIllumination}%
              </Typography>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

const styles = {
  card: {
    background: "var(--color-bg-glass)",
    backdropFilter: "var(--backdrop-blur-lg)",
    border: "1px solid var(--color-border-light)",
    borderRadius: "var(--radius-card)",
    boxShadow: "var(--shadow-glass)",
    height: "100%",
    transition: "var(--transition-card)",
    "&:hover": {
      borderColor: "var(--color-border-accent)",
    },
  },
  cardContent: {
    p: 3,
  },
  header: {
    display: "flex",
    alignItems: "center",
    mb: 3,
  },
  headerTitle: {
    color: "var(--color-text-primary)",
    fontWeight: "var(--font-weight-semibold)",
  },
  valueContainer: {
    textAlign: "center",
    py: 2,
  },
  value: {
    fontWeight: "var(--font-weight-bold)",
    mb: 1,
    fontSize: "2.5rem",
  },
  description: {
    color: "var(--color-text-secondary)",
    fontWeight: "var(--font-weight-medium)",
    textTransform: "capitalize",
  },
  windCompassContainer: {
    mt: 2,
    display: "flex",
    justifyContent: "center",
  },
  windCompass: {
    width: "60px",
    height: "60px",
    background: "var(--color-bg-muted)",
    borderRadius: "50%",
    border: "2px solid var(--color-border-light)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  windDirection: {
    color: "var(--color-primary-500)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  windDirectionIcon: {
    fontSize: "1.5rem",
  },
  sunDetailsContainer: {
    mt: 2,
    display: "flex",
    justifyContent: "space-between",
  },
  sunDetail: {
    textAlign: "center",
  },
  sunDetailLabel: {
    color: "var(--color-text-secondary)",
    display: "block",
  },
  sunDetailValue: {
    color: "var(--color-text-primary)",
  },
};
