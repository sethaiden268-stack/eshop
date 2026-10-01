import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = path.join(projectRoot, 'web');
const webFiles = [
  'index.html',
  'about.html',
  'products.html',
  'services.html',
  'stores.html',
  'seo-pages.css',
  'manifest.webmanifest',
  'icon.svg',
  'robots.txt',
  'sitemap.xml'
];

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });

for (const file of webFiles) {
  const source = path.join(projectRoot, file);
  if (!fs.existsSync(source)) throw new Error(`Missing web asset: ${file}`);
  fs.copyFileSync(source, path.join(outputDir, file));
}

const serviceWorker = fs.readFileSync(path.join(projectRoot, 'sw.js'), 'utf8')
  .replace('eshop-shell-v2', 'eshop-web-shell-v1');
fs.writeFileSync(path.join(outputDir, 'sw.js'), serviceWorker);

fs.writeFileSync(path.join(outputDir, 'web-api-config.js'), `// Optional API origin for a separately hosted E SHOP Worker.\nwindow.ESHOP_API_BASE = window.ESHOP_API_BASE || '';\n`);
fs.writeFileSync(path.join(outputDir, 'README.md'), `# E SHOP web version\n\nThis folder contains the browser/PWA version of E SHOP only. It does not include Capacitor, Android, iOS, or native project files.\n\nOpen \`index.html\` through a web server for full PWA and API behavior. Set \`window.ESHOP_API_BASE\` in \`web-api-config.js\` when the Worker API is hosted on another origin.\n`);

console.log(`Prepared ${webFiles.length + 3} browser-only E SHOP assets in web/`);
