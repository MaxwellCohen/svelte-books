<script lang="ts">
	import { ITEMS_PER_PAGE } from '#lib/features/book/book-constants';
	import BookCoverSkeleton from '#lib/features/book/components/BookCoverSkeleton.svelte';

	const gridClass =
		'grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7';

	let { count = ITEMS_PER_PAGE }: { count?: number } = $props();
</script>

<div aria-hidden="true" class={gridClass}>
	{#each Array.from({ length: count }, (_, index) => index) as i (i)}
		<BookCoverSkeleton />
	{/each}
</div>
