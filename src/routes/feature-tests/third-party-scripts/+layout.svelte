<script lang="ts">
	// Third-party: Partytown's SvelteKit integration (@qwik.dev/partytown), scoped to this route.
	import { partytownSnippet } from '@qwik.dev/partytown/integration';

	let { children } = $props();
</script>

<svelte:head>
	<script>
		partytown = { lib: '/~partytown/' };
	</script>
	<!-- eslint-disable-next-line svelte/no-at-html-tags, @typescript-eslint/no-unused-expressions -- Partytown's documented snippet -->
	{@html '<script>' + partytownSnippet() + '</script>'}
</svelte:head>

{@render children()}
