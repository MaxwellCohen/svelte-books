import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import cloudflareAdapter from '@sveltejs/adapter-cloudflare';
import netlifyAdapter from '@sveltejs/adapter-netlify';
import vercelAdapter from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const root = path.dirname(fileURLToPath(import.meta.url));

const isCloudflare = Boolean(
	process.env.CLOUDFLARE || process.env.WORKERS_CI || process.env.CF_PAGES
);

const adapter = isCloudflare
	? cloudflareAdapter
	: process.env.NETLIFY
		? netlifyAdapter
		: vercelAdapter;

const ipxHandler = path.resolve(
	root,
	isCloudflare
		? 'src/lib/server/ipx-handler.cloudflare.ts'
		: 'src/lib/server/ipx-handler.ts'
);

export default defineConfig({
	define: {
		// Mirror nuxt-books: skip IPX on Cloudflare Workers (sharp unsupported).
		'import.meta.env.PUBLIC_IMAGE_OPTIMIZATION': JSON.stringify(
			isCloudflare ? 'none' : 'ipx'
		)
	},
	resolve: {
		// Keep sharp/IPX out of Cloudflare Worker bundles.
		alias: {
			'#lib/server/ipx-handler': ipxHandler,
			'$lib/server/ipx-handler': ipxHandler
		}
	},
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true,
				experimental: { async: true }
			},

			adapter: adapter(),
			experimental: { remoteFunctions: true, forkPreloads: true }
		})
	]
});

