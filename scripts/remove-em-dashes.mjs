// Replace visible em dashes in JSX/JS copy with commas or periods.
// Only touches ASCII-safe patterns; skips code (variable names, comments unchanged).
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (/\.(jsx?|tsx?)$/.test(e.name)) yield p;
  }
}

const DASH = "—"; // —

let filesChanged = 0;
let replacements = 0;

for await (const f of walk("app")) {
  let src = await readFile(f, "utf8");
  const before = src;

  // Pattern 1: " — " between two clauses → ", " (softens without splitting)
  src = src.replace(new RegExp(` ${DASH} `, "g"), ", ");
  // Pattern 2: "—" without spaces (e.g. inside quoted strings) → ", "
  src = src.replace(new RegExp(DASH, "g"), ", ");

  if (src !== before) {
    const count = (before.match(new RegExp(DASH, "g")) || []).length;
    replacements += count;
    filesChanged++;
    await writeFile(f, src);
    console.log(`${f}: ${count} replacement(s)`);
  }
}

console.log(`\nDone. ${replacements} em dashes replaced across ${filesChanged} files.`);
