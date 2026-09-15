import { error } from '@sveltejs/kit';
import { getBookById } from '#lib/server/books';
import { getApiDelayMs, parseSearchParams } from '#lib/url-state';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, url }) => {
	const searchParams = parseSearchParams(Object.fromEntries(url.searchParams));
	const delayMs = getApiDelayMs(searchParams);

	try {
		const book = await getBookById(params.id, delayMs);
		return { book };
	} catch (err) {
		const message = err instanceof Error ? err.message : '';
		if (message === 'Book not found' || message === 'Invalid book ID') {
			error(404, 'Book not found');
		}
		throw err;
	}
};
