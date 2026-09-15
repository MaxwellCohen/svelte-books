<script lang="ts">
	import BackToBooksLink from '#lib/features/book/components/BackToBooksLink.svelte';
	import BookDetail from '#lib/features/book/components/BookDetail.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.book.title} · Svelte Books</title>
</svelte:head>

<div class="flex flex-1 flex-col px-4 py-5 sm:px-6">
	<BackToBooksLink class="mb-6" />
	<BookDetail book={data.book} />
</div>
