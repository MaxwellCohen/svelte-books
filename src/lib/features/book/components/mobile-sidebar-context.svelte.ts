import { getContext, setContext } from 'svelte';

export const MOBILE_SIDEBAR_CONTEXT = Symbol('mobile-book-sidebar');

export type MobileSidebarContext = {
	close: () => void;
	open: () => void;
};

export function setMobileSidebarContext(context: MobileSidebarContext) {
	setContext(MOBILE_SIDEBAR_CONTEXT, context);
}

export function useMobileSidebar(): MobileSidebarContext {
	const context = getContext<MobileSidebarContext>(MOBILE_SIDEBAR_CONTEXT);
	if (!context) throw new Error('useMobileSidebar must be used within MobileBookSidebar');
	return context;
}
