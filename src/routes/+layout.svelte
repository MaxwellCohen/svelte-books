<script lang="ts">
	import favicon from '#lib/assets/favicon.svg';
	import ThemeProvider from '#lib/components/theme/ThemeProvider.svelte';
	import BookSearch from '#lib/features/book/components/BookSearch.svelte';
	import BookSidebar from '#lib/features/book/components/BookSidebar.svelte';
	import MobileBookSidebar from '#lib/features/book/components/MobileBookSidebar.svelte';
	import MobileBookSidebarTrigger from '#lib/features/book/components/MobileBookSidebarTrigger.svelte';
	import { page } from '$app/state';
	import './layout.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Svelte Books</title>
	<meta
		name="description"
		content="Browse two million Goodreads books with SvelteKit. Streaming search and URL-driven filters."
	/>
</svelte:head>

{#if page.route.id?.startsWith('/feature-tests')}
	<!-- Feature-test pages skip the catalog chrome (its sidebar reads search params, which blocks prerendering). -->
	<main>{@render children()}</main>
{:else}
	<ThemeProvider>
		<MobileBookSidebar>
			{#snippet sidebar()}
				<BookSidebar idPrefix="mobile" mobile />
			{/snippet}

			<div class="group flex min-h-dvh">
				<aside
					class="sticky top-0 hidden h-dvh w-72 shrink-0 flex-col border-r border-divider bg-surface px-5 py-5 md:flex dark:border-divider-dark dark:bg-surface-dark"
				>
					<BookSidebar idPrefix="desktop" />
				</aside>

				<div class="flex min-w-0 flex-1 flex-col">
					<header
						class="sticky top-0 z-20 flex items-center gap-2 border-b border-divider bg-surface/80 px-4 py-3 backdrop-blur-md backdrop-saturate-150 sm:gap-3 sm:px-6 dark:border-divider-dark dark:bg-surface-dark/80"
					>
						<MobileBookSidebarTrigger />
						<BookSearch />
					</header>

					<main class="flex min-w-0 flex-1 flex-col">
						{@render children()}
					</main>
				</div>
			</div>
		</MobileBookSidebar>
	</ThemeProvider>
{/if}
