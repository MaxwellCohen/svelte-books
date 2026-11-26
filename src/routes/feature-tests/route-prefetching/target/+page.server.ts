import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => ({ message: 'prefetch-target-data', at: Date.now() });
