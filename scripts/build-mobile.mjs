import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = path.join(projectRoot, 'www');
const webFiles = [
  'index.html',
  'about.html',
  'products.html',
  'services.html',
  'stores.html',
  'seo-pages.css',
  'manifest.webmanifest',
  'icon.svg',
  'sw.js',
  'capacitor-api-config.js'
];

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });

for (const file of webFiles) {
  const source = path.join(projectRoot, file);
  if (!fs.existsSync(source)) throw new Error(`Missing mobile web asset: ${file}`);
  fs.copyFileSync(source, path.join(outputDir, file));
}

console.log(`Prepared ${webFiles.length} E SHOP web assets in ${path.relative(projectRoot, outputDir)}/`);
