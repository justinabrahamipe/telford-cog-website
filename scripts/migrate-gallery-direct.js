require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const fetch = require('node-fetch');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const IMAGES_DIR = path.join(__dirname, '../src/assets/photos/gallery-page');

async function uploadAndSaveImage(imagePath, index) {
  const fileName = path.basename(imagePath);

  console.log(`\n[${index + 1}/24] Processing ${fileName}...`);

  try {
    // Step 1: Upload to Vercel Blob
    const formData = new FormData();
    formData.append('file', fs.createReadStream(imagePath));

    console.log(`  → Uploading to Vercel Blob...`);
    const uploadResponse = await fetch(`${BASE_URL}/api/admin/gallery/upload`, {
      method: 'POST',
      body: formData,
    });

    const uploadData = await uploadResponse.json();

    if (!uploadResponse.ok || !uploadData.success) {
      throw new Error(uploadData.error || 'Failed to upload to Vercel Blob');
    }

    console.log(`  ✓ Uploaded to Vercel Blob`);

    // Step 2: Save to database using Prisma directly
    console.log(`  → Saving to database...`);
    const image = await prisma.galleryImage.create({
      data: {
        imageUrl: uploadData.url,
        thumbnailUrl: uploadData.url,
        title: `Gallery Image ${index + 1}`,
        description: '',
        orderIndex: index,
      },
    });

    console.log(`  ✓ Saved to database with ID: ${image.id}`);
    console.log(`  ✓ Successfully migrated ${fileName}`);

    return { success: true, fileName, url: uploadData.url };
  } catch (error) {
    console.error(`  ✗ Error migrating ${fileName}:`, error.message);
    return { success: false, fileName, error: error.message };
  }
}

async function migrateAllImages() {
  console.log('='.repeat(60));
  console.log('GALLERY IMAGES MIGRATION (Direct Prisma)');
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
    await prisma.$disconnect();
    process.exit(1);
  }

  // Confirm before proceeding
  if (process.argv.includes('--confirm')) {
    console.log('Starting migration...\n');
  } else {
    console.log('⚠ DRY RUN MODE - Use --confirm flag to actually upload images');
    console.log('Command: node scripts/migrate-gallery-direct.js --confirm\n');
    await prisma.$disconnect();
    process.exit(0);
  }

  // Upload all images
  const results = [];
  for (let i = 0; i < imageFiles.length; i++) {
    const result = await uploadAndSaveImage(imageFiles[i], i);
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

  if (successful > 0) {
    console.log('\nSuccessfully uploaded images:');
    results.filter(r => r.success).forEach((r, i) => {
      console.log(`  ${i + 1}. ${r.fileName}`);
    });
  }

  console.log('='.repeat(60));
  console.log('\nMigration complete!');

  await prisma.$disconnect();
  process.exit(failed > 0 ? 1 : 0);
}

// Run migration
migrateAllImages().catch(async (error) => {
  console.error('\nFatal error:', error);
  await prisma.$disconnect();
  process.exit(1);
});
