import tailwindcss from '@tailwindcss/vite';
import cloudflareAdapter from '@sveltejs/adapter-cloudflare';
import netlifyAdapter from '@sveltejs/adapter-netlify';
import vercelAdapter from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// Pick the host adapter at build time so the same repo deploys to Vercel,
// Netlify, and Cloudflare. Netlify sets NETLIFY; Workers Builds sets WORKERS_CI.
const adapter =
	process.env.CLOUDFLARE || process.env.WORKERS_CI || process.env.CF_PAGES
		? cloudflareAdapter
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
