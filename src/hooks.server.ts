import type { Handle } from '@sveltejs/kit';
import { bindCatalogCache, htmlResponseWithCacheHeaders } from '#lib/server/catalog-cache';

export const handle: Handle = async ({ event, resolve }) => {
	bindCatalogCache(event.platform?.env?.CATALOG_CACHE);

	const response = htmlResponseWithCacheHeaders(event.request, await resolve(event));
	return response;
};
