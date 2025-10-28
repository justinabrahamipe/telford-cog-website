require('dotenv').config({ path: '.env.local' });

const { PrismaClient } = require('@prisma/client');

// Use production database URL from environment
const DATABASE_URL = process.env.PRISMA_DATABASE_URL;

if (!DATABASE_URL) {
  console.error('Error: PRISMA_DATABASE_URL environment variable not found');
  console.error('Make sure it is set in your .env.local file');
  process.exit(1);
}

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: DATABASE_URL
    }
  }
});

// These are the images that were already uploaded to Vercel Blob
// We just need to create the database records in production
const images = [
  { url: 'https://5zlaa2jonbkrifls.public.blob.vercel-storage.com/image1-TxI07qqxDQZ7kfy2U8J6LGjvhNvVIN.jpg', order: 0 },
  { url: 'https://5zlaa2jonbkrifls.public.blob.vercel-storage.com/image2-LRpP0Z2XLTEJYThKvNy1NrDuagbUd0.jpg', order: 1 },
  { url: 'https://5zlaa2jonbkrifls.public.blob.vercel-storage.com/image3-3AX51Mx0zkKwjpLXwjY4nrLqeOJbZ6.jpg', order: 2 },
  { url: 'https://5zlaa2jonbkrifls.public.blob.vercel-storage.com/image4-hBm3CHmOlqA5txMK7TATMGERDYXRUz.jpg', order: 3 },
  { url: 'https://5zlaa2jonbkrifls.public.blob.vercel-storage.com/image5-ks6Sqpd8EEEwDjaLz23W1qy7xevqHz.jpg', order: 4 },
  { url: 'https://5zlaa2jonbkrifls.public.blob.vercel-storage.com/image6-pg6YiS4UWthSa1tZOdSi4762JGDpFa.jpg', order: 5 },
  { url: 'https://5zlaa2jonbkrifls.public.blob.vercel-storage.com/image7-S21eEIcNRxldvpiSkmkvmVfsEhQAGB.jpg', order: 6 },
  { url: 'https://5zlaa2jonbkrifls.public.blob.vercel-storage.com/image8-Y2zIsy8Jy4LGdOoXnCNzghHFBosJ5l.jpg', order: 7 },
  { url: 'https://5zlaa2jonbkrifls.public.blob.vercel-storage.com/image9-QgZ1hH3SwjzUuCRnfMH4xbC1xlProW.jpg', order: 8 },
  { url: 'https://5zlaa2jonbkrifls.public.blob.vercel-storage.com/image10-B0wdzCWLgtnfoqoTvwkhlAzawqpIc8.jpg', order: 9 },
  { url: 'https://5zlaa2jonbkrifls.public.blob.vercel-storage.com/image11-oKqqDo8RrKBnG5p2Rnz2IeprEPKp7M.jpg', order: 10 },
  { url: 'https://5zlaa2jonbkrifls.public.blob.vercel-storage.com/image12-ZTgmuqgySSa5CDTtuZuD2rzMJNpkML.jpg', order: 11 },
  { url: 'https://5zlaa2jonbkrifls.public.blob.vercel-storage.com/image13-AS9I50lD4X0tJT2LWjuVMooRw4SKWP.jpg', order: 12 },
  { url: 'https://5zlaa2jonbkrifls.public.blob.vercel-storage.com/image14-FT3vzMssIu8oVZB6vq4aEC4Q6KiP88.jpg', order: 13 },
  { url: 'https://5zlaa2jonbkrifls.public.blob.vercel-storage.com/image15-wNXRStU9xtfgmC7CjzIquHaYZrEwea.jpg', order: 14 },
  { url: 'https://5zlaa2jonbkrifls.public.blob.vercel-storage.com/image16-bB4ZUil5e59heKefoIoRT31SqlOd2H.jpg', order: 15 },
  { url: 'https://5zlaa2jonbkrifls.public.blob.vercel-storage.com/image17-M6X3tBwujq4X6bejA4INepETLXbfuF.jpg', order: 16 },
  { url: 'https://5zlaa2jonbkrifls.public.blob.vercel-storage.com/image18-6uMfa2ek9J67FjjKhlCvXXW29Wqrkg.jpg', order: 17 },
  { url: 'https://5zlaa2jonbkrifls.public.blob.vercel-storage.com/image19-qcpgjRppowVNDoQGNmKXOPFhv3G5xc.jpg', order: 18 },
  { url: 'https://5zlaa2jonbkrifls.public.blob.vercel-storage.com/image20-o7XJ8NM50JcIwLQAERJw5U7eFtu1WM.jpg', order: 19 },
  { url: 'https://5zlaa2jonbkrifls.public.blob.vercel-storage.com/image21-z13HlbC8pgQDCkPT41bsQzG7cPQAxY.jpg', order: 20 },
  { url: 'https://5zlaa2jonbkrifls.public.blob.vercel-storage.com/image22-ABM8s1XxXnVMlcmNiq9uOtqPlF0Hmu.jpg', order: 21 },
  { url: 'https://5zlaa2jonbkrifls.public.blob.vercel-storage.com/image23-5iln4oFfXp0RZognmLFNT8xv5aPRsB.jpg', order: 22 },
  { url: 'https://5zlaa2jonbkrifls.public.blob.vercel-storage.com/image24-6nX42K2HDRPVgUAPboUhTMaKxJT1iz.jpg', order: 23 },
];

