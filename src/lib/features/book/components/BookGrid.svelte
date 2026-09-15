<script lang="ts">
	import EmptyState from '#lib/components/ui/EmptyState.svelte';
	import { ITEMS_PER_PAGE, PRIORITY_COVER_COUNT } from '#lib/features/book/book-constants';
	import type { BookSummary } from '#lib/features/book/book-queries';
	import BookCard from '#lib/features/book/components/BookCard.svelte';
	import { getCurrentPage, type SearchParams } from '#lib/url-state';

	const gridClass =
		'grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7';

	type Props = {
		books: BookSummary[];
		searchParams: SearchParams;
	};

	let { books, searchParams }: Props = $props();
</script>

{#if books.length > 0}
	<div class={gridClass}>
		{#each books as book, index (book.id)}
			<BookCard
				{book}
				eagerPrefetch={getCurrentPage(searchParams) === 1}
				priority={index < PRIORITY_COVER_COUNT}
				{searchParams}
			/>
		{/each}
	</div>
{:else}
	<EmptyState
		body="Nothing matched these filters. Try widening the year range or clearing the search."
		title="No books found"
	/>
{/if}
