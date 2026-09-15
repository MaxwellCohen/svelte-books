<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	type Props = {
		'aria-label'?: string;
		children?: Snippet;
		class?: string;
		href: string;
		preload?: boolean;
	} & Omit<HTMLAnchorAttributes, 'class' | 'href'>;

	let {
		'aria-label': ariaLabel,
		children,
		class: className,
		href,
		preload = true,
		...rest
	}: Props = $props();
</script>

<a
	aria-label={ariaLabel}
	class={className}
	data-sveltekit-preload-data={preload ? 'hover' : 'off'}
	{href}
	{...rest}
>
	{@render children?.()}
</a>
