'use client';

import React, { useState } from 'react';
import { Box, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Alert } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { useEditMode } from './EditModeProvider';

interface EditableTextProps {
  children: React.ReactNode;
  fieldName: string;
  pageSlug: string;
  initialValue: string;
  multiline?: boolean;
  label?: string;
}

export function EditableText({
  children,
  fieldName,
  pageSlug,
  initialValue,
  multiline = false,
  label = 'Edit Text',
}: EditableTextProps) {
  const { isEditMode } = useEditMode();
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      // Fetch current page data
      const response = await fetch(`/api/admin/pages/${pageSlug}`);
      const data = await response.json();

      let pageContent = data.page?.content || {};

      // Update the specific field
      pageContent[fieldName] = value;

      // Save updated page
      const saveResponse = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: pageSlug,
          title: data.page?.title || pageSlug,
          content: pageContent,
        }),
      });

      if (saveResponse.ok) {
        setMessage('Saved successfully!');
        setMessageType('success');
        setTimeout(() => {
          setIsEditing(false);
          window.location.reload();
        }, 1000);
      } else {
        setMessage('Failed to save changes');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Save error:', error);
      setMessage('Error saving changes');
      setMessageType('error');
    } finally {
      setSaving(false);
    }
  };

  if (!isEditMode) {
    return <>{children}</>;
  }

  return (
    <>
      <Box
        component="span"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          position: 'relative',
          display: 'inline-block',
          outline: isHovered ? '2px dashed #1976d2' : 'none',
          outlineOffset: '2px',
          padding: isHovered ? '2px' : '0',
          cursor: isHovered ? 'pointer' : 'default',
          transition: 'all 0.2s',
        }}
        onClick={() => setIsEditing(true)}
      >
        {children}

        {isHovered && (
          <IconButton
            size="small"
            sx={{
              position: 'absolute',
              top: -12,
              right: -12,
              backgroundColor: '#1976d2',
              color: 'white',
              width: 24,
              height: 24,
              '&:hover': {
                backgroundColor: '#1565c0',
              },
              zIndex: 1000,
            }}
          >
            <EditIcon sx={{ fontSize: 14 }} />
          </IconButton>
        )}
      </Box>

      <Dialog open={isEditing} onClose={() => setIsEditing(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{label}</DialogTitle>
        <DialogContent>
          {message && (
            <Alert severity={messageType} sx={{ mb: 2 }}>
              {message}
            </Alert>
          )}

          <TextField
            fullWidth
            multiline={multiline}
            rows={multiline ? 4 : 1}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            sx={{ mt: 1 }}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditing(false)} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
