import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (/\.(jsx?|tsx?|css)$/.test(e.name)) yield p;
  }
}

let updated = 0;
for await (const f of walk("app")) {
  const src = await readFile(f, "utf8");
  const dst = src.replace(/(\/assets\/[^"')\s]+?)\.png/g, "$1.webp");
  if (dst !== src) {
    await writeFile(f, dst);
    updated++;
    console.log("updated:", f);
  }
}
console.log("Total files updated:", updated);
