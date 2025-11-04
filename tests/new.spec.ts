import { test, expect } from '@playwright/test';

test('should submit the form successfully and redirect to the show page, if all fields are filled', async ({ page }) => {
  await page.goto('http://localhost:3000/campgrounds/new');
  await expect(page).toHaveTitle(/YelpCamp/);
  await page.locator('[name="campground[name]"]').fill('Test Campground');
  await page.locator('[name="campground[location]"]').fill('Test Location');
  await page.locator('[name="campground[image]"]').fill('https://picsum.photos/500/375');
  await page.locator('[name="campground[price]"]').fill('100');
  await page.locator('[name="campground[description]"]').fill('Test Description');
  await page.getByRole('button', { name: 'Add Campground' }).click();
  await expect(page).toHaveURL(/http:\/\/localhost:3000\/campgrounds\/[a-f0-9]{24}/);
});

test('should not submit the form if any field is missing', async ({ page }) => {
  await page.goto('http://localhost:3000/campgrounds/new');
  await expect(page).toHaveTitle(/YelpCamp/);
  await page.getByRole('button', { name: 'Add Campground' }).click();
  await expect(page.getByText('Please enter a name.')).toBeVisible();
  await expect(page.getByText('Please enter a location.')).toBeVisible();
  await expect(page.getByText('Please enter an image URL.')).toBeVisible();
  await expect(page.getByText('Please enter a price.')).toBeVisible();
  await expect(page.getByText('Please enter a description.')).toBeVisible();
});
