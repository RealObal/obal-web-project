import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

export async function prepareImages() {
  const manifest = {};
  await fs.mkdir('public/media',{recursive:true});
  for (const file of await fs.readdir('public')) {
    if (!/\.(jpe?g|png|webp)$/i.test(file)) continue;
    const input = path.join('public',file);
    const metadata = await sharp(input).metadata();
    const slug = path.parse(file).name.toLowerCase().replace(/[^a-z0-9]+/g,'-');
    const widths = [...new Set([480,800,1280].map(width => Math.min(width,metadata.width)))];
    const variants = [];
    for (const width of widths) {
      const filename = `${slug}-${width}.webp`;
      // Sharp strips EXIF/XMP/IPTC unless explicitly requested. Auto-orient first.
      const result = await sharp(input).rotate().resize({width,withoutEnlargement:true}).webp({quality:82}).toFile(`public/media/${filename}`);
      variants.push({src:`/media/${filename}`,width:result.width,height:result.height});
    }
    const largest = variants.at(-1);
    manifest['/'+file] = {...largest,srcSet:variants.map(item=>`${item.src} ${item.width}w`).join(', ')};
  }
  await fs.writeFile('src/media-manifest.json',JSON.stringify(manifest,null,2)+'\n');
  return manifest;
}
