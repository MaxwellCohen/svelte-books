import { error } from '@sveltejs/kit';
import { getBookById } from '#lib/server/books.ts';
import { bookIsrConfig } from '#lib/server/page-isr.ts';
import { getApiDelayMs, parseSearchParams } from '#lib/url-state.ts';
import type { PageServerLoad } from './$types';

export const config = bookIsrConfig;

function streamed<T>(promise: Promise<T>): Promise<T> {
	promise.catch(() => {});
	return promise;
}

export const load: PageServerLoad = async ({ isDataRequest, params, url }) => {
	if (!Number.isInteger(Number(params.id))) {
		error(404, 'Book not found');
	}

	const searchParams = parseSearchParams(Object.fromEntries(url.searchParams));
	const delayMs = getApiDelayMs(searchParams);
	const book = getBookById(params.id, delayMs).catch((err: unknown) => {
		const message = err instanceof Error ? err.message : '';
		if (message === 'Book not found' || message === 'Invalid book ID') {
			error(404, 'Book not found');
		}
		throw err;
	});

	return {
		book: isDataRequest ? streamed(book) : await book
	};
};
