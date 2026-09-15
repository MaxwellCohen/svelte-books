<script lang="ts">
	import SpinnerIcon from '#lib/components/ui/icons/SpinnerIcon.svelte';
	import { cn } from '#lib/utils';

	let { class: className }: { class?: string } = $props();
</script>

<SpinnerIcon class={cn('size-4 shrink-0', className)} />
