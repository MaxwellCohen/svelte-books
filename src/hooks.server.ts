import type { Handle } from '@sveltejs/kit/hooks';
import { bindCatalogCache, htmlResponseWithCacheHeaders } from '#lib/server/catalog-cache.ts';
import { readCatalogKv } from '#lib/server/catalog-kv.ts';

export const handle: Handle = async ({ event, resolve }) => {
	bindCatalogCache(readCatalogKv());

	const response = htmlResponseWithCacheHeaders(event.request, await resolve(event));
	return response;
};
