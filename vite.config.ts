import { createRequire } from 'node:module';
import tailwindcss from '@tailwindcss/vite';
import netlifyAdapter from '@sveltejs/adapter-netlify';
import vercelAdapter from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const require = createRequire(import.meta.url);
const isCloudflare = Boolean(
	process.env.CLOUDFLARE || process.env.WORKERS_CI || process.env.CF_PAGES
);

// Load the Cloudflare adapter only when CLOUDFLARE/WORKERS_CI is set so
// Vercel and Netlify builds never resolve @sveltejs/adapter-cloudflare.
const adapter = isCloudflare
	? require('@sveltejs/adapter-cloudflare')
	: process.env.NETLIFY
		? netlifyAdapter
		: vercelAdapter;

export default defineConfig({
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
