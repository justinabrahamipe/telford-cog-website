'use client';

import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Alert, Box } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useEditMode } from './EditModeProvider';
import dynamic from 'next/dynamic';
import { AddSectionButtonProps } from '@/src/types/admin';

const TiptapEditor = dynamic(() => import('../../../app/admin/pages/TiptapEditor'), { ssr: false });

export function AddSectionButton({ pageSlug, onSectionAdded }: AddSectionButtonProps) {
  const { isEditMode } = useEditMode();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('<p>Enter your content here...</p>');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [saving, setSaving] = useState(false);

  const handleAdd = async () => {
    if (!title.trim()) {
      setMessage('Please enter a section title');
      setMessageType('error');
      return;
    }

    setSaving(true);
    setMessage('');

    try {
      // Fetch current page data
      const response = await fetch(`/api/admin/pages/${pageSlug}`);
      const data = await response.json();

      let pageContent = data.page?.content || {};

      // Initialize sections array if it doesn't exist
      if (!pageContent.sections) {
        pageContent.sections = [];
      }

      // Generate a unique section ID
      const sectionId = `${pageSlug}-${Date.now()}`;

      // Add new section
      pageContent.sections.push({
        id: sectionId,
        title,
        content,
        order: pageContent.sections.length,
      });

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
        setMessage('Section added successfully!');
        setMessageType('success');
        setTimeout(() => {
          setIsOpen(false);
          setTitle('');
          setContent('<p>Enter your content here...</p>');
          if (onSectionAdded) onSectionAdded();
          // Refresh the page to show changes
          window.location.reload();
        }, 1000);
      } else {
        setMessage('Failed to add section');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Add section error:', error);
      setMessage('Error adding section');
      setMessageType('error');
    } finally {
      setSaving(false);
    }
  };

  if (!isEditMode) {
    return null;
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsOpen(true)}
          sx={{
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          }}
        >
          Add New Section
        </Button>
      </Box>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Section</DialogTitle>
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
            placeholder="Enter section title..."
          />

          <Box sx={{ mt: 2 }}>
            <TiptapEditor
              content={content}
              onChange={setContent}
              placeholder="Enter section content..."
              minHeight="300px"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleAdd} variant="contained" disabled={saving}>
            {saving ? 'Adding...' : 'Add Section'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
