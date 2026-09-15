<script lang="ts">
	import { cn } from '#lib/utils';

	let { class: className }: { class?: string } = $props();
</script>

<svg
	aria-hidden="true"
	class={cn('size-4 animate-spin', className)}
	fill="none"
	viewBox="0 0 24 24"
>
	<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" />
	<path
		class="opacity-90"
		d="M22 12a10 10 0 0 0-10-10"
		stroke="currentColor"
		stroke-linecap="round"
		stroke-width="3"
	/>
</svg>
