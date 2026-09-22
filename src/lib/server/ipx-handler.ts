import {
	createIPX,
	createIPXFetchHandler,
	ipxFSStorage,
	ipxHttpStorage
} from 'ipx';

/** Goodreads cover hosts — same allowlist as nuxt-books `@nuxt/image` domains. */
const ALLOWED_DOMAINS = ['images.gr-assets.com', 's.gr-assets.com'] as const;

const ipx = createIPX({
	// Required by IPX; book covers use httpStorage (remote URLs) only.
	storage: ipxFSStorage({ dir: './static' }),
	httpStorage: ipxHttpStorage({ domains: [...ALLOWED_DOMAINS] })
});

const fetchHandler = createIPXFetchHandler(ipx);

/**
 * Serve an optimized image for a request under `/_ipx/...`.
 * Strips the `/_ipx` prefix so IPX parses `/modifiers/id`.
 */
export function handleIpxRequest(request: Request): Response | Promise<Response> {
	const url = new URL(request.url);
	url.pathname = url.pathname.replace(/^\/_ipx/, '') || '/';
	return fetchHandler(new Request(url, request));
}
