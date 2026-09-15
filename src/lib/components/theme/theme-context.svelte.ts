import { getContext, setContext } from 'svelte';
import type { Theme } from './theme';

export const THEME_CONTEXT = Symbol('theme');

export type ThemeContext = {
	readonly theme: Theme;
	setTheme: (theme: Theme) => void;
};

export function setThemeContext(context: ThemeContext) {
	setContext(THEME_CONTEXT, context);
}

export function useTheme(): ThemeContext {
	const context = getContext<ThemeContext>(THEME_CONTEXT);
	if (!context) throw new Error('useTheme must be used within ThemeProvider');
	return context;
}
