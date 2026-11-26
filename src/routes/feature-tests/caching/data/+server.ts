import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

let counter = 0;

/** 1st-party HTTP caching: `setHeaders` sets Cache-Control; browsers/CDNs reuse the response within the TTL. */
export const GET: RequestHandler = ({ setHeaders }) => {
	counter += 1;
	setHeaders({ 'cache-control': 'public, max-age=5, s-maxage=60' });
	return json({ counter, at: Date.now() });
};
