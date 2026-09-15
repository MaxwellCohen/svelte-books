<script lang="ts">
	import FastLink from '#lib/components/ui/FastLink.svelte';
	import type { BookSummary } from '#lib/features/book/book-queries';
	import BookCover from '#lib/features/book/components/BookCover.svelte';
	import { buildHref, type SearchParams } from '#lib/url-state';

	const GRID_SIZES =
		'(min-width: 1280px) 14vw, (min-width: 1024px) 16vw, (min-width: 768px) 20vw, (min-width: 640px) 25vw, 33vw';

	type Props = {
		book: BookSummary;
		eagerPrefetch?: boolean;
		searchParams: SearchParams;
		priority: boolean;
	};

	let { book, eagerPrefetch = false, searchParams, priority }: Props = $props();

	const back = $derived(buildHref(searchParams));
	const href = $derived(back === '/' ? `/${book.id}` : `/${book.id}?${back.slice(2)}`);
</script>

<FastLink
	class="focus-visible:ring-action focus-visible:ring-offset-surface dark:focus-visible:ring-offset-surface-dark group relative block rounded-md transition-transform duration-200 ease-out hover:z-10 hover:scale-[1.04] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
	{href}
	preload={eagerPrefetch}
>
	<BookCover
		class="group-hover:shadow-soft transition-shadow"
		{priority}
		sizes={GRID_SIZES}
		src={book.image_url}
		thumbhash={book.thumbhash}
		title={book.title}
	/>
	<span class="sr-only">{book.title}</span>
</FastLink>
