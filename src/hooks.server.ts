import type { Handle } from '@sveltejs/kit';
import {
	bindCatalogCache,
	htmlResponseWithCacheHeaders,
	matchCachedHtml,
	storeCachedHtml
} from '#lib/server/catalog-cache';

export const handle: Handle = async ({ event, resolve }) => {
	bindCatalogCache(event.platform?.env?.CATALOG_CACHE);

	const cached = await matchCachedHtml(event.request);
	if (cached) return cached;

	const response = htmlResponseWithCacheHeaders(event.request, await resolve(event));
	void storeCachedHtml(event.request, response);
	return response;
};
