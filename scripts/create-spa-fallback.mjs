import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const distDirectory = resolve("dist");
const indexFile = resolve(distDirectory, "index.html");
const fallbackFile = resolve(distDirectory, "404.html");

if (!existsSync(indexFile)) {
  throw new Error("Cannot create SPA fallback because dist/index.html is missing.");
}

copyFileSync(indexFile, fallbackFile);
console.log("Created dist/404.html SPA fallback.");
