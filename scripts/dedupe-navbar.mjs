// Remove duplicate <Navbar> + <ContactModal> from project detail pages.
// NavbarWrapper already renders both at the app layout level, so per-page
// copies cause overlapping hover states and doubled event handlers.
import { readFile, writeFile } from "node:fs/promises";
import { glob } from "node:fs/promises";

const FILES = [
  "app/projects/fixtrack/page.jsx",
  "app/projects/fixwork/page.jsx",
  "app/projects/treffix/page.jsx",
  "app/projects/bitrack/page.jsx",
  "app/projects/bitrack-dashboard/page.jsx",
  "app/projects/evermore/page.jsx",
];

for (const f of FILES) {
  let src;
  try {
    src = await readFile(f, "utf8");
  } catch (e) {
    console.log("skip:", f, "(not found)");
    continue;
  }
  const before = src;

  // Drop import lines for Navbar + ContactModal
  src = src.replace(/^\s*import\s+Navbar\s+from\s+["'][^"']+Navbar\/Navbar["'];?\s*\n/m, "");
  src = src.replace(/^\s*import\s+ContactModal\s+from\s+["'][^"']+ContactModal\/ContactModal["'];?\s*\n/m, "");

  // Drop the state hook
  src = src.replace(/^\s*const \[modalOpen, setModalOpen\] = useState\(false\);\s*\n/m, "");

  // Drop <Navbar ... /> JSX line
  src = src.replace(/^\s*<Navbar[^/]*\/>\s*\n/m, "");

  // Drop <ContactModal ... /> JSX line
  src = src.replace(/^\s*<ContactModal[^/]*\/>\s*\n/m, "");

  if (src === before) {
    console.log("no change:", f);
  } else {
    await writeFile(f, src);
    console.log("cleaned:", f);
  }
}
