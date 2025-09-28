import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import ReduxProvider from "./utils/ReduxProvider";
import { BrowserRouter } from 'react-router-dom';
import { default as AppRoutes } from './utils/Routes';
import routes from "./utils/routes.list";
import { ThemeProvider, useTheme } from './theme/ThemeContext';

import "./reset.css";
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container!);

const AppContent: React.FC = () => {
  const { theme } = useTheme();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <ReduxProvider>
        <BrowserRouter>
          <AppRoutes routes={routes} />
        </BrowserRouter>
      </ReduxProvider>
    </MuiThemeProvider>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
