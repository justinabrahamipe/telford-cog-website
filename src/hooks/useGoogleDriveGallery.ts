import { useState, useEffect, useCallback } from 'react';
import googleDriveService, { GalleryImage } from '../services/googleDriveService';

interface UseGoogleDriveGalleryState {
  images: GalleryImage[];
  loading: boolean;
  error: string | null;
  isConfigured: boolean;
}

interface UseGoogleDriveGalleryReturn extends UseGoogleDriveGalleryState {
  refetch: () => Promise<void>;
  clearError: () => void;
}

export const useGoogleDriveGallery = (): UseGoogleDriveGalleryReturn => {
  const [state, setState] = useState<UseGoogleDriveGalleryState>({
    images: [],
    loading: false,
    error: null,
    isConfigured: googleDriveService.isConfigured(),
  });

  const fetchImages = useCallback(async () => {
    if (!state.isConfigured) {
      setState(prev => ({
        ...prev,
        error: 'Google Drive API not configured. Please check your environment variables.',
        loading: false,
      }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const images = await googleDriveService.getGalleryImages();
      setState(prev => ({
        ...prev,
        images,
        loading: false,
        error: null,
      }));
    } catch (error) {
      console.error('Error fetching Google Drive images:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch images from Google Drive',
      }));
    }
  }, [state.isConfigured]);

  const refetch = useCallback(async () => {
    await fetchImages();
  }, [fetchImages]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Auto-fetch on mount if configured
  useEffect(() => {
    if (state.isConfigured) {
      fetchImages();
    }
  }, [fetchImages, state.isConfigured]);

  return {
    ...state,
    refetch,
    clearError,
  };
};

export default useGoogleDriveGallery;