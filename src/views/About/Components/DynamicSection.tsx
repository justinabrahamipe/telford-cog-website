'use client';

import React, { useState } from 'react';
import { Box, Typography, Divider, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { EditableSection } from '../../../components/EditMode/EditableSection';
import { useEditMode } from '../../../components/EditMode/EditModeProvider';
import { DynamicSectionProps } from '@/src/types/page';

export default function DynamicSection({
  sectionId,
  pageSlug,
  title,
  content,
  onDelete,
  isDeletable = false,
}: DynamicSectionProps) {
  const { isEditMode } = useEditMode();
  const [isHovered, setIsHovered] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete the "${title}" section?`)) {
      return;
    }

    try {
      // Fetch current page data
      const response = await fetch(`/api/admin/pages/${pageSlug}`);
      const data = await response.json();

      const pageContent = data.page?.content || {};

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
        if (onDelete) onDelete();
        window.location.reload();
      } else {
        alert('Failed to delete section');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error deleting section');
    }
  };

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{ position: 'relative' }}
    >
      <EditableSection
        sectionId={sectionId}
        pageSlug={pageSlug}
        title={title}
        content={content}
      >
        <Box
          sx={{
            p: 3,
            m: 2,
            backgroundColor: 'background.paper',
            borderRadius: 2,
            boxShadow: 1,
            border: '1px solid',
            borderColor: 'divider',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              boxShadow: 4,
              transform: 'translateY(-2px)',
            },
          }}
        >
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
            {title}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box
            sx={{ lineHeight: 1.7, color: 'text.secondary' }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Box>
      </EditableSection>

      {/* Delete Button - Only shown in edit mode for deletable sections */}
      {isEditMode && isDeletable && isHovered && (
        <IconButton
          onClick={handleDelete}
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            backgroundColor: '#d32f2f',
            color: 'white',
            '&:hover': {
              backgroundColor: '#c62828',
            },
            zIndex: 1001,
          }}
          size="small"
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
}
