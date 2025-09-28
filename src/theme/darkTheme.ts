import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6', // Slightly lighter blue for dark theme
      light: '#60a5fa',
      dark: '#2563eb',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#fbbf24', // Brighter gold for dark theme
      light: '#fcd34d',
      dark: '#f59e0b',
      contrastText: '#000000',
    },
    tertiary: {
      main: '#34d399', // Brighter emerald accent
      light: '#6ee7b7',
      dark: '#10b981',
      contrastText: '#000000',
    },
    error: {
      main: '#f87171',
      light: '#fca5a5',
      dark: '#ef4444',
    },
    warning: {
      main: '#fbbf24',
      light: '#fcd34d',
      dark: '#f59e0b',
    },
    success: {
      main: '#34d399',
      light: '#6ee7b7',
      dark: '#10b981',
    },
    info: {
      main: '#22d3ee',
      light: '#67e8f9',
      dark: '#06b6d4',
    },
    background: {
      default: '#0f172a', // Dark navy background
      paper: '#1e293b', // Lighter dark surface
    },
    text: {
      primary: '#f8fafc', // Light text
      secondary: '#cbd5e1', // Muted light text
      disabled: '#64748b', // Disabled text
    },
    grey: {
      50: '#0f172a',
      100: '#1e293b',
      200: '#334155',
      300: '#475569',
      400: '#64748b',
      500: '#94a3b8',
      600: '#cbd5e1',
      700: '#e2e8f0',
      800: '#f1f5f9',
      900: '#f8fafc',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      color: '#f8fafc',
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      color: '#f1f5f9',
    },
    h3: {
      fontFamily: '"Inter", sans-serif',
      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
      color: '#f1f5f9',
    },
    h4: {
      fontFamily: '"Inter", sans-serif',
      fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#e2e8f0',
    },
    h5: {
      fontFamily: '"Inter", sans-serif',
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5,
      color: '#e2e8f0',
    },
    h6: {
      fontFamily: '"Inter", sans-serif',
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.5,
      color: '#cbd5e1',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
      color: '#cbd5e1',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      color: '#94a3b8',
    },
    subtitle1: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.6,
      color: '#e2e8f0',
    },
    subtitle2: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
      color: '#cbd5e1',
    },
  },
  shape: {
    borderRadius: 0,
  },
  shadows: [
    'none',
    '0 1px 2px 0 rgb(0 0 0 / 0.3)',
    '0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4)',
    '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4)',
    '0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.4)',
    '0 20px 25px -5px rgb(0 0 0 / 0.4), 0 8px 10px -6px rgb(0 0 0 / 0.4)',
    '0 25px 50px -12px rgb(0 0 0 / 0.5)',
    '0 0 0 1px rgb(255 255 255 / 0.05), 0 1px 1px 0 rgb(0 0 0 / 0.4)',
    '0 0 0 1px rgb(255 255 255 / 0.05), 0 2px 4px 0 rgb(0 0 0 / 0.4)',
    '0 0 0 1px rgb(255 255 255 / 0.05), 0 4px 8px 0 rgb(0 0 0 / 0.4)',
    '0 0 0 1px rgb(255 255 255 / 0.05), 0 8px 16px 0 rgb(0 0 0 / 0.4)',
    '0 0 0 1px rgb(255 255 255 / 0.05), 0 16px 32px 0 rgb(0 0 0 / 0.4)',
    '0 0 0 1px rgb(255 255 255 / 0.05), 0 24px 48px 0 rgb(0 0 0 / 0.4)',
    '0 0 0 1px rgb(255 255 255 / 0.05), 0 32px 64px 0 rgb(0 0 0 / 0.5)',
    '0 0 0 1px rgb(255 255 255 / 0.05), 0 40px 80px 0 rgb(0 0 0 / 0.6)',
    '0 0 0 1px rgb(255 255 255 / 0.05), 0 48px 96px 0 rgb(0 0 0 / 0.7)',
    '0 0 0 1px rgb(255 255 255 / 0.05), 0 56px 112px 0 rgb(0 0 0 / 0.8)',
    '0 0 0 1px rgb(255 255 255 / 0.05), 0 64px 128px 0 rgb(0 0 0 / 0.9)',
    '0 0 0 1px rgb(255 255 255 / 0.05), 0 72px 144px 0 rgb(0 0 0 / 1.0)',
    '0 0 0 1px rgb(255 255 255 / 0.05), 0 80px 160px 0 rgb(0 0 0 / 1.0)',
    '0 0 0 1px rgb(255 255 255 / 0.05), 0 88px 176px 0 rgb(0 0 0 / 1.0)',
    '0 0 0 1px rgb(255 255 255 / 0.05), 0 96px 192px 0 rgb(0 0 0 / 1.0)',
    '0 0 0 1px rgb(255 255 255 / 0.05), 0 104px 208px 0 rgb(0 0 0 / 1.0)',
    '0 0 0 1px rgb(255 255 255 / 0.05), 0 112px 224px 0 rgb(0 0 0 / 1.0)',
    '0 0 0 1px rgb(255 255 255 / 0.05), 0 120px 240px 0 rgb(0 0 0 / 1.0)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '0px',
          fontWeight: 500,
          padding: '10px 24px',
          fontSize: '0.875rem',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.4)',
          },
        },
        contained: {
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '0px',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4)',
          border: '1px solid #334155',
          transition: 'all 0.3s ease-in-out',
          backgroundColor: '#1e293b',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0f172a',
          color: '#f8fafc',
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid #334155',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          padding: '0 24px',
          minHeight: '72px !important',
          '@media (min-width: 600px)': {
            minHeight: '72px !important',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: '16px',
          paddingRight: '16px',
          '@media (min-width: 600px)': {
            paddingLeft: '24px',
            paddingRight: '24px',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '0px',
          backgroundColor: '#1e293b',
        },
        elevation1: {
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4)',
        },
      },
    },
  },
});

export default darkTheme;