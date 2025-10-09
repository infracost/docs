import type { CustomProjectConfig } from 'lost-pixel';
import * as fs from 'fs';
import * as path from 'path';

// Load page list from generated file, or use defaults
let pages = [{ path: '/docs/', name: 'homepage' }];

const pagesFile = path.join(__dirname, 'lostpixel-pages.json');
if (fs.existsSync(pagesFile)) {
  const pagesData = fs.readFileSync(pagesFile, 'utf-8');
  pages = JSON.parse(pagesData);
}

// Determine mode based on environment variable
const mode = process.env.LOST_PIXEL_MODE || 'current';
const baseUrl = process.env.LOST_PIXEL_BASE_URL || 'http://localhost:3000';

// Configure paths based on mode
const imagePathBaseline = mode === 'baseline' ? '.lostpixel/baseline/' : '.lostpixel/baseline/';
const imagePathCurrent = mode === 'current' ? '.lostpixel/current/' : '.lostpixel/baseline/';
const generateOnly = mode === 'baseline';

export const config: CustomProjectConfig = {
  pageShots: {
    pages,
    baseUrl,
    // Hide potentially flaky elements
    mask: [{ selector: 'div[class*="announcementBar"]' }, { selector: '[class*="DocSearch"]' }],
  },
  // Generate only when creating baseline, compare when testing
  generateOnly,
  failOnDifference: !generateOnly,
  threshold: 0,
  // Dynamic paths based on mode
  imagePathBaseline,
  imagePathCurrent,
  imagePathDifference: '.lostpixel/difference/',
  // Configure browser options
  browser: 'chromium',
  // Add a delay to ensure pages are fully loaded
  waitBeforeScreenshot: 1000,
  // Disable CSS animations for consistent screenshots
  beforeScreenshot: async (page) => {
    await page.addStyleTag({
      content: `
        * {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
      `,
    });
  },
};
