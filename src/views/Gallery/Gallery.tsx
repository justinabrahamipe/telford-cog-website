'use client';

import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  CircularProgress,
  Button,
  Card,
  CardMedia,
  CardActions,
  IconButton,
  Grid,
  Typography,
  Alert,
  LinearProgress,
} from "@mui/material";
import {
  CloudUpload as UploadIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import Page from "../../components/Page/Page";
import PageBanner from "../../components/Page/Components/PageBanner/PageBanner";
import PageTitle from "../../components/Page/Components/PageTitle/PageTitle";
import { useEditMode } from "../../components/EditMode/EditModeProvider";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';

// Local gallery images
import image1 from "../../assets/photos/gallery-page/image1.jpg";
import image2 from "../../assets/photos/gallery-page/image2.jpg";
import image3 from "../../assets/photos/gallery-page/image3.jpg";
import image4 from "../../assets/photos/gallery-page/image4.jpg";
import image5 from "../../assets/photos/gallery-page/image5.jpg";
import image6 from "../../assets/photos/gallery-page/image6.jpg";
import image7 from "../../assets/photos/gallery-page/image7.jpg";
import image8 from "../../assets/photos/gallery-page/image8.jpg";
import image9 from "../../assets/photos/gallery-page/image9.jpg";
import image10 from "../../assets/photos/gallery-page/image10.jpg";
import image11 from "../../assets/photos/gallery-page/image11.jpg";
import image12 from "../../assets/photos/gallery-page/image12.jpg";
import image13 from "../../assets/photos/gallery-page/image13.jpg";
import image14 from "../../assets/photos/gallery-page/image14.jpg";
import image15 from "../../assets/photos/gallery-page/image15.jpg";
import image16 from "../../assets/photos/gallery-page/image16.jpg";
import image17 from "../../assets/photos/gallery-page/image17.jpg";
import image18 from "../../assets/photos/gallery-page/image18.jpg";
import image19 from "../../assets/photos/gallery-page/image19.jpg";
import image20 from "../../assets/photos/gallery-page/image20.jpg";
import image21 from "../../assets/photos/gallery-page/image21.jpg";
import image22 from "../../assets/photos/gallery-page/image22.jpg";
import image23 from "../../assets/photos/gallery-page/image23.jpg";
import image24 from "../../assets/photos/gallery-page/image24.jpg";

interface LocalGalleryImage {
  original: string;
  thumbnail: string;
}

// Helper function to get image src - handles both string and StaticImageData
const getImageSrc = (img: any): string => {
  return typeof img === 'string' ? img : img.src || img;
};

const fallbackImages: LocalGalleryImage[] = [
  { original: getImageSrc(image1), thumbnail: getImageSrc(image1) },
  { original: getImageSrc(image2), thumbnail: getImageSrc(image2) },
  { original: getImageSrc(image3), thumbnail: getImageSrc(image3) },
  { original: getImageSrc(image4), thumbnail: getImageSrc(image4) },
  { original: getImageSrc(image5), thumbnail: getImageSrc(image5) },
  { original: getImageSrc(image6), thumbnail: getImageSrc(image6) },
  { original: getImageSrc(image7), thumbnail: getImageSrc(image7) },
  { original: getImageSrc(image8), thumbnail: getImageSrc(image8) },
  { original: getImageSrc(image9), thumbnail: getImageSrc(image9) },
  { original: getImageSrc(image10), thumbnail: getImageSrc(image10) },
  { original: getImageSrc(image11), thumbnail: getImageSrc(image11) },
  { original: getImageSrc(image12), thumbnail: getImageSrc(image12) },
  { original: getImageSrc(image13), thumbnail: getImageSrc(image13) },
  { original: getImageSrc(image14), thumbnail: getImageSrc(image14) },
  { original: getImageSrc(image15), thumbnail: getImageSrc(image15) },
  { original: getImageSrc(image16), thumbnail: getImageSrc(image16) },
  { original: getImageSrc(image17), thumbnail: getImageSrc(image17) },
  { original: getImageSrc(image18), thumbnail: getImageSrc(image18) },
  { original: getImageSrc(image19), thumbnail: getImageSrc(image19) },
  { original: getImageSrc(image20), thumbnail: getImageSrc(image20) },
  { original: getImageSrc(image21), thumbnail: getImageSrc(image21) },
  { original: getImageSrc(image22), thumbnail: getImageSrc(image22) },
  { original: getImageSrc(image23), thumbnail: getImageSrc(image23) },
  { original: getImageSrc(image24), thumbnail: getImageSrc(image24) },
];

interface GalleryImage {
  id: number;
  image_url: string;
  thumbnail_url: string | null;
  title: string;
  description: string;
  order_index: number;
}

const Gallery: React.FC = () => {
  const { isEditMode } = useEditMode();
  const [mounted, setMounted] = useState(false);
  const [images, setImages] = useState<LocalGalleryImage[]>(fallbackImages);
  const [dbImages, setDbImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    setMounted(true);
    loadGalleryImages();
  }, []);

  const loadGalleryImages = async () => {
    try {
      const response = await fetch('/api/gallery');
      const data = await response.json();

      if (response.ok && data.success && data.images.length > 0) {
        setDbImages(data.images);
        // Map database images to ImageGallery format
        const galleryImages = data.images.map((img: any) => ({
          original: img.image_url,
          thumbnail: img.thumbnail_url || img.image_url,
          description: img.title || '',
        }));
        setImages(galleryImages);
      } else {
        // Use fallback images if no images in database
        console.log('No images in database, using fallback images');
      }
    } catch (error) {
      console.error('Error loading gallery images:', error);
      // Keep using fallback images on error
    } finally {
      setLoading(false);
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
    setUploadProgress(50); // Show progress while uploading
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
          order_index: dbImages.length,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage('Image uploaded successfully!');
        setMessageType('success');
        setUploadProgress(100);
        loadGalleryImages();
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
        loadGalleryImages();
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

  return (
    <Page name="gallery">
      <PageBanner>
        <PageTitle title="Gallery" />
      </PageBanner>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {message && (
          <Alert severity={messageType} sx={{ mb: 3 }} onClose={() => setMessage('')}>
            {message}
          </Alert>
        )}

        {!mounted || loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
            <CircularProgress />
          </Box>
        ) : isEditMode ? (
          // Edit Mode - Grid view with upload and delete
          <Box>
            <Card sx={{ mb: 4, p: 3 }}>
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
              {dbImages.length > 0 ? (
                dbImages.map((image) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={image.id}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="250"
                        image={image.thumbnail_url || image.image_url}
                        alt={image.title}
                        sx={{ objectFit: 'cover' }}
                      />
                      <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
                        <Typography variant="body2" noWrap sx={{ flex: 1 }}>
                          {image.title || 'Untitled'}
                        </Typography>
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
                ))
              ) : (
                <Grid size={12}>
                  <Card sx={{ p: 4, textAlign: 'center' }}>
                    <UploadIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                      No images yet
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Upload your first image to start building your gallery
                    </Typography>
                  </Card>
                </Grid>
              )}
            </Grid>
          </Box>
        ) : (
          // Normal Mode - Image Gallery view
          <Box sx={{
            '& .image-gallery': {
              backgroundColor: 'background.paper',
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: 2,
            },
            '& .image-gallery-slide img': {
              maxHeight: '70vh',
              objectFit: 'contain',
            },
            '& .image-gallery-thumbnail img': {
              borderRadius: 1,
            }
          }}>
            <ImageGallery
              items={images}
              autoPlay={true}
              showBullets={true}
              slideInterval={5000}
              showThumbnails={true}
              showPlayButton={true}
              showFullscreenButton={true}
              showNav={true}
              useBrowserFullscreen={true}
            />
          </Box>
        )}
      </Container>
    </Page>
  );
};

export default Gallery;