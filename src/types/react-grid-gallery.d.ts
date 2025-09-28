declare module 'react-grid-gallery' {
  interface Image {
    src: string;
    thumbnail: string;
    thumbnailWidth: number;
    thumbnailHeight: number;
    caption?: string;
    tags?: { value: string; title: string }[];
    isSelected?: boolean;
  }

  interface GalleryProps {
    images: Image[];
    enableImageSelection?: boolean;
    rowHeight?: number;
    onClickImage?: (index: number, image: Image) => void;
    onSelectImage?: (index: number, image: Image) => void;
    margin?: number;
    showLightboxThumbnails?: boolean;
    backdropClosesModal?: boolean;
    currentImageWillChange?: (index: number) => void;
    customControls?: any[];
    currentImage?: number;
    preloadNextImage?: boolean;
    enableLightbox?: boolean;
    tagStyle?: any;
    tileViewportStyle?: () => any;
    thumbnailStyle?: () => any;
    showCloseButton?: boolean;
    showImageCount?: boolean;
    lightboxWidth?: number;
    thumbnailImageComponent?: any;
    imageCountSeparator?: string;
  }

  const Gallery: React.FC<GalleryProps>;
  export default Gallery;
}