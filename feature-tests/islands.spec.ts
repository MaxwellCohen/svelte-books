import { expect, test } from '@playwright/test';
import { evidence } from './helpers';

const MARKER = 'FT_STATIC_ONLY_MARKER_9f3b2c';

test('only the island ships JS; the static component code is not sent to the client', async ({
	page
}) => {
	const scripts: { url: string; body: string }[] = [];
	page.on('response', async (res) => {
		const type = res.request().resourceType();
		if (type === 'script' || res.url().endsWith('.js')) {
			scripts.push({ url: res.url(), body: await res.text().catch(() => '') });
		}
	});
	await page.goto('/feature-tests/islands');
	await expect(page.locator('#ft-static')).toHaveAttribute('data-marker', MARKER); // rendered in HTML
	await expect(page.locator('[data-island="counter"]')).toHaveAttribute('data-hydrated', 'true');
	await page.click('#ft-island-button');
	await page.click('#ft-island-button');
	await expect(page.locator('#ft-island-count')).toHaveText('2');
	await page.waitForLoadState('networkidle');

	const leaking = scripts.filter((s) => s.body.includes(MARKER));
	expect(leaking.map((s) => s.url)).toEqual([]);
	const kitRuntime = scripts.filter((s) => s.url.includes('/_app/immutable/entry/'));
	expect(kitRuntime).toEqual([]);
	evidence(
		`csr=false page + hand-rolled island entry (?worker&url, svelte mount): ${scripts.length} JS file(s) loaded (${scripts.map((s) => s.url.split('/').pop()).join(', ')}), none contain static marker, no SvelteKit runtime; island counter reached 2`
	);
});
