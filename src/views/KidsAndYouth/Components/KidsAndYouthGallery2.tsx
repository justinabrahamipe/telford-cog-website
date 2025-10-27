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

const imgUrls: string[] = [
  image1.src,
  image2.src,
  image3.src,
  image4.src,
  image5.src,
  image6.src,
  image7.src,
  image8.src,
  image9.src,
  image10.src,
  image11.src,
  image12.src,
  image13.src,
  image14.src,
  image15.src,
  image16.src,
  image17.src,
  image18.src,
  image19.src,
  image20.src,
  image21.src,
  image22.src,
  image23.src,
  image24.src,
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