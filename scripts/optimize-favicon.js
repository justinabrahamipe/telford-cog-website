const sharp = require('sharp');
const path = require('path');

async function optimizeFavicon() {
  const inputPath = path.join(__dirname, '../public/favicon.png'); // Use higher res original
  const outputPath = path.join(__dirname, '../app/icon.png');

  console.log('Optimizing favicon for maximum visibility...');

  try {
    // Read the image
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    console.log(`Original size: ${metadata.width}x${metadata.height}`);

    // Trim and scale with balanced padding to prevent cropping
    await image
      .trim({ threshold: 20 }) // Trim whitespace
      .resize(480, 480, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 },
        position: 'center'
      })
      .extend({
        top: 16,
        bottom: 16,
        left: 16,
        right: 16,
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .resize(512, 512)
      .png()
      .toFile(outputPath);

    console.log(`✓ Created maximized favicon at: ${outputPath}`);
    console.log('  The logo now fills the maximum space possible');

  } catch (error) {
    console.error('Error optimizing favicon:', error);
    process.exit(1);
  }
}

optimizeFavicon();
