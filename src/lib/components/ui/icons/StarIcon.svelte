<script lang="ts">
	import { cn } from '#lib/utils';

	let { class: className }: { class?: string } = $props();
</script>

<svg
	aria-hidden="true"
	class={cn('size-4', className)}
	fill="currentColor"
	stroke="none"
	viewBox="0 0 24 24"
>
	<path d="M12 2.5 14.9 8.7l6.8.6-5.2 4.6 1.6 6.6L12 17.3 5.9 20.5l1.6-6.6-5.2-4.6 6.8-.6z" />
</svg>
