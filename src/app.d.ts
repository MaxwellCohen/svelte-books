// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

declare module '$env/static/public' {
	export const PUBLIC_IMAGE_OPTIMIZATION: 'ipx' | 'none';
}

interface ImportMetaEnv {
	readonly PUBLIC_IMAGE_OPTIMIZATION: 'ipx' | 'none';
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

declare global {
	namespace Cloudflare {
		interface Env {
			CATALOG_CACHE?: {
				get(key: string, type: 'json'): Promise<unknown>;
				put(key: string, value: string, options?: { expirationTtl: number }): Promise<void>;
			};
		}
	}

	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
