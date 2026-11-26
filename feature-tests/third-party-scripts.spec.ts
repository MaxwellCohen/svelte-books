import { expect, test } from '@playwright/test';
import { evidence } from './helpers';

test('stand-in vendor script runs through Partytown without blocking first render', async ({
	page,
	request
}) => {
	const html = await (await request.get('/feature-tests/third-party-scripts')).text();
	const tag = html.match(/<script[^>]*src="\/fake-third-party\.js"[^>]*>/)?.[0];
	expect(tag).toBeTruthy();
	expect(tag).toContain('type="text/partytown"'); // not executable by the main-thread parser
	expect(html).toContain('partytown'); // inline snippet

	const workerRequests: string[] = [];
	page.on('request', (r) => {
		if (r.url().includes('fake-third-party.js') || r.url().includes('~partytown'))
			workerRequests.push(`${r.resourceType()} ${new URL(r.url()).pathname}`);
	});
	await page.goto('/feature-tests/third-party-scripts');
	// The vendor script writes a DOM attribute; Partytown proxies that write from the worker.
	await expect(page.locator('html')).toHaveAttribute('data-fake-third-party', 'ran', {
		timeout: 15_000
	});
	const workers = page.workers().map((w) => new URL(w.url()).pathname);
	expect(workers.length).toBeGreaterThan(0);
	const mainGlobal = await page.evaluate(
		() => (window as { __fakeThirdParty?: unknown }).__fakeThirdParty !== undefined
	);
	const type = await page.locator('script[src="/fake-third-party.js"]').getAttribute('type');
	expect(workerRequests.some((r) => r.startsWith('fetch /fake-third-party.js'))).toBe(true);
	expect(workerRequests.some((r) => r.startsWith('script /fake-third-party.js'))).toBe(false);
	evidence(
		`<script type="text/partytown"> in HTML (main-thread parser skips it); requests: ${[...new Set(workerRequests)].join(', ')}; fetched by the Partytown web worker (${workers.length} worker(s)), never as a main-thread script; it set html[data-fake-third-party=ran] via Partytown's DOM proxy (window global visible on main thread: ${mainGlobal}); final script type=${type}`
	);
});
