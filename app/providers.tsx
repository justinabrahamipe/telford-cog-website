'use client';

import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import { store } from '../src/utils/store';
import { ThemeProvider, useTheme } from '../src/theme/ThemeContext';
import { createEmotionCache } from '../src/lib/emotion-cache';
import { EditModeProvider } from '../src/components/EditMode/EditModeProvider';

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
  // Create emotion cache on client side
  const [cache] = useState(() => createEmotionCache());

  return (
    <CacheProvider value={cache}>
      <ThemeProvider>
        <MuiWrapper>
          <Provider store={store}>
            <EditModeProvider>
              {children}
            </EditModeProvider>
          </Provider>
        </MuiWrapper>
      </ThemeProvider>
    </CacheProvider>
  );
}
