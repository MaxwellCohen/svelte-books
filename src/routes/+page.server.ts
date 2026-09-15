import { toBookFilters, toBookQuery } from '#lib/features/book/book-utils';
import { getBooksCount, getBooksPage } from '#lib/server/books';
import { getApiDelayMs, parseSearchParams } from '#lib/url-state';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const searchParams = parseSearchParams(Object.fromEntries(url.searchParams));
	const delayMs = getApiDelayMs(searchParams);
	const query = toBookQuery(searchParams);

	const [books, count] = await Promise.all([
		getBooksPage(query, delayMs),
		getBooksCount(toBookFilters(query), delayMs)
	]);

	return { books, count, searchParams };
};
