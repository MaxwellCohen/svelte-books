<script lang="ts">
	import BookMark from '#lib/components/ui/BookMark.svelte';
	import type { Snippet } from 'svelte';

	type Props = {
		body?: string;
		children?: Snippet;
		title: string;
	};

	let { body, children, title }: Props = $props();
</script>

<div class="grid flex-1 place-items-center px-6 py-20 text-center">
	<div class="flex max-w-sm flex-col items-center gap-3">
		<BookMark animated class="mb-1 size-10" />
		<p class="text-sm font-medium">{title}</p>
		{#if body}
			<p class="text-muted text-sm leading-6">{body}</p>
		{/if}
		{@render children?.()}
	</div>
</div>
