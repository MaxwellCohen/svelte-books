// TypeScript 6 treats this specifier as a URI and will not resolve it.
// adapter-cloudflare provides the module when building for Workers.
// @ts-expect-error cloudflare:workers is a Workers runtime module
import { env } from 'cloudflare:workers';
import type { CatalogKv } from './catalog-kv.ts';

/** Workers KV binding. Aliased in place of catalog-kv.ts when building for Cloudflare. */
export function readCatalogKv(): CatalogKv | undefined {
	return env.CATALOG_CACHE;
}
