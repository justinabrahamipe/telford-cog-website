# Google Drive Gallery Setup Guide

This guide will help you set up Google Drive integration for the gallery to automatically fetch images from a Google Drive folder.

## Prerequisites

1. A Google account
2. A Google Drive folder with images you want to display
3. Access to Google Cloud Console

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Create Project" or select an existing project
3. Give your project a name (e.g., "Church Website Gallery")
4. Click "Create"

## Step 2: Enable Google Drive API

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google Drive API"
3. Click on "Google Drive API" from the results
4. Click "Enable"

## Step 3: Create API Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the generated API key
4. **Important**: Click "Restrict Key" to secure it:
   - Under "API restrictions", select "Restrict key"
   - Choose "Google Drive API" from the dropdown
   - Click "Save"

## Step 4: Prepare Your Google Drive Folder

1. Create a new folder in Google Drive or use an existing one
2. Upload all the images you want to display in the gallery
3. **Make the folder publicly viewable**:
   - Right-click the folder → "Share"
   - Click "Change to anyone with the link"
   - Set permission to "Viewer"
   - Click "Done"
4. Copy the folder ID from the URL:
   - Example URL: `https://drive.google.com/drive/folders/1ABC123XYZ789...`
   - Folder ID: `1ABC123XYZ789...`

## Step 5: Configure Environment Variables

1. Create a `.env` file in the root of your project (if it doesn't exist)
2. Add the following variables:

```env
REACT_APP_GOOGLE_DRIVE_API_KEY=your_api_key_here
REACT_APP_GOOGLE_DRIVE_FOLDER_ID=your_folder_id_here
```

3. Replace the values with your actual API key and folder ID
4. **Never commit the `.env` file to version control**

## Step 6: Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to the Gallery page
3. You should see:
   - A loading message while fetching images
   - A success message showing the number of images loaded from Google Drive
   - Your images displayed in the gallery

## Troubleshooting

### Common Issues:

1. **"Google Drive API not configured" error**:
   - Check that your `.env` file exists and has the correct variable names
   - Restart your development server after adding environment variables

2. **"API key not valid" error**:
   - Verify your API key is correct
   - Ensure the API key has Google Drive API restrictions enabled
   - Check that the Google Drive API is enabled for your project

3. **"Folder not found" or "Access denied" error**:
   - Verify the folder ID is correct
   - Ensure the folder is shared publicly (anyone with the link can view)
   - Check that the folder contains image files

4. **Images not loading**:
   - Verify the images in the folder are in supported formats (JPG, PNG, GIF, etc.)
   - Check browser console for specific error messages

### File Formats Supported:
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)
- BMP (.bmp)

## Security Considerations

1. **API Key Security**:
   - Always restrict your API key to specific APIs (Google Drive API only)
   - Never expose your API key in client-side code (it's safe in React environment variables starting with `REACT_APP_`)
   - Consider setting up domain restrictions in production

2. **Folder Permissions**:
   - Only share folders that contain content you want to be publicly visible
   - Regularly review and update folder permissions

## Adding New Images

To add new images to the gallery:

1. Upload images to your Google Drive folder
2. The gallery will automatically fetch and display new images on the next page load
3. You can also click the "Retry" button to force a refresh

## Production Deployment

When deploying to production:

1. Set the environment variables in your hosting platform
2. Ensure the API key restrictions include your production domain
3. Test the gallery functionality on the live site

## Fallback Behavior

If Google Drive is not configured or fails to load:
- The gallery will automatically fallback to local images
- Users will see an informative message about the configuration status
- The gallery remains fully functional with local images