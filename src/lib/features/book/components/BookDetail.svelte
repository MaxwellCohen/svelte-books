<script lang="ts">
	import StarRating from '#lib/components/ui/StarRating.svelte';
	import BookOpenIcon from '#lib/components/ui/icons/BookOpenIcon.svelte';
	import Building2Icon from '#lib/components/ui/icons/Building2Icon.svelte';
	import CalendarDaysIcon from '#lib/components/ui/icons/CalendarDaysIcon.svelte';
	import GlobeIcon from '#lib/components/ui/icons/GlobeIcon.svelte';
	import HashIcon from '#lib/components/ui/icons/HashIcon.svelte';
	import type { BookDetails } from '#lib/features/book/book-queries';
	import { formatCount, getLanguageLabel } from '#lib/features/book/book-utils';
	import BookCover from '#lib/features/book/components/BookCover.svelte';

	const DETAIL_SIZES = '(min-width: 768px) 18rem, 60vw';

	let { book }: { book: BookDetails } = $props();

	const rating = $derived(Number(book.average_rating));
	const hasRating = $derived(book.average_rating !== null && !Number.isNaN(rating));
</script>

<article class="flex flex-col gap-8 md:flex-row md:gap-10">
	<div class="mx-auto w-40 shrink-0 sm:w-48 md:mx-0 md:w-72">
		<BookCover
			class="shadow-soft ring-divider/70 dark:ring-divider-dark/70 ring-1"
			priority
			sizes={DETAIL_SIZES}
			src={book.image_url}
			thumbhash={book.thumbhash}
			title={book.title}
		/>
	</div>

	<div class="min-w-0 flex-1">
		<h1>{book.title}</h1>
		{#if book.authors.length > 0}
			<p class="text-muted mt-2 text-base sm:text-lg">{book.authors.join(', ')}</p>
		{/if}

		{#if hasRating}
			<div class="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
				<StarRating {rating} />
				<span class="text-sm font-semibold tabular-nums">{rating.toFixed(1)}</span>
				{#if book.ratings_count}
					<span class="text-muted text-sm tabular-nums">
						{formatCount(book.ratings_count ?? 0)} ratings
					</span>
				{/if}
			</div>
		{/if}

		{#if book.description}
			<p class="text-muted mt-6 max-w-prose text-sm leading-7">{book.description}</p>
		{/if}

		<dl
			class="border-divider dark:border-divider-dark mt-8 grid grid-cols-1 gap-x-8 gap-y-4 border-t pt-6 sm:grid-cols-2"
		>
			<div class="flex items-start gap-3">
				<span class="text-muted mt-0.5 shrink-0"><BookOpenIcon class="size-4" /></span>
				<div class="min-w-0">
					<dt class="text-muted text-xs font-semibold tracking-wide uppercase">Pages</dt>
					<dd class="mt-0.5 truncate text-sm">
						{book.num_pages ? book.num_pages.toLocaleString() : 'Unknown'}
					</dd>
				</div>
			</div>
			<div class="flex items-start gap-3">
				<span class="text-muted mt-0.5 shrink-0"><GlobeIcon class="size-4" /></span>
				<div class="min-w-0">
					<dt class="text-muted text-xs font-semibold tracking-wide uppercase">Language</dt>
					<dd class="mt-0.5 truncate text-sm">{getLanguageLabel(book.language_code)}</dd>
				</div>
			</div>
			<div class="flex items-start gap-3">
				<span class="text-muted mt-0.5 shrink-0"><CalendarDaysIcon class="size-4" /></span>
				<div class="min-w-0">
					<dt class="text-muted text-xs font-semibold tracking-wide uppercase">Published</dt>
					<dd class="mt-0.5 truncate text-sm">{book.publication_year ?? 'Unknown'}</dd>
				</div>
			</div>
			<div class="flex items-start gap-3">
				<span class="text-muted mt-0.5 shrink-0"><Building2Icon class="size-4" /></span>
				<div class="min-w-0">
					<dt class="text-muted text-xs font-semibold tracking-wide uppercase">Publisher</dt>
					<dd class="mt-0.5 truncate text-sm">{book.publisher ?? 'Unknown'}</dd>
				</div>
			</div>
			<div class="flex items-start gap-3">
				<span class="text-muted mt-0.5 shrink-0"><HashIcon class="size-4" /></span>
				<div class="min-w-0">
					<dt class="text-muted text-xs font-semibold tracking-wide uppercase">ISBN</dt>
					<dd class="mt-0.5 truncate text-sm">
						<span class="font-mono text-xs">{book.isbn ?? 'None'}</span>
					</dd>
				</div>
			</div>
		</dl>
	</div>
</article>
