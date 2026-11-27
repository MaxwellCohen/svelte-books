import { building } from '$app/env';
import type { Handle } from '@sveltejs/kit/hooks';
import { bindCatalogCache } from '#lib/server/catalog-cache.ts';
import { readCatalogKv } from '#lib/server/catalog-kv.ts';

/** Only the Latin Geist (sans) face is above the fold; the other subsets and Geist Mono load on demand. */
const PRELOADED_FONT = /geist-latin-wght-normal/;

export const handle: Handle = async ({ event, resolve }) => {
	// Prerendering (feature-tests/render-modes) runs at build time, where Workers bindings don't exist.
	if (!building) bindCatalogCache(readCatalogKv());

	// Document Cache-Control is set with `setHeaders` in routes/+layout.server.ts.
	// `preload` is SvelteKit's resolve option: it emits <link rel="preload" as="font"> for the
	// Fontsource file Vite fingerprinted, so the font request starts with the HTML, not after CSS.
	return resolve(event, {
		preload: ({ type, path }) =>
			type === 'js' || type === 'css' || (type === 'font' && PRELOADED_FONT.test(path))
	});
};
