<script lang="ts">
	import { cn } from '#lib/utils';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Variant = 'checkbox' | 'default' | 'search' | 'unstyled';

	type Props = {
		class?: string;
		variant?: Variant;
	} & Omit<HTMLInputAttributes, 'class'>;

	const field =
		'border-divider placeholder-gray focus:border-accent focus:ring-accent/25 dark:border-divider-dark disabled:bg-card disabled:text-muted dark:disabled:bg-card-dark w-full border bg-white text-black transition-colors focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#1c1c1c] dark:text-white';

	const variants: Record<Variant, string> = {
		checkbox:
			'accent-action size-4 w-auto cursor-pointer disabled:cursor-not-allowed disabled:opacity-60',
		default: `${field} rounded-md px-3 py-2 text-sm`,
		search: `${field} h-11 rounded-lg py-2 pr-10 pl-10 text-base sm:text-sm`,
		unstyled: ''
	};

	let { class: className, type = 'text', variant, ...rest }: Props = $props();

	const resolvedVariant = $derived(type === 'hidden' ? 'unstyled' : (variant ?? 'default'));
</script>

<input class={cn(variants[resolvedVariant], className)} {type} {...rest} />
