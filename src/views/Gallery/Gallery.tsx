'use client';

import React from "react";
import { Box, Container } from "@mui/material";
import Page from "../../components/Page/Page";
import PageBanner from "../../components/Page/Components/PageBanner/PageBanner";
import PageTitle from "../../components/Page/Components/PageTitle/PageTitle";
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

const fallbackImages: LocalGalleryImage[] = [
  { original: image1.src, thumbnail: image1.src },
  { original: image2.src, thumbnail: image2.src },
  { original: image3.src, thumbnail: image3.src },
  { original: image4.src, thumbnail: image4.src },
  { original: image5.src, thumbnail: image5.src },
  { original: image6.src, thumbnail: image6.src },
  { original: image7.src, thumbnail: image7.src },
  { original: image8.src, thumbnail: image8.src },
  { original: image9.src, thumbnail: image9.src },
  { original: image10.src, thumbnail: image10.src },
  { original: image11.src, thumbnail: image11.src },
  { original: image12.src, thumbnail: image12.src },
  { original: image13.src, thumbnail: image13.src },
  { original: image14.src, thumbnail: image14.src },
  { original: image15.src, thumbnail: image15.src },
  { original: image16.src, thumbnail: image16.src },
  { original: image17.src, thumbnail: image17.src },
  { original: image18.src, thumbnail: image18.src },
  { original: image19.src, thumbnail: image19.src },
  { original: image20.src, thumbnail: image20.src },
  { original: image21.src, thumbnail: image21.src },
  { original: image22.src, thumbnail: image22.src },
  { original: image23.src, thumbnail: image23.src },
  { original: image24.src, thumbnail: image24.src },
];

const Gallery: React.FC = () => {
  return (
    <Page name="gallery">
      <PageBanner>
        <PageTitle title="Gallery" />
      </PageBanner>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Gallery */}
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
            items={fallbackImages}
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
      </Container>
    </Page>
  );
};

export default Gallery;