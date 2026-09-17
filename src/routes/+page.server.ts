import { toBookFilters, toBookQuery } from '#lib/features/book/book-utils';
import { getBooksCount, getBooksPage } from '#lib/server/books';
import { getApiDelayMs, parseSearchParams } from '#lib/url-state';
import type { PageServerLoad } from './$types';

function streamed<T>(promise: Promise<T>): Promise<T> {
	promise.catch(() => {});
	return promise;
}

export const load: PageServerLoad = async ({ url }) => {
	const searchParams = parseSearchParams(Object.fromEntries(url.searchParams));
	const delayMs = getApiDelayMs(searchParams);
	const query = toBookQuery(searchParams);

	return {
		books: streamed(getBooksPage(query, delayMs)),
		count: streamed(getBooksCount(toBookFilters(query), delayMs)),
		searchParams
	};
};
