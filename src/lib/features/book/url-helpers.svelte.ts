import { goto } from '$app/navigation';
import { page } from '$app/state';
import {
	buildHref,
	parseSearchParams,
	stringifySearchParams,
	withFilters,
	type SearchParams
} from '#lib/url-state';

export function currentSearchParams(): SearchParams {
	return parseSearchParams(Object.fromEntries(page.url.searchParams));
}

export async function updateSearchParams(
	patch: Partial<SearchParams>,
	options?: { replace?: boolean; home?: boolean }
) {
	const current = currentSearchParams();
	const next = withFilters(current, patch);
	// Explicit undefined delay must clear the param
	if ('delay' in patch && (patch.delay === undefined || patch.delay === '')) {
		delete next.delay;
	} else if (patch.delay) {
		next.delay = patch.delay;
	}

	const goHome = options?.home ?? page.url.pathname === '/';
	const href = goHome
		? buildHref(next)
		: (() => {
				const query = stringifySearchParams(next);
				return query ? `${page.url.pathname}?${query}` : page.url.pathname;
			})();

	await goto(href, {
		replace: options?.replace ?? true,
		reset: false
	});
}

export async function navigateSearch(next: SearchParams, replace: boolean) {
	await goto(buildHref(next), {
		replace,
		reset: false
	});
}
