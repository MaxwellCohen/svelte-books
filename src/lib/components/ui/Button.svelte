<script lang="ts" module>
	import { cn } from '#lib/utils';

	type Variant = 'ghost' | 'primary' | 'secondary';
	type Size = 'default' | 'icon' | 'sm';

	const base =
		'focus-visible:ring-action/40 inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50';

	const sizes: Record<Size, string> = {
		default: 'h-9 px-4 text-sm',
		icon: 'size-9',
		sm: 'h-8 px-3 text-xs'
	};

	const variants: Record<Variant, string> = {
		ghost:
			'text-muted hover:bg-card hover:text-black dark:hover:bg-card-dark dark:hover:text-white',
		primary: 'bg-action text-white hover:bg-action-hover',
		secondary:
			'border-divider hover:border-gray/40 hover:bg-card dark:border-divider-dark dark:hover:border-gray/30 dark:hover:bg-card-dark border bg-white text-black dark:bg-transparent dark:text-white'
	};

	export function buttonClasses(
		props: { class?: string; size?: Size; variant?: Variant } = {}
	) {
		return cn(base, sizes[props.size ?? 'default'], variants[props.variant ?? 'primary'], props.class);
	}
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type Variant = 'ghost' | 'primary' | 'secondary';
	type Size = 'default' | 'icon' | 'sm';

	type Props = {
		'aria-label'?: string;
		children?: Snippet;
		class?: string;
		href?: string;
		onclick?: HTMLButtonAttributes['onclick'];
		size?: Size;
		type?: 'button' | 'submit';
		variant?: Variant;
	} & Omit<HTMLButtonAttributes, 'children' | 'class' | 'size' | 'type'>;

	let {
		'aria-label': ariaLabel,
		children,
		class: className,
		href,
		onclick,
		size = 'default',
		type = 'button',
		variant = 'primary',
		...rest
	}: Props = $props();

	const classes = $derived(buttonClasses({ class: className, size, variant }));
</script>

{#if href}
	<a aria-label={ariaLabel} class={classes} {href}>
		{@render children?.()}
	</a>
{:else}
	<button aria-label={ariaLabel} class={classes} {onclick} {type} {...rest}>
		{@render children?.()}
	</button>
{/if}
