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
  CardMedia,
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
  LinearProgress,
} from '@mui/material';
import {
  ArrowBack,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CloudUpload as UploadIcon,
} from '@mui/icons-material';

interface GalleryImage {
  id: number;
  image_url: string;
  thumbnail_url: string | null;
  title: string;
  description: string;
  order_index: number;
}

export default function AdminGalleryManager() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    image_url: '',
    thumbnail_url: '',
    title: '',
    description: '',
    order_index: 0,
  });
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
        setLoading(false);
        loadImages();
      }
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/admin/login');
    }
  };

  const loadImages = async () => {
    try {
      const response = await fetch('/api/admin/gallery');
      const data = await response.json();

      if (response.ok) {
        setImages(data.images || []);
      }
    } catch (error) {
      console.error('Error loading images:', error);
      setMessage('Failed to load gallery images');
      setMessageType('error');
    }
  };

  const handleOpenDialog = (image?: GalleryImage) => {
    if (image) {
      setEditingImage(image);
      setFormData({
        image_url: image.image_url,
        thumbnail_url: image.thumbnail_url || '',
        title: image.title,
        description: image.description,
        order_index: image.order_index,
      });
    } else {
      setEditingImage(null);
      setFormData({
        image_url: '',
        thumbnail_url: '',
        title: '',
        description: '',
        order_index: 0,
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingImage(null);
  };

  const handleSave = async () => {
    try {
      let response;
      if (editingImage) {
        // Update existing image
        response = await fetch(`/api/admin/gallery/${editingImage.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } else {
        // Create new image
        response = await fetch('/api/admin/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage(editingImage ? 'Image updated successfully!' : 'Image added successfully!');
        setMessageType('success');
        handleCloseDialog();
        loadImages();
      } else {
        setMessage(data.error || 'Failed to save image');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error saving image:', error);
      setMessage('Failed to save image');
      setMessageType('error');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this image?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/gallery/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('Image deleted successfully!');
        setMessageType('success');
        loadImages();
      } else {
        setMessage('Failed to delete image');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      setMessage('Failed to delete image');
      setMessageType('error');
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setMessage('Please select an image file');
      setMessageType('error');
      return;
    }

    // Validate file size (max 10MB for Cloudinary free tier)
    if (file.size > 10 * 1024 * 1024) {
      setMessage('Image size must be less than 10MB');
      setMessageType('error');
      return;
    }

    setUploading(true);
    setUploadProgress(50);
    setMessage('');

    try {
      // Upload to Cloudinary via API
      const formData = new FormData();
      formData.append('file', file);

      const uploadResponse = await fetch('/api/admin/gallery/upload', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok || !uploadData.success) {
        setMessage(uploadData.error || 'Failed to upload image');
        setMessageType('error');
        setUploading(false);
        setUploadProgress(0);
        return;
      }

      setUploadProgress(75);

      // Save to database
      const response = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image_url: uploadData.url,
          thumbnail_url: uploadData.url,
          title: file.name.replace(/\.[^/.]+$/, ''), // Remove extension
          description: '',
          order_index: images.length,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage('Image uploaded successfully!');
        setMessageType('success');
        setUploadProgress(100);
        loadImages();
        // Reset file input
        event.target.value = '';
      } else {
        setMessage(data.error || 'Failed to save image to database');
        setMessageType('error');
      }

      setUploading(false);
      setUploadProgress(0);
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage('Failed to upload image');
      setMessageType('error');
      setUploading(false);
      setUploadProgress(0);
    }
  };

  if (!mounted || loading) {
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
            Gallery Manager
          </Typography>
          <Button
            color="inherit"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add Image
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {message && (
          <Alert severity={messageType} sx={{ mb: 3 }} onClose={() => setMessage('')}>
            {message}
          </Alert>
        )}

        <Card sx={{ mb: 3, p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Upload New Image
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                variant="contained"
                component="label"
                startIcon={<UploadIcon />}
                disabled={uploading}
              >
                Choose Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileUpload}
                />
              </Button>
              <Typography variant="body2" color="text.secondary">
                Max file size: 10MB. Supported formats: JPG, PNG, GIF, WebP
              </Typography>
            </Box>
            {uploading && (
              <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Uploading...
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {Math.round(uploadProgress)}%
                  </Typography>
                </Box>
                <LinearProgress variant="determinate" value={uploadProgress} />
              </Box>
            )}
          </Box>
        </Card>

        <Grid container spacing={3}>
          {images.map((image) => (
            <Grid item xs={12} sm={6} md={4} key={image.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={image.thumbnail_url || image.image_url}
                  alt={image.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" noWrap>
                    {image.title || 'Untitled'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {image.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Order: {image.order_index}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleOpenDialog(image)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(image.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}

          {images.length === 0 && (
            <Grid item xs={12}>
              <Card sx={{ p: 4, textAlign: 'center' }}>
                <UploadIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No images yet
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Click "Add Image" to start building your gallery
                </Typography>
              </Card>
            </Grid>
          )}
        </Grid>
      </Container>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingImage ? 'Edit Image' : 'Add New Image'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              fullWidth
              label="Image URL *"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              required
            />
            <TextField
              fullWidth
              label="Thumbnail URL (optional)"
              value={formData.thumbnail_url}
              onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
            />
            <TextField
              fullWidth
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <TextField
              fullWidth
              type="number"
              label="Display Order"
              value={formData.order_index}
              onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {editingImage ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
