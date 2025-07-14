import { Box, Typography } from "@mui/material";
import { CloudQueue as WeatherIcon } from "@mui/icons-material";
import CurrentWeatherCard from "./CurrentWeatherCard";
import WeatherForecastCard from "./WeatherForecastCard";
import WeatherAlertsCard from "./WeatherAlertsCard";

export default function WeatherDashboard() {
  return (
    <Box sx={styles.container} data-testid="weather-dashboard">
      {/* Header */}
      <Box sx={styles.header} data-testid="weather-dashboard-header">
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          sx={styles.title}
          data-testid="dashboard-title"
        >
          <WeatherIcon sx={styles.titleIcon} />
          Weather Dashboard
        </Typography>
        <Typography
          variant="h5"
          sx={styles.subtitle}
          data-testid="dashboard-subtitle"
        >
          Real-time weather information and forecasts
        </Typography>
      </Box>

      {/* Dashboard Grid */}
      <Box sx={styles.dashboardGrid} data-testid="dashboard-grid">
        {/* Current Weather */}
        <Box sx={styles.gridItem} data-testid="current-weather-section">
          <CurrentWeatherCard />
        </Box>

        {/* Forecast */}
        <Box sx={styles.gridItem} data-testid="forecast-section">
          <WeatherForecastCard />
        </Box>

        {/* Alerts */}
        <Box sx={styles.gridItem} data-testid="alerts-section">
          <WeatherAlertsCard />
        </Box>
      </Box>
    </Box>
  );
}

const styles = {
  container: {
    width: "100%",
    maxWidth: 1200,
    mx: "auto",
  },
  header: {
    textAlign: "center",
    mb: 4,
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    color: "text.primary",
  },
  titleIcon: {
    fontSize: "3rem",
    color: "primary.main",
  },
  subtitle: {
    color: "text.secondary",
  },
  dashboardGrid: {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
    gap: 3,
  },
  gridItem: {
    // Base styles for grid items, can be extended if needed
  },
};
