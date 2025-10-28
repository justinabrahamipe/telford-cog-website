'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Container,
  TextField,
  MenuItem,
  Box,
  Typography,
  CircularProgress,
  Alert,
  InputAdornment,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import Page from '../../components/Page/Page';
import PageBanner from '../../components/Page/Components/PageBanner/PageBanner';
import PageTitle from '../../components/Page/Components/PageTitle/PageTitle';
import SermonCard from './Components/SermonCard';
import ShortCard from './Components/ShortCard';
import VideoModal from './Components/VideoModal';
import type { YouTubeVideo } from '@/src/types/youtube';

const Sermons: React.FC = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'alphabetical'>('newest');
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch videos on mount
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/sermons/youtube');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch sermons');
        }

        setVideos(data.videos);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching sermons:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Filter and sort videos
  const filteredVideos = useMemo(() => {
    let filtered = videos;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (video) =>
          video.title.toLowerCase().includes(query) ||
          video.description.toLowerCase().includes(query)
      );
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        case 'oldest':
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return sorted;
  }, [videos, searchQuery, sortBy]);

  // Separate shorts from regular sermons
  const shorts = useMemo(() => {
    return filteredVideos.filter((video) => video.isShort);
  }, [filteredVideos]);

  const regularSermons = useMemo(() => {
    return filteredVideos.filter((video) => !video.isShort);
  }, [filteredVideos]);

  const handleVideoClick = (video: YouTubeVideo) => {
    setSelectedVideo(video);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedVideo(null), 300);
  };

  return (
    <Page name="Sermons">
      <PageBanner>
        <PageTitle title="Messages" />
      </PageBanner>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Search and Filter Controls */}
        <Box
          sx={{
            mb: 4,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
          }}
        >
          <Box sx={{ flex: { xs: '1', md: '2' } }}>
            <TextField
              fullWidth
              placeholder="Search messages by title or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box sx={{ flex: { xs: '1', md: '1' } }}>
            <TextField
              fullWidth
              select
              label="Sort By"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <MenuItem value="newest">Newest First</MenuItem>
              <MenuItem value="oldest">Oldest First</MenuItem>
              <MenuItem value="alphabetical">Alphabetical</MenuItem>
            </TextField>
          </Box>
        </Box>

        {/* Loading State */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Error State */}
        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {/* Videos Grid */}
        {!loading && !error && (
          <>
            {filteredVideos.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary">
                  {searchQuery
                    ? 'No messages found matching your search'
                    : 'No messages available yet'}
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    md: shorts.length > 0 && regularSermons.length > 0 ? '480px 1fr' : '1fr',
                  },
                  gap: 4,
                  alignItems: 'start',
                }}
              >
                {/* Shorts Section */}
                {shorts.length > 0 && (
                  <Box>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                      Shorts
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Showing {shorts.length} short{shorts.length !== 1 ? 's' : ''}
                    </Typography>
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                          xs: 'repeat(3, 1fr)',
                          sm: 'repeat(4, 1fr)',
                          md: 'repeat(2, 1fr)',
                        },
                        gap: 2,
                      }}
                    >
                      {shorts.map((video) => (
                        <Box key={video.id}>
                          <ShortCard video={video} onClick={() => handleVideoClick(video)} />
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}

                {/* Regular Sermons Section */}
                {regularSermons.length > 0 && (
                  <Box>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                      {shorts.length > 0 ? 'Full Messages' : 'Messages'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Showing {regularSermons.length} message{regularSermons.length !== 1 ? 's' : ''}
                    </Typography>
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                        gap: 3,
                      }}
                    >
                      {regularSermons.map((video) => (
                        <Box key={video.id}>
                          <SermonCard video={video} onClick={() => handleVideoClick(video)} />
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            )}
          </>
        )}
      </Container>

      {/* Video Modal */}
      <VideoModal open={modalOpen} video={selectedVideo} onClose={handleCloseModal} />
    </Page>
  );
};

export default Sermons;