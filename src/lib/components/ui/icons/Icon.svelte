<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children?: Snippet;
		class?: string;
		fill?: string;
	};

	let { children, class: className = 'size-4', fill = 'none' }: Props = $props();
</script>

<svg
	aria-hidden="true"
	class={className}
	{fill}
	stroke="currentColor"
	stroke-linecap="round"
	stroke-linejoin="round"
	stroke-width={2}
	viewBox="0 0 24 24"
>
	{@render children?.()}
</svg>
