<script lang="ts">
	import FastLink from '#lib/components/ui/FastLink.svelte';
	import ChevronLeftIcon from '#lib/components/ui/icons/ChevronLeftIcon.svelte';
	import ChevronRightIcon from '#lib/components/ui/icons/ChevronRightIcon.svelte';
	import Skeleton from '#lib/components/ui/Skeleton.svelte';
	import {
		buildHref,
		getCurrentPage,
		getTotalPages,
		withPage,
		type SearchParams
	} from '#lib/url-state';
	import { cn } from '#lib/utils';

	const stepClass =
		'text-muted hover:bg-card dark:hover:bg-card-dark focus-visible:ring-action/40 inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-sm font-medium transition-colors hover:text-black focus-visible:ring-2 focus-visible:outline-none dark:hover:text-white';

	type Props = {
		searchParams: SearchParams;
		totalResults: number;
	};

	let { searchParams, totalResults }: Props = $props();

	const totalPages = $derived(getTotalPages(totalResults));
	const currentPage = $derived(getCurrentPage(searchParams, totalPages));
	const hasPrevious = $derived(currentPage > 1);
	const hasNext = $derived(currentPage < totalPages);
</script>

<nav aria-label="Pagination" class="flex items-center justify-between gap-4">
	{#if hasPrevious}
		<FastLink
			aria-label="Previous page"
			class={stepClass}
			href={buildHref(withPage(searchParams, currentPage - 1))}
			preload
		>
			<ChevronLeftIcon class="size-4" />
			Previous
		</FastLink>
	{:else}
		<span aria-disabled="true" class={cn(stepClass, 'pointer-events-none opacity-40')}>
			<ChevronLeftIcon class="size-4" />
			Previous
		</span>
	{/if}

	<p class="text-muted flex items-center gap-2 text-xs tabular-nums sm:text-sm">
		<span class="hidden sm:inline">
			<span class="font-medium text-black dark:text-white">
				{totalResults.toLocaleString()}
			</span>
			{' '}books
		</span>
		<span aria-hidden="true" class="bg-divider dark:bg-divider-dark hidden h-3 w-px sm:block"
		></span>
		<span>
			Page {currentPage.toLocaleString()} of {totalPages.toLocaleString()}
		</span>
	</p>

	{#if hasNext}
		<FastLink
			aria-label="Next page"
			class={stepClass}
			href={buildHref(withPage(searchParams, currentPage + 1))}
			preload
		>
			Next
			<ChevronRightIcon class="size-4" />
		</FastLink>
	{:else}
		<span aria-disabled="true" class={cn(stepClass, 'pointer-events-none opacity-40')}>
			Next
			<ChevronRightIcon class="size-4" />
		</span>
	{/if}
</nav>
