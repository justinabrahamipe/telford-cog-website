'use client';

import React, { useState, useEffect, useRef, useCallback } from "react";
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
  Close as CloseIcon,
  ZoomIn as ZoomInIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Page from "../../components/Page/Page";
import PageBanner from "../../components/Page/Components/PageBanner/PageBanner";
import PageTitle from "../../components/Page/Components/PageTitle/PageTitle";
import { useEditMode } from "../../components/EditMode/EditModeProvider";
import "./Gallery.css";

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
  src: string;
  title?: string;
}

// Helper function to get image src - handles both string and StaticImageData
const getImageSrc = (img: any): string => {
  return typeof img === 'string' ? img : img.src || img;
};

const fallbackImages: LocalGalleryImage[] = [
  { src: getImageSrc(image1), title: 'Gallery Image 1' },
  { src: getImageSrc(image2), title: 'Gallery Image 2' },
  { src: getImageSrc(image3), title: 'Gallery Image 3' },
  { src: getImageSrc(image4), title: 'Gallery Image 4' },
  { src: getImageSrc(image5), title: 'Gallery Image 5' },
  { src: getImageSrc(image6), title: 'Gallery Image 6' },
  { src: getImageSrc(image7), title: 'Gallery Image 7' },
  { src: getImageSrc(image8), title: 'Gallery Image 8' },
  { src: getImageSrc(image9), title: 'Gallery Image 9' },
  { src: getImageSrc(image10), title: 'Gallery Image 10' },
  { src: getImageSrc(image11), title: 'Gallery Image 11' },
  { src: getImageSrc(image12), title: 'Gallery Image 12' },
  { src: getImageSrc(image13), title: 'Gallery Image 13' },
  { src: getImageSrc(image14), title: 'Gallery Image 14' },
  { src: getImageSrc(image15), title: 'Gallery Image 15' },
  { src: getImageSrc(image16), title: 'Gallery Image 16' },
  { src: getImageSrc(image17), title: 'Gallery Image 17' },
  { src: getImageSrc(image18), title: 'Gallery Image 18' },
  { src: getImageSrc(image19), title: 'Gallery Image 19' },
  { src: getImageSrc(image20), title: 'Gallery Image 20' },
  { src: getImageSrc(image21), title: 'Gallery Image 21' },
  { src: getImageSrc(image22), title: 'Gallery Image 22' },
  { src: getImageSrc(image23), title: 'Gallery Image 23' },
  { src: getImageSrc(image24), title: 'Gallery Image 24' },
];

interface GalleryImage {
  id: number;
  image_url: string;
  thumbnail_url: string | null;
  title: string;
  description: string;
  order_index: number;
}

const IMAGES_PER_PAGE = 12;

