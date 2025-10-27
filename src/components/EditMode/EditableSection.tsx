'use client';

import React, { useState } from 'react';
import { Box, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Alert } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useEditMode } from './EditModeProvider';
import dynamic from 'next/dynamic';
import { EditableSectionProps } from '@/src/types/admin';

const TiptapEditor = dynamic(() => import('../../../app/admin/pages/TiptapEditor'), { ssr: false });

export function EditableSection({
  children,
  sectionId,
  pageSlug,
  title: initialTitle = '',
  content: initialContent = '',
  onSave,
  isDeletable = false,
}: EditableSectionProps) {
  const { isEditMode } = useEditMode();
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
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

      // Update the specific section
      if (!pageContent.sections) {
        pageContent.sections = [];
      }

      const sectionIndex = pageContent.sections.findIndex((s: any) => s.id === sectionId);

      if (sectionIndex >= 0) {
        pageContent.sections[sectionIndex] = {
          ...pageContent.sections[sectionIndex],
          title,
          content,
        };
      } else {
        // Add new section
        pageContent.sections.push({
          id: sectionId,
          title,
          content,
        });
      }

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
          if (onSave) onSave();
          // Refresh the page to show changes
          window.location.reload();
        }, 1000);
      } else {
        const errorData = await saveResponse.json();
        const errorMessage = errorData.error || 'Failed to save changes';
        console.error('Save failed:', errorData);
        setMessage(`Failed to save: ${errorMessage}`);
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

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete the "${title}" section?`)) {
      return;
    }

    try {
      // Fetch current page data
      const response = await fetch(`/api/admin/pages/${pageSlug}`);
      const data = await response.json();

      let pageContent = data.page?.content || {};

      // Remove the section
      if (pageContent.sections) {
        pageContent.sections = pageContent.sections.filter((s: any) => s.id !== sectionId);
      }

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
        window.location.reload();
      } else {
        alert('Failed to delete section');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error deleting section');
    }
  };

  if (!isEditMode) {
    return <>{children}</>;
  }

  return (
    <>
      <Box
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          position: 'relative',
          outline: isHovered ? '2px dashed #1976d2' : 'none',
          outlineOffset: '4px',
          transition: 'outline 0.2s',
        }}
      >
        {children}

        {/* Edit Button Overlay */}
        {isHovered && (
          <>
            <IconButton
              onClick={() => setIsEditing(true)}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                backgroundColor: '#1976d2',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#1565c0',
                },
                zIndex: 1000,
              }}
              size="small"
            >
              <EditIcon fontSize="small" />
            </IconButton>

            {/* Delete Button - Only shown if isDeletable */}
            {isDeletable && (
              <IconButton
                onClick={handleDelete}
                sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  backgroundColor: '#d32f2f',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#c62828',
                  },
                  zIndex: 1000,
                }}
                size="small"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
          </>
        )}
      </Box>

      {/* Edit Dialog */}
      <Dialog open={isEditing} onClose={() => setIsEditing(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Section</DialogTitle>
        <DialogContent>
          {message && (
            <Alert severity={messageType} sx={{ mb: 2 }}>
              {message}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Section Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 3, mt: 1 }}
          />

          <Box sx={{ mt: 2 }}>
            <TiptapEditor
              content={content}
              onChange={setContent}
              placeholder="Edit section content..."
              minHeight="300px"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditing(false)} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
