import { test, expect } from '@playwright/test';

test('show campground page', async ({ page }) => {
  await page.goto('http://localhost:3000/campgrounds');
  await page.locator('.card-body > .btn').first().click();
  await expect(page).toHaveTitle(/YelpCamp/);
  const campgroundTitle = await page.locator('.card-title').first().textContent();
  await expect(campgroundTitle).not.toBeNull();
});
