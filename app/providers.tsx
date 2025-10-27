'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { store } from '../src/utils/store';
import { ThemeProvider, useTheme } from '../src/theme/ThemeContext';

const MuiWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <MuiWrapper>
        <Provider store={store}>
          {children}
        </Provider>
      </MuiWrapper>
    </ThemeProvider>
  );
}
