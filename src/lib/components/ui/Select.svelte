<script lang="ts">
	import { cn } from '#lib/utils';
	import type { Snippet } from 'svelte';
	import type { HTMLSelectAttributes } from 'svelte/elements';
	import ChevronDownIcon from '#lib/components/ui/icons/ChevronDownIcon.svelte';

	type Props = {
		children?: Snippet;
		class?: string;
		id?: string;
		value?: string;
	} & Omit<HTMLSelectAttributes, 'class' | 'value'>;

	let { children, class: className, id, value, ...rest }: Props = $props();
</script>

<span class="relative block min-w-0">
	<select
		class={cn(
			'border-divider focus:border-accent focus:ring-accent/25 dark:border-divider-dark disabled:bg-card disabled:text-muted dark:disabled:bg-card-dark w-full appearance-none rounded-md border bg-white px-3 py-2 pr-8 text-sm text-black transition-colors focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#1c1c1c] dark:text-white',
			className
		)}
		{id}
		{value}
		{...rest}
	>
		{@render children?.()}
	</select>
	<ChevronDownIcon
		class="text-muted pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2"
	/>
</span>
