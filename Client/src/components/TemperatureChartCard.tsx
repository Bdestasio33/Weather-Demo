import { Box, Card, CardContent, Typography } from "@mui/material";
import { TrendingUp as TrendingUpIcon } from "@mui/icons-material";
import { demoTemperatureTrend } from "../demo/weatherData";
import "../styles/variables.css";

export default function TemperatureChartCard() {
  const maxTemp = Math.max(...demoTemperatureTrend.map((d) => d.temperature));
  const minTemp = Math.min(...demoTemperatureTrend.map((d) => d.temperature));
  const tempRange = maxTemp - minTemp;

  return (
    <Card sx={styles.card} data-testid="temperature-chart-card">
      <CardContent sx={styles.cardContent}>
        <Box sx={styles.header} data-testid="temperature-chart-header">
          <TrendingUpIcon sx={styles.headerIcon} />
          <Typography
            variant="h6"
            sx={styles.headerTitle}
            data-testid="temperature-chart-title"
          >
            Temperature Trend
          </Typography>
        </Box>

        <Box sx={styles.legendContainer} data-testid="temperature-chart-legend">
          <Typography
            variant="body2"
            sx={styles.legendDescription}
            data-testid="chart-description"
          >
            24-hour temperature chart
          </Typography>
          <Box sx={styles.legendItems}>
            <Box sx={styles.legendItem} data-testid="temperature-legend-item">
              <Box sx={styles.temperatureLegendDot} />
              <Typography variant="caption" sx={styles.legendText}>
                Temperature
              </Typography>
            </Box>
            <Box sx={styles.legendItem} data-testid="feels-like-legend-item">
              <Box sx={styles.feelsLikeLegendDot} />
              <Typography variant="caption" sx={styles.legendText}>
                Feels Like
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={styles.chartContainer}
          data-testid="temperature-chart-container"
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 600 200"
            data-testid="temperature-chart-svg"
          >
            {/* Grid lines */}
            <defs>
              <pattern
                id="grid"
                width="50"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 50 0 L 0 0 0 40"
                  fill="none"
                  stroke="var(--color-border-light)"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Temperature line */}
            <polyline
              fill="none"
              stroke="var(--color-primary-500)"
              strokeWidth="2"
              points={demoTemperatureTrend
                .map((point, index) => {
                  const x =
                    (index / (demoTemperatureTrend.length - 1)) * 580 + 10;
                  const y =
                    180 - ((point.temperature - minTemp) / tempRange) * 160;
                  return `${x},${y}`;
                })
                .join(" ")}
              data-testid="temperature-line"
            />

            {/* Feels like line */}
            <polyline
              fill="none"
              stroke="var(--color-secondary-500)"
              strokeWidth="2"
              strokeDasharray="5,5"
              points={demoTemperatureTrend
                .map((point, index) => {
                  const x =
                    (index / (demoTemperatureTrend.length - 1)) * 580 + 10;
                  const y =
                    180 - ((point.feelsLike - minTemp) / tempRange) * 160;
                  return `${x},${y}`;
                })
                .join(" ")}
              data-testid="feels-like-line"
            />

            {/* Data points */}
            {demoTemperatureTrend.map((point, index) => {
              const x = (index / (demoTemperatureTrend.length - 1)) * 580 + 10;
              const y = 180 - ((point.temperature - minTemp) / tempRange) * 160;
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="3"
                  fill="var(--color-primary-500)"
                  stroke="var(--color-bg-primary)"
                  strokeWidth="2"
                  data-testid={`temperature-point-${index}`}
                />
              );
            })}
          </svg>

          {/* Temperature labels */}
          <Box sx={styles.temperatureLabels} data-testid="temperature-labels">
            <Typography
              variant="caption"
              sx={styles.temperatureLabel}
              data-testid="high-temp-label"
            >
              High: {maxTemp}°F
            </Typography>
            <Typography
              variant="caption"
              sx={styles.temperatureLabel}
              data-testid="low-temp-label"
            >
              Low: {minTemp}°F
            </Typography>
          </Box>
        </Box>

        <Box sx={styles.timeLabels} data-testid="time-labels">
          <Typography
            variant="caption"
            sx={styles.timeLabel}
            data-testid="start-time-label"
          >
            12:00 AM
          </Typography>
          <Typography
            variant="caption"
            sx={styles.timeLabel}
            data-testid="current-temp-label"
          >
            Current:{" "}
            {demoTemperatureTrend[demoTemperatureTrend.length - 1].temperature}
            °F
          </Typography>
          <Typography
            variant="caption"
            sx={styles.timeLabel}
            data-testid="end-time-label"
          >
            11:00 PM
          </Typography>
        </Box>
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
  legendContainer: {
    mb: 3,
  },
  legendDescription: {
    color: "var(--color-text-secondary)",
    mb: 1,
  },
  legendItems: {
    display: "flex",
    alignItems: "center",
    gap: 2,
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  temperatureLegendDot: {
    width: 12,
    height: 12,
    background: "var(--color-primary-500)",
    borderRadius: "50%",
  },
  feelsLikeLegendDot: {
    width: 12,
    height: 12,
    background: "var(--color-secondary-500)",
    borderRadius: "50%",
  },
  legendText: {
    color: "var(--color-text-secondary)",
  },
  chartContainer: {
    position: "relative",
    height: "200px",
    width: "100%",
    background: "var(--color-bg-muted)",
    borderRadius: "var(--radius-sm)",
    border: "1px solid var(--color-border-light)",
    overflow: "hidden",
  },
  temperatureLabels: {
    position: "absolute",
    top: 10,
    left: 10,
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },
  temperatureLabel: {
    color: "var(--color-text-secondary)",
    background: "var(--color-bg-glass)",
    padding: "2px 8px",
    borderRadius: "4px",
    fontSize: "0.7rem",
  },
  timeLabels: {
    mt: 2,
    display: "flex",
    justifyContent: "space-between",
  },
  timeLabel: {
    color: "var(--color-text-secondary)",
  },
};
