import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import cloudflareAdapter from '@sveltejs/adapter-cloudflare';
import netlifyAdapter from '@sveltejs/adapter-netlify';
import vercelAdapter from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { partytownVite } from '@qwik.dev/partytown/utils';
import { visualizer } from 'rollup-plugin-visualizer';
import { svelte } from '@sveltejs/vite-plugin-svelte';
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
	isCloudflare ? 'src/lib/server/ipx-handler.cloudflare.ts' : 'src/lib/server/ipx-handler.ts'
);

const catalogKv = path.resolve(
	root,
	isCloudflare ? 'src/lib/server/catalog-kv.cloudflare.ts' : 'src/lib/server/catalog-kv.ts'
);

export default defineConfig({
	define: {
		// Mirror nuxt-books: skip IPX on Cloudflare Workers (sharp unsupported).
		'import.meta.env.PUBLIC_IMAGE_OPTIMIZATION': JSON.stringify(isCloudflare ? 'none' : 'ipx')
	},
	resolve: {
		// Keep sharp/IPX out of Cloudflare Worker bundles.
		alias: {
			'#lib/server/ipx-handler.ts': ipxHandler,
			'#lib/server/catalog-kv.ts': catalogKv
		}
	},
	worker: {
		// Feature test (islands): the hand-rolled island entry is bundled via `?worker&url`.
		format: 'es',
		plugins: () => [svelte({ configFile: false, compilerOptions: { runes: true } })]
	},
	plugins: [
		// Feature test (image-pipeline): first-party build-time image optimization. Must precede sveltekit().
		enhancedImages(),
		// Feature test (third-party-scripts): copy Partytown's worker lib next to the client output.
		partytownVite({ dest: path.join(root, '.svelte-kit/output/client/~partytown') }),
		// Feature test (bundle-analysis): `ANALYZE=1 vite build` writes .svelte-kit/stats/*.html.
		Boolean(process.env.ANALYZE) &&
			visualizer((opts) => ({
				filename: path.join(
					root,
					'.svelte-kit/stats',
					opts.dir?.includes('server') ? 'server.html' : 'client.html'
				),
				gzipSize: true
			})),
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true,
				experimental: { async: true }
			},

			adapter:
				adapter === vercelAdapter && !process.env.VERCEL
					? // Local builds on Node 26 (feature tests): pin the runtime Vercel would infer on Node 24.
						vercelAdapter({ runtime: 'nodejs24.x' })
					: adapter(),
			// Put page CSS in the HTML, same idea as Next `inlineCss` and Nuxt `inlineStyles`.
			// Any finite stylesheet is below this, including the Tailwind bundle.
			inlineStyleThreshold: Number.POSITIVE_INFINITY,
			experimental: { remoteFunctions: true, forkPreloads: true }
		})
	]
});
