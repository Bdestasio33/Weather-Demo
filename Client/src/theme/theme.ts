import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6366f1',
      light: '#818cf8',
      dark: '#4f46e5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#06b6d4',
      light: '#22d3ee',
      dark: '#0891b2',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0f172a',
      paper: 'rgba(30, 41, 59, 0.8)',
    },
    text: {
      primary: '#f1f5f9',
      secondary: '#94a3b8',
    },
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
    },
    info: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
    },
    grey: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 300,
      color: '#f1f5f9',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 400,
      color: '#f1f5f9',
    },
    h3: {
      fontSize: '1.4rem',
      fontWeight: 600,
      color: 'inherit',
    },
    h4: {
      fontSize: '1.3rem',
      fontWeight: 500,
      color: 'inherit',
    },
    h5: {
      fontSize: '1.1rem',
      fontWeight: 500,
      color: 'inherit',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      color: 'inherit',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.9rem',
      lineHeight: 1.4,
    },
    caption: {
      fontSize: '0.8rem',
      opacity: 0.7,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(100, 116, 139, 0.2)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(100, 116, 139, 0.3)',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '1.5rem',
          '&:last-child': {
            paddingBottom: '1.5rem',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(30, 41, 59, 0.8)',
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          margin: 0,
          width: '100%',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          fontWeight: 500,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          height: '6px',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          backdropFilter: 'blur(20px)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          backdropFilter: 'blur(20px)',
        },
      },
    },
  },
});

// Custom weather card gradients - Dark Theme
export const weatherCardStyles = {
  currentWeather: {
    background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
    color: '#f1f5f9',
    border: '1px solid rgba(99, 102, 241, 0.3)',
  },
  forecast: {
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
    color: '#f1f5f9',
    border: '1px solid rgba(6, 182, 212, 0.3)',
  },
  alerts: {
    background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #3730a3 100%)',
    color: '#f1f5f9',
    border: '1px solid rgba(245, 158, 11, 0.3)',
  },
  error: {
    background: 'linear-gradient(135deg, #450a0a 0%, #7f1d1d 50%, #991b1b 100%)',
    color: '#f1f5f9',
    border: '1px solid rgba(239, 68, 68, 0.3)',
  },
  forecastItem: {
    background: 'rgba(51, 65, 85, 0.6)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(100, 116, 139, 0.2)',
    '&:hover': {
      background: 'rgba(51, 65, 85, 0.8)',
      border: '1px solid rgba(100, 116, 139, 0.3)',
    },
  },
  alertItem: {
    background: 'rgba(71, 85, 105, 0.6)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(100, 116, 139, 0.2)',
  },
};

export default theme; 