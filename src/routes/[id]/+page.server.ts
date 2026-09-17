import { error } from '@sveltejs/kit';
import { getBookById } from '#lib/server/books';
import { getApiDelayMs, parseSearchParams } from '#lib/url-state';
import type { PageServerLoad } from './$types';

function streamed<T>(promise: Promise<T>): Promise<T> {
	promise.catch(() => {});
	return promise;
}

export const load: PageServerLoad = async ({ params, url }) => {
	if (!Number.isInteger(Number(params.id))) {
		error(404, 'Book not found');
	}

	const searchParams = parseSearchParams(Object.fromEntries(url.searchParams));
	const delayMs = getApiDelayMs(searchParams);

	return {
		book: streamed(
			getBookById(params.id, delayMs).catch((err: unknown) => {
				const message = err instanceof Error ? err.message : '';
				if (message === 'Book not found' || message === 'Invalid book ID') {
					error(404, 'Book not found');
				}
				throw err;
			})
		)
	};
};
