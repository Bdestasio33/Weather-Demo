import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  CircularProgress,
  Alert,
  Autocomplete,
  Typography,
  Divider,
} from "@mui/material";
import { Public as PublicIcon } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useUser } from "../contexts/UserContext";
import { US_STATES } from "../assets/states";

interface LocationDialogProps {
  open: boolean;
  onClose: () => void;
  required?: boolean;
}

export default function LocationDialog({
  open,
  onClose,
  required = false,
}: LocationDialogProps) {
  const { preferences, updatePreferences } = useUser();
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("US");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open && preferences.locationOverride) {
      setCity(preferences.locationOverride.city || "");
      setState(preferences.locationOverride.state || "");
      setCountry(preferences.locationOverride.country || "US");
    }
  }, [open, preferences.locationOverride]);

  const handleSave = async () => {
    if (!city.trim() || !state.trim()) {
      setError("City and state are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Update user preferences
      updatePreferences({
        locationOverride: {
          enabled: true,
          city: city.trim(),
          state: state.trim(),
          country: country.trim(),
        },
      });

      toast.success(`Location set to ${city}, ${state}`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      onClose();
    } catch (err) {
      setError("Failed to save location");
      toast.error("Failed to save location", {
        position: "bottom-right",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (required && !preferences.locationOverride?.enabled) {
      toast.warning("Location is required to get weather data", {
        position: "bottom-right",
        autoClose: 5000,
      });
      return;
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: styles.dialogPaper,
      }}
      data-testid="location-dialog"
    >
      <DialogTitle sx={styles.dialogTitle} data-testid="location-dialog-title">
        <PublicIcon sx={styles.titleIcon} />
        Set Your Location
      </DialogTitle>

      <Divider sx={styles.divider} data-testid="location-dialog-divider" />

      <DialogContent
        sx={styles.dialogContent}
        data-testid="location-dialog-content"
      >
        <Typography
          variant="body1"
          sx={styles.description}
          data-testid="location-description"
        >
          Enter your location to get accurate weather data for your area
        </Typography>

        <Box sx={styles.formContainer} data-testid="location-form">
          <TextField
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g., Pittsburgh"
            fullWidth
            variant="outlined"
            sx={styles.textField}
            data-testid="city-input"
          />

          <Autocomplete
            options={US_STATES}
            value={state}
            onChange={(_, newValue) => setState(newValue || "")}
            renderInput={(params) => (
              <TextField
                {...params}
                label="State"
                placeholder="e.g., Pennsylvania"
                variant="outlined"
                sx={styles.textField}
                data-testid="state-input"
              />
            )}
            slotProps={{
              paper: {
                sx: styles.autocompleteDropdown,
              },
            }}
            data-testid="state-autocomplete"
          />

          <TextField
            label="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="e.g., US"
            fullWidth
            variant="outlined"
            sx={styles.textField}
            data-testid="country-input"
          />
        </Box>

        {error && (
          <Alert
            severity="error"
            sx={styles.errorAlert}
            data-testid="location-error-alert"
          >
            {error}
          </Alert>
        )}
      </DialogContent>

      <DialogActions
        sx={styles.dialogActions}
        data-testid="location-dialog-actions"
      >
        <Button
          onClick={handleCancel}
          sx={styles.cancelButton}
          variant="outlined"
          data-testid="cancel-location-button"
        >
          Cancel
        </Button>

        <Button
          onClick={handleSave}
          disabled={loading || !city.trim() || !state.trim()}
          sx={styles.saveButton}
          variant="contained"
          data-testid="save-location-button"
        >
          {loading ? (
            <CircularProgress
              size={20}
              sx={styles.loadingSpinner}
              data-testid="save-location-loading"
            />
          ) : (
            "Save Location"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const styles = {
  dialogPaper: {
    background: "var(--color-bg-glass)",
    backdropFilter: "var(--backdrop-blur-lg)",
    border: "1px solid var(--color-border-light)",
    borderRadius: "var(--radius-card)",
    boxShadow: "var(--shadow-glass)",
  },
  dialogTitle: {
    color: "var(--color-text-primary)",
    fontSize: "var(--font-size-2xl)",
    fontWeight: "var(--font-weight-bold)",
    textAlign: "center",
    pb: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--spacing-sm)",
  },
  titleIcon: {
    fontSize: "1.5rem",
    color: "var(--color-primary-500)",
  },
  divider: {
    borderColor: "var(--color-border-light)",
  },
  dialogContent: {
    pt: 3,
  },
  description: {
    color: "var(--color-text-secondary)",
    textAlign: "center",
    mb: 3,
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      color: "var(--color-text-primary)",
      borderRadius: "var(--radius-input)",
      "& fieldset": {
        borderColor: "var(--color-border-medium)",
      },
      "&:hover fieldset": {
        borderColor: "var(--color-border-strong)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "var(--color-primary-500)",
      },
    },
    "& .MuiInputLabel-root": {
      color: "var(--color-text-secondary)",
    },
  },
  autocompleteDropdown: {
    background: "var(--color-bg-glass)",
    backdropFilter: "var(--backdrop-blur-lg)",
    border: "1px solid var(--color-border-light)",
    borderRadius: "var(--radius-lg)",
    "& .MuiAutocomplete-option": {
      color: "var(--color-text-primary)",
      "&:hover": {
        backgroundColor: "var(--color-primary-500)",
      },
    },
  },
  errorAlert: {
    mt: 2,
    background: "var(--color-error-100)",
    border: "1px solid var(--color-error-300)",
    color: "var(--color-error-700)",
    borderRadius: "var(--radius-lg)",
  },
  dialogActions: {
    justifyContent: "space-between",
    p: 3,
  },
  cancelButton: {
    color: "var(--color-text-secondary)",
    borderColor: "var(--color-border-medium)",
    "&:hover": {
      borderColor: "var(--color-border-strong)",
      backgroundColor: "var(--color-bg-tertiary)",
    },
  },
  saveButton: {
    minWidth: 120,
    borderRadius: "var(--radius-button)",
    backgroundColor: "var(--color-primary-500)",
    color: "var(--color-text-primary)",
    "&:hover": {
      backgroundColor: "var(--color-primary-600)",
    },
    "&:disabled": {
      backgroundColor: "var(--color-bg-tertiary)",
      color: "var(--color-text-muted)",
    },
  },
  loadingSpinner: {
    color: "currentColor",
  },
};
