// One-off conversion: PNG → WebP for every image in public/assets
// Deletes the source PNG after a successful conversion.
import { readdir, stat, unlink } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const ROOT = new URL("../public/assets", import.meta.url).pathname.replace(/^\//, "");

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else yield p;
  }
}

let saved = 0;
let count = 0;
let failed = [];

for await (const file of walk(ROOT)) {
  if (!/\.png$/i.test(file)) continue;
  const target = file.replace(/\.png$/i, ".webp");
  try {
    const srcStat = await stat(file);
    // Effort 6 = best compression. quality 92 = visually lossless.
    // nearLossless for small assets keeps crispness on icons/logos.
    const isSmall = srcStat.size < 40 * 1024;
    await sharp(file)
      .webp({
        quality: 92,
        effort: 6,
        nearLossless: isSmall,
      })
      .toFile(target);
    const dstStat = await stat(target);
    await unlink(file);
    const delta = srcStat.size - dstStat.size;
    saved += delta;
    count++;
    console.log(
      `${file.replace(/\\/g, "/")} → ${(srcStat.size / 1024).toFixed(1)}KB → ${(dstStat.size / 1024).toFixed(1)}KB  (-${(delta / 1024).toFixed(1)}KB, ${((delta / srcStat.size) * 100).toFixed(1)}%)`
    );
  } catch (err) {
    failed.push({ file, err: err.message });
    console.error("FAIL", file, err.message);
  }
}

console.log(`\nConverted ${count} files, saved ${(saved / 1024 / 1024).toFixed(2)} MB total`);
if (failed.length) {
  console.error("\nFailures:");
  for (const f of failed) console.error(" -", f.file, f.err);
}
