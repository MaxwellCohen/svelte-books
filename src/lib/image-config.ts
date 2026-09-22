/**
 * Image optimization config.
 *
 * Mirrors nuxt-books: IPX locally / on Node hosts; skip on Cloudflare Workers
 * where sharp cannot run (`CLOUDFLARE` / `WORKERS_CI` / `CF_PAGES`).
 *
 * Set at build time via Vite `define` in vite.config.ts.
 */
export const imageOptimizationEnabled =
	import.meta.env.PUBLIC_IMAGE_OPTIMIZATION !== 'none';
