// Image optimization script using sharp
// Run with: node scripts/optimize-images.mjs
import sharp from 'sharp';
import { existsSync, renameSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

async function compress(src, dest, options = {}) {
  const srcPath = join(publicDir, src);
  const destPath = join(publicDir, dest);
  const inPlace = srcPath === destPath;
  const writePath = inPlace ? destPath + '.tmp' : destPath;

  if (!existsSync(srcPath)) {
    console.warn(`Skipping ${src} — file not found`);
    return;
  }

  const img = sharp(srcPath);
  if (options.width || options.height) {
    img.resize(options.width, options.height, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } });
  }
  if (dest.endsWith('.webp')) {
    img.webp({ quality: options.quality ?? 85 });
  } else if (dest.endsWith('.png')) {
    img.png({ compressionLevel: 9, quality: options.quality ?? 85 });
  } else if (dest.endsWith('.jpg') || dest.endsWith('.jpeg')) {
    img.jpeg({ quality: options.quality ?? 85 });
  }

  const info = await img.toFile(writePath);
  if (inPlace) renameSync(writePath, destPath);
  console.log(`✓ ${src} → ${dest} (${(info.size / 1024).toFixed(0)}KB)`);
}

// Generate properly-sized PWA icons
await compress('logo2.png', 'logo2-192.png', { width: 192, height: 192 });
await compress('logo2.png', 'logo2-512.png', { width: 512, height: 512 });

// Compress large images (in-place)
await compress('restcabana.png', 'restcabana.png', { quality: 82 });
await compress('projects/web.png', 'projects/web.png', { quality: 82 });

console.log('\nDone! Update manifest.json to reference logo2-192.png and logo2-512.png.');