async function migrateToProduction() {
  console.log('='.repeat(60));
  console.log('PRODUCTION GALLERY MIGRATION');
  console.log('='.repeat(60));
  console.log(`Database: ${DATABASE_URL.split('@')[1] || 'Production DB'}`);
  console.log(`Images to migrate: ${images.length}`);
  console.log('='.repeat(60));

  // Confirm before proceeding
  if (!process.argv.includes('--confirm')) {
    console.log('\n⚠ DRY RUN MODE - Use --confirm flag to actually migrate');
    console.log('Command: node scripts/migrate-gallery-production.js --confirm\n');
    console.log('This will create database records for:');
    images.forEach((img, i) => {
      console.log(`  ${i + 1}. Gallery Image ${i + 1}`);
    });
    await prisma.$disconnect();
    process.exit(0);
  }

  console.log('\nStarting migration...\n');

  try {
    // Check if gallery is empty
    const existingCount = await prisma.galleryImage.count();

    if (existingCount > 0) {
      console.log(`⚠ Warning: Found ${existingCount} existing images in production database`);
      console.log('This script will add to them. If you want to replace them, run:');
      console.log('  node scripts/clear-gallery.js --confirm (with production DB URL)');
      console.log('\nContinuing in 3 seconds...\n');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }

    const results = [];

    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const imageNum = i + 1;

      try {
        console.log(`[${imageNum}/24] Creating record for Gallery Image ${imageNum}...`);

        const created = await prisma.galleryImage.create({
          data: {
            imageUrl: img.url,
            thumbnailUrl: img.url,
            title: `Gallery Image ${imageNum}`,
            description: '',
            orderIndex: img.order,
          },
        });

        console.log(`  ✓ Created with ID: ${created.id}`);
        results.push({ success: true, order: imageNum });

      } catch (error) {
        console.error(`  ✗ Error: ${error.message}`);
        results.push({ success: false, order: imageNum, error: error.message });
      }

      // Small delay between inserts
      if (i < images.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 200));
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
        console.log(`  - Gallery Image ${r.order}: ${r.error}`);
      });
    }

    console.log('='.repeat(60));
    console.log('\n✓ Production migration complete!');
    console.log(`\nYou can now view your gallery at: https://telford-cog.org/gallery`);

    await prisma.$disconnect();
    process.exit(failed > 0 ? 1 : 0);

  } catch (error) {
    console.error('\nFatal error:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

migrateToProduction().catch(async (error) => {
  console.error('\nUnexpected error:', error);
  await prisma.$disconnect();
  process.exit(1);
});
