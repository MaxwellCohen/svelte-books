import fs from 'node:fs';
import { expect, test } from '@playwright/test';
import { evidence } from './helpers';

const stamp = (html: string) => html.match(/id="rendered-at">([^<]+)</)?.[1];

test('prerendered, per-request SSR and client-only routes behave differently', async ({
	request,
	page
}) => {
	const file = '.svelte-kit/output/prerendered/pages/feature-tests/render-modes/prerendered.html';
	expect(fs.existsSync(file)).toBe(true);
	const vercelStatic = '.vercel/output/static/feature-tests/render-modes/prerendered.html';

	const p1 = stamp(await (await request.get('/feature-tests/render-modes/prerendered')).text());
	await new Promise((r) => setTimeout(r, 1100));
	const p2 = stamp(await (await request.get('/feature-tests/render-modes/prerendered')).text());
	expect(p1).toBeTruthy();
	expect(p2).toBe(p1);
	expect(fs.readFileSync(file, 'utf8')).toContain(p1!);

	const s1 = stamp(await (await request.get('/feature-tests/render-modes/ssr')).text());
	await new Promise((r) => setTimeout(r, 20));
	const s2 = stamp(await (await request.get('/feature-tests/render-modes/ssr')).text());
	expect(s1).toBeTruthy();
	expect(s2).not.toBe(s1);

	const csrHtml = await (await request.get('/feature-tests/render-modes/csr')).text();
	expect(stamp(csrHtml)).toBeUndefined();
	await page.goto('/feature-tests/render-modes/csr');
	await expect(page.locator('#rendered-at')).toHaveText(/\d{4}-\d{2}-\d{2}T/, { timeout: 15_000 });

	evidence(
		`prerender: ${file.split('/').pop()} in build output${fs.existsSync(vercelStatic) ? ' (+ .vercel/output/static)' : ''}, stamp stable ${p1}; ssr stamp ${s1}→${s2}; ssr=false route HTML has no content, browser renders it`
	);
});
