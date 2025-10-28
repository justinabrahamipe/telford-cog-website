const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const fetch = require('node-fetch');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const IMAGES_DIR = path.join(__dirname, '../src/assets/photos/gallery-page');

async function uploadImage(imagePath, index) {
  const fileName = path.basename(imagePath);

  console.log(`\n[${index + 1}/24] Uploading ${fileName}...`);

  try {
    // Step 1: Upload to Cloudinary
    const formData = new FormData();
    formData.append('file', fs.createReadStream(imagePath));

    console.log(`  → Uploading to Cloudinary...`);
    const uploadResponse = await fetch(`${BASE_URL}/api/admin/gallery/upload`, {
      method: 'POST',
      body: formData,
    });

    const uploadData = await uploadResponse.json();

    if (!uploadResponse.ok || !uploadData.success) {
      throw new Error(uploadData.error || 'Failed to upload to Cloudinary');
    }

    console.log(`  ✓ Uploaded to Cloudinary: ${uploadData.url}`);

    // Step 2: Save to database
    console.log(`  → Saving to database...`);
    const dbResponse = await fetch(`${BASE_URL}/api/admin/gallery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        image_url: uploadData.url,
        thumbnail_url: uploadData.url,
        title: `Gallery Image ${index + 1}`,
        description: '',
        order_index: index,
      }),
    });

    const dbData = await dbResponse.json();

    if (!dbResponse.ok || !dbData.success) {
      throw new Error(dbData.error || 'Failed to save to database');
    }

    console.log(`  ✓ Saved to database with ID: ${dbData.image.id}`);
    console.log(`  ✓ Successfully migrated ${fileName}`);

    return { success: true, fileName };
  } catch (error) {
    console.error(`  ✗ Error migrating ${fileName}:`, error.message);
    return { success: false, fileName, error: error.message };
  }
}

async function migrateAllImages() {
  console.log('='.repeat(60));
  console.log('GALLERY IMAGES MIGRATION');
  console.log('='.repeat(60));
  console.log(`Target: ${BASE_URL}`);
  console.log(`Images directory: ${IMAGES_DIR}`);
  console.log('='.repeat(60));

  // Get all image files (only lowercase .jpg)
  const imageFiles = [];
  for (let i = 1; i <= 24; i++) {
    const imagePath = path.join(IMAGES_DIR, `image${i}.jpg`);
    if (fs.existsSync(imagePath)) {
      imageFiles.push(imagePath);
    } else {
      console.warn(`⚠ Warning: image${i}.jpg not found`);
    }
  }

  console.log(`\nFound ${imageFiles.length} images to migrate\n`);

  if (imageFiles.length === 0) {
    console.error('No images found to migrate!');
    process.exit(1);
  }

  // Confirm before proceeding
  if (process.argv.includes('--confirm')) {
    console.log('Starting migration...\n');
  } else {
    console.log('⚠ DRY RUN MODE - Use --confirm flag to actually upload images');
    console.log('Command: node scripts/migrate-gallery-images.js --confirm\n');
    process.exit(0);
  }

  // Upload all images
  const results = [];
  for (let i = 0; i < imageFiles.length; i++) {
    const result = await uploadImage(imageFiles[i], i);
    results.push(result);

    // Add a small delay to avoid rate limiting
    if (i < imageFiles.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('MIGRATION SUMMARY');
  console.log('='.repeat(60));

  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  console.log(`✓ Successful: ${successful}`);
  console.log(`✗ Failed: ${failed}`);

  if (failed > 0) {
    console.log('\nFailed images:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - ${r.fileName}: ${r.error}`);
    });
  }

  console.log('='.repeat(60));
  console.log('\nMigration complete!');
  process.exit(failed > 0 ? 1 : 0);
}

// Run migration
migrateAllImages().catch(error => {
  console.error('\nFatal error:', error);
  process.exit(1);
});
