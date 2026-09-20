import type { Handle } from '@sveltejs/kit';
import {
	htmlResponseWithCacheHeaders,
	matchCachedHtml,
	storeCachedHtml
} from '#lib/server/catalog-cache';

export const handle: Handle = async ({ event, resolve }) => {
	const cached = await matchCachedHtml(event.request);
	if (cached) return cached;

	const response = htmlResponseWithCacheHeaders(event.request, await resolve(event));
	void storeCachedHtml(event.request, response);
	return response;
};