const Gallery: React.FC = () => {
  const { isEditMode } = useEditMode();
  const [mounted, setMounted] = useState(false);
  const [images, setImages] = useState<LocalGalleryImage[]>(fallbackImages);
  const [displayedImages, setDisplayedImages] = useState<LocalGalleryImage[]>([]);
  const [dbImages, setDbImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    loadGalleryImages();
  }, []);

  // Initial load of images
  useEffect(() => {
    if (images.length > 0) {
      const initialImages = images.slice(0, IMAGES_PER_PAGE);
      setDisplayedImages(initialImages);
      setHasMore(images.length > IMAGES_PER_PAGE);
    }
  }, [images]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreImages();
        }
      },
      { threshold: 0.5 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, page, images]);

  const loadMoreImages = useCallback(() => {
    const nextPage = page + 1;
    const startIndex = page * IMAGES_PER_PAGE;
    const endIndex = startIndex + IMAGES_PER_PAGE;
    const newImages = images.slice(startIndex, endIndex);

    if (newImages.length > 0) {
      setDisplayedImages((prev) => [...prev, ...newImages]);
      setPage(nextPage);
      setHasMore(endIndex < images.length);
    } else {
      setHasMore(false);
    }
  }, [page, images]);

  const loadGalleryImages = async () => {
    try {
      const response = await fetch('/api/gallery');
      const data = await response.json();

      if (response.ok && data.success && data.images.length > 0) {
        setDbImages(data.images);
        const galleryImages = data.images.map((img: any) => ({
          src: img.image_url,
          title: img.title || '',
        }));
        setImages(galleryImages);
      } else {
        console.log('No images in database, using fallback images');
      }
    } catch (error) {
      console.error('Error loading gallery images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setMessage('Please select an image file');
      setMessageType('error');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setMessage('Image size must be less than 10MB');
      setMessageType('error');
      return;
    }

    setUploading(true);
    setUploadProgress(50);
    setMessage('');

    try {
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

      const response = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image_url: uploadData.url,
          thumbnail_url: uploadData.url,
          title: file.name.replace(/\.[^/.]+$/, ''),
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

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Image card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <Page name="gallery">
      <PageBanner>
        <PageTitle title="Gallery" />
      </PageBanner>

      <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3, md: 4 }, px: { xs: 1, sm: 2, md: 3 } }}>
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
            <Card sx={{ mb: { xs: 2, sm: 3, md: 4 }, p: { xs: 2, sm: 3 } }}>
              <Typography variant="h6" sx={{ mb: 2, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                Upload New Image
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  gap: 2
                }}>
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
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
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

            <Grid container spacing={{ xs: 2, sm: 2, md: 3 }}>
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
                  <Card sx={{ p: { xs: 3, sm: 4 }, textAlign: 'center' }}>
                    <UploadIcon sx={{ fontSize: { xs: 48, sm: 64 }, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                      No images yet
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      Upload your first image to start building your gallery
                    </Typography>
                  </Card>
                </Grid>
              )}
            </Grid>
          </Box>
        ) : (
          // Normal Mode - Modern Grid with Lightbox
          <Box>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                <AnimatePresence>
                  {displayedImages.map((image, index) => (
                    <Grid size={{ xs: 6, sm: 4, md: 3 }} key={index}>
                      <motion.div
                        variants={cardVariants}
                        layout
                        whileHover={{ scale: 1.15, transition: { duration: 0.3 } }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Box
                          className="gallery-image-card"
                          onClick={() => openLightbox(index)}
                          sx={{
                            position: 'relative',
                            paddingTop: '100%',
                            borderRadius: { xs: 1, sm: 2 },
                            overflow: 'hidden',
                            cursor: 'pointer',
                            boxShadow: 2,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              boxShadow: 8,
                              '& .gallery-image-overlay': {
                                opacity: 1,
                              },
                            },
                          }}
                        >
                          <Box
                            component="img"
                            src={image.src}
                            alt={image.title || `Gallery image ${index + 1}`}
                            loading="lazy"
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
                            className="gallery-image-overlay"
                            sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)',
                              opacity: 0,
                              transition: 'opacity 0.3s ease',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'flex-end',
                              padding: 2,
                            }}
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{
                                  color: 'white',
                                  fontWeight: 500,
                                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                }}
                              >
                                {image.title || `Image ${index + 1}`}
                              </Typography>
                              <ZoomInIcon sx={{ color: 'white', fontSize: { xs: 18, sm: 20 } }} />
                            </Box>
                          </Box>
                        </Box>
                      </motion.div>
                    </Grid>
                  ))}
                </AnimatePresence>
              </Grid>
            </motion.div>

            {/* Infinite scroll trigger */}
            {hasMore && (
              <Box
                ref={observerTarget}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  py: 4,
                }}
              >
                <CircularProgress size={40} />
              </Box>
            )}

            {/* Lightbox */}
            <Lightbox
              open={lightboxOpen}
              close={() => setLightboxOpen(false)}
              index={currentImageIndex}
              slides={images.map((img) => ({ src: img.src, alt: img.title }))}
              plugins={[Zoom]}
              zoom={{
                maxZoomPixelRatio: 3,
                scrollToZoom: true,
              }}
              carousel={{
                finite: false,
                preload: 2,
              }}
              animation={{
                fade: 300,
                swipe: 300,
              }}
              controller={{
                closeOnBackdropClick: true,
              }}
              styles={{
                container: {
                  backgroundColor: 'rgba(0, 0, 0, 0.95)',
                },
              }}
            />
          </Box>
        )}
      </Container>
    </Page>
  );
};

export default Gallery;
