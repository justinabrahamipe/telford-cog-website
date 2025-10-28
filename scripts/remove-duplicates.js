require('dotenv').config({ path: '.env.local' });

const { PrismaClient } = require('@prisma/client');

// Use production database URL from environment
const DATABASE_URL = process.env.PRISMA_DATABASE_URL;

if (!DATABASE_URL) {
  console.error('Error: PRISMA_DATABASE_URL environment variable not found');
  process.exit(1);
}

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: DATABASE_URL
    }
  }
});

async function removeDuplicates() {
  console.log('='.repeat(60));
  console.log('REMOVING DUPLICATE GALLERY IMAGES');
  console.log('='.repeat(60));
  console.log(`Database: ${DATABASE_URL.split('@')[1] || 'Production DB'}`);
  console.log('='.repeat(60));

  try {
    // Get all gallery images
    console.log('\n1. Fetching all gallery images...');
    const allImages = await prisma.galleryImage.findMany({
      orderBy: { id: 'asc' }
    });

    console.log(`   Found ${allImages.length} total images`);

    // Identify duplicates (IDs 1-24 are the old ones)
    const duplicates = allImages.filter(img => img.id >= 1 && img.id <= 24);
    const keepers = allImages.filter(img => img.id >= 25);

    console.log(`   - Old images to delete: ${duplicates.length} (IDs 1-24)`);
    console.log(`   - New images to keep: ${keepers.length} (IDs 25-48)`);

    if (duplicates.length === 0) {
      console.log('\n✓ No duplicates found!');
      await prisma.$disconnect();
      return;
    }

    // Confirm before proceeding
    if (!process.argv.includes('--confirm')) {
      console.log('\n⚠ DRY RUN MODE - Use --confirm flag to actually delete duplicates');
      console.log('Command: node scripts/remove-duplicates.js --confirm\n');
      console.log('Images that would be deleted:');
      duplicates.slice(0, 5).forEach(img => {
        console.log(`  ID ${img.id}: ${img.title}`);
      });
      if (duplicates.length > 5) {
        console.log(`  ... and ${duplicates.length - 5} more`);
      }
      await prisma.$disconnect();
      process.exit(0);
    }

    console.log('\n2. Deleting duplicate images...');

    let deleted = 0;
    let failed = 0;

    for (const image of duplicates) {
      try {
        await prisma.galleryImage.delete({
          where: { id: image.id }
        });
        console.log(`   ✓ Deleted ID ${image.id}: ${image.title}`);
        deleted++;
      } catch (error) {
        console.error(`   ✗ Failed to delete ID ${image.id}: ${error.message}`);
        failed++;
      }

      // Small delay
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Verify final count
    const finalCount = await prisma.galleryImage.count();

    console.log('\n' + '='.repeat(60));
    console.log('CLEANUP SUMMARY');
    console.log('='.repeat(60));
    console.log(`✓ Deleted: ${deleted}`);
    console.log(`✗ Failed: ${failed}`);
    console.log(`📊 Final count: ${finalCount} images`);
    console.log('='.repeat(60));

    if (deleted > 0) {
      console.log('\n✓ Duplicates removed successfully!');
      console.log(`\nYour gallery now has ${finalCount} unique images.`);
      console.log(`View at: https://telford-cog.org/gallery`);
    }

    await prisma.$disconnect();
    process.exit(failed > 0 ? 1 : 0);

  } catch (error) {
    console.error('\nError:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

removeDuplicates().catch(async (error) => {
  console.error('\nUnexpected error:', error);
  await prisma.$disconnect();
  process.exit(1);
});
