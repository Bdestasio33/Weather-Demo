import { Box, Card, CardContent, Typography } from "@mui/material";
import {
  Explore as ExploreIcon,
  North as NorthIcon,
  Air as AirIcon,
  Speed as SpeedIcon,
} from "@mui/icons-material";
import { demoWeatherMetrics } from "../demo/weatherData";
import "../styles/variables.css";

interface WindCompassCardProps {
  showDetails?: boolean;
  size?: "small" | "medium" | "large";
}

export default function WindCompassCard({
  showDetails = true,
  size = "medium",
}: WindCompassCardProps) {
  const { windSpeed, windDirection, windDirectionDegrees, windGust } =
    demoWeatherMetrics;

  const compassSize = size === "small" ? 80 : size === "large" ? 120 : 100;

  return (
    <Card sx={styles.card} data-testid="wind-compass-card">
      <CardContent sx={styles.cardContent}>
        <Box sx={styles.header} data-testid="wind-compass-header">
          <ExploreIcon sx={styles.headerIcon} />
          <Typography
            variant="h6"
            sx={styles.headerTitle}
            data-testid="wind-compass-title"
          >
            Wind Compass
          </Typography>
        </Box>

        <Box sx={styles.compassContainer} data-testid="compass-container">
          <Box
            sx={{
              ...styles.compass,
              width: compassSize,
              height: compassSize,
            }}
            data-testid="wind-compass"
          >
            {/* Cardinal directions */}
            <Typography sx={styles.cardinalNorth} data-testid="cardinal-north">
              N
            </Typography>
            <Typography sx={styles.cardinalEast} data-testid="cardinal-east">
              E
            </Typography>
            <Typography sx={styles.cardinalSouth} data-testid="cardinal-south">
              S
            </Typography>
            <Typography sx={styles.cardinalWest} data-testid="cardinal-west">
              W
            </Typography>

            {/* Wind direction arrow */}
            <Box
              sx={{
                ...styles.windArrow,
                transform: `rotate(${windDirectionDegrees}deg)`,
              }}
              data-testid="wind-direction-arrow"
            >
              <NorthIcon sx={styles.windArrowIcon} />
            </Box>

            {/* Center dot */}
            <Box sx={styles.centerDot} data-testid="compass-center" />
          </Box>

          {/* Wind speed display */}
          <Box sx={styles.speedContainer} data-testid="wind-speed-container">
            <Typography
              variant="h4"
              sx={styles.speedValue}
              data-testid="wind-speed-value"
            >
              {windSpeed}
            </Typography>
            <Typography
              variant="body2"
              sx={styles.speedUnit}
              data-testid="wind-speed-unit"
            >
              mph
            </Typography>
          </Box>

          <Typography
            variant="body1"
            sx={styles.direction}
            data-testid="wind-direction-text"
          >
            {windDirection}
          </Typography>
        </Box>

        {showDetails && (
          <Box sx={styles.detailsContainer} data-testid="wind-details">
            <Box sx={styles.detailItem} data-testid="wind-gust-section">
              <AirIcon sx={styles.detailIcon} />
              <Box>
                <Typography
                  variant="caption"
                  sx={styles.detailLabel}
                  data-testid="wind-gust-label"
                >
                  Gusts
                </Typography>
                <Typography
                  variant="body2"
                  sx={styles.detailValue}
                  data-testid="wind-gust-value"
                >
                  {windGust} mph
                </Typography>
              </Box>
            </Box>

            <Box sx={styles.detailItem} data-testid="wind-speed-section">
              <SpeedIcon sx={styles.detailIcon} />
              <Box>
                <Typography
                  variant="caption"
                  sx={styles.detailLabel}
                  data-testid="wind-speed-label"
                >
                  Speed
                </Typography>
                <Typography
                  variant="body2"
                  sx={styles.detailValue}
                  data-testid="wind-speed-detail"
                >
                  {windSpeed} mph
                </Typography>
              </Box>
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
  headerIcon: {
    fontSize: "1.5rem",
    mr: 2,
    color: "var(--color-primary-500)",
  },
  headerTitle: {
    color: "var(--color-text-primary)",
    fontWeight: "var(--font-weight-semibold)",
  },
  compassContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
  },
  compass: {
    position: "relative",
    background: "var(--color-bg-muted)",
    borderRadius: "50%",
    border: "3px solid var(--color-border-light)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    mb: 2,
    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  cardinalNorth: {
    position: "absolute",
    top: "8px",
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: "0.875rem",
    fontWeight: "var(--font-weight-bold)",
    color: "var(--color-text-primary)",
  },
  cardinalEast: {
    position: "absolute",
    right: "8px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "0.875rem",
    fontWeight: "var(--font-weight-bold)",
    color: "var(--color-text-primary)",
  },
  cardinalSouth: {
    position: "absolute",
    bottom: "8px",
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: "0.875rem",
    fontWeight: "var(--font-weight-bold)",
    color: "var(--color-text-primary)",
  },
  cardinalWest: {
    position: "absolute",
    left: "8px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "0.875rem",
    fontWeight: "var(--font-weight-bold)",
    color: "var(--color-text-primary)",
  },
  windArrow: {
    position: "absolute",
    color: "var(--color-primary-500)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.3s ease",
    transformOrigin: "center",
  },
  windArrowIcon: {
    fontSize: "2rem",
    filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))",
  },
  centerDot: {
    width: "8px",
    height: "8px",
    background: "var(--color-primary-500)",
    borderRadius: "50%",
    position: "absolute",
  },
  speedContainer: {
    display: "flex",
    alignItems: "baseline",
    gap: 1,
  },
  speedValue: {
    color: "var(--color-primary-500)",
    fontWeight: "var(--font-weight-bold)",
  },
  speedUnit: {
    color: "var(--color-text-secondary)",
    fontWeight: "var(--font-weight-medium)",
  },
  direction: {
    color: "var(--color-text-primary)",
    fontWeight: "var(--font-weight-medium)",
    textAlign: "center",
  },
  detailsContainer: {
    mt: 3,
    display: "flex",
    justifyContent: "space-around",
    pt: 2,
    borderTop: "1px solid var(--color-border-light)",
  },
  detailItem: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  detailIcon: {
    fontSize: "1.25rem",
    color: "var(--color-primary-500)",
  },
  detailLabel: {
    color: "var(--color-text-secondary)",
    display: "block",
    fontSize: "0.75rem",
  },
  detailValue: {
    color: "var(--color-text-primary)",
    fontWeight: "var(--font-weight-medium)",
  },
};
