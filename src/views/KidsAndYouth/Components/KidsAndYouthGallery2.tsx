import React, { useState, useEffect, useCallback } from "react";
import "../KidsAndYouth.css";
import image1 from "../../../assets/photos/KidsAndYouth/image1.JPG";
import image2 from "../../../assets/photos/KidsAndYouth/image2.JPG";
import image3 from "../../../assets/photos/KidsAndYouth/image3.JPG";
import image4 from "../../../assets/photos/KidsAndYouth/image4.JPG";
import image5 from "../../../assets/photos/KidsAndYouth/image5.JPG";
import image6 from "../../../assets/photos/KidsAndYouth/image6.JPG";
import image7 from "../../../assets/photos/KidsAndYouth/image7.JPG";
import image8 from "../../../assets/photos/KidsAndYouth/image8.JPG";
import image9 from "../../../assets/photos/KidsAndYouth/image9.JPG";
import image10 from "../../../assets/photos/KidsAndYouth/image10.JPG";
import image11 from "../../../assets/photos/KidsAndYouth/image11.JPG";
import image12 from "../../../assets/photos/KidsAndYouth/image12.JPG";
import image13 from "../../../assets/photos/KidsAndYouth/image13.JPG";
import image14 from "../../../assets/photos/KidsAndYouth/image14.JPG";
import image15 from "../../../assets/photos/KidsAndYouth/image15.JPG";
import image16 from "../../../assets/photos/KidsAndYouth/image16.JPG";
import image17 from "../../../assets/photos/KidsAndYouth/image17.JPG";
import image18 from "../../../assets/photos/KidsAndYouth/image18.JPG";
import image19 from "../../../assets/photos/KidsAndYouth/image19.JPG";
import image20 from "../../../assets/photos/KidsAndYouth/image20.JPG";
import image21 from "../../../assets/photos/KidsAndYouth/image21.JPG";
import image22 from "../../../assets/photos/KidsAndYouth/image22.JPG";
import image23 from "../../../assets/photos/KidsAndYouth/image23.JPG";
import image24 from "../../../assets/photos/KidsAndYouth/image24.JPG";

// Helper function to get image src - handles both string and StaticImageData
const getImageSrc = (img: any): string => {
  return typeof img === 'string' ? img : img.src || img;
};

const imgUrls: string[] = [
  getImageSrc(image1),
  getImageSrc(image2),
  getImageSrc(image3),
  getImageSrc(image4),
  getImageSrc(image5),
  getImageSrc(image6),
  getImageSrc(image7),
  getImageSrc(image8),
  getImageSrc(image9),
  getImageSrc(image10),
  getImageSrc(image11),
  getImageSrc(image12),
  getImageSrc(image13),
  getImageSrc(image14),
  getImageSrc(image15),
  getImageSrc(image16),
  getImageSrc(image17),
  getImageSrc(image18),
  getImageSrc(image19),
  getImageSrc(image20),
  getImageSrc(image21),
  getImageSrc(image22),
  getImageSrc(image23),
  getImageSrc(image24),
];

interface GalleryModalProps {
  closeModal: () => void;
  findPrev: () => void;
  findNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  src?: string;
}

const GalleryModal: React.FC<GalleryModalProps> = ({
  closeModal,
  hasNext,
  hasPrev,
  findNext,
  findPrev,
  src,
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.keyCode === 27) closeModal();
      if (e.keyCode === 37 && hasPrev) findPrev();
      if (e.keyCode === 39 && hasNext) findNext();
    },
    [closeModal, findNext, findPrev, hasNext, hasPrev]
  );

  const handleReactKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLAnchorElement>) => {
      if (e.keyCode === 27) closeModal();
      if (e.keyCode === 37 && hasPrev) findPrev();
      if (e.keyCode === 39 && hasNext) findNext();
    },
    [closeModal, findNext, findPrev, hasNext, hasPrev]
  );

  useEffect(() => {
    document.body.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!src) {
    return null;
  }

  return (
    <div>
      <div className="modal-overlay" onClick={closeModal}></div>
      <div className="modal">
        <div className="modal-body">
          <a
            href="#"
            className="modal-close"
            onClick={(e) => {
              e.preventDefault();
              closeModal();
            }}
            onKeyDown={handleReactKeyDown}
          >
            &times;
          </a>
          {hasPrev && (
            <a
              href="#"
              className="modal-prev"
              onClick={(e) => {
                e.preventDefault();
                findPrev();
              }}
              onKeyDown={handleReactKeyDown}
            >
              &lsaquo;
            </a>
          )}
          {hasNext && (
            <a
              href="#"
              className="modal-next"
              onClick={(e) => {
                e.preventDefault();
                findNext();
              }}
              onKeyDown={handleReactKeyDown}
            >
              &rsaquo;
            </a>
          )}
          <img src={src} alt="Gallery item" />
        </div>
      </div>
    </div>
  );
};

const KidsAndYouthGallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const closeModal = useCallback(() => {
    setCurrentIndex(null);
  }, []);

  const findPrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex !== null ? prevIndex - 1 : null));
  }, []);

  const findNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex !== null ? prevIndex + 1 : null));
  }, []);

  const openModal = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const renderImageContent = useCallback(
    (src: string, index: number) => (
      <div key={src} onClick={() => openModal(index)}>
        <img src={src} alt={`Gallery item ${index + 1}`} />
      </div>
    ),
    [openModal]
  );

  return (
    <div className="gallery-container">
      <div className="gallery-grid">
        {imgUrls.map(renderImageContent)}
      </div>
      <GalleryModal
        closeModal={closeModal}
        findPrev={findPrev}
        findNext={findNext}
        hasPrev={currentIndex !== null && currentIndex > 0}
        hasNext={currentIndex !== null && currentIndex + 1 < imgUrls.length}
        src={currentIndex !== null ? imgUrls[currentIndex] : undefined}
      />
    </div>
  );
};

export default KidsAndYouthGallery;