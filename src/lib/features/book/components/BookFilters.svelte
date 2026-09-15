<script lang="ts">
	import Button from '#lib/components/ui/Button.svelte';
	import Input from '#lib/components/ui/Input.svelte';
	import Range from '#lib/components/ui/Range.svelte';
	import Select from '#lib/components/ui/Select.svelte';
	import {
		LANGUAGES,
		LISTS,
		MAX_PAGES,
		MAX_RATING,
		MAX_YEAR,
		MIN_PAGES,
		MIN_RATING,
		MIN_YEAR,
		PAGE_FILTER_VALUES,
		RATING_FILTER_VALUES,
		YEAR_FILTER_VALUES
	} from '#lib/features/book/book-constants';
	import {
		currentSearchParams,
		updateSearchParams
	} from '#lib/features/book/url-helpers.svelte';
	import { withFilters, type SearchParams } from '#lib/url-state';

	let { idPrefix }: { idPrefix: string } = $props();

	let filters = $state<SearchParams>(currentSearchParams());

	// Sync local draft when URL changes externally
	$effect(() => {
		filters = currentSearchParams();
	});

	const activeCount = $derived(
		Object.entries(filters).filter(
			([key, value]) => key !== 'page' && key !== 'delay' && Boolean(value)
		).length
	);

	function commit(patch: Partial<SearchParams>) {
		const next = withFilters(filters, patch);
		filters = next;
		void updateSearchParams(patch);
	}

	function reset() {
		const delay = filters.delay;
		filters = delay ? { delay } : {};
		void updateSearchParams({
			search: undefined,
			year: undefined,
			rating: undefined,
			pages: undefined,
			language: undefined,
			list: undefined
		});
	}
</script>

<div class="flex min-h-0 flex-1 flex-col">
	<div
		class="min-h-0 flex-1 touch-pan-y [scrollbar-gutter:stable] overflow-x-hidden overflow-y-auto overscroll-contain px-1 pb-6"
	>
		<div class="flex flex-col gap-6">
			<Range
				id={`${idPrefix}-filter-year`}
				label="Published before"
				onValueChange={(value) =>
					commit({ year: value === MAX_YEAR ? undefined : String(value) })}
				readout={filters.year ? filters.year : 'Any year'}
				value={Number(filters.year ?? MAX_YEAR)}
				values={YEAR_FILTER_VALUES}
			>
				{#snippet hint()}
					<span>{MIN_YEAR}</span>
					<span>{MAX_YEAR}</span>
				{/snippet}
			</Range>

			<Range
				id={`${idPrefix}-filter-rating`}
				label="Minimum rating"
				onValueChange={(value) =>
					commit({
						rating: value === MIN_RATING ? undefined : String(value)
					})}
				readout={Number(filters.rating) > 0 ? `${filters.rating}+ stars` : 'Any rating'}
				value={Number(filters.rating ?? MIN_RATING)}
				values={RATING_FILTER_VALUES}
			>
				{#snippet hint()}
					<span>Any</span>
					<span>{MAX_RATING} stars</span>
				{/snippet}
			</Range>

			<Range
				id={`${idPrefix}-filter-pages`}
				label="Max pages"
				onValueChange={(value) =>
					commit({
						pages: value === MAX_PAGES ? undefined : String(value)
					})}
				readout={filters.pages
					? `${Number(filters.pages).toLocaleString()} pages`
					: 'Any length'}
				value={Number(filters.pages ?? MAX_PAGES)}
				values={PAGE_FILTER_VALUES}
			>
				{#snippet hint()}
					<span>{MIN_PAGES}</span>
					<span>{MAX_PAGES.toLocaleString()}</span>
				{/snippet}
			</Range>

			<div class="flex flex-col gap-2">
				<label
					class="text-muted text-xs font-semibold tracking-wide uppercase"
					for={`${idPrefix}-filter-language`}
				>
					Language
				</label>
				<Select
					id={`${idPrefix}-filter-language`}
					onchange={(event) =>
						commit({
							language: (event.currentTarget as HTMLSelectElement).value || undefined
						})}
					value={filters.language ?? 'en'}
				>
					{#each LANGUAGES as language (language.value)}
						<option value={language.value}>{language.label}</option>
					{/each}
				</Select>
			</div>

			<fieldset class="flex flex-col gap-2">
				<legend class="text-muted mb-2 text-xs font-semibold tracking-wide uppercase">
					Book lists
				</legend>
				{#each LISTS as list (list.slug)}
					{@const selected = filters.list === list.slug}
					<label
						class="hover:bg-card dark:hover:bg-card-dark -mx-2 flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors"
					>
						<Input
							checked={selected}
							onchange={() => commit({ list: selected ? undefined : list.slug })}
							type="checkbox"
							variant="checkbox"
						/>
						{list.name}
					</label>
				{/each}
			</fieldset>
		</div>
	</div>

	{#if activeCount > 0}
		<div class="border-divider dark:border-divider-dark border-t pt-3">
			<Button class="w-full" onclick={reset} variant="secondary">Clear all filters</Button>
		</div>
	{/if}
</div>
