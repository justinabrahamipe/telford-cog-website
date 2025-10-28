const fetch = require('node-fetch');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

async function clearGallery() {
  console.log('='.repeat(60));
  console.log('CLEARING GALLERY DATABASE');
  console.log('='.repeat(60));
  console.log(`Target: ${BASE_URL}`);
  console.log('='.repeat(60));

  try {
    // Get all gallery images
    console.log('\n1. Fetching all gallery images...');
    const response = await fetch(`${BASE_URL}/api/gallery`);
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error('Failed to fetch gallery images');
    }

    const images = data.images || [];
    console.log(`   Found ${images.length} images to delete`);

    if (images.length === 0) {
      console.log('\n✓ Gallery is already empty!');
      return;
    }

    // Confirm before proceeding
    if (!process.argv.includes('--confirm')) {
      console.log('\n⚠ DRY RUN MODE - Use --confirm flag to actually delete images');
      console.log('Command: node scripts/clear-gallery.js --confirm\n');
      console.log('Images that would be deleted:');
      images.forEach((img, i) => {
        console.log(`  ${i + 1}. ${img.title} (ID: ${img.id})`);
      });
      return;
    }

    // Delete all images
    console.log('\n2. Deleting images...');
    let deleted = 0;
    let failed = 0;

    for (const image of images) {
      try {
        const deleteResponse = await fetch(`${BASE_URL}/api/admin/gallery/${image.id}`, {
          method: 'DELETE',
        });

        if (deleteResponse.ok) {
          console.log(`   ✓ Deleted: ${image.title} (ID: ${image.id})`);
          deleted++;
        } else {
          console.error(`   ✗ Failed to delete: ${image.title} (ID: ${image.id})`);
          failed++;
        }
      } catch (error) {
        console.error(`   ✗ Error deleting ${image.title}:`, error.message);
        failed++;
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    console.log('\n' + '='.repeat(60));
    console.log('SUMMARY');
    console.log('='.repeat(60));
    console.log(`✓ Deleted: ${deleted}`);
    console.log(`✗ Failed: ${failed}`);
    console.log('='.repeat(60));

    if (deleted > 0) {
      console.log('\n✓ Gallery cleared successfully!');
    }

  } catch (error) {
    console.error('\nError:', error.message);
    process.exit(1);
  }
}

clearGallery();
