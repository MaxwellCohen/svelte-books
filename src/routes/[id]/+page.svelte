<script lang="ts">
	import Button from '#lib/components/ui/Button.svelte';
	import EmptyState from '#lib/components/ui/EmptyState.svelte';
	import ErrorState from '#lib/components/ui/ErrorState.svelte';
	import BackToBooksLink from '#lib/features/book/components/BackToBooksLink.svelte';
	import BookDetail from '#lib/features/book/components/BookDetail.svelte';
	import BookDetailSkeleton from '#lib/features/book/components/BookDetailSkeleton.svelte';
	import type { BookDetails } from '#lib/features/book/book-queries';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	function errorMessage(err: unknown) {
		if (err && typeof err === 'object' && 'message' in err && typeof err.message === 'string') {
			return err.message;
		}
		return 'Something went wrong';
	}

	function isNotFound(err: unknown) {
		const message = errorMessage(err);
		const status =
			err && typeof err === 'object' && 'status' in err ? Number(err.status) : undefined;
		return status === 404 || message === 'Book not found' || message === 'Invalid book ID';
	}
</script>

<svelte:head>
	{#await data.book}
		<title>Svelte Books</title>
	{:then resolvedBook}
		<title>{(resolvedBook as BookDetails).title} · Svelte Books</title>
	{:catch}
		<title>Svelte Books</title>
	{/await}
</svelte:head>

<div class="flex flex-1 flex-col px-4 py-5 sm:px-6">
	<BackToBooksLink class="mb-6" />
	{#await data.book}
		<BookDetailSkeleton />
	{:then resolvedBook}
		<BookDetail book={resolvedBook as BookDetails} />
	{:catch err}
		{#if isNotFound(err)}
			<EmptyState body="We couldn't find a book with that id." title="Book not found">
				<Button class="mt-1" href="/" variant="secondary">Back to the shelf</Button>
			</EmptyState>
		{:else}
			<ErrorState body={errorMessage(err)} title="Something went wrong" />
		{/if}
	{/await}
</div>
