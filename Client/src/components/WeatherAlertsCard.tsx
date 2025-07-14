import { Box, Card, CardContent, Typography, Alert, Chip } from "@mui/material";
import {
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  AccessTime as AccessTimeIcon,
  LocationOn as LocationOnIcon,
} from "@mui/icons-material";
import { demoAlerts } from "../demo/weatherData";
import "../styles/variables.css";

export default function WeatherAlertsCard() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "extreme":
        return "error";
      case "severe":
        return "error";
      case "moderate":
        return "warning";
      case "minor":
        return "info";
      default:
        return "info";
    }
  };

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <Card sx={styles.card} data-testid="weather-alerts-card">
      <CardContent sx={styles.cardContent}>
        <Box sx={styles.header} data-testid="weather-alerts-header">
          <WarningIcon sx={styles.headerIcon} />
          <Typography
            variant="h6"
            sx={styles.headerTitle}
            data-testid="weather-alerts-title"
          >
            Weather Alerts
          </Typography>
        </Box>

        {demoAlerts.length === 0 ? (
          <Box sx={styles.noAlertsContainer} data-testid="no-alerts-container">
            <CheckCircleIcon sx={styles.noAlertsIcon} />
            <Typography
              variant="body1"
              sx={styles.noAlertsTitle}
              data-testid="no-alerts-title"
            >
              No active weather alerts
            </Typography>
            <Typography
              variant="body2"
              sx={styles.noAlertsDescription}
              data-testid="no-alerts-description"
            >
              Your area is currently clear of weather warnings
            </Typography>
          </Box>
        ) : (
          <Box sx={styles.alertsContainer} data-testid="alerts-container">
            {demoAlerts.map((alert) => (
              <Alert
                key={alert.id}
                severity={getSeverityColor(alert.severity)}
                sx={styles.alertItem}
                data-testid={`weather-alert-${alert.id}`}
              >
                <Box>
                  <Box
                    sx={styles.alertHeader}
                    data-testid={`alert-header-${alert.id}`}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={styles.alertTitle}
                      data-testid={`alert-title-${alert.id}`}
                    >
                      {alert.title}
                    </Typography>
                    <Chip
                      label={alert.severity.toUpperCase()}
                      size="small"
                      color={getSeverityColor(alert.severity)}
                      sx={styles.severityChip}
                      data-testid={`alert-severity-${alert.id}`}
                    />
                  </Box>

                  <Typography
                    variant="body2"
                    sx={styles.alertDescription}
                    data-testid={`alert-description-${alert.id}`}
                  >
                    {alert.description}
                  </Typography>

                  <Box
                    sx={styles.alertMetadata}
                    data-testid={`alert-metadata-${alert.id}`}
                  >
                    <Typography
                      variant="caption"
                      sx={styles.alertTime}
                      data-testid={`alert-time-${alert.id}`}
                    >
                      <AccessTimeIcon sx={styles.metadataIcon} />
                      {formatTime(alert.startTime)} -{" "}
                      {formatTime(alert.endTime)}
                    </Typography>

                    <Typography
                      variant="caption"
                      sx={styles.alertLocation}
                      data-testid={`alert-location-${alert.id}`}
                    >
                      <LocationOnIcon sx={styles.metadataIcon} />
                      {alert.areas.join(", ")}
                    </Typography>
                  </Box>
                </Box>
              </Alert>
            ))}
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
    color: "var(--color-warning-500)",
  },
  headerTitle: {
    color: "var(--color-text-primary)",
    fontWeight: "var(--font-weight-semibold)",
  },
  noAlertsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "120px",
    textAlign: "center",
  },
  noAlertsIcon: {
    fontSize: "2rem",
    mb: 2,
    color: "var(--color-success-500)",
  },
  noAlertsTitle: {
    color: "var(--color-text-secondary)",
    fontWeight: "var(--font-weight-medium)",
  },
  noAlertsDescription: {
    color: "var(--color-text-secondary)",
    mt: 1,
  },
  alertsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  alertItem: {
    background: "var(--color-bg-muted)",
    border: "1px solid var(--color-border-light)",
    borderRadius: "var(--radius-sm)",
    "& .MuiAlert-icon": {
      fontSize: "1.25rem",
    },
  },
  alertHeader: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    mb: 1,
  },
  alertTitle: {
    fontWeight: "var(--font-weight-semibold)",
    color: "var(--color-text-primary)",
  },
  severityChip: {
    height: "20px",
    fontSize: "0.7rem",
    fontWeight: "var(--font-weight-medium)",
  },
  alertDescription: {
    color: "var(--color-text-secondary)",
    mb: 2,
    lineHeight: 1.5,
  },
  alertMetadata: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },
  alertTime: {
    color: "var(--color-text-secondary)",
    fontWeight: "var(--font-weight-medium)",
    display: "flex",
    alignItems: "center",
    gap: 0.5,
  },
  alertLocation: {
    color: "var(--color-text-secondary)",
    fontWeight: "var(--font-weight-medium)",
    display: "flex",
    alignItems: "center",
    gap: 0.5,
  },
  metadataIcon: {
    fontSize: "0.875rem",
    color: "var(--color-text-secondary)",
  },
};
