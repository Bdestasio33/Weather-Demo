import { Box, Card, CardContent, Typography } from "@mui/material";
import {
  CalendarToday as CalendarTodayIcon,
  WaterDrop as WaterDropIcon,
  Air as AirIcon,
} from "@mui/icons-material";
import { demoForecast } from "../demo/weatherData";
import "../styles/variables.css";

export default function WeatherForecastCard() {
  return (
    <Card sx={styles.card} data-testid="weather-forecast-card">
      <CardContent sx={styles.cardContent}>
        <Box sx={styles.header} data-testid="forecast-header">
          <CalendarTodayIcon sx={styles.headerIcon} />
          <Typography
            variant="h6"
            sx={styles.headerTitle}
            data-testid="forecast-title"
          >
            5-Day Forecast
          </Typography>
        </Box>

        <Box sx={styles.forecastGrid} data-testid="forecast-grid">
          {demoForecast.map((day, index) => (
            <Box
              key={index}
              sx={styles.dayCard}
              data-testid={`forecast-day-${index}`}
            >
              <Typography
                variant="subtitle2"
                sx={styles.dayOfWeek}
                data-testid={`day-name-${index}`}
              >
                {day.dayOfWeek}
              </Typography>

              <Box
                sx={styles.weatherIcon}
                data-testid={`weather-icon-${index}`}
              >
                {day.icon}
              </Box>

              <Typography
                variant="body2"
                sx={styles.condition}
                data-testid={`condition-${index}`}
              >
                {day.condition}
              </Typography>

              <Box
                sx={styles.temperatureContainer}
                data-testid={`temperature-${index}`}
              >
                <Typography variant="body2" sx={styles.highTemp}>
                  {day.high}°
                </Typography>
                <Typography variant="body2" sx={styles.lowTemp}>
                  {day.low}°
                </Typography>
              </Box>

              <Box
                sx={styles.additionalInfo}
                data-testid={`additional-info-${index}`}
              >
                <Box
                  sx={styles.infoItem}
                  data-testid={`precipitation-${index}`}
                >
                  <WaterDropIcon sx={styles.infoIcon} />
                  <span>{day.precipitationChance}%</span>
                </Box>
                <Box sx={styles.infoItem} data-testid={`wind-speed-${index}`}>
                  <AirIcon sx={styles.infoIcon} />
                  <span>{day.windSpeed} mph</span>
                </Box>
              </Box>
            </Box>
          ))}
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
  forecastGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: 2,
    "@media (max-width: 600px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    "@media (max-width: 400px)": {
      gridTemplateColumns: "1fr",
    },
  },
  dayCard: {
    textAlign: "center",
    p: 2,
    borderRadius: "var(--radius-sm)",
    background: "var(--color-bg-muted)",
    border: "1px solid var(--color-border-light)",
    transition: "var(--transition-fast)",
    "&:hover": {
      background: "var(--color-bg-hover)",
      transform: "translateY(-2px)",
    },
  },
  dayOfWeek: {
    color: "var(--color-text-secondary)",
    fontWeight: "var(--font-weight-medium)",
    mb: 1,
  },
  weatherIcon: {
    fontSize: "2rem",
    mb: 1,
  },
  condition: {
    color: "var(--color-text-primary)",
    fontWeight: "var(--font-weight-medium)",
    mb: 1,
  },
  temperatureContainer: {
    display: "flex",
    justifyContent: "center",
    gap: 1,
  },
  highTemp: {
    color: "var(--color-text-primary)",
    fontWeight: "var(--font-weight-semibold)",
  },
  lowTemp: {
    color: "var(--color-text-secondary)",
  },
  additionalInfo: {
    mt: 1,
    fontSize: "0.75rem",
    color: "var(--color-text-secondary)",
  },
  infoItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 0.5,
    mb: 0.5,
    "&:last-child": {
      mb: 0,
    },
  },
  infoIcon: {
    fontSize: "0.875rem",
    color: "var(--color-text-secondary)",
  },
};
