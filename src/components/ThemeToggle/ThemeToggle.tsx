import React from 'react';
import { IconButton, Tooltip, useTheme as useMuiTheme } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { useTheme } from '../../theme/ThemeContext';

interface ThemeToggleProps {
  size?: 'small' | 'medium' | 'large';
  showTooltip?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  size = 'medium',
  showTooltip = true
}) => {
  const { mode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();

  const button = (
    <IconButton
      onClick={toggleTheme}
      size={size}
      sx={{
        color: 'text.primary',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          transform: 'scale(1.05)',
          boxShadow: muiTheme.shadows[4],
        },
        '& .MuiSvgIcon-root': {
          transition: 'transform 0.3s ease-in-out',
        },
        '&:hover .MuiSvgIcon-root': {
          transform: 'rotate(15deg)',
        },
      }}
      aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
    >
      {mode === 'light' ? (
        <DarkMode fontSize={size === 'small' ? 'small' : 'medium'} />
      ) : (
        <LightMode fontSize={size === 'small' ? 'small' : 'medium'} />
      )}
    </IconButton>
  );

  if (!showTooltip) {
    return button;
  }

  return (
    <Tooltip
      title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
      arrow
      placement="bottom"
    >
      {button}
    </Tooltip>
  );
};

export default ThemeToggle;