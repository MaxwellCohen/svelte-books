import { expect, test } from '@playwright/test';
import { evidence } from './helpers';

test('route CSS is inlined in <style>, no render-blocking stylesheet link', async ({ request }) => {
	const html = await (await request.get('/feature-tests/css-inlining')).text();
	const styles = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]);
	const routeStyle = styles.find((s) => s.includes('ft-css-inline-marker'));
	expect(routeStyle, 'inline <style> with the route component CSS').toBeTruthy();
	expect(routeStyle).toMatch(/border:3px dashed (#010203|rgb\(1,\s*2,\s*3\))/);
	const sheetLinks = [...html.matchAll(/<link[^>]*rel="?stylesheet"?[^>]*>/g)].map((m) => m[0]);
	// SvelteKit keeps `<link rel=stylesheet disabled media="(max-width: 0)">` placeholders so client-side
	// navigation knows the CSS is present. Disabled + never-matching media => not render-blocking.
	const blocking = sheetLinks.filter(
		(l) => !/\sdisabled[\s>=]/.test(l) && !/media="\(max-width: 0\)"/.test(l)
	);
	expect(blocking, 'no render-blocking <link rel=stylesheet>').toEqual([]);
	evidence(
		`HTML has ${styles.length} inline <style> (${routeStyle!.length} chars) containing the .ft-css-inline-marker rule; ${sheetLinks.length} <link rel=stylesheet> all disabled+media="(max-width: 0)" placeholders, 0 render-blocking`
	);
});
