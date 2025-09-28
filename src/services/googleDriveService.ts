export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  webViewLink: string;
  webContentLink: string;
  thumbnailLink?: string;
}

export interface GalleryImage {
  original: string;
  thumbnail: string;
  title?: string;
  id: string;
}

class GoogleDriveService {
  private folderId: string;
  private publicImageIds: string[];

  constructor() {
    this.folderId = process.env.REACT_APP_GOOGLE_DRIVE_FOLDER_ID || '';
    // Add your public image file IDs here (comma-separated)
    const imageIdsStr = process.env.REACT_APP_GOOGLE_DRIVE_IMAGE_IDS || '';
    this.publicImageIds = imageIdsStr ? imageIdsStr.split(',').map(id => id.trim()) : [];

    if (!this.folderId && this.publicImageIds.length === 0) {
      console.warn('Google Drive folder ID or image IDs not configured');
    }
  }

  /**
   * Check if Google Drive is properly configured
   */
  isConfigured(): boolean {
    return !!(this.folderId || this.publicImageIds.length > 0);
  }

  /**
   * Get files from public Google Drive using configured file IDs
   */
  async fetchFiles(): Promise<DriveFile[]> {
    if (!this.isConfigured()) {
      throw new Error('Google Drive not configured');
    }

    try {
      // If we have specific image IDs, use them
      if (this.publicImageIds.length > 0) {
        return this.publicImageIds.map((id, index) => ({
          id,
          name: `Gallery Image ${index + 1}`,
          mimeType: 'image/jpeg',
          webViewLink: `https://drive.google.com/file/d/${id}/view`,
          webContentLink: `https://drive.google.com/uc?id=${id}&export=download`,
          thumbnailLink: `https://drive.google.com/thumbnail?id=${id}&sz=w400`
        }));
      }

      // Fallback: return empty array
      console.warn('No Google Drive image IDs configured');
      return [];
    } catch (error) {
      console.error('Error getting Google Drive files:', error);
      throw error;
    }
  }

  /**
   * Convert Drive files to gallery images
   */
  async getGalleryImages(): Promise<GalleryImage[]> {
    try {
      const files = await this.fetchFiles();

      return files
        .filter(file => file.mimeType.startsWith('image/'))
        .map(file => ({
          id: file.id,
          title: file.name,
          // Use webContentLink for direct download, fallback to webViewLink
          original: this.getDirectImageUrl(file.id),
          thumbnail: file.thumbnailLink || this.getDirectImageUrl(file.id, 400),
        }));
    } catch (error) {
      console.error('Error converting to gallery images:', error);
      throw error;
    }
  }

  /**
   * Get direct image URL for display
   */
  private getDirectImageUrl(fileId: string, size?: number): string {
    const baseUrl = `https://drive.google.com/uc?id=${fileId}&export=view`;
    return size ? `${baseUrl}&sz=w${size}` : baseUrl;
  }

  /**
   * Get public image URL (alternative method)
   */
  getPublicImageUrl(fileId: string): string {
    return `https://drive.google.com/file/d/${fileId}/view`;
  }

  /**
   * Get thumbnail URL with specific size
   */
  getThumbnailUrl(fileId: string, size: number = 400): string {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`;
  }
}

// Export singleton instance
export const googleDriveService = new GoogleDriveService();
export default googleDriveService;