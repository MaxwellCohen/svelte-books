import { error, redirect } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

/**
 * When IPX is unavailable (e.g. Cloudflare), redirect `/_ipx/<modifiers>/<url>`
 * to the original remote image URL so covers still load.
 */
export function passThroughIpx({ params }: RequestEvent): never {
	const path = params.path ?? '';
	const slash = path.indexOf('/');
	const remote = slash === -1 ? path : path.slice(slash + 1);

	if (/^https?:\/\//.test(remote)) {
		redirect(302, remote);
	}

	error(501, 'Image optimization is not available on this platform');
}
