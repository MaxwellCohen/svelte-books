<script lang="ts">
	import { page } from '$app/state';
	import Button from '#lib/components/ui/Button.svelte';
	import EmptyState from '#lib/components/ui/EmptyState.svelte';
	import ErrorState from '#lib/components/ui/ErrorState.svelte';

	let { error }: { error: App.Error } = $props();

	const isNotFound = $derived(
		page.status === 404 || error.message === 'Book not found' || error.message === 'Not Found'
	);
</script>

{#if isNotFound}
	<EmptyState
		body={error.message === 'Book not found'
			? "We couldn't find a book with that id."
			: "That page isn't in the catalog."}
		title={error.message === 'Book not found' ? 'Book not found' : 'Page not found'}
	>
		<Button class="mt-1" href="/" variant="secondary">Back to the shelf</Button>
	</EmptyState>
{:else}
	<ErrorState body={error.message} title="Something went wrong">
		<Button class="mt-1" href={page.url.pathname} size="sm" variant="secondary">Try again</Button>
	</ErrorState>
{/if}
