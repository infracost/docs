/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

/**
 * Generate a list of pages from sitemap.xml for visual regression testing
 */
function extractSitemapPathnames() {
  const sitemapPath = path.join(__dirname, '..', 'build', 'sitemap.xml');

  if (!fs.existsSync(sitemapPath)) {
    throw new Error(`Sitemap not found at ${sitemapPath}. Please run 'npm run build' first.`);
  }

  const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
  const $ = cheerio.load(sitemap, { xmlMode: true });
  const pages = [];

  $('loc').each((_, loc) => {
    const url = $(loc).text();
    // Convert full URLs to pathnames
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;

    // Create a safe name for the screenshot
    const name =
      pathname
        .replace(/^\/docs\//, '')
        .replace(/\/$/, '')
        .replace(/\//g, '-') || 'homepage';

    pages.push({
      path: pathname,
      name,
    });
  });

  return pages;
}

function filterImportantPages(allPages) {
  // Filter to include important pages
  // Customize this based on your needs
  return allPages.filter((page) => {
    const { path: pathname } = page;

    // Include homepage
    if (pathname === '/docs/') return true;

    // Include top-level sections
    if (pathname.match(/^\/docs\/[^\/]+\/$/)) return true;

    // Include specific important sections
    if (
      pathname.includes('/get_started') ||
      pathname.includes('/features') ||
      pathname.includes('/integrations') ||
      pathname.includes('/supported_resources')
    ) {
      return true;
    }

    return false;
  });
}

function main() {
  const allPages = extractSitemapPathnames();
  const importantPages = filterImportantPages(allPages);

  // Limit to a reasonable number to avoid excessive CI time
  const limitedPages = importantPages.slice(0, 30);

  console.log(`Found ${allPages.length} total pages in sitemap`);
  console.log(`Filtered to ${importantPages.length} important pages`);
  console.log(`Limited to ${limitedPages.length} pages for testing`);

  // Write the configuration to a file that Lost Pixel can use
  const configPath = path.join(__dirname, '..', 'lostpixel-pages.json');
  fs.writeFileSync(configPath, JSON.stringify(limitedPages, null, 2));

  console.log(`\nWrote page list to ${configPath}`);
  console.log('\nSample pages:');
  limitedPages.slice(0, 5).forEach((page) => {
    console.log(`  - ${page.path} (${page.name})`);
  });
}

main();
