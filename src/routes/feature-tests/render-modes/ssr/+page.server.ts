import type { PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = () => ({ renderedAt: new Date().toISOString() });
