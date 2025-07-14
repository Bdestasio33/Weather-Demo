import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Button,
  Divider,
  Alert,
  Stack,
  Tooltip,
} from "@mui/material";
import {
  Person as PersonIcon,
  Thermostat as ThermostatIcon,
  Save as SaveIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Clear as ClearIcon,
  CloudDownload as CloudDownloadIcon,
} from "@mui/icons-material";
import { useUser } from "../contexts/UserContext";
import { useDashboard } from "../contexts/DashboardContext";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const userContext = useUser();
  const { actions: dashboardActions } = useDashboard();
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);

  const handleTemperatureUnitChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const unit = event.target.value as "celsius" | "fahrenheit";
    userContext.updatePreferences({ temperatureUnit: unit });
  };

  const handleReset = () => {
    userContext.resetPreferences();
    dashboardActions.resetLayout();

    toast.success("Settings reset to default", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleExport = () => {
    const data = {
      preferences: userContext.preferences,
      layout: dashboardActions.exportLayout(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `weather-dashboard-backup-${
      new Date().toISOString().split("T")[0]
    }.json`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success("Data exported successfully", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          if (data.preferences) {
            userContext.updatePreferences(data.preferences);
          }
          if (data.layout) {
            dashboardActions.importLayout(data.layout);
          }
          toast.success("Data imported successfully", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } catch (error) {
          toast.error("Failed to import data", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      };
      reader.readAsText(file);
    }
  };

  const handleClearData = () => {
    localStorage.clear();
    userContext.resetPreferences();
    dashboardActions.resetLayout();

    toast.success("All data cleared", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  if (!userContext.isLoaded) {
    return (
      <Box sx={styles.loadingContainer} data-testid="profile-loading">
        <Box sx={styles.loadingContent}>
          <Typography variant="h6" sx={styles.loadingText}>
            Loading your preferences...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={styles.container} data-testid="profile-page">
      {/* Page Header */}
      <Box sx={styles.header} data-testid="profile-header">
        <Typography variant="h2" component="h1" gutterBottom sx={styles.title}>
          ⚙️ Profile Settings
        </Typography>
        <Typography variant="h6" sx={styles.subtitle}>
          Customize your weather dashboard experience
        </Typography>

        {/* Storage Status */}
        <Box sx={styles.storageStatus} data-testid="storage-status">
          <Typography variant="body2" sx={styles.storageText}>
            {userContext.lastSaved
              ? `Last saved: ${userContext.lastSaved.toLocaleString()}`
              : "Settings will be saved automatically"}
          </Typography>
        </Box>
      </Box>

      {/* Success Messages */}
      {showSaveConfirmation && (
        <Alert
          severity="success"
          sx={styles.successAlert}
          icon={<SaveIcon />}
          data-testid="save-success-alert"
        >
          Preferences saved to browser storage!
        </Alert>
      )}

      {/* Profile Settings */}
      <Card sx={styles.card} data-testid="profile-settings-card">
        <CardContent sx={styles.cardContent}>
          {/* User Info Section */}
          <Box sx={styles.userInfoSection} data-testid="user-info-section">
            <PersonIcon sx={styles.personIcon} />
            <Box>
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={styles.sectionTitle}
              >
                User Preferences
              </Typography>
              <Typography variant="body2" sx={styles.sectionDescription}>
                Configure how weather data is displayed in your dashboard
              </Typography>
            </Box>
          </Box>

          <Divider sx={styles.divider} />

          {/* Temperature Unit Setting */}
          <Box sx={styles.section} data-testid="temperature-unit-section">
            <Box sx={styles.sectionHeader}>
              <ThermostatIcon sx={styles.thermostatIcon} />
              <Typography variant="h5" component="h3" sx={styles.sectionTitle}>
                Temperature Unit
              </Typography>
            </Box>

            <Typography variant="body2" sx={styles.sectionDescription}>
              Choose your preferred temperature scale for displaying weather
              data
            </Typography>

            <FormControl
              component="fieldset"
              data-testid="temperature-unit-form"
            >
              <RadioGroup
                value={userContext.preferences.temperatureUnit}
                onChange={handleTemperatureUnitChange}
                sx={styles.radioGroup}
                data-testid="temperature-unit-radio-group"
              >
                <FormControlLabel
                  value="celsius"
                  control={
                    <Radio color="primary" data-testid="celsius-radio" />
                  }
                  label={
                    <Box sx={styles.radioLabel}>
                      <Typography variant="body1" sx={styles.radioLabelText}>
                        Celsius (°C)
                      </Typography>
                    </Box>
                  }
                  sx={
                    userContext.preferences.temperatureUnit === "celsius"
                      ? styles.radioSelectedCelsius
                      : styles.radioUnselected
                  }
                  data-testid="celsius-option"
                />
                <FormControlLabel
                  value="fahrenheit"
                  control={
                    <Radio color="primary" data-testid="fahrenheit-radio" />
                  }
                  label={
                    <Box sx={styles.radioLabel}>
                      <Typography variant="body1" sx={styles.radioLabelText}>
                        Fahrenheit (°F)
                      </Typography>
                    </Box>
                  }
                  sx={
                    userContext.preferences.temperatureUnit === "fahrenheit"
                      ? styles.radioSelectedFahrenheit
                      : styles.radioUnselected
                  }
                  data-testid="fahrenheit-option"
                />
              </RadioGroup>
            </FormControl>
          </Box>

          <Divider sx={styles.divider} />

          {/* Data Management Section */}
          <Box sx={styles.section} data-testid="data-management-section">
            <Typography variant="h5" component="h3" sx={styles.sectionTitle}>
              Data Management
            </Typography>
            <Typography variant="body2" sx={styles.sectionDescription}>
              Export, import, or clear your preferences data
            </Typography>

            <Stack
              direction="row"
              spacing={2}
              sx={styles.buttonStack}
              data-testid="data-management-buttons"
            >
              <Tooltip title="Download your preferences as JSON">
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={handleExport}
                  sx={styles.exportButton}
                  data-testid="export-button"
                >
                  Export
                </Button>
              </Tooltip>

              <Tooltip title="Import preferences from JSON file">
                <Button
                  variant="outlined"
                  startIcon={<UploadIcon />}
                  onClick={() => {
                    const fileInput = document.querySelector(
                      'input[type="file"]'
                    ) as HTMLInputElement;
                    fileInput?.click();
                  }}
                  sx={styles.importButton}
                  data-testid="import-button"
                >
                  Import
                </Button>
              </Tooltip>

              <Tooltip title="Clear all stored data">
                <Button
                  variant="outlined"
                  startIcon={<ClearIcon />}
                  onClick={handleClearData}
                  sx={styles.clearButton}
                  data-testid="clear-data-button"
                >
                  Clear Data
                </Button>
              </Tooltip>
            </Stack>

            {/* Hidden file input */}
            <input
              type="file"
              onChange={handleImport}
              accept=".json"
              style={{ display: "none" }}
              data-testid="file-input"
            />
          </Box>

          {/* Reset Button */}
          <Box sx={styles.resetButtonContainer} data-testid="reset-section">
            <Button
              variant="outlined"
              startIcon={<CloudDownloadIcon />}
              onClick={handleReset}
              sx={styles.resetButton}
              data-testid="reset-button"
            >
              Reset to Defaults
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Help Text */}
      <Box sx={styles.helpText} data-testid="help-text">
        <Typography variant="body2" sx={styles.helpTextContent}>
          Your preferences are automatically saved to your browser's local
          storage and will persist between sessions.
        </Typography>
      </Box>
    </Box>
  );
}

const styles = {
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "400px",
  },
  loadingContent: {
    textAlign: "center",
  },
  loadingText: {
    color: "var(--color-text-secondary)",
  },
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "var(--spacing-lg)",
    minHeight: "100vh",
  },
  header: {
    mb: 4,
    textAlign: "center",
  },
  title: {
    color: "var(--color-text-primary)",
    fontWeight: "var(--font-weight-bold)",
    fontSize: "var(--font-size-2xl)",
  },
  subtitle: {
    color: "var(--color-text-secondary)",
    mb: 2,
  },
  storageStatus: {
    mt: 2,
    p: 2,
    background: "var(--color-bg-secondary)",
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--color-border-light)",
  },
  storageText: {
    color: "var(--color-text-secondary)",
    fontSize: "var(--font-size-sm)",
  },
  successAlert: {
    mb: 3,
    backgroundColor: "var(--color-success-50)",
    color: "var(--color-success-700)",
    border: "1px solid var(--color-success-200)",
  },
  card: {
    background: "var(--color-bg-glass)",
    backdropFilter: "var(--backdrop-blur-lg)",
    border: "1px solid var(--color-border-light)",
    borderRadius: "var(--radius-card)",
    boxShadow: "var(--shadow-glass)",
  },
  cardContent: {
    p: 4,
  },
  userInfoSection: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    mb: 3,
  },
  personIcon: {
    color: "var(--color-primary-500)",
    fontSize: "2rem",
  },
  divider: {
    mb: 3,
    borderColor: "var(--color-border-light)",
  },
  section: {
    mb: 4,
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    mb: 2,
  },
  thermostatIcon: {
    color: "var(--color-secondary-500)",
    mr: 1,
  },
  locationIcon: {
    color: "var(--color-secondary-500)",
    mr: 1,
  },
  radioGroup: {
    gap: 1,
  },
  radioLabel: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  radioLabelText: {
    color: "var(--color-text-primary)",
    fontWeight: "var(--font-weight-medium)",
  },
  metricChip: {
    backgroundColor: "var(--color-primary-100)",
    color: "var(--color-primary-700)",
    border: "1px solid var(--color-primary-300)",
  },
  imperialChip: {
    backgroundColor: "var(--color-secondary-100)",
    color: "var(--color-secondary-700)",
    border: "1px solid var(--color-secondary-300)",
  },
  radioSelectedCelsius: {
    borderRadius: "var(--radius-lg)",
    border: "2px solid",
    borderColor: "var(--color-primary-500)",
    backgroundColor: "var(--color-primary-100)",
    p: 2,
    m: 0,
    "& .MuiFormControlLabel-label": {
      color: "var(--color-primary-800)",
      fontWeight: "var(--font-weight-semibold)",
    },
    "& .MuiTypography-root": {
      color: "var(--color-primary-800)",
      fontWeight: "var(--font-weight-semibold)",
    },
    "&:hover": {
      backgroundColor: "var(--color-primary-200)",
    },
  },
  radioUnselected: {
    borderRadius: "var(--radius-lg)",
    border: "1px solid",
    borderColor: "var(--color-border-light)",
    backgroundColor: "var(--color-bg-secondary)",
    p: 2,
    m: 0,
    "& .MuiFormControlLabel-label": {
      color: "var(--color-text-primary)",
    },
    "& .MuiTypography-root": {
      color: "var(--color-text-primary)",
    },
    "&:hover": {
      backgroundColor: "var(--color-bg-tertiary)",
      borderColor: "var(--color-border-accent)",
    },
  },
  radioSelectedFahrenheit: {
    borderRadius: "var(--radius-lg)",
    border: "2px solid",
    borderColor: "var(--color-secondary-500)",
    backgroundColor: "var(--color-secondary-100)",
    p: 2,
    m: 0,
    "& .MuiFormControlLabel-label": {
      color: "var(--color-secondary-800)",
      fontWeight: "var(--font-weight-semibold)",
    },
    "& .MuiTypography-root": {
      color: "var(--color-secondary-800)",
      fontWeight: "var(--font-weight-semibold)",
    },
    "&:hover": {
      backgroundColor: "var(--color-secondary-200)",
    },
  },
  switchContainer: {
    mb: 2,
  },
  switchLabel: {
    color: "var(--color-text-primary)",
  },
  locationInputs: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  sectionTitle: {
    color: "var(--color-text-primary)",
    fontWeight: "var(--font-weight-semibold)",
    mb: 1,
  },
  sectionDescription: {
    color: "var(--color-text-secondary)",
    mb: 2,
  },
  buttonStack: {
    flexWrap: "wrap",
  },
  exportButton: {
    borderColor: "var(--color-info-500)",
    color: "var(--color-info-600)",
    "&:hover": {
      borderColor: "var(--color-info-600)",
      backgroundColor: "var(--color-info-50)",
    },
  },
  importButton: {
    borderColor: "var(--color-success-500)",
    color: "var(--color-success-600)",
    "&:hover": {
      borderColor: "var(--color-success-600)",
      backgroundColor: "var(--color-success-50)",
    },
  },
  clearButton: {
    borderColor: "var(--color-error-500)",
    color: "var(--color-error-600)",
    "&:hover": {
      borderColor: "var(--color-error-600)",
      backgroundColor: "var(--color-error-50)",
    },
  },
  resetButtonContainer: {
    display: "flex",
    justifyContent: "center",
    pt: 2,
  },
  resetButton: {
    borderColor: "var(--color-gray-500)",
    color: "var(--color-gray-600)",
    "&:hover": {
      borderColor: "var(--color-gray-600)",
      backgroundColor: "var(--color-gray-50)",
    },
  },
  helpText: {
    mt: 4,
    p: 3,
    background: "var(--color-bg-secondary)",
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--color-border-light)",
    textAlign: "center",
  },
  helpTextContent: {
    color: "var(--color-text-secondary)",
    fontSize: "var(--font-size-sm)",
  },
};
