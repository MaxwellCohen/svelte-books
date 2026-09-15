<script lang="ts">
	import { navigating } from '$app/state';
	import BookGrid from '#lib/features/book/components/BookGrid.svelte';
	import BookPagination from '#lib/features/book/components/BookPagination.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const isPending = $derived(Boolean(navigating.to));
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
			class="transition-opacity duration-200 ease-out data-[pending]:opacity-60 group-has-[[data-filtering]]:opacity-60"
			data-pending={isPending ? '' : undefined}
		>
			<BookGrid books={data.books} searchParams={data.searchParams} />
		</div>
	</div>
	<footer class="border-divider dark:border-divider-dark mt-auto border-t px-4 py-3 sm:px-6">
		<BookPagination searchParams={data.searchParams} totalResults={data.count} />
	</footer>
</div>
