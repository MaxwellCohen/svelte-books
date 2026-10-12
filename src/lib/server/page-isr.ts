import type { Config } from '@sveltejs/adapter-vercel';
import { CATALOG_CACHE_REVALIDATE_SECONDS } from './catalog-cache.ts';

/**
 * Search params that change the catalog HTML. ISR ignores every other
 * query key, so tracking params do not create extra cache entries.
 * `delay` stays in the key so the latency demo is not served from the fast page.
 */
export const CATALOG_ISR_ALLOW_QUERY = [
	'delay',
	'language',
	'list',
	'page',
	'pages',
	'rating',
	'search',
	'year'
] as const;

/** One hour, matching Next `cacheLife('hours')` and the catalog data cache. */
const isr = {
	expiration: CATALOG_CACHE_REVALIDATE_SECONDS
} as const;

export const catalogIsrConfig = {
	isr: {
		...isr,
		allowQuery: [...CATALOG_ISR_ALLOW_QUERY]
	}
} satisfies Config;

/** Book HTML does not vary with catalog filters, only with the delay demo. */
export const bookIsrConfig = {
	isr: {
		...isr,
		allowQuery: ['delay']
	}
} satisfies Config;
