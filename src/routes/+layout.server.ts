import { HTML_CACHE_CONTROL } from '#lib/server/catalog-cache';
import { getApiDelayMs, parseSearchParams } from '#lib/url-state';
import type { LayoutServerLoad } from './$types';

const UNCACHED_HTML = 'private, no-store';

export const load: LayoutServerLoad = ({ url, setHeaders, isDataRequest, isRemoteRequest }) => {
	if (isDataRequest || isRemoteRequest) return;

	const delayMs = getApiDelayMs(parseSearchParams(Object.fromEntries(url.searchParams)));
	const cacheControl = delayMs > 0 ? UNCACHED_HTML : HTML_CACHE_CONTROL;

	setHeaders({
		'cache-control': cacheControl,
		'cdn-cache-control': cacheControl,
		'vercel-cdn-cache-control': cacheControl,
		'netlify-cdn-cache-control': cacheControl
	});
};
