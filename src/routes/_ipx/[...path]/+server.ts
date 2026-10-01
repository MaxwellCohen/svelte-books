import { passThroughIpx } from '#lib/server/ipx-passthrough.ts';
import { imageOptimizationEnabled } from '#lib/image-config.ts';
import type { RequestHandler } from './$types';

/**
 * IPX image optimizer endpoint.
 * Unpic generates URLs like `/_ipx/f_webp,s_320x480/https://images.gr-assets.com/...`.
 *
 * On Cloudflare, sharp/IPX cannot run — pass through to the remote URL instead.
 */
export const GET: RequestHandler = async (event) => {
	if (!imageOptimizationEnabled) {
		return passThroughIpx(event);
	}

	const { handleIpxRequest } = await import('#lib/server/ipx-handler.ts');
	return handleIpxRequest(event.request);
};

export const HEAD = GET;
