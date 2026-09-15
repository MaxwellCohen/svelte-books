<script lang="ts">
	import ChevronLeftIcon from '#lib/components/ui/icons/ChevronLeftIcon.svelte';
	import ChevronRightIcon from '#lib/components/ui/icons/ChevronRightIcon.svelte';
	import Skeleton from '#lib/components/ui/Skeleton.svelte';
	import { cn } from '#lib/utils';

	const stepClass =
		'text-muted hover:bg-card dark:hover:bg-card-dark focus-visible:ring-action/40 inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-sm font-medium transition-colors hover:text-black focus-visible:ring-2 focus-visible:outline-none dark:hover:text-white';
</script>

<div aria-hidden="true" class="flex items-center justify-between gap-4">
	<span class={cn(stepClass, 'pointer-events-none opacity-40')}>
		<ChevronLeftIcon class="size-4" />
		Previous
	</span>
	<div class="flex items-center gap-2">
		<Skeleton class="skeleton-subtle hidden h-4 w-20 sm:block" />
		<span class="bg-divider dark:bg-divider-dark hidden h-3 w-px sm:block"></span>
		<Skeleton class="skeleton-subtle h-4 w-20" />
	</div>
	<span class={cn(stepClass, 'pointer-events-none opacity-40')}>
		Next
		<ChevronRightIcon class="size-4" />
	</span>
</div>
