<script lang="ts">
	import favicon from '#lib/assets/favicon.svg';
	import ThemeProvider from '#lib/components/theme/ThemeProvider.svelte';
	import BookSearch from '#lib/features/book/components/BookSearch.svelte';
	import BookSidebar from '#lib/features/book/components/BookSidebar.svelte';
	import MobileBookSidebar from '#lib/features/book/components/MobileBookSidebar.svelte';
	import MobileBookSidebarTrigger from '#lib/features/book/components/MobileBookSidebarTrigger.svelte';
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

<ThemeProvider>
	<MobileBookSidebar>
		{#snippet sidebar()}
			<BookSidebar idPrefix="mobile" mobile />
		{/snippet}

		<div class="group flex min-h-dvh">
			<aside
				class="border-divider bg-surface dark:border-divider-dark dark:bg-surface-dark sticky top-0 hidden h-dvh w-72 shrink-0 flex-col border-r px-5 py-5 md:flex"
			>
				<BookSidebar idPrefix="desktop" />
			</aside>

			<div class="flex min-w-0 flex-1 flex-col">
				<header
					class="border-divider bg-surface/80 dark:border-divider-dark dark:bg-surface-dark/80 sticky top-0 z-20 flex items-center gap-2 border-b px-4 py-3 backdrop-blur-md backdrop-saturate-150 sm:gap-3 sm:px-6"
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
