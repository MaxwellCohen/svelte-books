import { hostDocumentCacheControl } from '#lib/server/catalog-cache';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ setHeaders, isDataRequest, isRemoteRequest }) => {
	if (isDataRequest || isRemoteRequest) return;

	setHeaders({
		'cache-control': hostDocumentCacheControl()
	});
};
