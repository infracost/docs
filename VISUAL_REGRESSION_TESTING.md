# Visual Regression Testing

This project uses [Lost Pixel](https://github.com/lost-pixel/lost-pixel) for automated visual regression testing, inspired by the [Docusaurus blog post on visual regression testing](https://docusaurus.io/blog/upgrading-frontend-dependencies-with-confidence-using-visual-regression-testing).

## Overview

Visual regression testing helps detect unintended visual changes when:

- Upgrading frontend dependencies (React, Docusaurus, etc.)
- Modifying CSS or component styles
- Updating documentation content
- Changing theme configuration

The testing pipeline automatically:

1. Builds the documentation site from your current branch
2. Builds the documentation site from the `master` branch
3. Extracts URLs from the sitemap
4. Takes full-page screenshots of important pages from both versions
5. Compares screenshots between the two branches
6. Reports any visual differences

**Note**: This implementation does NOT store baseline images in the repository. Instead, baselines are generated on-the-fly from the `master` branch, making it easy to keep baselines up-to-date without committing large image files.

## Running Tests Locally

### Prerequisites

```bash
# Install dependencies (already done if you've run npm install)
npm install

# Install Playwright browsers (Chromium)
# Note: We use Playwright 1.47.2 to match Lost Pixel's dependency
npx playwright@1.47.2 install chromium
```

### Run Visual Regression Tests

```bash
# Compare current branch against master
npm run visual:test
```

This script will:

1. Build your current branch and generate screenshots
2. Checkout and build the `master` branch
3. Generate screenshots from `master`
4. Compare the two sets of screenshots
5. Report any differences

The script handles all the complexity of:

- Starting/stopping development servers
- Building both branches
- Running Lost Pixel in the correct modes
- Cleaning up temporary files

### Reviewing Results

After running the tests, you can review the results in:

- `.lostpixel/baseline/` - Screenshots from `master` branch
- `.lostpixel/current/` - Screenshots from your current branch
- `.lostpixel/difference/` - Highlighted differences (only created if differences exist)

These directories are gitignored and can be safely deleted.

## GitHub Actions Workflow

The visual regression workflow runs automatically on pull requests to the `master` branch.

### What the Workflow Does

1. **Builds Current PR**: Builds the site from the PR branch and captures screenshots
2. **Builds Master Baseline**: Checks out and builds the `master` branch in a separate directory
3. **Generates Screenshots**: Takes screenshots of both versions on different ports
4. **Compares Images**: Detects visual differences using Lost Pixel
5. **Reports Results**: Comments on the PR with results and uploads artifacts
6. **No Storage Required**: All images are generated on-the-fly; nothing is committed

### Reviewing Visual Differences

When differences are detected:

1. Check the PR comment for a summary
2. Download the `visual-regression-results` artifact from the workflow run
3. Review files in:
   - `.lostpixel/difference/` - Highlighted differences
   - `.lostpixel/current/` - Screenshots from your PR
   - `.lostpixel/baseline/` - Screenshots from master

### Approving Visual Changes

If the visual changes are intentional:

**No action is required!** Since baselines are generated from `master` on each run:

- Visual changes in your PR are expected when updating styles, layouts, or content
- Review the differences to ensure they match your intentions
- Once your PR is merged to `master`, it becomes the new baseline automatically
- Future PRs will be compared against your merged changes

## Configuration

### Lost Pixel Config

The main configuration is in `lostpixel.config.ts`:

- **Pages**: Dynamically loaded from `lostpixel-pages.json` (generated from sitemap)
- **Mode**: Controlled by `LOST_PIXEL_MODE` environment variable (`baseline` or `current`)
- **Base URL**: Configurable via `LOST_PIXEL_BASE_URL` for testing different servers
- **Masking**: Hides flaky elements like announcement bars and search
- **Before Screenshot**: Disables CSS animations for consistency
- **Storage**: Images stored in `.lostpixel/` (gitignored, not committed)

### Page Selection

The `scripts/generate-visual-test-pages.js` script filters pages from the sitemap:

- Includes homepage and top-level sections
- Prioritizes important pages (features, integrations, etc.)
- Limits to ~30 pages to keep CI time reasonable

To test more/fewer pages, edit the filter logic in this script.

### Playwright Config

The `playwright.config.ts` provides additional test configuration:

- Browser: Chromium
- Server: Auto-starts `npm run serve`
- Retries: 2 retries in CI, 0 locally
- Timeout: 120 seconds for server startup

## Troubleshooting

### "Executable doesn't exist" or Chromium Version Mismatch

Lost Pixel uses Playwright 1.47.2 internally. Make sure to install the matching Chromium version:

```bash
npx playwright@1.47.2 install chromium
```

If you've installed a different version of Playwright globally or in another project, this can cause conflicts.

### "Sitemap not found" Error

Make sure to build the site first:

```bash
npm run build
```

### Flaky Tests Due to Animations

Add the selector to the mask list in `lostpixel.config.ts`:

```typescript
mask: [
  { selector: 'div[class*="announcementBar"]' },
  { selector: '[class*="DocSearch"]' },
  { selector: '.your-animated-element' }, // Add here
],
```

### Test Timeout Issues

Increase `waitBeforeScreenshot` in `lostpixel.config.ts`:

```typescript
waitBeforeScreenshot: 2000, // Increase from 1000ms
```

### Too Many Pages Being Tested

Reduce the limit in `scripts/generate-visual-test-pages.js`:

```javascript
const limitedPages = importantPages.slice(0, 10); // Reduce from 30
```

## Best Practices

1. **Review All Differences**: Always review the diff images before merging PRs with visual changes
2. **Limit Pages**: Test critical pages to keep CI time reasonable (~30 pages by default)
3. **Hide Flaky Elements**: Mask dynamic content that changes frequently (announcement bars, search, etc.)
4. **Disable Animations**: Animations are automatically disabled for consistent screenshots
5. **Test Locally First**: Run `npm run visual:test` locally before pushing to catch issues early

## CI Workflow Triggers

The workflow runs on:

- Pull requests to `master`
- Manual trigger via GitHub Actions UI (`workflow_dispatch`)

To prevent excessive runs, the workflow uses concurrency control to cancel in-progress runs when new commits are pushed.

## Resources

- [Lost Pixel Documentation](https://docs.lost-pixel.com/)
- [Docusaurus Blog Post](https://docusaurus.io/blog/upgrading-frontend-dependencies-with-confidence-using-visual-regression-testing)
- [Playwright Documentation](https://playwright.dev/)
