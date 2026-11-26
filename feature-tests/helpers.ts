import { test } from '@playwright/test';

/** Record a one-line evidence string; the runner copies it into results.json. */
export function evidence(text: string) {
	test.info().annotations.push({ type: 'evidence', description: text });
}
