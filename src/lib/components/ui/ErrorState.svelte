<script lang="ts">
	import AlertTriangleIcon from '#lib/components/ui/icons/AlertTriangleIcon.svelte';
	import type { Snippet } from 'svelte';

	type Props = {
		body?: string;
		children?: Snippet;
		compact?: boolean;
		title?: string;
	};

	let { body, children, compact = false, title = 'Something went wrong' }: Props = $props();
</script>

{#if compact}
	<div class="flex flex-col items-center gap-2 px-4 py-6 text-center">
		<AlertTriangleIcon class="text-danger size-4" />
		<p class="text-muted text-xs">{title}</p>
		{#if body}
			<p class="text-muted text-xs leading-5">{body}</p>
		{/if}
		{@render children?.()}
	</div>
{:else}
	<div class="grid flex-1 place-items-center px-6 py-20 text-center">
		<div class="flex max-w-sm flex-col items-center gap-3">
			<AlertTriangleIcon class="text-danger size-6" />
			<p class="text-sm font-medium text-black dark:text-white">{title}</p>
			{#if body}
				<p class="text-muted text-sm leading-6">{body}</p>
			{/if}
			{@render children?.()}
		</div>
	</div>
{/if}
