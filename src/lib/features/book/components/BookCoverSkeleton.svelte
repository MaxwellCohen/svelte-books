<script lang="ts">
	import Skeleton from '#lib/components/ui/Skeleton.svelte';
	import { cn } from '#lib/utils';

	let { class: className }: { class?: string } = $props();
</script>

<Skeleton class={cn('skeleton-subtle aspect-[2/3] w-full rounded-md', className)} />
