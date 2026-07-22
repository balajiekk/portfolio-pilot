import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const distDirectory = resolve("dist");
const indexFile = resolve(distDirectory, "index.html");
const fallbackFiles = [
  "404.html",
  "explore/index.html",
  "my-bala/index.html",
  "bala-stocks/index.html",
  "f-and-o/index.html",
  "screener/index.html",
  "earnings/index.html",
  "investments/us-stocks/my-us-stocks/index.html",
  "orders/index.html",
  "wallet-history/index.html",
  "watchlist/index.html",
  "funds/index.html",
];

if (!existsSync(indexFile)) {
  throw new Error("Cannot create SPA fallback because dist/index.html is missing.");
}

for (const fallbackPath of fallbackFiles) {
  const fallbackFile = resolve(distDirectory, fallbackPath);
  const fallbackDirectory = resolve(fallbackFile, "..");

  mkdirSync(fallbackDirectory, { recursive: true });
  copyFileSync(indexFile, fallbackFile);
}

console.log(`Created ${fallbackFiles.length} SPA fallback files.`);
