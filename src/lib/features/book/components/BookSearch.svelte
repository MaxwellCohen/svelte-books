<script lang="ts">
	import { page } from '$app/state';
	import IconButton from '#lib/components/ui/IconButton.svelte';
	import Input from '#lib/components/ui/Input.svelte';
	import SearchIcon from '#lib/components/ui/icons/SearchIcon.svelte';
	import Spinner from '#lib/components/ui/Spinner.svelte';
	import XIcon from '#lib/components/ui/icons/XIcon.svelte';
	import {
		currentSearchParams,
		navigateSearch
	} from '#lib/features/book/url-helpers.svelte';
	import { withFilters } from '#lib/url-state';
	import { navigating } from '$app/state';

	const DEBOUNCE_MS = 220;

	let draft = $state<string | undefined>(undefined);
	let timer: ReturnType<typeof setTimeout> | undefined;
	const inputId = `book-search-${Math.random().toString(36).slice(2, 9)}`;

	const committed = $derived(currentSearchParams().search ?? '');
	const value = $derived(draft ?? committed);
	const isFiltering = $derived(Boolean(navigating.to));

	$effect(() => {
		committed;
		draft = undefined;
	});

	$effect(() => {
		return () => {
			if (timer) clearTimeout(timer);
		};
	});

	function navigate(nextValue: string) {
		const query = nextValue.trim();
		const current = currentSearchParams();
		void navigateSearch(withFilters(current, { search: query || undefined }), page.url.pathname === '/');
	}

	function schedule(nextValue: string) {
		draft = nextValue;
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => navigate(nextValue), DEBOUNCE_MS);
	}
</script>

<form
	aria-busy={isFiltering ? 'true' : undefined}
	class="relative flex-1"
	data-filtering={isFiltering ? '' : undefined}
	onsubmit={(event) => {
		event.preventDefault();
		if (timer) clearTimeout(timer);
		const input = (event.currentTarget as HTMLFormElement).elements.namedItem(
			'search'
		) as HTMLInputElement | null;
		navigate(input?.value ?? value);
	}}
	role="search"
>
	<label class="sr-only" for={inputId}>Search books</label>
	<span
		aria-hidden="true"
		class="text-muted pointer-events-none absolute top-1/2 left-3.5 flex size-4 -translate-y-1/2 items-center justify-center"
	>
		{#if isFiltering}
			<Spinner class="size-4" />
		{:else}
			<SearchIcon class="size-4" />
		{/if}
	</span>
	<Input
		class="peer"
		id={inputId}
		name="search"
		oninput={(event) => {
			schedule((event.currentTarget as HTMLInputElement).value);
		}}
		placeholder="Search books…"
		type="search"
		{value}
		variant="search"
	/>
	<IconButton
		class="absolute top-1/2 right-1.5 -translate-y-1/2 peer-placeholder-shown:hidden"
		label="Clear search"
		onclick={() => {
			if (timer) clearTimeout(timer);
			draft = '';
			navigate('');
		}}
	>
		<XIcon class="size-4" />
	</IconButton>
</form>
