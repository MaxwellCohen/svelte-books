export type CatalogKv = {
	get(key: string, type: 'json'): Promise<unknown>;
	put(key: string, value: string, options?: { expirationTtl: number }): Promise<void>;
};

/** Non-Cloudflare hosts persist the catalog through Vercel, Netlify, or the Cache API. */
export function readCatalogKv(): CatalogKv | undefined {
	return undefined;
}
