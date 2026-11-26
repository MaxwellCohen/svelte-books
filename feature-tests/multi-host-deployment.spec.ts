import { execSync } from 'node:child_process';
import fs from 'node:fs';
import { expect, test } from '@playwright/test';
import { evidence } from './helpers';

const targets = [
	{
		name: 'netlify',
		env: { NETLIFY: '1' },
		out: ['.netlify/v1/functions/sveltekit-render.mjs', 'build/_app']
	},
	{ name: 'cloudflare', env: { CLOUDFLARE: '1' }, out: ['.svelte-kit/cloudflare/_worker.js'] },
	// Last so the default (Vercel) build is what's left on disk.
	{ name: 'vercel', env: {}, out: ['.vercel/output/config.json', '.vercel/output/functions'] }
];

test('the same app builds for Netlify, Cloudflare and Vercel adapters', () => {
	const seen: string[] = [];
	for (const t of targets) {
		for (const dir of ['.netlify', 'build', '.svelte-kit/cloudflare', '.vercel/output'])
			fs.rmSync(dir, { recursive: true, force: true });
		const env = { ...process.env, ...t.env };
		delete (env as Record<string, string | undefined>).VERCEL;
		execSync('node node_modules/vite/bin/vite.js build', { env, stdio: 'pipe' });
		for (const out of t.out) expect(fs.existsSync(out), `${t.name}: ${out}`).toBe(true);
		seen.push(`${t.name}→${t.out.join('+')}`);
	}
	evidence(`3 adapter builds succeeded: ${seen.join('; ')}`);
});
