const { PrismaClient } = require('@prisma/client');
const { put } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

const images = [
  {
    name: 'Pr. Biju Cherian',
    localPath: path.join(__dirname, '../public/leaders/pr_biju_cherian.jpg'),
    fileName: 'pr_biju_cherian.jpg',
  },
  {
    name: 'Pr. Rejoy Stephan',
    localPath: path.join(__dirname, '../public/leaders/br_rejoy_stephan.jpg'),
    fileName: 'br_rejoy_stephan.jpg',
  },
  {
    name: 'Sis. Suja Cherian',
    localPath: path.join(__dirname, '../public/leaders/sr_suja_biju.jpg'),
    fileName: 'sr_suja_biju.jpg',
  },
  {
    name: 'Sis. Neethu Mary Mathew',
    localPath: path.join(__dirname, '../public/leaders/sr_neethu_rejoy.jpg'),
    fileName: 'sr_neethu_rejoy.jpg',
  },
];

async function main() {
  console.log('Starting image upload to Vercel Blob...\n');

  for (const image of images) {
    try {
      console.log(`Processing: ${image.name}`);

      // Check if file exists
      if (!fs.existsSync(image.localPath)) {
        console.log(`  ❌ File not found: ${image.localPath}`);
        continue;
      }

      // Read file
      const fileBuffer = fs.readFileSync(image.localPath);
      const file = new File([fileBuffer], image.fileName, { type: 'image/jpeg' });

      // Upload to Vercel Blob
      console.log(`  ⬆️  Uploading to blob storage...`);
      const blob = await put(`leaders/${image.fileName}`, file, {
        access: 'public',
      });

      console.log(`  ✅ Uploaded: ${blob.url}`);

      // Update database
      const leader = await prisma.leader.findFirst({
        where: { name: image.name },
      });

      if (leader) {
        await prisma.leader.update({
          where: { id: leader.id },
          data: { imageUrl: blob.url },
        });
        console.log(`  ✅ Database updated\n`);
      } else {
        console.log(`  ⚠️  Leader not found in database\n`);
      }
    } catch (error) {
      console.error(`  ❌ Error processing ${image.name}:`, error.message, '\n');
    }
  }

  console.log('Migration complete!');
}

main()
  .catch((e) => {
    console.error('Error during migration:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
