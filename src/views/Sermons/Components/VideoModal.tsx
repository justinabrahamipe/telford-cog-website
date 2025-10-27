'use client';

import React from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Box } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import type { YouTubeVideo } from '@/src/types/youtube';

interface VideoModalProps {
  open: boolean;
  video: YouTubeVideo | null;
  onClose: () => void;
}

export default function VideoModal({ open, video, onClose }: VideoModalProps) {
  if (!video) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: 'background.paper',
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Box sx={{ pr: 4 }}>
          {video.title}
        </Box>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'text.secondary',
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <Box
          sx={{
            position: 'relative',
            paddingBottom: '56.25%', // 16:9 aspect ratio
            height: 0,
            overflow: 'hidden',
          }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
          />
        </Box>

        <Box sx={{ p: 2 }}>
          <Box sx={{ color: 'text.secondary', fontSize: '0.875rem', mb: 1 }}>
            {new Date(video.publishedAt).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </Box>
          {video.description && (
            <Box
              sx={{
                color: 'text.secondary',
                fontSize: '0.875rem',
                whiteSpace: 'pre-wrap',
                maxHeight: '200px',
                overflow: 'auto',
              }}
            >
              {video.description}
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
