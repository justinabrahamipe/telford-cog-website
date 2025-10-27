'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  AppBar,
  Toolbar,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Edit as EditIcon,
  Image as ImageIcon,
  VideoLibrary as VideoIcon,
  ExitToApp as LogoutIcon,
  CloudUpload as UploadIcon,
} from '@mui/icons-material';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [initMessage, setInitMessage] = useState('');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/check');
      const data = await response.json();

      if (!data.authenticated) {
        router.push('/admin/login');
      } else {
        setAuthenticated(true);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleInitDatabase = async () => {
    setInitMessage('Initializing database...');
    try {
      const response = await fetch('/api/admin/init-db', { method: 'POST' });
      const data = await response.json();

      if (data.success) {
        setInitMessage('Database initialized successfully!');
      } else {
        setInitMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setInitMessage('Failed to initialize database');
    }
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted || loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!authenticated) {
    return null;
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <DashboardIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Telford COG - Admin Dashboard
          </Typography>
          <Button color="inherit" onClick={() => router.push('/')}>
            View Website
          </Button>
          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ ml: 2 }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Content Management
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Manage all website content from this dashboard
        </Typography>

        {initMessage && (
          <Alert severity={initMessage.includes('Error') ? 'error' : 'success'} sx={{ mb: 3 }}>
            {initMessage}
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Initialize Database Card */}
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <UploadIcon sx={{ fontSize: 40, color: 'warning.main', mr: 2 }} />
                  <Typography variant="h6">Initialize Database</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  First-time setup: Create database tables for content management. Run this once when setting up.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="warning"
                  fullWidth
                  onClick={handleInitDatabase}
                >
                  Initialize DB
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Page Content Editor */}
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EditIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                  <Typography variant="h6">Page Content</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Edit text content for Home, About, Contact, Leadership, and other pages.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => router.push('/admin/pages')}
                >
                  Edit Pages
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Gallery Manager */}
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <ImageIcon sx={{ fontSize: 40, color: 'success.main', mr: 2 }} />
                  <Typography variant="h6">Gallery Images</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Upload, edit, and manage gallery images. Organize photos and thumbnails.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  onClick={() => router.push('/admin/gallery')}
                >
                  Manage Gallery
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Sermon Manager */}
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <VideoIcon sx={{ fontSize: 40, color: 'error.main', mr: 2 }} />
                  <Typography variant="h6">Sermons</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Add, edit, and delete sermon videos. Manage titles, descriptions, and dates.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  onClick={() => router.push('/admin/sermons')}
                >
                  Manage Sermons
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, p: 3, backgroundColor: 'white', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Quick Start Guide
          </Typography>
          <Typography variant="body2" paragraph>
            1. <strong>Initialize Database:</strong> Click the "Initialize DB" button above to create necessary tables
          </Typography>
          <Typography variant="body2" paragraph>
            2. <strong>Edit Pages:</strong> Update content for different pages of your website
          </Typography>
          <Typography variant="body2" paragraph>
            3. <strong>Manage Gallery:</strong> Upload and organize church photos and events
          </Typography>
          <Typography variant="body2" paragraph>
            4. <strong>Add Sermons:</strong> Upload sermon videos and details for your congregation
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
