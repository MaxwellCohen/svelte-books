import { expect, test } from '@playwright/test';
import { evidence } from './helpers';

test('runes update the bound text without re-running the component', async ({ page }) => {
	await page.goto('/feature-tests/reactivity');
	const button = page.locator('#ft-increment');
	await expect(button).toBeVisible();
	await page.waitForFunction(
		() => (globalThis as { __ftRenderCount?: number }).__ftRenderCount === 1
	);

	// Watch which DOM nodes change while clicking.
	await page.evaluate(() => {
		const w = window as unknown as { __mutations: string[] };
		w.__mutations = [];
		new MutationObserver((list) => {
			for (const m of list)
				w.__mutations.push(
					`${m.type}:${(m.target as Element).id || m.target.parentElement?.id || m.target.nodeName}`
				);
		}).observe(document.body, {
			subtree: true,
			childList: true,
			characterData: true,
			attributes: true
		});
	});
	for (let i = 0; i < 3; i++) await button.click();
	await expect(page.locator('#ft-count')).toHaveText('3');
	const renders = await page.evaluate(
		() => (globalThis as { __ftRenderCount?: number }).__ftRenderCount
	);
	expect(renders).toBe(1);
	await expect(page.locator('#ft-renders')).toHaveText('1');
	const mutations = await page.evaluate(
		() => (window as unknown as { __mutations: string[] }).__mutations
	);
	expect(mutations.length).toBeGreaterThan(0);
	expect(mutations.every((m) => m.endsWith(':ft-count'))).toBe(true);
	evidence(
		`3 clicks → count text 3; component script ran ${renders}×; ${mutations.length} DOM mutation(s), all on #ft-count (${[...new Set(mutations)].join(', ')})`
	);
});
