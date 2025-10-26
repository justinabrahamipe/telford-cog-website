import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
  }

  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
  }
}

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb', // Modern blue
      light: '#3b82f6',
      dark: '#1d4ed8',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f59e0b', // Warm gold
      light: '#fbbf24',
      dark: '#d97706',
      contrastText: '#ffffff',
    },
    tertiary: {
      main: '#10b981', // Emerald accent
      light: '#34d399',
      dark: '#059669',
      contrastText: '#ffffff',
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
    },
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
    },
    info: {
      main: '#06b6d4',
      light: '#22d3ee',
      dark: '#0891b2',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#475569',
      disabled: '#94a3b8',
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
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      color: '#0f172a',
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      color: '#1e293b',
    },
    h3: {
      fontFamily: '"Inter", sans-serif',
      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
      color: '#1e293b',
    },
    h4: {
      fontFamily: '"Inter", sans-serif',
      fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#334155',
    },
    h5: {
      fontFamily: '"Inter", sans-serif',
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5,
      color: '#334155',
    },
    h6: {
      fontFamily: '"Inter", sans-serif',
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.5,
      color: '#475569',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
      color: '#475569',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      color: '#64748b',
    },
    subtitle1: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.6,
      color: '#334155',
    },
    subtitle2: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
      color: '#475569',
    },
  },
  shape: {
    borderRadius: 0,
  },
  shadows: [
    'none',
    '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 0 0 1px rgb(255 255 255 / 0.05), 0 1px 1px 0 rgb(0 0 0 / 0.1)',
    '0 0 0 1px rgb(255 255 255 / 0.05), 0 2px 4px 0 rgb(0 0 0 / 0.1)',
    '0 0 0 1px rgb(255 255 255 / 0.05), 0 4px 8px 0 rgb(0 0 0 / 0.1)',
    '0 0 0 1px rgb(255 255 255 / 0.05), 0 8px 16px 0 rgb(0 0 0 / 0.1)',
    '0 0 0 1px rgb(255 255 255 / 0.05), 0 16px 32px 0 rgb(0 0 0 / 0.1)',
    '0 0 0 1px rgb(255 255 255 / 0.05), 0 24px 48px 0 rgb(0 0 0 / 0.1)',
    '0 0 0 1px rgb(255 255 255 / 0.05), 0 32px 64px 0 rgb(0 0 0 / 0.2)',
    '0 0 0 1px rgb(255 255 255 / 0.05), 0 40px 80px 0 rgb(0 0 0 / 0.25)',
    '0 0 0 1px rgb(255 255 255 / 0.05), 0 48px 96px 0 rgb(0 0 0 / 0.3)',
    '0 0 0 1px rgb(255 255 255 / 0.05), 0 56px 112px 0 rgb(0 0 0 / 0.35)',
    '0 0 0 1px rgb(255 255 255 / 0.05), 0 64px 128px 0 rgb(0 0 0 / 0.4)',
    '0 0 0 1px rgb(255 255 255 / 0.05), 0 72px 144px 0 rgb(0 0 0 / 0.45)',
    '0 0 0 1px rgb(255 255 255 / 0.05), 0 80px 160px 0 rgb(0 0 0 / 0.5)',
    '0 0 0 1px rgb(255 255 255 / 0.05), 0 88px 176px 0 rgb(0 0 0 / 0.55)',
    '0 0 0 1px rgb(255 255 255 / 0.05), 0 96px 192px 0 rgb(0 0 0 / 0.6)',
    '0 0 0 1px rgb(255 255 255 / 0.05), 0 104px 208px 0 rgb(0 0 0 / 0.65)',
    '0 0 0 1px rgb(255 255 255 / 0.05), 0 112px 224px 0 rgb(0 0 0 / 0.7)',
    '0 0 0 1px rgb(255 255 255 / 0.05), 0 120px 240px 0 rgb(0 0 0 / 0.75)',
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
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          },
        },
        contained: {
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '0px',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          border: '1px solid #e2e8f0',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#1e293b',
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid #e2e8f0',
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
        },
        elevation1: {
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        },
      },
    },
  },
});

export default theme;