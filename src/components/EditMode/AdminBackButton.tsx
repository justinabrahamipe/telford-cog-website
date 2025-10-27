'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { IconButton, Tooltip } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useEditMode } from './EditModeProvider';

export function AdminBackButton() {
  const { isEditMode } = useEditMode();
  const router = useRouter();

  if (!isEditMode) {
    return null;
  }

  return (
    <Tooltip title="Go Back" placement="right">
      <IconButton
        onClick={() => router.back()}
        sx={{
          position: 'fixed',
          top: 80,
          left: 16,
          backgroundColor: 'primary.main',
          color: 'white',
          boxShadow: 3,
          zIndex: 9999,
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
        }}
      >
        <ArrowBack />
      </IconButton>
    </Tooltip>
  );
}
