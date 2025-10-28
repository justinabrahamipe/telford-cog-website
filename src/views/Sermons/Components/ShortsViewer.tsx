'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Box, IconButton } from '@mui/material';
import { ArrowBack as ArrowBackIcon, KeyboardArrowUp as ArrowUpIcon, KeyboardArrowDown as ArrowDownIcon } from '@mui/icons-material';
import type { YouTubeVideo } from '@/src/types/youtube';

interface ShortsViewerProps {
  shorts: YouTubeVideo[];
  initialIndex: number;
  onClose: () => void;
}

export default function ShortsViewer({ shorts, initialIndex, onClose }: ShortsViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);
  const touchEndY = useRef<number>(0);

  const currentShort = shorts[currentIndex];

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  // Handle touch move
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndY.current = e.touches[0].clientY;
  };

  // Handle touch end - detect swipe direction
  const handleTouchEnd = () => {
    const swipeDistance = touchStartY.current - touchEndY.current;
    const minSwipeDistance = 80; // Increased to avoid accidental navigation

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0 && currentIndex < shorts.length - 1) {
        // Swiped up - next short
        setCurrentIndex(currentIndex + 1);
      } else if (swipeDistance < 0 && currentIndex > 0) {
        // Swiped down - previous short
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (e.key === 'ArrowDown' && currentIndex < shorts.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, shorts.length, onClose]);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000',
        zIndex: 1300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Touch Overlay for Swipe Gestures - captures touches but allows clicks */}
      <Box
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 5,
          touchAction: 'pan-y', // Enable vertical swipe gestures
        }}
      />
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

      {/* Video Counter */}
      <Box
        sx={{
          position: 'absolute',
          top: 24,
          right: 24,
          color: 'white',
          fontSize: '0.875rem',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          px: 2,
          py: 0.5,
          borderRadius: 1,
          zIndex: 10,
        }}
      >
        {currentIndex + 1} / {shorts.length}
      </Box>

      {/* Bottom Navigation Arrows */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 100,
          right: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          zIndex: 100,
        }}
      >
        {currentIndex > 0 && (
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setCurrentIndex(currentIndex - 1);
            }}
            sx={{
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              border: '2px solid white',
              width: 48,
              height: 48,
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
              },
            }}
          >
            <ArrowUpIcon sx={{ fontSize: 28 }} />
          </IconButton>
        )}
        {currentIndex < shorts.length - 1 && (
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setCurrentIndex(currentIndex + 1);
            }}
            sx={{
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              border: '2px solid white',
              width: 48,
              height: 48,
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
              },
            }}
          >
            <ArrowDownIcon sx={{ fontSize: 28 }} />
          </IconButton>
        )}
      </Box>

      {/* Video Player - Centered */}
      <Box
        sx={{
          width: '100%',
          height: '100%',
          maxWidth: '450px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            paddingTop: '177.78%', // 9:16 aspect ratio for shorts
            maxHeight: '100vh',
          }}
        >
          <iframe
            key={currentShort.videoId}
            src={`https://www.youtube.com/embed/${currentShort.videoId}?autoplay=1&mute=0`}
            title={currentShort.title}
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
    </Box>
  );
}
