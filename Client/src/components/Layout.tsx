import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Container,
  Button,
  Avatar,
  Tooltip,
} from "@mui/material";
import {
  Person as PersonIcon,
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  LocationOn as LocationOnIcon,
  CloudQueue as WeatherIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import LocationDialog from "./LocationDialog";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { preferences } = useUser();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  const isActive = (path: string) => location.pathname === path;

  const currentLocation = preferences.locationOverride?.enabled
    ? `${preferences.locationOverride.city}, ${preferences.locationOverride.state}`
    : "No location set";

  return (
    <Box sx={styles.mainContainer} data-testid="layout">
      {/* Navigation Header */}
      <AppBar
        position="static"
        sx={styles.appBar}
        data-testid="navigation-header"
      >
        <Toolbar data-testid="toolbar">
          {/* Logo/Title */}
          <Typography
            variant="h6"
            component="div"
            sx={styles.logoTitle}
            data-testid="app-title"
          >
            <WeatherIcon sx={styles.titleIcon} />
            Weather Dashboard
          </Typography>

          {/* Location Button */}
          <Box
            sx={styles.locationButtonContainer}
            data-testid="location-button-container"
          >
            <Tooltip title={`Current location: ${currentLocation}`}>
              <Button
                startIcon={<LocationOnIcon />}
                onClick={() => setLocationDialogOpen(true)}
                sx={styles.locationButton}
                data-testid="location-button"
              >
                {preferences.locationOverride?.enabled
                  ? `${preferences.locationOverride.city}, ${preferences.locationOverride.state}`
                  : "Set Location"}
              </Button>
            </Tooltip>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={styles.desktopNavigation} data-testid="desktop-navigation">
            <Button
              color="inherit"
              startIcon={<DashboardIcon />}
              onClick={() => navigate("/")}
              sx={isActive("/") ? styles.activeNavButton : styles.navButton}
              data-testid="dashboard-nav-button"
            >
              Dashboard
            </Button>
            <Button
              color="inherit"
              startIcon={<SettingsIcon />}
              onClick={() => navigate("/profile")}
              sx={
                isActive("/profile")
                  ? styles.activeProfileButton
                  : styles.navButton
              }
              data-testid="profile-nav-button"
            >
              Profile
            </Button>
          </Box>

          {/* Mobile Navigation */}
          <Box sx={styles.mobileNavigation} data-testid="mobile-navigation">
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
              data-testid="mobile-menu-button"
            >
              <Avatar sx={styles.mobileAvatar}>
                <PersonIcon fontSize="small" />
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              PaperProps={{
                sx: styles.mobileMenu,
              }}
              data-testid="mobile-menu"
            >
              <MenuItem
                onClick={() => setLocationDialogOpen(true)}
                sx={styles.mobileMenuItem}
                data-testid="mobile-location-menu-item"
              >
                <LocationOnIcon sx={styles.mobileMenuIcon} />
                Set Location
              </MenuItem>
              <MenuItem
                onClick={() => handleNavigate("/")}
                sx={
                  isActive("/")
                    ? styles.activeMobileMenuItem
                    : styles.mobileMenuItem
                }
                data-testid="mobile-dashboard-menu-item"
              >
                <DashboardIcon
                  sx={
                    isActive("/")
                      ? styles.activeMobileMenuIcon
                      : styles.mobileMenuIcon
                  }
                />
                Dashboard
              </MenuItem>
              <MenuItem
                onClick={() => handleNavigate("/profile")}
                sx={
                  isActive("/profile")
                    ? styles.activeMobileMenuItem
                    : styles.mobileMenuItem
                }
                data-testid="mobile-profile-menu-item"
              >
                <SettingsIcon
                  sx={
                    isActive("/profile")
                      ? styles.activeMobileMenuIcon
                      : styles.mobileMenuIcon
                  }
                />
                Profile
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={styles.mainContent} data-testid="main-content">
        <Container
          maxWidth="xl"
          sx={styles.container}
          data-testid="main-container"
        >
          {children}
        </Container>
      </Box>

      {/* Location Dialog */}
      <LocationDialog
        open={locationDialogOpen}
        onClose={() => setLocationDialogOpen(false)}
        required={false}
        data-testid="location-dialog"
      />
    </Box>
  );
}

