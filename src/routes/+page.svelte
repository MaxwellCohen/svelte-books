<script lang="ts">
	import { navigating } from '$app/state';
	import ErrorState from '#lib/components/ui/ErrorState.svelte';
	import type { BookSummary } from '#lib/features/book/book-queries';
	import BookGrid from '#lib/features/book/components/BookGrid.svelte';
	import BookGridSkeleton from '#lib/features/book/components/BookGridSkeleton.svelte';
	import BookPagination from '#lib/features/book/components/BookPagination.svelte';
	import BookPaginationSkeleton from '#lib/features/book/components/BookPaginationSkeleton.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const isPending = $derived(Boolean(navigating.to));

	function errorMessage(err: unknown) {
		if (err && typeof err === 'object' && 'message' in err && typeof err.message === 'string') {
			return err.message;
		}
		return 'Something went wrong';
	}
</script>

<svelte:head>
	<title>Books · Svelte Books</title>
</svelte:head>

<div class="flex min-h-0 flex-1 flex-col">
	<div
		class="flex-1 px-4 py-5 transition-opacity duration-200 ease-out group-has-[[data-filtering]]:opacity-60 sm:px-6"
	>
		<div
			aria-busy={isPending ? 'true' : undefined}
			class="transition-opacity duration-200 ease-out group-has-[[data-filtering]]:opacity-60 data-[pending]:opacity-60"
			data-pending={isPending ? '' : undefined}
		>
			{#await data.books}
				<BookGridSkeleton />
			{:then pageBooks}
				<BookGrid books={pageBooks as BookSummary[]} searchParams={data.searchParams} />
			{:catch err}
				<ErrorState body={errorMessage(err)} title="Something went wrong" />
			{/await}
		</div>
	</div>
	<footer class="mt-auto border-t border-divider px-4 py-3 sm:px-6 dark:border-divider-dark">
		{#await data.count}
			<BookPaginationSkeleton />
		{:then totalResults}
			<BookPagination searchParams={data.searchParams} totalResults={totalResults as number} />
		{:catch}
			<BookPaginationSkeleton />
		{/await}
	</footer>
</div>
