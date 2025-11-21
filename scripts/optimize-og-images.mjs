import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, basename } from 'path';

const imagesToOptimize = [
  'public/images/government/hero_2.png',
  'public/images/about/hero.png',
  'public/images/government/contact.png',
  'public/images/divisions/solutions-hero.png',
  'public/images/jewelry/jewelry-hero.png',
  'public/images/promotional/promotional-hero.png',
];

const outputDir = 'public/images/og';

async function optimizeImages() {
  // Create output directory
  await mkdir(outputDir, { recursive: true });

  console.log('🖼️  Optimizing OG images for WhatsApp...\n');

  for (const imagePath of imagesToOptimize) {
    const filename = basename(imagePath, '.png') + '.jpg';
    const outputPath = join(outputDir, filename);

    try {
      const info = await sharp(imagePath)
        .resize(1200, 630, {
          fit: 'cover',
          position: 'center',
        })
        .jpeg({
          quality: 75,
          progressive: true,
        })
        .toFile(outputPath);

      const sizeMB = (info.size / 1024 / 1024).toFixed(2);
      const sizeKB = (info.size / 1024).toFixed(0);
      
      console.log(`✅ ${filename}`);
      console.log(`   Original: ${imagePath}`);
      console.log(`   Output: ${outputPath}`);
      console.log(`   Size: ${sizeKB}KB (${sizeMB}MB)`);
      console.log(`   Dimensions: ${info.width}x${info.height}\n`);
    } catch (error) {
      console.error(`❌ Error optimizing ${imagePath}:`, error.message);
    }
  }

  console.log('✨ Done! All images optimized for WhatsApp compatibility.');
}

optimizeImages();