const styles = {
  mainContainer: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "var(--gradient-background)",
  },
  appBar: {
    background: "var(--color-bg-overlay)",
    backdropFilter: "var(--backdrop-blur-lg)",
    boxShadow: "var(--shadow-glass)",
    borderBottom: "1px solid var(--color-border-light)",
  },
  logoTitle: {
    flexGrow: 1,
    fontWeight: "var(--font-weight-semibold)",
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-sm)",
    color: "var(--color-text-primary)",
    fontSize: "var(--font-size-xl)",
  },
  titleIcon: {
    fontSize: "1.8rem",
    color: "var(--color-primary-500)",
    filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
    transition: "var(--transition-button)",
    "&:hover": {
      color: "var(--color-primary-400)",
      transform: "scale(1.05)",
    },
  },
  locationButtonContainer: {
    display: { xs: "none", sm: "flex" },
    mr: "var(--spacing-lg)",
  },
  locationButton: {
    color: "var(--color-text-primary)",
    backgroundColor: "var(--color-secondary-500)",
    borderRadius: "var(--radius-button)",
    px: "var(--spacing-lg)",
    py: "var(--spacing-sm)",
    transition: "var(--transition-button)",
    fontSize: "var(--font-size-sm)",
    fontWeight: "var(--font-weight-medium)",
    "&:hover": {
      backgroundColor: "var(--color-secondary-600)",
      transform: "translateY(-1px)",
    },
  },
  desktopNavigation: {
    display: { xs: "none", md: "flex" },
    gap: "var(--spacing-sm)",
  },
  navButton: {
    fontWeight: "var(--font-weight-normal)",
    backgroundColor: "transparent",
    borderRadius: "var(--radius-button)",
    px: "var(--spacing-lg)",
    py: "var(--spacing-sm)",
    transition: "var(--transition-button)",
    color: "var(--color-text-primary)",
    "&:hover": {
      backgroundColor: "var(--color-primary-500)",
      transform: "translateY(-1px)",
    },
  },
  activeNavButton: {
    fontWeight: "var(--font-weight-semibold)",
    backgroundColor: "var(--color-primary-500)",
    borderRadius: "var(--radius-button)",
    px: "var(--spacing-lg)",
    py: "var(--spacing-sm)",
    transition: "var(--transition-button)",
    color: "var(--color-text-primary)",
    "&:hover": {
      backgroundColor: "var(--color-primary-600)",
      transform: "translateY(-1px)",
    },
  },
  activeProfileButton: {
    fontWeight: "var(--font-weight-semibold)",
    backgroundColor: "var(--color-secondary-500)",
    borderRadius: "var(--radius-button)",
    px: "var(--spacing-lg)",
    py: "var(--spacing-sm)",
    transition: "var(--transition-button)",
    color: "var(--color-text-primary)",
    "&:hover": {
      backgroundColor: "var(--color-secondary-600)",
      transform: "translateY(-1px)",
    },
  },
  mobileNavigation: {
    display: { xs: "flex", md: "none" },
  },
  mobileAvatar: {
    width: 32,
    height: 32,
    bgcolor: "var(--color-primary-500)",
    border: "1px solid var(--color-border-accent)",
    transition: "var(--transition-button)",
    "&:hover": {
      bgcolor: "var(--color-primary-600)",
      transform: "scale(1.05)",
    },
  },
  mobileMenu: {
    background: "var(--color-bg-glass)",
    backdropFilter: "var(--backdrop-blur-lg)",
    border: "1px solid var(--color-border-light)",
    borderRadius: "var(--radius-lg)",
    mt: "var(--spacing-sm)",
    minWidth: 180,
  },
  mobileMenuItem: {
    color: "var(--color-text-primary)",
    borderRadius: "var(--radius-md)",
    mx: "var(--spacing-sm)",
    my: "var(--spacing-xs)",
    transition: "var(--transition-button)",
    "&:hover": {
      backgroundColor: "var(--color-secondary-500)",
    },
  },
  activeMobileMenuItem: {
    fontWeight: "var(--font-weight-semibold)",
    color: "var(--color-text-primary)",
    borderRadius: "var(--radius-md)",
    mx: "var(--spacing-sm)",
    my: "var(--spacing-xs)",
    transition: "var(--transition-button)",
    "&:hover": {
      backgroundColor: "var(--color-primary-500)",
    },
  },
  mobileMenuIcon: {
    mr: "var(--spacing-sm)",
    color: "var(--color-secondary-400)",
  },
  activeMobileMenuIcon: {
    mr: "var(--spacing-sm)",
    color: "var(--color-primary-400)",
  },
  mainContent: {
    flex: 1,
    minHeight: "calc(100vh - 64px)",
  },
  container: {
    py: {
      xs: "var(--spacing-lg)",
      sm: "var(--spacing-xl)",
      md: "var(--spacing-2xl)",
    },
    px: {
      xs: "var(--spacing-sm)",
      sm: "var(--spacing-lg)",
      md: "var(--spacing-xl)",
    },
  },
};
