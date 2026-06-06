const fs = require("node:fs");
const path = require("node:path");

const distDir = path.resolve(__dirname, "..", "dist");
const indexFile = path.join(distDir, "index.html");

if (!fs.existsSync(indexFile)) {
  console.error("Build verification failed: dist/index.html is missing.");
  process.exit(1);
}

const indexHtml = fs.readFileSync(indexFile, "utf8");
const forbidden = ["/styles.css", "/three.min.js", "three.min.js", 'href="styles.css"'];
const hits = forbidden.filter((pattern) => indexHtml.includes(pattern));

if (hits.length) {
  console.error("Build verification failed: dist/index.html contains legacy asset references:");
  hits.forEach((pattern) => console.error(`  - ${pattern}`));
  process.exit(1);
}

const assetsDir = path.join(distDir, "assets");
if (!fs.existsSync(assetsDir)) {
  console.error("Build verification failed: dist/assets is missing.");
  process.exit(1);
}

const referencedAssets = [...indexHtml.matchAll(/\/assets\/([^"'>\s]+)/g)].map((match) => match[1]);
const missingAssets = referencedAssets.filter((asset) => !fs.existsSync(path.join(assetsDir, asset)));

if (missingAssets.length) {
  console.error("Build verification failed: dist/index.html references missing asset files:");
  missingAssets.forEach((asset) => console.error(`  - assets/${asset}`));
  process.exit(1);
}

console.log("Dist output verified.");
