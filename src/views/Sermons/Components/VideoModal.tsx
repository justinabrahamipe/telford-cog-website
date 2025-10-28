'use client';

import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import type { YouTubeVideo } from '@/src/types/youtube';

interface VideoModalProps {
  open: boolean;
  video: YouTubeVideo | null;
  videos: YouTubeVideo[];
  onClose: () => void;
  onVideoSelect: (video: YouTubeVideo) => void;
}

export default function VideoModal({ open, video, videos, onClose, onVideoSelect }: VideoModalProps) {
  if (!open || !video) return null;

  // Filter out current video and shorts from recommendations
  const recommendedVideos = videos.filter(v => v.id !== video.id && !v.isShort).slice(0, 10);

  // Handle keyboard ESC to close
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#0f0f0f',
        zIndex: 1300,
        overflow: 'hidden',
      }}
    >
      {/* Back Button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          left: 16,
          bottom: 16,
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          border: '2px solid white',
          zIndex: 9999,
          width: 56,
          height: 56,
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 1)',
            transform: 'scale(1.1)',
          },
        }}
      >
        <ArrowBackIcon sx={{ fontSize: 32 }} />
      </IconButton>

      {/* Main Content */}
      <Box
        sx={{
          display: 'flex',
          height: '100%',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {/* Left Side - Video Player */}
        <Box
          sx={{
            flex: { xs: 'none', md: 1 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000',
            p: { xs: 0, md: 2 },
            height: { xs: '40%', md: '100%' },
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              paddingTop: '56.25%', // 16:9 aspect ratio
              maxWidth: { md: '100%' },
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
        </Box>

        {/* Right Side - Sidebar */}
        <Box
          sx={{
            width: { xs: '100%', md: '400px' },
            height: { xs: '60%', md: '100%' },
            overflowY: 'auto',
            backgroundColor: '#0f0f0f',
            borderLeft: { md: '1px solid rgba(255, 255, 255, 0.1)' },
          }}
        >
          {/* Current Video Info */}
          <Box sx={{ p: 2, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <Typography
              variant="h6"
              sx={{
                color: 'white',
                fontWeight: 600,
                mb: 1,
              }}
            >
              {video.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.6)',
              }}
            >
              {new Date(video.publishedAt).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Typography>
          </Box>

          {/* Next Videos */}
          <Box sx={{ p: 2 }}>
            <Typography
              variant="subtitle2"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                mb: 2,
                fontWeight: 600,
              }}
            >
              Next Messages
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {recommendedVideos.map((nextVideo) => (
                <Box
                  key={nextVideo.id}
                  onClick={() => onVideoSelect(nextVideo)}
                  sx={{
                    display: 'flex',
                    gap: 1,
                    cursor: 'pointer',
                    p: 1,
                    borderRadius: 1,
                    transition: 'background-color 0.2s',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  {/* Thumbnail */}
                  <Box
                    sx={{
                      width: '120px',
                      minWidth: '120px',
                      position: 'relative',
                      paddingTop: '67.5px', // 16:9
                      backgroundColor: '#000',
                      borderRadius: 1,
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={nextVideo.thumbnail}
                      alt={nextVideo.title}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                  {/* Info */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'white',
                        fontWeight: 500,
                        lineHeight: 1.3,
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        mb: 0.5,
                      }}
                    >
                      {nextVideo.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.6)',
                      }}
                    >
                      {new Date(nextVideo.publishedAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
