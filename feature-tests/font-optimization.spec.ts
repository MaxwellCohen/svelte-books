import { expect, test } from '@playwright/test';
import { evidence } from './helpers';

test('font is self-hosted, uses font-display, and is preloaded', async ({ page }) => {
	const external: string[] = [];
	const fontRequests: string[] = [];
	page.on('request', (r) => {
		if (/fonts\.(googleapis|gstatic)\.com/.test(r.url())) external.push(r.url());
		if (r.resourceType() === 'font') fontRequests.push(r.url());
	});
	await page.goto('/feature-tests/font-optimization');
	await page.evaluate(() => document.fonts.ready);

	const preload = await page
		.locator('link[rel="preload"][as="font"]')
		.evaluateAll((els) => els.map((e) => (e as HTMLLinkElement).href));
	expect(preload.length).toBeGreaterThan(0);
	expect(preload[0]).toContain(new URL(page.url()).origin);

	const html = await page.content();
	const faces = [...html.matchAll(/@font-face\s*{[^}]*}/g)].map((m) => m[0]);
	const geistFaces = faces.filter((f) => f.includes('Geist Variable'));
	expect(geistFaces.length).toBeGreaterThan(0);
	expect(geistFaces.every((f) => /font-display:\s*swap/.test(f))).toBe(true);

	const loaded = await page.evaluate(() => document.fonts.check('16px "Geist Variable"'));
	expect(loaded).toBe(true);
	expect(external).toEqual([]);
	expect(fontRequests.every((u) => u.startsWith(new URL(page.url()).origin))).toBe(true);
	evidence(
		`preload as=font ${new URL(preload[0]).pathname.split('/').pop()}; ${geistFaces.length} @font-face with font-display:swap; ${fontRequests.length} same-origin font requests; 0 Google Fonts requests`
	);
});
