import { expect, test } from '@playwright/test';
import { evidence } from './helpers';

test('enhanced:img emits responsive modern formats with dimensions and lazy loading', async ({
	page,
	request
}) => {
	await page.goto('/feature-tests/image-pipeline');
	const hero = page.locator('#ft-hero');
	const info = await hero.evaluate((img: HTMLImageElement) => {
		const sources = [...(img.parentElement?.querySelectorAll('source') ?? [])].map((s) => ({
			type: s.type,
			srcset: s.srcset
		}));
		return {
			width: img.getAttribute('width'),
			height: img.getAttribute('height'),
			srcset: img.getAttribute('srcset'),
			sources,
			currentSrc: img.currentSrc
		};
	});
	expect(info.width).toBeTruthy();
	expect(info.height).toBeTruthy();
	// enhanced-img puts the srcset on <picture><source> per format; the <img> is the fallback.
	const avif = info.sources.find((s) => s.type === 'image/avif');
	expect(avif).toBeTruthy();
	const widths = [...avif!.srcset.matchAll(/\s(\d+)w/g)].map((m) => Number(m[1]));
	expect(widths.length).toBeGreaterThanOrEqual(2);

	const offscreenLoading = await page.locator('#ft-offscreen').getAttribute('loading');
	expect(offscreenLoading).toBe('lazy');

	const firstUrl = avif!.srcset.split(',')[0].trim().split(/\s+/)[0];
	const res = await request.get(firstUrl);
	expect(res.status()).toBe(200);
	const type = res.headers()['content-type'];
	expect(type).toMatch(/image\/(avif|webp)/);
	evidence(
		`<picture> with avif/webp/jpeg <source> srcsets (${widths.join(',')}w); <img> width=${info.width} height=${info.height}; offscreen loading=lazy; ${firstUrl.split('/').pop()} served as ${type}; browser picked ${info.currentSrc.split('.').pop()}`
	);
});
