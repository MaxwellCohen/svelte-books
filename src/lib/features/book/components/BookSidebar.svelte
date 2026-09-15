<script lang="ts">
	import ThemeToggle from '#lib/components/theme/ThemeToggle.svelte';
	import BookMark from '#lib/components/ui/BookMark.svelte';
	import FastLink from '#lib/components/ui/FastLink.svelte';
	import GitHubIcon from '#lib/components/ui/GitHubIcon.svelte';
	import ApiDelay from '#lib/features/book/components/ApiDelay.svelte';
	import BookFilters from '#lib/features/book/components/BookFilters.svelte';
	import CatalogSize from '#lib/features/book/components/CatalogSize.svelte';
	import { currentSearchParams } from '#lib/features/book/url-helpers.svelte';
	import { buildHref } from '#lib/url-state';

	let { idPrefix, mobile = false }: { idPrefix: string; mobile?: boolean } = $props();

	const homeHref = $derived(buildHref({ delay: currentSearchParams().delay }));
</script>

<div class="flex items-center justify-between gap-2">
	<FastLink
		aria-label="Svelte Books home"
		class="inline-flex items-center gap-2 text-base font-semibold tracking-tight"
		href={homeHref}
		preload
	>
		<BookMark class="text-action size-5" />
		Svelte Books
	</FastLink>
</div>
<div class="border-divider dark:border-divider-dark mt-6 border-b pb-5">
	<CatalogSize />
</div>
<div class="mt-5 mb-4">
	<ApiDelay {idPrefix} />
</div>
<p class="text-muted mb-4 text-xs font-semibold tracking-wide uppercase">Filters</p>
<BookFilters {idPrefix} />
{#if !mobile}
	<div
		class="border-divider dark:border-divider-dark mt-4 flex items-center justify-between gap-2 border-t pt-4"
	>
		<ThemeToggle variant="inline" />
		<a
			aria-label="View source on GitHub"
			class="text-muted rounded-full p-1.5 transition-colors hover:text-black dark:hover:text-white"
			href="https://github.com/sveltejs/kit"
			rel="noopener noreferrer"
			target="_blank"
		>
			<GitHubIcon class="size-4" />
		</a>
	</div>
{/if}
