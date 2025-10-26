import React from "react";
import { Box, CircularProgress, Alert, Button, Typography, Container } from "@mui/material";
import { Refresh as RefreshIcon } from "@mui/icons-material";
import Page from "../../components/Page/Page";
import PageBanner from "../../components/Page/Components/PageBanner/PageBanner";
import PageTitle from "../../components/Page/Components/PageTitle/PageTitle";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
import useGoogleDriveGallery from "../../hooks/useGoogleDriveGallery";

// Fallback local images
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

// Kids and Youth images (now part of gallery)
import kidsImage1 from "../../assets/photos/gallery-page/image1.JPG";
import kidsImage2 from "../../assets/photos/gallery-page/image2.JPG";
import kidsImage3 from "../../assets/photos/gallery-page/image3.JPG";
import kidsImage4 from "../../assets/photos/gallery-page/image4.JPG";
import kidsImage5 from "../../assets/photos/gallery-page/image5.JPG";
import kidsImage6 from "../../assets/photos/gallery-page/image6.JPG";
import kidsImage7 from "../../assets/photos/gallery-page/image7.JPG";
import kidsImage8 from "../../assets/photos/gallery-page/image8.JPG";
import kidsImage9 from "../../assets/photos/gallery-page/image9.JPG";
import kidsImage10 from "../../assets/photos/gallery-page/image10.JPG";
import kidsImage11 from "../../assets/photos/gallery-page/image11.JPG";
import kidsImage12 from "../../assets/photos/gallery-page/image12.JPG";
import kidsImage13 from "../../assets/photos/gallery-page/image13.JPG";
import kidsImage14 from "../../assets/photos/gallery-page/image14.JPG";
import kidsImage15 from "../../assets/photos/gallery-page/image15.JPG";
import kidsImage16 from "../../assets/photos/gallery-page/image16.JPG";
import kidsImage17 from "../../assets/photos/gallery-page/image17.JPG";
import kidsImage18 from "../../assets/photos/gallery-page/image18.JPG";
import kidsImage19 from "../../assets/photos/gallery-page/image19.JPG";
import kidsImage20 from "../../assets/photos/gallery-page/image20.JPG";
import kidsImage21 from "../../assets/photos/gallery-page/image21.JPG";
import kidsImage22 from "../../assets/photos/gallery-page/image22.JPG";
import kidsImage23 from "../../assets/photos/gallery-page/image23.JPG";
import kidsImage24 from "../../assets/photos/gallery-page/image24.JPG";

interface LocalGalleryImage {
  original: string;
  thumbnail: string;
}

const fallbackImages: LocalGalleryImage[] = [
  // Original gallery images
  { original: image1, thumbnail: image1 },
  { original: image2, thumbnail: image2 },
  { original: image3, thumbnail: image3 },
  { original: image4, thumbnail: image4 },
  { original: image5, thumbnail: image5 },
  { original: image6, thumbnail: image6 },
  { original: image7, thumbnail: image7 },
  { original: image8, thumbnail: image8 },
  { original: image9, thumbnail: image9 },
  { original: image10, thumbnail: image10 },
  { original: image11, thumbnail: image11 },

  // Kids and Youth images (now part of gallery)
  { original: kidsImage1, thumbnail: kidsImage1 },
  { original: kidsImage2, thumbnail: kidsImage2 },
  { original: kidsImage3, thumbnail: kidsImage3 },
  { original: kidsImage4, thumbnail: kidsImage4 },
  { original: kidsImage5, thumbnail: kidsImage5 },
  { original: kidsImage6, thumbnail: kidsImage6 },
  { original: kidsImage7, thumbnail: kidsImage7 },
  { original: kidsImage8, thumbnail: kidsImage8 },
  { original: kidsImage9, thumbnail: kidsImage9 },
  { original: kidsImage10, thumbnail: kidsImage10 },
  { original: kidsImage11, thumbnail: kidsImage11 },
  { original: kidsImage12, thumbnail: kidsImage12 },
  { original: kidsImage13, thumbnail: kidsImage13 },
  { original: kidsImage14, thumbnail: kidsImage14 },
  { original: kidsImage15, thumbnail: kidsImage15 },
  { original: kidsImage16, thumbnail: kidsImage16 },
  { original: kidsImage17, thumbnail: kidsImage17 },
  { original: kidsImage18, thumbnail: kidsImage18 },
  { original: kidsImage19, thumbnail: kidsImage19 },
  { original: kidsImage20, thumbnail: kidsImage20 },
  { original: kidsImage21, thumbnail: kidsImage21 },
  { original: kidsImage22, thumbnail: kidsImage22 },
  { original: kidsImage23, thumbnail: kidsImage23 },
  { original: kidsImage24, thumbnail: kidsImage24 },
];

const Gallery: React.FC = () => {
  const { images, loading, error, isConfigured, refetch, clearError } = useGoogleDriveGallery();

  // Use Google Drive images if available, otherwise fallback to local images
  const galleryImages = images.length > 0 ? images : fallbackImages;

  const handleRetry = () => {
    clearError();
    refetch();
  };

  return (
    <Page name="gallery">
      <PageBanner>
        <PageTitle title="Gallery" />
      </PageBanner>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Loading State */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
            <CircularProgress size={48} />
            <Typography variant="h6" sx={{ ml: 2, color: 'text.secondary' }}>
              Loading images from Google Drive...
            </Typography>
          </Box>
        )}

        {/* Error State */}
        {error && !loading && (
          <Box sx={{ mb: 4 }}>
            <Alert
              severity="warning"
              action={
                <Button
                  color="inherit"
                  size="small"
                  onClick={handleRetry}
                  startIcon={<RefreshIcon />}
                >
                  Retry
                </Button>
              }
            >
              <Typography variant="body2">
                {error}
              </Typography>
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                Showing local images as fallback.
              </Typography>
            </Alert>
          </Box>
        )}

        {/* Configuration Warning */}
        {!isConfigured && !loading && (
          <Box sx={{ mb: 4 }}>
            <Alert severity="info">
              <Typography variant="body2">
                Google Drive integration is not configured. Please set up your API key and folder ID in the environment variables.
              </Typography>
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                Currently showing local images.
              </Typography>
            </Alert>
          </Box>
        )}

        {/* Success State - Show source info */}
        {images.length > 0 && !loading && !error && (
          <Box sx={{ mb: 2 }}>
            <Alert severity="success">
              <Typography variant="body2">
                Displaying {images.length} images from Google Drive
              </Typography>
            </Alert>
          </Box>
        )}

        {/* Gallery */}
        {!loading && galleryImages.length > 0 && (
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
              items={galleryImages}
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

        {/* Empty State */}
        {!loading && galleryImages.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No images found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please check your Google Drive configuration or add some images to the gallery folder.
            </Typography>
            {isConfigured && (
              <Button
                variant="outlined"
                onClick={handleRetry}
                startIcon={<RefreshIcon />}
                sx={{ mt: 2 }}
              >
                Retry Loading
              </Button>
            )}
          </Box>
        )}
      </Container>
    </Page>
  );
};

export default Gallery;