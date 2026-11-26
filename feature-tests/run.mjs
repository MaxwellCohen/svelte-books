// Build, serve the production build on PORT, run all feature specs, write feature-tests/results.json.
import { execSync, spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const PORT = 4105;
const root = path.resolve(import.meta.dirname, '..');
process.chdir(root);
const sh = (cmd, env = {}) => execSync(cmd, { stdio: 'inherit', env: { ...process.env, ...env } });

const LABELS = {
	'css-inlining': 'first-party',
	'font-optimization': 'third-party',
	'image-pipeline': 'first-party',
	caching: 'first-party',
	'route-prefetching': 'first-party',
	islands: 'manual',
	'render-modes': 'first-party',
	reactivity: 'first-party',
	'bundle-analysis': 'third-party',
	'third-party-scripts': 'third-party',
	'multi-host-deployment': 'first-party'
};
const METHODS = {
	'css-inlining': 'sveltekit({ inlineStyleThreshold: Infinity }) in vite.config.ts',
	'font-optimization':
		'@fontsource-variable/geist (self-hosted, font-display: swap) + SvelteKit handle hook resolve(event, { preload }) for the Latin woff2',
	'image-pipeline': '@sveltejs/enhanced-img plugin + <enhanced:img sizes=…> on a local JPEG',
	caching:
		'setHeaders cache-control on a +server.ts endpoint (HTTP cache) + adapter-vercel per-route `config.isr`',
	'route-prefetching': 'data-sveltekit-preload-data="hover" on the link',
	islands:
		'hand-rolled: route `csr = false` + separately bundled island entry (?worker&url) that mounts one Svelte component',
	'render-modes':
		'page options: prerender = true / prerender = false (SSR) / ssr = false (CSR) per route',
	reactivity: 'Svelte 5 runes ($state) with a component-script run counter',
	'bundle-analysis': 'rollup-plugin-visualizer in vite.config.ts behind ANALYZE=1',
	'third-party-scripts':
		'@qwik.dev/partytown: partytownVite() + partytownSnippet() in route +layout.svelte svelte:head, <script type="text/partytown">',
	'multi-host-deployment':
		'@sveltejs/adapter-netlify / adapter-cloudflare / adapter-vercel chosen by env in vite.config.ts'
};

function runPlaywright(project, out) {
	try {
		sh(
			`npx playwright test -c feature-tests/playwright.config.ts --project=${project} --reporter=json`,
			{
				PLAYWRIGHT_JSON_OUTPUT_NAME: out
			}
		);
	} catch {
		// failures are recorded in the JSON report
	}
	return JSON.parse(fs.readFileSync(out, 'utf8'));
}

function collect(report, into) {
	const walk = (suite) => {
		for (const s of suite.suites ?? []) walk(s);
		for (const spec of suite.specs ?? []) {
			const id = path.basename(spec.file, '.spec.ts');
			const result = spec.tests[0]?.results.at(-1);
			const ev = result?.annotations?.find((a) => a.type === 'evidence')?.description;
			const err = result?.error?.message
				// eslint-disable-next-line no-control-regex -- strip ANSI colors
				?.replace(/\u001b\[[0-9;]*m/g, '')
				.split('\n')
				.slice(0, 3)
				.join(' ');
			into[id] = {
				claimedLabel: LABELS[id],
				status: result?.status === 'passed' ? 'pass' : 'fail',
				method: METHODS[id],
				evidence: ev ?? err ?? 'no result',
				test: `feature-tests/${id}.spec.ts`
			};
		}
	};
	for (const s of report.suites) walk(s);
}

const results = {};
const tmp = fs.mkdtempSync(path.join(root, '.svelte-kit/ft-'));

sh('node node_modules/vite/bin/vite.js build');
const server = spawn(
	'node',
	['node_modules/vite/bin/vite.js', 'preview', '--port', String(PORT), '--strictPort'],
	{
		stdio: 'inherit',
		detached: true
	}
);
try {
	for (let i = 0; ; i++) {
		try {
			await fetch(`http://localhost:${PORT}/feature-tests`);
			break;
		} catch {
			if (i > 480) throw new Error('server did not start');
			await new Promise((r) => setTimeout(r, 500));
		}
	}
	collect(runPlaywright('browser', path.join(tmp, 'browser.json')), results);
} finally {
	process.kill(-server.pid, 'SIGTERM');
}
collect(runPlaywright('build', path.join(tmp, 'build.json')), results);

const ordered = Object.fromEntries(
	Object.keys(LABELS).map((id) => [
		id,
		results[id] ?? {
			claimedLabel: LABELS[id],
			status: 'fail',
			method: METHODS[id],
			evidence: 'spec did not run',
			test: `feature-tests/${id}.spec.ts`
		}
	])
);
const out = {
	framework: 'sveltekit',
	repo: 'svelte-books',
	commit: execSync('git rev-parse HEAD').toString().trim(),
	ranAt: new Date().toISOString(),
	results: ordered
};
fs.writeFileSync('feature-tests/results.json', JSON.stringify(out, null, 2) + '\n');
console.table(Object.fromEntries(Object.entries(ordered).map(([k, v]) => [k, v.status])));
