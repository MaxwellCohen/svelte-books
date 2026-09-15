import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	DATABASE_URL: {
		description: 'Postgres connection string. Leave blank to use the preview catalog.',
		schema: (value) => {
			const trimmed = value?.trim();
			return trimmed || undefined;
		}
	},
	API_DELAY_MS: {
		description: 'Default artificial API latency in milliseconds when the delay slider is Off.',
		schema: (value) => {
			if (value === undefined || value === '') return 0;
			const n = Number(value);
			if (!Number.isFinite(n) || n < 0) throw new Error('API_DELAY_MS must be a non-negative number');
			return n;
		}
	}
});
