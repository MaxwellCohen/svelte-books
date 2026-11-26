import { defineConfig } from '@playwright/test';

export const PORT = 4105;

export default defineConfig({
	testDir: '.',
	timeout: 60_000,
	workers: 1,
	fullyParallel: false,
	retries: 0,
	use: {
		baseURL: `http://localhost:${PORT}`,
		launchOptions: { executablePath: '/home/maxc/.local/bin/google-chrome' }
	},
	projects: [
		{ name: 'browser', testMatch: /(?<!bundle-analysis|multi-host-deployment)\.spec\.ts$/ },
		{
			name: 'build',
			testMatch: /(bundle-analysis|multi-host-deployment)\.spec\.ts$/,
			timeout: 900_000
		}
	]
});
