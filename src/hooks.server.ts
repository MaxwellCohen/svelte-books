import { building } from '$app/env';
import type { Handle } from '@sveltejs/kit/hooks';
import { bindCatalogCache, htmlResponseWithCacheHeaders } from '#lib/server/catalog-cache.ts';
import { readCatalogKv } from '#lib/server/catalog-kv.ts';

/** Feature test (font-optimization): preload the Latin Geist subset on that route only. */
const FONT_PRELOAD_ROUTE = '/feature-tests/font-optimization';

export const handle: Handle = async ({ event, resolve }) => {
	// Prerendering (feature-tests/render-modes) runs at build time, where Workers bindings don't exist.
	if (!building) bindCatalogCache(readCatalogKv());

	const preloadFont = event.url.pathname === FONT_PRELOAD_ROUTE;
	const response = htmlResponseWithCacheHeaders(
		event.request,
		await resolve(
			event,
			preloadFont
				? {
						preload: ({ type, path }) =>
							type === 'js' ||
							type === 'css' ||
							(type === 'font' && /geist-latin-wght-normal/.test(path))
					}
				: undefined
		)
	);
	return response;
};
