import React from "react";
import Page from "../../components/Page/Page";
import PageBanner from "../../components/Page/Components/PageBanner/PageBanner";
import PageTitle from "../../components/Page/Components/PageTitle/PageTitle";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
import image1 from "../../images/photos/gallery-page/image1.jpg";
import image2 from "../../images/photos/gallery-page/image2.jpg";
import image3 from "../../images/photos/gallery-page/image3.jpg";
import image4 from "../../images/photos/gallery-page/image4.jpg";
import image5 from "../../images/photos/gallery-page/image5.jpg";
import image6 from "../../images/photos/gallery-page/image6.jpg";
import image7 from "../../images/photos/gallery-page/image7.jpg";
import image8 from "../../images/photos/gallery-page/image8.jpg";
import image9 from "../../images/photos/gallery-page/image9.jpg";
import image10 from "../../images/photos/gallery-page/image10.jpg";
import image11 from "../../images/photos/gallery-page/image11.jpg";

const GalleryNew = function (props) {
    const images = [
        {
          original: image1,
          thumbnail:  image1,
        },
        {
          original:  image2,
          thumbnail:  image2,
        },
        {
          original:  image3,
          thumbnail:  image3,
        },
        {
          original:  image4,
          thumbnail:  image4,
        },
        {
          original:  image5,
          thumbnail:  image5,
        },
        {
          original:  image6,
          thumbnail:  image6,
        },
        {
          original:  image7,
          thumbnail:  image7,
        },
        {
          original:  image8,
          thumbnail:  image8,
        },
        {
          original:  image9,
          thumbnail:  image9,
        },
        {
          original:  image10,
          thumbnail:  image10,
        },
        {
          original:  image11,
          thumbnail:  image11,
        },
      ];
  return (
    <Page name="gallery">
      <PageBanner>
        <PageTitle title="Gallery" />
      </PageBanner>
      <ImageGallery items={images} autoPlay showBullets='true' slideInterval='5000' />;
    </Page>
  );
};

export default GalleryNew;
