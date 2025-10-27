'use client';

import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip } from '@mui/material';
import { PlayCircle as PlayIcon } from '@mui/icons-material';
import type { YouTubeVideo } from '@/src/types/youtube';

interface SermonCardProps {
  video: YouTubeVideo;
  onClick: () => void;
}

export default function SermonCard({ video, onClick }: SermonCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease-in-out',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 6,
          '& .play-overlay': {
            opacity: 1,
          },
        },
      }}
    >
      {/* Section 1: 16:9 Thumbnail */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          paddingTop: '56.25%', // 16:9 aspect ratio
          overflow: 'hidden',
        }}
      >
        <CardMedia
          component="img"
          image={video.thumbnail}
          alt={video.title}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
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
          <PlayIcon sx={{ fontSize: 64, color: 'white' }} />
        </Box>
      </Box>

      {/* Section 2: Content */}
      <CardContent sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1.5, minHeight: '120px', justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 600,
            lineHeight: 1.3,
          }}
        >
          {video.title}
        </Typography>

        <Chip
          label={formatDate(video.publishedAt)}
          size="small"
          sx={{
            alignSelf: 'flex-start',
            fontWeight: 500,
          }}
        />
      </CardContent>
    </Card>
  );
}
