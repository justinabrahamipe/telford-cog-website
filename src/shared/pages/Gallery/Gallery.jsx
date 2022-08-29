import React from "react";
import Page from "../../components/Page/Page";
import PageBanner from "../../components/Page/Components/PageBanner/PageBanner";
import PageTitle from "../../components/Page/Components/PageTitle/PageTitle";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
import image1 from "../../images/photos/gallery/image1.JPG";
import image2 from "../../images/photos/gallery/image2.JPG";
import image3 from "../../images/photos/gallery/image3.JPG";
import image4 from "../../images/photos/gallery/image4.JPG";
import image5 from "../../images/photos/gallery/image5.JPG";
import image6 from "../../images/photos/gallery/image6.JPG";
import image7 from "../../images/photos/gallery/image7.JPG";
import image8 from "../../images/photos/gallery/image8.JPG";
import image9 from "../../images/photos/gallery/image9.JPG";
import image10 from "../../images/photos/gallery/image10.JPG";
import image11 from "../../images/photos/gallery/image11.jpg";
import image12 from "../../images/photos/gallery/image12.JPG";
import image13 from "../../images/photos/gallery/image13.JPG";
import image14 from "../../images/photos/gallery/image14.JPG";
import image15 from "../../images/photos/gallery/image15.JPG";
import image16 from "../../images/photos/gallery/image16.JPG";
import image17 from "../../images/photos/gallery/image17.JPG";
import image18 from "../../images/photos/gallery/image18.JPG";
import image19 from "../../images/photos/gallery/image19.JPG";
import image20 from "../../images/photos/gallery/image20.JPG";

import image21 from "../../images/photos/gallery/image21.JPG";
import image22 from "../../images/photos/gallery/image22.JPG";
import image23 from "../../images/photos/gallery/image23.JPG";
import image24 from "../../images/photos/gallery/image24.JPG";
import image25 from "../../images/photos/gallery/image25.JPG";
import image26 from "../../images/photos/gallery/image26.JPG";
import image27 from "../../images/photos/gallery/image27.JPG";


const GalleryNew = function (props) {
  
    const images = [
      
      
      {
        original:  image12,
        thumbnail:  image12,
      },
      {
        original:  image13,
        thumbnail:  image13,
      },
      {
        original:  image14,
        thumbnail:  image14,
      },
      {
        original:  image15,
        thumbnail:  image15,
      },
      {
        original:  image16,
        thumbnail:  image16,
      },
      {
        original:  image17,
        thumbnail:  image17,
      },
      {
        original:  image18,
        thumbnail:  image18,
      },
      {
        original:  image19,
        thumbnail:  image19,
      },
      {
        original:  image20,
        thumbnail:  image20,
      },
      {
        original:  image21,
        thumbnail:  image21,
      },
      
      {
        original:  image22,
        thumbnail:  image22,
      },
      {
        original:  image23,
        thumbnail:  image23,
      },
      {
        original:  image24,
        thumbnail:  image24,
      },
      {
        original:  image25,
        thumbnail:  image25,
      },
      {
        original:  image26,
        thumbnail:  image26,
      },
      {
        original:  image27,
        thumbnail:  image27,
      },
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
