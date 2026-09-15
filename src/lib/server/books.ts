import { API_DELAY_MS } from '$app/env/private';
import {
	getBookById as loadBookById,
	getBooksCount as loadBooksCount,
	getBooksPage as loadBooksPage
} from '#lib/features/book/book-queries';
import type { BookFilters, BookQuery } from '#lib/features/book/book-utils';
import { MAX_API_DELAY_MS } from '#lib/url-state';
import { delay } from '#lib/utils';

export async function waitForApiDelay(requestedMs = 0) {
	const envMs = Number(API_DELAY_MS ?? 0);
	const uiMs = Number.isFinite(requestedMs)
		? Math.min(MAX_API_DELAY_MS, Math.max(0, requestedMs))
		: 0;
	const ms = uiMs > 0 ? uiMs : envMs;
	return delay(ms, ms > 0);
}

export async function getBooksPage(bookQuery: BookQuery, delayMs = 0) {
	await waitForApiDelay(delayMs);
	return loadBooksPage(bookQuery);
}

export async function getBooksCount(filters: BookFilters, delayMs = 0) {
	await waitForApiDelay(delayMs);
	return loadBooksCount(filters);
}

export async function getBookById(id: string, delayMs = 0) {
	await waitForApiDelay(delayMs);
	return loadBookById(id);
}
