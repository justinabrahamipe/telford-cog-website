'use client';

import React from 'react';
import { Box, Chip } from '@mui/material';
import { PlayCircle as PlayIcon } from '@mui/icons-material';
import type { YouTubeVideo } from '@/src/types/youtube';

interface ShortCardProps {
  video: YouTubeVideo;
  onClick: () => void;
}

export default function ShortCard({ video, onClick }: ShortCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <Box
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        width: '100%',
        height: '100%',
        borderRadius: 1,
        overflow: 'hidden',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
          '& .play-overlay': {
            opacity: 1,
          },
        },
      }}
    >
      {/* Thumbnail - 9:16 Ratio (Vertical) */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          paddingTop: '177.78%', // 9:16 aspect ratio (16/9 * 100)
          overflow: 'hidden',
          backgroundColor: '#000',
        }}
      >
        <img
          src={video.thumbnail}
          alt={video.title}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        <Box
          className="play-overlay"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            opacity: 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          <PlayIcon sx={{ fontSize: 48, color: 'white' }} />
        </Box>

        {/* Date overlay at bottom */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 8,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <Chip
            label={formatDate(video.publishedAt)}
            size="small"
            sx={{
              fontWeight: 500,
              fontSize: '0.7rem',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              '& .MuiChip-label': {
                px: 1.5,
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
