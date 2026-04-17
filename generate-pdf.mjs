import puppeteer from 'puppeteer';
import { createServer } from 'http';
import { readFileSync } from 'fs';
import { extname, join } from 'path';

const DIR = new URL('.', import.meta.url).pathname;
const INPUT = process.argv[2] || 'tonga-humpbacks-jono-allen.html';
const OUTPUT = process.argv[3] || INPUT.replace('.html', '.pdf');

const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2',
};

// Simple static file server
const server = createServer((req, res) => {
  const path = join(DIR, req.url === '/' ? INPUT : req.url);
  try {
    const data = readFileSync(path);
    res.writeHead(200, { 'Content-Type': MIME[extname(path)] || 'application/octet-stream' });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(9222, async () => {
  console.log('Server running on :9222');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // Load the page
  await page.goto(`http://localhost:9222/${INPUT}`, {
    waitUntil: 'networkidle0',
    timeout: 60000,
  });

  // Wait for Paged.js to finish rendering
  // Paged.js adds a .pagedjs_pages class when done
  await page.waitForSelector('.pagedjs_pages', { timeout: 30000 }).catch(() => {
    console.log('Warning: pagedjs_pages not found, Paged.js may not have loaded. Printing anyway.');
  });

  // Extra wait for images to load
  await new Promise(r => setTimeout(r, 5000));

  // Get page count
  const pageCount = await page.evaluate(() => {
    const pages = document.querySelectorAll('.pagedjs_page');
    return pages.length || 'unknown (no pagedjs)';
  });
  console.log(`Paged.js rendered ${pageCount} pages`);

  // Generate PDF
  await page.pdf({
    path: join(DIR, OUTPUT),
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    preferCSSPageSize: true,
  });

  console.log(`PDF saved to ${OUTPUT}`);

  await browser.close();
  server.close();
});
