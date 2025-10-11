import { test, expect } from '@playwright/test';

test('campgrounds index page', async ({ page }) => {
  await page.goto('http://localhost:3000/campgrounds');
  await expect(page).toHaveTitle(/YelpCamp/);
  const campgroundList = await page.locator('.card').count();
  await expect(campgroundList).toBeGreaterThan(0);
});
