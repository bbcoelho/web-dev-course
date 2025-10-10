import { test, expect } from '@playwright/test';

test('editing campground', async ({ page }) => {
	await page.goto('http://localhost:3000/campgrounds');
	await page.locator('.card-body > .btn').first().click();
	await page.getByRole('link', { name: 'Edit' }).click();
	await page.getByRole('heading', { name: 'Edit Campground' }).click();
	await page.getByRole('button', { name: 'Save Changes' }).click();

	// expect page to have title "Show"
	await expect(page).toHaveTitle(/YelpCamp/);
	// expect page to redirect to show page with the id of the campground "http://localhost:3000/campgrounds/[a-f0-9]{24}"
	await expect(page).toHaveURL(/http:\/\/localhost:3000\/campgrounds\/[a-f0-9]{24}/)
});