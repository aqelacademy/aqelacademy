// Builds the WebP files that next/image serves (src/lib/image-loader.ts): every image in src/assets/images at each
// width next/image asks for (src/lib/image-sizes.json), never larger than the original. They are plain static files
// in public/img, cached at Cloudflare's edge for a year (public/_headers), so no image is resized per request.
// Run `npm run images` after adding or changing an image, and commit public/img and src/lib/image-manifest.json.
import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import sizes from "../src/lib/image-sizes.json" with { type: "json" };

const SOURCE_DIR = "src/assets/images";
const OUTPUT_DIR = "public/img";
const MANIFEST = "src/lib/image-manifest.json";
const QUALITY = 80;
const widths = [...sizes.imageSizes, ...sizes.deviceSizes].sort((a, b) => a - b);

async function* imagesIn(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* imagesIn(file);
    else if (/\.(jpe?g|png)$/i.test(entry.name)) yield file;
  }
}

await rm(OUTPUT_DIR, { recursive: true, force: true });
await mkdir(OUTPUT_DIR, { recursive: true });

const manifest = {};
for await (const file of imagesIn(SOURCE_DIR)) {
  // The loader finds an image by its file name, so names must be unique across folders.
  const name = path.basename(file).split(".")[0];
  if (manifest[name]) throw new Error(`Two images are named "${name}"; rename one.`);

  const source = await readFile(file);
  const hash = createHash("sha256").update(source).digest("hex").slice(0, 10);
  const { width: originalWidth } = await sharp(source).metadata();
  const outputWidths = [...widths.filter((width) => width < originalWidth), originalWidth];

  for (const width of outputWidths) {
    await sharp(source)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(path.join(OUTPUT_DIR, `${name}.${hash}-${width}.webp`));
  }
  manifest[name] = { hash, widths: outputWidths };
  console.log(`${file}: ${outputWidths.join(", ")}`);
}

await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
