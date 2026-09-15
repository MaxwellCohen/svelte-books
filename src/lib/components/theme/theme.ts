export type Theme = 'light' | 'dark' | 'system';

export const THEME_STORAGE_KEY = 'theme';

export function isTheme(value: string | null): value is Theme {
	return value === 'light' || value === 'dark' || value === 'system';
}

export function themeIsDark(theme: Theme, systemDark: boolean) {
	return theme === 'dark' || (theme === 'system' && systemDark);
}

export function applyThemeClass(theme: Theme) {
	const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	document.documentElement.classList.toggle('dark', themeIsDark(theme, systemDark));
}

export function readStoredTheme(): Theme {
	if (typeof window === 'undefined') return 'system';
	const stored = localStorage.getItem(THEME_STORAGE_KEY);
	return isTheme(stored) ? stored : 'system';
}
