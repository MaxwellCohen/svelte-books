import { execSync } from 'node:child_process';
import fs from 'node:fs';
import { expect, test } from '@playwright/test';
import { evidence } from './helpers';

test('rollup-plugin-visualizer writes a report during `ANALYZE=1 vite build`', () => {
	fs.rmSync('.svelte-kit/stats', { recursive: true, force: true });
	execSync('node node_modules/vite/bin/vite.js build', {
		env: { ...process.env, ANALYZE: '1' },
		stdio: 'pipe'
	});
	const client = '.svelte-kit/stats/client.html';
	expect(fs.existsSync(client)).toBe(true);
	const html = fs.readFileSync(client, 'utf8');
	expect(html).toContain('feature-tests');
	const files = fs.readdirSync('.svelte-kit/stats');
	evidence(
		`ANALYZE=1 vite build wrote .svelte-kit/stats/{${files.join(',')}} (client.html ${Math.round(html.length / 1024)} KB, includes route modules)`
	);
});
