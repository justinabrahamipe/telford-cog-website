/**
 * Utility functions for Google Drive URL handling and formatting
 */

/**
 * Extract folder ID from Google Drive folder URL
 * @param url - Google Drive folder URL
 * @returns folder ID or null if invalid
 */
export function extractFolderIdFromUrl(url: string): string | null {
  // Match various Google Drive folder URL formats
  const patterns = [
    /\/folders\/([a-zA-Z0-9-_]+)/,
    /[?&]id=([a-zA-Z0-9-_]+)/,
    /\/d\/([a-zA-Z0-9-_]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * Extract file ID from Google Drive file URL
 * @param url - Google Drive file URL
 * @returns file ID or null if invalid
 */
export function extractFileIdFromUrl(url: string): string | null {
  // Match various Google Drive file URL formats
  const patterns = [
    /\/file\/d\/([a-zA-Z0-9-_]+)/,
    /[?&]id=([a-zA-Z0-9-_]+)/,
    /\/d\/([a-zA-Z0-9-_]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * Generate direct image URL for Google Drive file
 * @param fileId - Google Drive file ID
 * @param size - Optional size parameter for thumbnails
 * @returns direct image URL
 */
export function generateDirectImageUrl(fileId: string, size?: number): string {
  const baseUrl = `https://drive.google.com/uc?id=${fileId}&export=view`;
  return size ? `${baseUrl}&sz=w${size}` : baseUrl;
}

/**
 * Generate thumbnail URL for Google Drive file
 * @param fileId - Google Drive file ID
 * @param size - Thumbnail size (default: 400)
 * @returns thumbnail URL
 */
export function generateThumbnailUrl(fileId: string, size: number = 400): string {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`;
}

/**
 * Check if a string is a valid Google Drive file or folder ID
 * @param id - Potential Google Drive ID
 * @returns true if valid ID format
 */
export function isValidGoogleDriveId(id: string): boolean {
  // Google Drive IDs are typically 25-33 characters long and contain letters, numbers, hyphens, and underscores
  return /^[a-zA-Z0-9-_]{25,33}$/.test(id);
}

/**
 * Validate Google Drive API key format
 * @param apiKey - API key to validate
 * @returns true if valid API key format
 */
export function isValidGoogleApiKey(apiKey: string): boolean {
  // Google API keys typically start with "AIza" and are 39 characters long
  return /^AIza[a-zA-Z0-9-_]{35}$/.test(apiKey);
}

/**
 * Create a shareable Google Drive folder URL
 * @param folderId - Google Drive folder ID
 * @returns shareable folder URL
 */
export function createShareableFolderUrl(folderId: string): string {
  return `https://drive.google.com/drive/folders/${folderId}`;
}

/**
 * Create a shareable Google Drive file URL
 * @param fileId - Google Drive file ID
 * @returns shareable file URL
 */
export function createShareableFileUrl(fileId: string): string {
  return `https://drive.google.com/file/d/${fileId}/view`;
}

export default {
  extractFolderIdFromUrl,
  extractFileIdFromUrl,
  generateDirectImageUrl,
  generateThumbnailUrl,
  isValidGoogleDriveId,
  isValidGoogleApiKey,
  createShareableFolderUrl,
  createShareableFileUrl,
};