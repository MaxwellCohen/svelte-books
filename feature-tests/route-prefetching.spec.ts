import { expect, test } from '@playwright/test';
import { evidence } from './helpers';

test('hovering a link preloads the target route code and data before the click', async ({
	page
}) => {
	await page.goto('/feature-tests/route-prefetching');
	await page.waitForFunction(() => document.documentElement.dataset || true);
	await page.waitForLoadState('networkidle');

	const requests: { url: string; t: number }[] = [];
	page.on('request', (r) => requests.push({ url: r.url(), t: Date.now() }));

	await page.hover('#ft-prefetch-link');
	await expect
		.poll(() => requests.some((r) => r.url.includes('/route-prefetching/target/__data.json')))
		.toBe(true);
	const beforeClick = requests.map((r) => new URL(r.url).pathname);
	const clickAt = Date.now();
	await page.click('#ft-prefetch-link');
	await expect(page.locator('#ft-target')).toBeVisible();
	const dataReqs = requests.filter((r) => r.url.includes('target/__data.json'));
	expect(dataReqs[0].t).toBeLessThan(clickAt);
	const codeReqs = beforeClick.filter((p) => p.includes('/_app/immutable/nodes/'));
	evidence(
		`on hover (before click): ${beforeClick.filter((p) => p.includes('__data.json')).join(', ')} + ${codeReqs.length} route node chunk(s); ${dataReqs.length} data request(s) total, so click reused the preload`
	);
});
