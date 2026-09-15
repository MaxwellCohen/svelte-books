<script lang="ts">
	import { useTheme } from '#lib/components/theme/theme-context.svelte';
	import MonitorIcon from '#lib/components/ui/icons/MonitorIcon.svelte';
	import MoonIcon from '#lib/components/ui/icons/MoonIcon.svelte';
	import SunIcon from '#lib/components/ui/icons/SunIcon.svelte';
	import { cn } from '#lib/utils';

	let { variant = 'pill' }: { variant?: 'inline' | 'pill' } = $props();

	const ctx = useTheme();
</script>

<div
	class={variant === 'inline'
		? 'inline-flex items-center gap-0.5'
		: 'border-divider dark:border-divider-dark inline-flex items-center rounded-full border p-0.5'}
>
	<button
		aria-label="Light mode"
		aria-pressed={ctx.theme === 'light' ? 'true' : 'false'}
		class={cn(
			'rounded-full p-1.5 transition-colors',
			ctx.theme === 'light'
				? 'bg-card dark:bg-card-dark text-black dark:text-white'
				: 'text-muted hover:text-black dark:hover:text-white'
		)}
		onclick={() => ctx.setTheme('light')}
		type="button"
	>
		<SunIcon class="size-4" />
	</button>
	<button
		aria-label="Dark mode"
		aria-pressed={ctx.theme === 'dark' ? 'true' : 'false'}
		class={cn(
			'rounded-full p-1.5 transition-colors',
			ctx.theme === 'dark'
				? 'bg-card dark:bg-card-dark text-black dark:text-white'
				: 'text-muted hover:text-black dark:hover:text-white'
		)}
		onclick={() => ctx.setTheme('dark')}
		type="button"
	>
		<MoonIcon class="size-4" />
	</button>
	<button
		aria-label="System theme"
		aria-pressed={ctx.theme === 'system' ? 'true' : 'false'}
		class={cn(
			'rounded-full p-1.5 transition-colors',
			ctx.theme === 'system'
				? 'bg-card dark:bg-card-dark text-black dark:text-white'
				: 'text-muted hover:text-black dark:hover:text-white'
		)}
		onclick={() => ctx.setTheme('system')}
		type="button"
	>
		<MonitorIcon class="size-4" />
	</button>
</div>
