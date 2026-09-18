import { toBookFilters, toBookQuery } from '#lib/features/book/book-utils';
import { getBooksCount, getBooksPage } from '#lib/server/books';
import { getApiDelayMs, parseSearchParams } from '#lib/url-state';
import type { PageServerLoad } from './$types';

function streamed<T>(promise: Promise<T>): Promise<T> {
	promise.catch(() => {});
	return promise;
}

export const load: PageServerLoad = async ({ isDataRequest, url }) => {
	const searchParams = parseSearchParams(Object.fromEntries(url.searchParams));
	const delayMs = getApiDelayMs(searchParams);
	const query = toBookQuery(searchParams);
	const books = getBooksPage(query, delayMs);

	return {
		// Await LCP covers on the document request so SSR emits <img> tags.
		// Stream only for client navigations, where {#await} can show a skeleton.
		books: isDataRequest ? streamed(books) : await books,
		count: streamed(getBooksCount(toBookFilters(query), delayMs)),
		searchParams
	};
};
