import { test, expect } from '@playwright/test';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';

// Extract pathnames from the sitemap.xml
function extractSitemapPathnames(): string[] {
  const sitemapPath = path.join(__dirname, '..', 'build', 'sitemap.xml');

  if (!fs.existsSync(sitemapPath)) {
    throw new Error(`Sitemap not found at ${sitemapPath}. Did you run 'npm run build'?`);
  }

  const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
  const $ = cheerio.load(sitemap, { xmlMode: true });
  const urls: string[] = [];

  $('loc').each((_, loc) => {
    const url = $(loc).text();
    // Convert full URLs to pathnames
    const urlObj = new URL(url);
    urls.push(urlObj.pathname);
  });

  return urls;
}

// Filter to a reasonable subset of pages
function getTestPages(): string[] {
  const allPages = extractSitemapPathnames();

  // Limit to a subset to keep test duration reasonable
  // You can customize this filter based on your needs
  const importantPages = allPages.filter((page) => {
    // Include homepage and main section pages
    return (
      page === '/docs/' ||
      page.match(/^\/docs\/[^\/]+\/$/) || // Top-level docs sections
      page.includes('/get_started') ||
      page.includes('/features') ||
      page.includes('/integrations')
    );
  });

  // Limit to first 20 pages to avoid excessive test time
  return importantPages.slice(0, 20);
}

const pages = getTestPages();

for (const pathname of pages) {
  test(`Screenshot ${pathname}`, async ({ page }) => {
    // Navigate to the page
    await page.goto(pathname);

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Hide potentially flaky elements
    await page.addStyleTag({
      content: `
        /* Hide announcement bar which might have dynamic content */
        div[class*="announcementBar"] {
          display: none !important;
        }
        /* Hide any elements with animations */
        * {
          animation-duration: 0s !important;
          transition-duration: 0s !important;
        }
      `,
    });

    // Wait a bit for any remaining content to settle
    await page.waitForTimeout(500);

    // Take a full-page screenshot
    const screenshotPath = path.join(
      __dirname,
      '..',
      '.lostpixel',
      'screenshots',
      `${pathname.replace(/\//g, '-')}.png`,
    );

    await page.screenshot({
      path: screenshotPath,
      fullPage: true,
    });

    // Basic assertion that page loaded
    await expect(page.locator('body')).toBeVisible();
  });
}
