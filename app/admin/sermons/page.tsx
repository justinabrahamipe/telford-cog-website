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
  Card,
  CardContent,
  CardActions,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  Grid,
  IconButton,
  Chip,
} from '@mui/material';
import {
  ArrowBack,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  VideoLibrary as VideoIcon,
} from '@mui/icons-material';

interface Sermon {
  id: number;
  title: string;
  preacher: string;
  date: string;
  video_url: string;
  description: string;
  thumbnail_url: string;
}

export default function AdminSermonManager() {
  const [loading, setLoading] = useState(true);
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSermon, setEditingSermon] = useState<Sermon | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    preacher: '',
    date: '',
    video_url: '',
    description: '',
    thumbnail_url: '',
  });
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/check');
      const data = await response.json();

      if (!data.authenticated) {
        router.push('/admin/login');
      } else {
        setLoading(false);
        loadSermons();
      }
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/admin/login');
    }
  };

  const loadSermons = async () => {
    try {
      const response = await fetch('/api/admin/sermons');
      const data = await response.json();

      if (response.ok) {
        setSermons(data.sermons || []);
      }
    } catch (error) {
      console.error('Error loading sermons:', error);
      setMessage('Failed to load sermons');
      setMessageType('error');
    }
  };

  const handleOpenDialog = (sermon?: Sermon) => {
    if (sermon) {
      setEditingSermon(sermon);
      setFormData({
        title: sermon.title,
        preacher: sermon.preacher,
        date: sermon.date.split('T')[0], // Format date for input
        video_url: sermon.video_url,
        description: sermon.description,
        thumbnail_url: sermon.thumbnail_url,
      });
    } else {
      setEditingSermon(null);
      setFormData({
        title: '',
        preacher: '',
        date: new Date().toISOString().split('T')[0],
        video_url: '',
        description: '',
        thumbnail_url: '',
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingSermon(null);
  };

  const handleSave = async () => {
    try {
      if (!formData.title || !formData.date) {
        setMessage('Title and date are required');
        setMessageType('error');
        return;
      }

      let response;
      if (editingSermon) {
        // Update existing sermon
        response = await fetch(`/api/admin/sermons/${editingSermon.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } else {
        // Create new sermon
        response = await fetch('/api/admin/sermons', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage(editingSermon ? 'Sermon updated successfully!' : 'Sermon added successfully!');
        setMessageType('success');
        handleCloseDialog();
        loadSermons();
      } else {
        setMessage(data.error || 'Failed to save sermon');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error saving sermon:', error);
      setMessage('Failed to save sermon');
      setMessageType('error');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this sermon?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/sermons/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('Sermon deleted successfully!');
        setMessageType('success');
        loadSermons();
      } else {
        setMessage('Failed to delete sermon');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error deleting sermon:', error);
      setMessage('Failed to delete sermon');
      setMessageType('error');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <AppBar position="static">
        <Toolbar>
          <Button
            color="inherit"
            startIcon={<ArrowBack />}
            onClick={() => router.push('/admin/dashboard')}
          >
            Back to Dashboard
          </Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
            Sermon Manager
          </Typography>
          <Button
            color="inherit"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add Sermon
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {message && (
          <Alert severity={messageType} sx={{ mb: 3 }} onClose={() => setMessage('')}>
            {message}
          </Alert>
        )}

        <Grid container spacing={3}>
          {sermons.map((sermon) => (
            <Grid size={12} key={sermon.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h5" gutterBottom>
                        {sermon.title}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                        {sermon.preacher && (
                          <Chip label={sermon.preacher} size="small" color="primary" />
                        )}
                        <Chip
                          label={new Date(sermon.date).toLocaleDateString()}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {sermon.description}
                      </Typography>
                      {sermon.video_url && (
                        <Typography variant="body2" color="primary">
                          Video URL: {sermon.video_url}
                        </Typography>
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenDialog(sermon)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(sermon.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}

          {sermons.length === 0 && (
            <Grid size={12}>
              <Card sx={{ p: 4, textAlign: 'center' }}>
                <VideoIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No sermons yet
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Click "Add Sermon" to start adding sermon content
                </Typography>
              </Card>
            </Grid>
          )}
        </Grid>
      </Container>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingSermon ? 'Edit Sermon' : 'Add New Sermon'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              fullWidth
              label="Sermon Title *"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <TextField
              fullWidth
              label="Preacher"
              value={formData.preacher}
              onChange={(e) => setFormData({ ...formData, preacher: e.target.value })}
            />
            <TextField
              fullWidth
              type="date"
              label="Date *"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              fullWidth
              label="Video URL (YouTube, Vimeo, etc.)"
              value={formData.video_url}
              onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
              placeholder="https://youtube.com/watch?v=..."
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <TextField
              fullWidth
              label="Thumbnail URL (optional)"
              value={formData.thumbnail_url}
              onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {editingSermon ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
