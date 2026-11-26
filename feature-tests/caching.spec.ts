import fs from 'node:fs';
import path from 'node:path';
import { expect, test } from '@playwright/test';
import { evidence } from './helpers';

test('Cache-Control from setHeaders is honored (reuse within TTL, fresh after) + Vercel ISR config emitted', async ({
	page,
	request
}) => {
	const direct = await request.get('/feature-tests/caching/data');
	expect(direct.headers()['cache-control']).toBe('public, max-age=5, s-maxage=60');

	await page.goto('/feature-tests/caching');
	const fetchData = () =>
		page.evaluate(() => fetch('/feature-tests/caching/data').then((r) => r.json()));
	const first = await fetchData();
	const second = await fetchData();
	expect(second.counter).toBe(first.counter); // reused from the HTTP cache within max-age
	await page.waitForTimeout(6_000);
	const third = await fetchData();
	expect(third.counter).toBeGreaterThan(first.counter); // fresh after TTL

	const isrPath = path.resolve(
		'.vercel/output/functions/feature-tests/caching.prerender-config.json'
	);
	const isr = JSON.parse(fs.readFileSync(isrPath, 'utf8'));
	expect(isr.expiration).toBe(60);
	evidence(
		`data endpoint cache-control "public, max-age=5, s-maxage=60"; browser fetch counter ${first.counter}→${second.counter} within TTL, ${third.counter} after 6s; adapter-vercel wrote caching.prerender-config.json expiration=60 (ISR itself only runs on Vercel)`
	);
});
