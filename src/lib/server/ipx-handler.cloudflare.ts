/**
 * Cloudflare stub: sharp/IPX cannot run on Workers.
 * The `/_ipx` route uses pass-through instead; this module is aliased in
 * when `CLOUDFLARE` / `WORKERS_CI` / `CF_PAGES` is set so the real handler
 * (and sharp) are never bundled.
 */
export function handleIpxRequest(_request: Request): Response {
	return new Response('Image optimization is not available on this platform', {
		status: 501
	});
}
