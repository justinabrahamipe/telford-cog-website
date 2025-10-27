'use client';

import React from 'react';
import { Link, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useEditMode } from './EditModeProvider';

export function AdminToggle() {
  const { isEditMode, toggleEditMode, openChangePasswordModal } = useEditMode();
  const [showOptions, setShowOptions] = React.useState(false);

  const handleClick = () => {
    if (isEditMode) {
      // If in edit mode, show options dialog for user mode
      setShowOptions(true);
    } else {
      // If not in edit mode, toggle to login
      toggleEditMode();
    }
  };

  const handleExitToUser = () => {
    toggleEditMode();
    setShowOptions(false);
  };

  const handleChangePassword = () => {
    setShowOptions(false);
    openChangePasswordModal();
  };

  return (
    <>
      <Link
        component="button"
        onClick={handleClick}
        sx={{
          color: 'text.disabled',
          textDecoration: 'none',
          fontSize: '0.75rem',
          cursor: 'pointer',
          border: 'none',
          background: 'none',
          padding: 0,
          '&:hover': {
            color: 'text.secondary',
            textDecoration: 'underline',
          },
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {isEditMode ? 'User' : 'Admin'}
      </Link>

      {/* User Mode Options Dialog */}
      <Dialog open={showOptions} onClose={() => setShowOptions(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Switch to User Mode?</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            You can exit admin mode or change your password.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ flexDirection: 'column', gap: 1, alignItems: 'stretch', px: 3, pb: 2 }}>
          <Button
            onClick={handleChangePassword}
            variant="outlined"
            fullWidth
          >
            Change Password
          </Button>
          <Button
            onClick={handleExitToUser}
            variant="contained"
            fullWidth
          >
            Switch to User Mode
          </Button>
          <Button
            onClick={() => setShowOptions(false)}
            variant="text"
            fullWidth
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
