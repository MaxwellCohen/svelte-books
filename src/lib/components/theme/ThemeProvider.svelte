<script lang="ts">
	import { setThemeContext } from '#lib/components/theme/theme-context.svelte';
	import {
		applyThemeClass,
		readStoredTheme,
		THEME_STORAGE_KEY,
		type Theme
	} from '#lib/components/theme/theme';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	let theme = $state<Theme>(typeof window !== 'undefined' ? readStoredTheme() : 'system');

	$effect(() => {
		if (typeof window === 'undefined') return;
		const current = theme;
		applyThemeClass(current);
		const media = window.matchMedia('(prefers-color-scheme: dark)');
		const onChange = () => applyThemeClass(current);
		media.addEventListener('change', onChange);
		return () => media.removeEventListener('change', onChange);
	});

	function setTheme(next: Theme) {
		theme = next;
		if (typeof window !== 'undefined') {
			localStorage.setItem(THEME_STORAGE_KEY, next);
			applyThemeClass(next);
		}
	}

	setThemeContext({
		get theme() {
			return theme;
		},
		setTheme
	});
</script>

{@render children()}
