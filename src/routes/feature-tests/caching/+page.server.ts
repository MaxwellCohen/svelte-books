import type { Config } from '@sveltejs/adapter-vercel';
import type { PageServerLoad } from './$types';

/** 1st-party (adapter-vercel): per-route ISR, regenerated at most every 60s on Vercel. */
export const config: Config = { isr: { expiration: 60 } };

export const load: PageServerLoad = () => ({ renderedAt: Date.now() });
