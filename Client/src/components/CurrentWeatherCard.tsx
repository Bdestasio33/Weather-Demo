import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";
import { toast } from "react-toastify";
import { useCurrentWeather } from "../hooks/api/weather";
import { useTemperatureUnit } from "../contexts/UserContext";
import { useEffect, useRef } from "react";

export default function CurrentWeatherCard() {
  const { data: weather, isLoading, error, isError } = useCurrentWeather();
  const [temperatureUnit] = useTemperatureUnit();
  const hasShownSuccessToast = useRef(false);

  // Show success toast only on first successful load
  useEffect(() => {
    if (weather && !hasShownSuccessToast.current) {
      hasShownSuccessToast.current = true;
      toast.success(`Weather data loaded for ${weather.location}`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [weather]);

  // Show error toast when error occurs
  useEffect(() => {
    if (isError && error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch weather data";
      toast.error(errorMessage, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [isError, error]);

  if (isLoading) {
    return (
      <Card sx={styles.card} data-testid="current-weather-loading">
        <CardContent>
          <Box sx={styles.loadingContainer} data-testid="loading-container">
            <CircularProgress
              sx={styles.loadingSpinner}
              data-testid="loading-spinner"
            />
            <Typography
              variant="body1"
              sx={styles.loadingText}
              data-testid="loading-text"
            >
              Loading weather data...
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card sx={styles.card} data-testid="current-weather-error">
        <CardContent>
          <Alert
            severity="error"
            sx={styles.errorAlert}
            data-testid="error-alert"
          >
            {error instanceof Error
              ? error.message
              : "Failed to fetch weather data"}
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (!weather) {
    return (
      <Card sx={styles.card} data-testid="current-weather-no-data">
        <CardContent>
          <Typography
            variant="body1"
            sx={styles.noDataText}
            data-testid="no-data-text"
          >
            No weather data available
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const displayTemp =
    temperatureUnit === "fahrenheit"
      ? weather.temperatureF
      : weather.temperature;
  const tempUnit = temperatureUnit === "fahrenheit" ? "°F" : "°C";

  return (
    <Card sx={styles.cardWithHover} data-testid="current-weather-card">
      <CardContent sx={styles.cardContent}>
        {/* Location */}
        <Typography
          variant="h6"
          component="h2"
          sx={styles.location}
          data-testid="weather-location"
        >
          <LocationOnIcon sx={styles.locationIcon} /> {weather.location}
        </Typography>

        {/* Main Temperature */}
        <Box
          sx={styles.temperatureContainer}
          data-testid="temperature-container"
        >
          <Typography
            variant="h1"
            component="div"
            sx={styles.temperature}
            data-testid="temperature-value"
          >
            {displayTemp}
            {tempUnit}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={styles.condition}
            data-testid="weather-condition"
          >
            {weather.condition} • {weather.summary}
          </Typography>
        </Box>

        <Divider sx={styles.divider} data-testid="weather-divider" />

        {/* Weather Details */}
        <Box sx={styles.detailsGrid} data-testid="weather-details">
          <Box sx={styles.detailItem} data-testid="humidity-section">
            <Typography variant="body2" sx={styles.detailLabel}>
              <WaterDropIcon sx={styles.detailIcon} /> Humidity
            </Typography>
            <Typography
              variant="h6"
              sx={styles.detailValue}
              data-testid="humidity-value"
            >
              {weather.humidity}%
            </Typography>
          </Box>
          <Box sx={styles.detailItem} data-testid="wind-speed-section">
            <Typography variant="body2" sx={styles.detailLabel}>
              <AirIcon sx={styles.detailIcon} /> Wind Speed
            </Typography>
            <Typography
              variant="h6"
              sx={styles.detailValue}
              data-testid="wind-speed-value"
            >
              {weather.windSpeed} km/h
            </Typography>
          </Box>
        </Box>

        {/* Last Updated */}
        <Typography
          variant="caption"
          sx={styles.lastUpdated}
          data-testid="last-updated"
        >
          Last updated: {new Date(weather.timestamp).toLocaleTimeString()}
        </Typography>
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
  },
  cardWithHover: {
    background: "var(--color-bg-glass)",
    backdropFilter: "var(--backdrop-blur-lg)",
    border: "1px solid var(--color-border-light)",
    borderRadius: "var(--radius-card)",
    boxShadow: "var(--shadow-glass)",
    transition: "var(--transition-card)",
    height: "100%",
    "&:hover": {
      borderColor: "var(--color-border-accent)",
    },
  },
  cardContent: {
    p: 3,
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    py: 4,
  },
  loadingSpinner: {
    color: "var(--color-primary-500)",
  },
  loadingText: {
    mt: 2,
    color: "var(--color-text-secondary)",
  },
  errorAlert: {
    background: "var(--color-error-100)",
    border: "1px solid var(--color-error-300)",
    color: "var(--color-error-700)",
  },
  noDataText: {
    color: "var(--color-text-secondary)",
    textAlign: "center",
    py: 4,
  },
  location: {
    color: "var(--color-text-primary)",
    fontWeight: "var(--font-weight-semibold)",
    mb: 2,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
  },
  locationIcon: {
    fontSize: "1.25rem",
    color: "var(--color-primary-500)",
  },
  temperatureContainer: {
    textAlign: "center",
    mb: 3,
  },
  temperature: {
    fontSize: "3.5rem",
    fontWeight: "var(--font-weight-bold)",
    color: "var(--color-text-primary)",
    mb: 1,
  },
  condition: {
    color: "var(--color-text-secondary)",
    fontSize: "1.2rem",
    textTransform: "capitalize",
  },
  divider: {
    my: 2,
    borderColor: "var(--color-border-light)",
  },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 2,
    mt: 2,
  },
  detailItem: {
    textAlign: "center",
  },
  detailLabel: {
    color: "var(--color-text-secondary)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 0.5,
  },
  detailIcon: {
    fontSize: "1rem",
    color: "var(--color-primary-500)",
  },
  detailValue: {
    color: "var(--color-text-primary)",
  },
  lastUpdated: {
    color: "var(--color-text-secondary)",
    mt: 2,
    display: "block",
    textAlign: "center",
    fontSize: "0.75rem",
  },
};
