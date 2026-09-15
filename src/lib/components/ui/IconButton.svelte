<script lang="ts">
	import { cn } from '#lib/utils';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Size = 'default' | 'sm';

	type Props = {
		children?: Snippet;
		class?: string;
		label: string;
		onclick?: HTMLButtonAttributes['onclick'];
		size?: Size;
	};

	const base =
		'text-muted hover:bg-card focus-visible:ring-accent/40 dark:hover:bg-card-dark inline-flex shrink-0 items-center justify-center rounded-md transition-colors hover:text-black focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:hover:text-white';

	const sizes: Record<Size, string> = {
		default: 'size-8',
		sm: 'size-7'
	};

	let {
		children,
		class: className,
		label,
		onclick,
		size = 'default'
	}: Props = $props();
</script>

<button
	aria-label={label}
	class={cn(base, sizes[size], className)}
	{onclick}
	type="button"
>
	{@render children?.()}
</button>
